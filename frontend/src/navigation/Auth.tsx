import { JobFavorites } from "@/views/app/JobFavorites";
import { JobsForYou } from "@/views/app/JobsForYou";
import { Route, Routes } from "react-router";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/mi-perfil" element={<JobFavorites />} />
      <Route path="/vacantes-favoritas" element={<JobFavorites />} />
      <Route path="/recomendaciones" element={<JobsForYou />} />
    </Routes>
  );
}
