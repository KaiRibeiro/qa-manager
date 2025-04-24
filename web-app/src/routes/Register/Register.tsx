import Logo from '../../components/shared/logo/Logo';
import RegisterForm from '../../components/register-form/RegisterForm';

function Register() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col items-center justify-center space-y-5">
      <Logo />
      <RegisterForm />
    </main>
  );
}

export default Register;
