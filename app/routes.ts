import { type RouteConfig, index, layout, route, } from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    index("routes/home.tsx"),
  ]),
  route("logout", "./routes/auth/logout.tsx"),
  route("dashboard", "./routes/authenticatedLayout.tsx", [
    index("./routes/dashboard.tsx"),
    route("journey/creation", "./routes/journey/creation/route.tsx"),
    route("journey/:journeyId", "./routes/journey/run/route.tsx"),
  ]),
  layout("./routes/auth/layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
