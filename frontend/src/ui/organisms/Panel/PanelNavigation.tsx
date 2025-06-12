import { Link } from "react-router";

const navigationOptions: {id: number, label: string}[] = [
  { id: 1, label: "perfil" },
  { id: 2, label: "cerrar sesion" },
];

export function PanelNavigation() {
  return (
    <ul className="flex flex-col items-start gap-4 w-full mt-6 px-4">
      {navigationOptions.map((option) => (
        <li
          className="w-full py-3 hover:bg-white/10 rounded-lg"
          key={`optionId-${crypto.randomUUID()}`}
        >
          <div className="w-full text-left flex items-center gap-1.5">
            {/* {option.icon} */}
            <Link
              to="/"
              className="text-lg font-medium flex items-center text-white"
            >
              {option.label}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
