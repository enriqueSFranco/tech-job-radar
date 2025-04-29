import { Suspense, useState } from "react";
import { IcRadar } from "../shared/icons";
import { IcMenu } from "../shared/icons/system/IcMenu";

interface Props {
  showButtonMenu: boolean
}

export function Header({showButtonMenu}: Props) {
  const [toggle, updateToggle] = useState(true)

  function handleToggleMenu() {
    updateToggle(prevState => !prevState)
    console.log('open menu ', toggle)
  }

  return (
    <header className="flex items-center justify-between gap-2 w-full h-16 bg-gray-500/20 backdrop-blur-2xl">
      <div className="flex items-center gap-2">
        <IcRadar />
        <h1 className="text-xl text-gray-300 font-bold capitalize tracking-wide">
          tech job radar
        </h1>
      </div>
      {
        showButtonMenu && (
          <Suspense fallback={<div>loading...</div>}>
            <button onClick={handleToggleMenu}><IcMenu /></button>
          </Suspense>
        )
      }
    </header>
  );
}
