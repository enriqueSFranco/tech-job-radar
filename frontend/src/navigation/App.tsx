import { Home } from "@/views/app/Home";
import { Login } from "@/views/auth/Login";
import { Register } from "@/views/auth/Register";
import { Route, Routes } from "react-router";

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
