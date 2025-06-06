import { useResponsive } from "@/hooks/useResponsive";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setKeyword, setLocation, clearSearch } from "../search.slice";
import { fetchJobs } from "@/features/jobs/jobs.thunks";
import { selectFormSearch } from "../search.selectors";
import { useNavigate } from "react-router";

interface SearchFormFields extends HTMLFormControlsCollection {
  keyword: HTMLInputElement;
  location: HTMLInputElement;
}

interface SearchFormElements extends HTMLFormElement {
  readonly elements: SearchFormFields;
}

export function SearchForm() {
  const navigate = useNavigate();
  const { isBreakpoint } = useResponsive();
  const dispatch = useAppDispatch();
  const { keyword, location } = useAppSelector(selectFormSearch);

  function handleSubmit(e: React.FormEvent<SearchFormElements>) {
    e.preventDefault();
    if (!keyword.trim() && !location.trim()) return;

    dispatch(fetchJobs({ keyword, location }));
    const urlRedirect = `/empleos/${keyword
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    navigate(urlRedirect);
    clearSearch({ keyword, location });
  }

  return (

      <form
        className="flex gap-4 justify-center w-full"
        onSubmit={handleSubmit}
      >
        {isBreakpoint("mobile") || isBreakpoint("mobileLarge") ? (
          <div className="rounded-full outline-[1px] outline-white/20 h-12 flex items-center justify-between px-4 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#080D39"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="fill-neutral-400"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 11.0999C2 5.73669 6.47535 2 11.6625 2V4C7.39975 4 4 7.01321 4 11.0999C4 12.436 4.47513 13.6386 5.32895 14.5038C6.17642 15.3626 7.45744 15.95 9.18745 15.95C11.0721 15.95 12.5798 15.0154 13.6451 13.7148C14.7288 12.3915 15.275 10.7819 15.275 9.63746C15.275 8.22682 14.7491 7.42935 14.1529 7.01017C13.5239 6.56788 12.6862 6.45347 11.9302 6.66348L11.3949 4.73644C12.6639 4.38394 14.1323 4.55078 15.3033 5.37412C16.5071 6.22056 17.275 7.67309 17.275 9.63746C17.275 11.1616 16.6508 13.0017 15.5247 14.5513L21.6803 20.2672L20.3194 21.7328L14.18 16.0319C12.8965 17.1583 11.2163 17.95 9.18745 17.95C6.98 17.95 5.16728 17.1873 3.9054 15.9086C2.64986 14.6363 2 12.9139 2 11.0999Z"
              ></path>
            </svg>
            <button
              className="w-full h-full flex items-center justify-start outline-none indent-1.5"
              onClick={(e) => {
                e.preventDefault();
                console.log("abrir form search panel");
              }}
            >
              <span className="text-sm text-neutral-500">
                ¿Qué puesto estás buscando?
              </span>
            </button>
          </div>
        ) : (
          <div className="rounded-md p-2 outline-[1px] outline-white/20 mx-auto sm:flex-row h-16 w-full lg:w-10/12 flex items-center justify-between">
            <div className="flex items-center justify-center px-4 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#080D39"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-neutral-300"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 11.0999C2 5.73669 6.47535 2 11.6625 2V4C7.39975 4 4 7.01321 4 11.0999C4 12.436 4.47513 13.6386 5.32895 14.5038C6.17642 15.3626 7.45744 15.95 9.18745 15.95C11.0721 15.95 12.5798 15.0154 13.6451 13.7148C14.7288 12.3915 15.275 10.7819 15.275 9.63746C15.275 8.22682 14.7491 7.42935 14.1529 7.01017C13.5239 6.56788 12.6862 6.45347 11.9302 6.66348L11.3949 4.73644C12.6639 4.38394 14.1323 4.55078 15.3033 5.37412C16.5071 6.22056 17.275 7.67309 17.275 9.63746C17.275 11.1616 16.6508 13.0017 15.5247 14.5513L21.6803 20.2672L20.3194 21.7328L14.18 16.0319C12.8965 17.1583 11.2163 17.95 9.18745 17.95C6.98 17.95 5.16728 17.1873 3.9054 15.9086C2.64986 14.6363 2 12.9139 2 11.0999Z"
                ></path>
              </svg>
              <input
                id="keyword"
                placeholder="¿Qué puesto estás buscando?"
                autoFocus
                autoComplete="off"
                className="w-full h-full outline-none indent-1.5 placeholder:text-sm"
                onChange={(e) => dispatch(setKeyword(e.target.value))}
              />
            </div>

            <div className="h-full w-[2px] bg-neutral-800"></div>

            <div className="flex items-center justify-center px-4 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#080D39"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-neutral-300"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.3188 4C9.58492 4 7.13135 6.27571 7.13135 9.1875C7.13135 11.7378 8.29308 14.5065 9.53417 16.7129C10.1459 17.8004 10.7586 18.7196 11.218 19.3661C11.4474 19.6889 11.6377 19.9426 11.7693 20.1139C11.8351 20.1995 11.8862 20.2645 11.9201 20.3073L11.9578 20.3544L11.9664 20.365L11.968 20.367C11.9679 20.3669 11.9678 20.3668 11.1938 21C10.4199 21.6332 10.4197 21.633 10.4196 21.6328L10.4179 21.6308L10.414 21.626L10.4009 21.6098C10.3898 21.596 10.374 21.5764 10.3539 21.551C10.3136 21.5003 10.256 21.4269 10.1833 21.3324C10.0381 21.1434 9.8329 20.8697 9.58765 20.5245C9.09783 19.8351 8.44491 18.8559 7.79102 17.6934C6.50087 15.3998 5.13135 12.2622 5.13135 9.1875C5.13135 5.12429 8.52778 2 12.3188 2C16.108 2 19.1688 4.78502 19.1688 8.85008C19.1688 12.2407 18.0013 15.813 15.2727 19.1347L13.7273 17.8653C16.1737 14.887 17.1688 11.7595 17.1688 8.85008C17.1688 5.94014 15.0547 4 12.3188 4ZM11.8066 6.75456C13.5266 6.23856 14.8109 7.30111 15.1801 8.40869L15.1849 8.42306L15.1893 8.43757C15.4096 9.17187 15.4558 10.1091 15.1065 11.0018C14.7429 11.9308 13.9828 12.7253 12.7643 13.1554L12.7417 13.1633L12.7188 13.1702C11.9695 13.395 11.198 13.3839 10.5202 13.0567C9.83948 12.7281 9.36734 12.1352 9.12452 11.4161C8.77359 10.4358 9.02556 9.39217 9.50677 8.5901C9.99629 7.7742 10.8028 7.06337 11.7998 6.75661L11.8066 6.75456ZM12.3846 8.66922C11.9204 8.81314 11.4909 9.17042 11.2218 9.61905C10.9458 10.0791 10.9167 10.4922 11.0088 10.7456L11.0134 10.7583L11.0177 10.7712C11.1136 11.059 11.2587 11.1924 11.3897 11.2556C11.5247 11.3208 11.7589 11.3654 12.1219 11.2611C12.7995 11.0158 13.1028 10.6337 13.244 10.273C13.3986 9.87792 13.3911 9.41675 13.2787 9.02956C13.2377 8.91693 13.1407 8.78606 13.0005 8.70515C12.8794 8.63528 12.6876 8.57915 12.3846 8.66922Z"
                ></path>
              </svg>
              <input
                id="location"
                placeholder="Lugar o trabajo remoto"
                autoComplete="off"
                className="w-full h-full outline-none indent-1.5 placeholder:text-sm"
                onChange={(e) => dispatch(setLocation(e.target.value))}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-700/75 rounded-md transition-colors duration-300 ease-in-out hover:bg-blue-700 shadow-blue-700 text-white h-full w-2xs cursor-pointer"
            >
              <span className="inline-block capitalize font-light tracking-wider">buscar</span>
            </button>
          </div>
        )}
      </form>

  );
}
