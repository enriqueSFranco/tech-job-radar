import { Favorites } from "@/views/jobs/favorite-jobs";
// import { Jobs } from "@/views/app/Jobs";
// import { JobsForYou } from "@/views/app/JobsForYou";
import { Route, Routes } from "react-router";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/mi-perfil" element={<Favorites />} />
      <Route path="/empleos-favoritos" element={<Favorites />} />
    </Routes>
  );
}
