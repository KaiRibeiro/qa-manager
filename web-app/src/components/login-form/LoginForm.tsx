import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/auth/LoginSchema';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

function LoginForm() {
  type FormData = z.infer<typeof loginSchema>;
  const { login } = useAuth();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      setHasError(true);
      // @ts-ignore
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col min-w-[350px] md:min-w-[450px] items-center bg-white shadow-lg shadow-gray-800/50 rounded-2xl p-8 sm:p-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-wide">Log In</h1>
            <h2 className="mt-3 text-base sm:text-lg font-light">Please enter login details</h2>
          </div>

          <div className="w-3/4 space-y-5 mt-8">
            <div>
              <label htmlFor="email" className="block text-lg font-semibold">
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
              <label htmlFor="password" className="block text-lg font-semibold">
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
            {hasError && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
            <button
              disabled={isSubmitting || !isValid}
              type="submit"
              className="bg-emerald-500 rounded-2xl w-[280px] h-[60px] text-xl font-bold text-white shadow-md hover:bg-emerald-600 transition duration-200 ease-in-out hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Log In
            </button>

            <span className="text-lg font-light">OR</span>

            <Link to={'/register'}>
              <button
                type="button"
                className="border border-gray-300 rounded-2xl w-[280px] h-[50px] flex items-center justify-center shadow-md hover:bg-gray-200 transition duration-200 ease-in-out hover:cursor-pointer"
              >
                <span className="ml-2 text-lg font-medium">Sign Up</span>
              </button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
