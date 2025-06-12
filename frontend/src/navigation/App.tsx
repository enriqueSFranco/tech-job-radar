import { Route, Routes } from "react-router";
import { Home } from "@/views/app/Home";
import { Login } from "@/views/auth/Login";
import { Register } from "@/views/auth/Register";
import { JobsExplorer } from "@/views/app/JobsExplorer";
import { Favorites } from "@/views/jobs/favorite-jobs";

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path="empleos">
        <Route path=":slug" element={<JobsExplorer />} />
        <Route path="empleos-guardados" element={<Favorites />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}
