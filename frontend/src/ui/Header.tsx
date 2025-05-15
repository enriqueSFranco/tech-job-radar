import { Suspense } from "react";
import { IcRadar } from "../shared/icons";

interface Props {
  showButtonMenu: boolean;
  isScrolled: boolean
  onToggleMenu(): void
}

export function Header({ showButtonMenu, isScrolled, onToggleMenu }: Props) {
  return (
    <header
      className={`px-4 flex items-center justify-between gap-2 w-full h-16 transition-colors duration-300 fixed top-0 z-50 ${
        isScrolled ? "bg-white" : "bg-black/90 backdrop-blur-2xl"
      }`}
    >
      <div className="flex items-center gap-2">
        <IcRadar />
        <h1
          className={`text-xl font-bold capitalize tracking-wide ${
            isScrolled ? "text-black" : "text-gray-300"
          }`}
        >
          job radar
        </h1>
      </div>
      {showButtonMenu && (
        <Suspense fallback={<div>loading...</div>}>
          <div className="flex justify-between items-center gap-2">
          <button className="border-[1px] border-white rounded-sm px-4 py-2">
              <label className="capitalize font-light text-sm">
                iniciar sesión
              </label>
            </button>
            <button className="p-4" onClick={onToggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#080D39"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={`transition-colors ${
              isScrolled ? "fill-black" : "fill-white"
            }`}
              >
                <path
                  id="Union"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.703 7.70675C10.1424 7.81768 5.88742 7.94285 3.12509 7.99922L3.08428 5.99964C5.83453 5.94351 10.0796 5.81867 13.6408 5.70772C15.4206 5.65228 17.0282 5.60034 18.1909 5.56227C18.7723 5.54323 19.2423 5.52766 19.567 5.51685L19.9408 5.50437L20.038 5.50111L20.0627 5.50028L20.0689 5.50007L20.0705 5.50001L20.0708 5.5C20.0709 5.5 20.071 5.5 20.1047 6.49943C20.1384 7.49886 20.1384 7.49886 20.1383 7.49886L20.1379 7.49888L20.1363 7.49893L20.13 7.49914L20.1052 7.49998L20.0078 7.50325L19.6336 7.51574C19.3086 7.52656 18.8381 7.54215 18.2564 7.5612C17.0929 7.59929 15.4842 7.65127 13.703 7.70675ZM15.1672 17.8744C12.1304 17.8744 7.91651 17.9984 3.20937 18.4939L3 16.5049C7.79286 16.0004 12.0789 15.8744 15.1672 15.8744C16.7119 15.8744 17.9586 15.906 18.821 15.9376C19.2523 15.9534 19.5876 15.9693 19.8162 15.9813C19.9305 15.9873 20.0181 15.9923 20.0777 15.9958L20.146 16L20.164 16.0012L20.169 16.0015L20.1704 16.0016L20.1709 16.0016C20.1711 16.0016 20.1712 16.0016 20.1047 16.9994C20.0382 17.9972 20.0382 17.9972 20.0383 17.9972L20.0382 17.9972L20.0376 17.9972L20.0344 17.997L20.0198 17.996L19.9585 17.9923C19.9037 17.989 19.8209 17.9843 19.7115 17.9785C19.4929 17.9671 19.168 17.9517 18.7477 17.9363C17.907 17.9054 16.6849 17.8744 15.1672 17.8744ZM3.15724 12.998C4.19496 12.9434 7.49547 12.7587 11.0908 12.5574C14.8927 12.3446 19.0242 12.1133 21.1587 11.998L21.0507 10.0009C18.905 10.1169 14.7718 10.3482 10.9718 10.561C7.38306 10.7618 4.09155 10.9461 3.05213 11.0008L3.15724 12.998Z"
                ></path>
              </svg>
            </button>
          </div>
        </Suspense>
      )}
    </header>
  );
}
