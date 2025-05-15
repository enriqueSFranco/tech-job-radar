import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./Card";

const mockItem = {
  id: 1,
  jobTitle: "Frontend Dev",
  companyName: "Acme Inc",
  jobLocation: "Remoto",
  isRemote: true,
  employmentType: "Tiempo completo",
  jobDescription: "Buscamos desarrollador con experiencia en React.",
  datePosted: "Hoy",
  applicationUrl: "https://acme.jobs/frontend",
};

test("renderiza Card correctamente y permite guardar empleo", () => {
  const handleSave = jest.fn();

  render(<Card item={mockItem} onSaveJob={handleSave} isSave={false} />);

  expect(screen.getByTestId("job-card-1")).toBeInTheDocument();
  expect(screen.getByTestId("job-title-1")).toHaveTextContent("Frontend Dev");
  expect(screen.getByTestId("job-tags-1")).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("save-button-1"));
  expect(handleSave).toHaveBeenCalledTimes(1);
});
