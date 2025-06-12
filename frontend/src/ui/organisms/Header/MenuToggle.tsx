import { IcClose } from "@/shared/icons/IcClose";
import { IcMenu } from "@/shared/icons/IcMenu";

type HeaderMobileProps = {
  isOpenPanel: boolean;
  onOpenPanel: () => void;
};

export function MenuToggle({
  isOpenPanel,
  onOpenPanel,
}: HeaderMobileProps) {
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <button className="border-[1px] border-white rounded-sm px-4 py-2">
        <label className="capitalize font-light text-sm">iniciar sesión</label>
      </button>
      <button
        onClick={onOpenPanel}
        aria-controls="primary-navigation"
        aria-label={isOpenPanel ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpenPanel}
        className="transition-transform duration-300 ease-in-out hover:scale-110"
      >
        {isOpenPanel ? <IcClose /> : <IcMenu />}
      </button>
    </div>
  );
}
