import { Outlet, redirect, type LoaderFunctionArgs } from "react-router";
import { validateUserSession } from "~/session/index.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const userId = await validateUserSession(request);
    if (userId) {
      return redirect("/dashboard");
    }
  } catch (error) {
  }
}

const AuthLayout = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="p-8 rounded-lg shadow-lg min-w-[320px] max-w-[400px] w-full">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
