import { PageMeta, SignIns } from "../../../components/index";
import { AuthLayout } from "../auth-page-layout/index";

export const SignIn = () => {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignIns />
      </AuthLayout>
    </>
  );
};
