
import AuthLayout from "@/components/auth/AuthLayout";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUpPage = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Deploy your projects in minutes with TecXi"
      type="signup"
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
