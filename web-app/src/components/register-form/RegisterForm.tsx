import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerSchema } from '../../schemas/auth/RegisterSchema';
import AuthService from '../../services/AuthService';
import { useState } from 'react';
import ConfirmedModal from '../shared/confimed-modal/ConfirmedModal';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  type FormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const authService = new AuthService();
  const navigate = useNavigate();

  const [hasRegisterErrors, setHasRegisterErrors] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    navigate('/login');
  };

  const onSubmit = async (data: FormData) => {
    try {
      await authService.register(data);
      openModal();
    } catch (error) {
      setHasRegisterErrors(true);
      // @ts-ignore
      setErrorMessage(error.message || 'Something went wrong during registration');
    }
  };

  return (
    <>
      {isModalOpen && (
        <ConfirmedModal
          title={'Successful Sign Up'}
          description={'User registered successfully'}
          onClose={closeModal}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col min-w-[350px] md:min-w-[450px] items-center bg-white shadow-lg shadow-gray-800/50 rounded-2xl p-8 sm:p-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-wide">Sign Up</h1>
            <h2 className="mt-3 text-base sm:text-lg font-light">Please enter user details</h2>
          </div>

          <div className="w-3/4 space-y-5 mt-8">
            <div>
              <label htmlFor="name_input" className="block text-lg font-semibold">
                Name *
              </label>
              <input
                type="text"
                id="name_input"
                placeholder="John Doe"
                className="border mt-2 rounded-md w-full h-10 border-black placeholder:text-lg placeholder:opacity-40 pl-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                {...register('name')}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email_input" className="block text-lg font-semibold">
                Email *
              </label>
              <input
                type="text"
                id="email_input"
                placeholder="user@email.com"
                className="border mt-2 rounded-md w-full h-10 border-black placeholder:text-lg placeholder:opacity-40 pl-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                {...register('email', {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/\s+/g, '');
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password_input" className="block text-lg font-semibold">
                Password *
              </label>
              <input
                type="password"
                id="password_input"
                {...register('password', {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/\s+/g, '');
                  },
                })}
                placeholder="Password"
                className="border mt-2 rounded-md w-full h-10 border-black placeholder:text-lg placeholder:opacity-40 pl-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center mt-8 space-y-3">
            <button
              disabled={isSubmitting || !isValid}
              type="submit"
              className="bg-emerald-500 rounded-2xl w-[280px] h-[60px] text-xl font-bold text-white shadow-md hover:bg-emerald-600 transition duration-200 ease-in-out hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </button>
            {hasRegisterErrors && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
