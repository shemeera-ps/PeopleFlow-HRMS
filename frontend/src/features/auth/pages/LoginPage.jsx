import { Description } from "@mui/icons-material";
import AuthLayout from "../../../layouts/AuthLayout";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Welcome Back 👋"
      description="Sign in to navigate to your workspace."
    >
      <LoginForm />
    </AuthLayout>
  );
}
