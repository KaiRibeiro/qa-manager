import LoginForm from '../../components/login-form/LoginForm';
import Logo from '../../components/shared/logo/Logo';

function Login() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col lg:flex-row items-center justify-center px-6 py-10 space-y-10 lg:space-y-0 lg:gap-x-24">
      <Logo />
      <div className="w-full max-w-[400px]">
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
