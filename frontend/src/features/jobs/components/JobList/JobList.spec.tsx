import { render, screen } from "@testing-library/react";
import { JobList } from "./JobList";

const mockItems = [
  { id: 1, jobTitle: "Frontend Dev", companyName: "Acme", jobLocation: "Remote", isRemote: true, employmentType: "Full-time", datePosted: "Hoy", applicationUrl: "https://acme.com" },
  // agrega más si lo necesitas
];

test("renderiza la lista de empleos", () => {
  render(
    <JobList
      items={mockItems}
      toggleSaveJob={jest.fn()}
      isJobSaved={() => false}
    />
  );

  expect(screen.getByTestId("job-list")).toBeInTheDocument();
  expect(screen.getByTestId("job-item-1")).toBeInTheDocument();
});
