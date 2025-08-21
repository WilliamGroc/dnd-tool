import { Link, Outlet, redirect, type LoaderFunctionArgs } from "react-router";
import { validateUserSession } from "~/session/index.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await validateUserSession(request);
  } catch (error) {
    console.error("Error validating user session:", error);
    return redirect("/login");
  }
}

export default function AuthenticatedLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="shadow">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            DnD Tools
          </Link>
          <div className="space-x-4">
            <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </Link>
            <Link to="/logout" className="text-gray-700 hover:text-gray-900">
              Logout
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-white shadow py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} DnD Tools. All rights reserved.
      </footer>
    </div>
  );
};