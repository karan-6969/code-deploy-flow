
import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";

const SignInPage = () => {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Enter your credentials to access your account"
      type="signin"
    >
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;
