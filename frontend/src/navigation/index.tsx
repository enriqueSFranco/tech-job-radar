import { AppRoutes } from "./App";
import { AuthRoutes } from "./Auth";

export default function Navigation() {
  const token = crypto.randomUUID();
  return token ? <AppRoutes /> : <AuthRoutes />;
}
