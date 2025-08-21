import { Link, Outlet, redirect, type LoaderFunctionArgs } from "react-router";
import { validateUserSession } from "~/session/index.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await validateUserSession(request);
    return redirect("/dashboard");
  } catch (error) {
  }
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="shadow p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DnD Tools
        </Link>
        <nav>
          <Link to="/login" className="text-blue-600 hover:underline mr-4">
            Login
          </Link>
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </main>
      <footer className="bg-white text-center p-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} DnD Tools. All rights reserved.
      </footer>
    </div>
  );
}