import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { IcRadar } from "@/shared/icons";
import { IcClose } from "@/shared/icons/system/IcClose";
// import { useEffect, useState } from "react";
import { Link } from "react-router";

const menuOptions = [
  { id: "1", label: "Mis vacantes favoritas", icon: "♥️" },
  { id: "3", label: "Configuración", icon: "⚙️" },
  { id: "4", label: "Cerrar sesión", icon: "❌" },
];

interface Props {
  isOpen: boolean;
  isScrolled: boolean;
  onToggle(): void;
}

export function PanelMenu({ isOpen, isScrolled, onToggle }: Props) {
  useBodyScrollLock(isOpen);

  return (
    <aside
      className={`bg-black/60 backdrop-blur-sm fixed top-0 right-0 w-xl max-w-full h-full z-[1000] transition-all duration-[400ms] overflow-hidden ease-in-out transform ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="border-b-[1px] border-b-gray-600">
        <header className="flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-2">
            <Link to="/">
              <IcRadar />
            </Link>
            <h1
              className={`text-xl font-bold capitalize tracking-wide ${
                isScrolled ? "text-red-600" : "text-gray-300"
              }`}
            >
              job radar
            </h1>
          </div>
          <div className="flex justify-between items-center gap-2">
            <button className="border-[1px] border-white rounded-sm px-4 py-2">
              <label className="capitalize font-light text-sm">
                iniciar sesión
              </label>
            </button>
            <button className="p-4" onClick={onToggle}>
              <IcClose />
            </button>
          </div>
        </header>
      </div>
      <ul className="flex flex-col items-start gap-4 w-full mt-6 px-4">
        {/* Título de la sección */}
        <li className="w-full mb-4 flex justify-center">
          <div className="w-full text-left">
            <label className="text-lg font-semibold text-white">
              Bienvenido
            </label>
            <p className="text-sm font-light text-white/60">
              Selecciona una opción para continuar
            </p>
          </div>
        </li>
        {/* Opciones del menú */}
        {menuOptions.map((option) => (
          <li
            className="w-full py-3 hover:bg-white/10 rounded-lg"
            key={`optionId-${option.id}`}
          >
            <div className="w-full text-left flex items-center gap-1.5">
              {option.icon}
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
    </aside>
  );
}
