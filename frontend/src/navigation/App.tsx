import { Route, Routes } from "react-router";
import { Home } from "@/views/app/Home";
import { Login } from "@/views/auth/Login";
import { Register } from "@/views/auth/Register";
import { JobExplorer } from "@/views/app/JobExplorer";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="empleos/:slug" element={<JobExplorer />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
