import { type LoaderFunctionArgs, redirect } from "react-router";
import { clearSessionCookie, validateUserSession } from "~/session/index.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const userId = await validateUserSession(request);
    if (userId) {
      await clearSessionCookie(request);
    }
  } catch (error) {
  }
  finally {
    return redirect("/");
  }
}