import { useLogin } from "../hooks/useLogin";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const { mutate, isPending } = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to the WorkHub Portal
          </p>
        </div>

        <LoginForm
          onSubmit={mutate}
          isLoading={isPending}
        />

        <div className="mt-8 rounded-md bg-gray-50 p-4 text-sm">
          <h2 className="font-semibold text-gray-700">
            Demo Credentials
          </h2>

          <p className="mt-2">
            <strong>Username:</strong> emilys
          </p>

          <p>
            <strong>Password:</strong> emilyspass
          </p>
        </div>
      </div>
    </div>
  );
}