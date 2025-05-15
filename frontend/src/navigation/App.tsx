import { Navigate, Route, Routes } from "react-router";
import { JobsLayout } from "@/layouts/JobsLayout";
import { Home } from "@/views/app/Home";
// import { AllJobs } from "@/views/jobs/all-jobs";
// import { JobsForYou } from "@/views/jobs/jobs-for-you";
import { Login } from "@/views/auth/Login";
import { Register } from "@/views/auth/Register";
import { JobDetails } from "@/views/jobs/job-details";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Navigate to="/vacantes" />} />

        <Route path="vacantes" element={<JobsLayout />}>
          {/* <Route index element={<AllJobs />} /> */}
          <Route path=":jobId" element={<JobDetails />} />
        </Route>
        <Route path="recomendaciones" element={<JobsLayout />}>
          {/* <Route index element={<JobsForYou />} /> */}
          <Route path=":jobId" element={<JobDetails />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
