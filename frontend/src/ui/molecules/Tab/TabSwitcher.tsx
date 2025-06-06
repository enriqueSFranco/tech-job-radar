import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

type TabOptions = {
  id: string,
    label: string,
    icon: React.ReactNode,
    path: string,
}

type TabTabSwitcherProps = {
  tabs: TabOptions[]
  defaultActiveTabId?: string
  onTabChange?: (id: string) => void;
}

export function TabSwitcher({tabs, defaultActiveTabId, onTabChange}: TabTabSwitcherProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTabId || tabs.length > 0 ? tabs[0].id : "");
  const [indicatorStyles, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    if (activeElement) {
      const { offsetWidth, offsetLeft } = activeElement;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  useEffect(() => {
    if (defaultActiveTabId) {
      setActiveTab(defaultActiveTabId);
    }
  }, [defaultActiveTabId]);

  const handleTabClick = (id: string) => {
    onTabChange?.(id);
  };

  return (
    <div className="grid place-content-center w-full mt-10">
      <nav className="w-full m-auto">
        <ul className="flex items-center justify-between gap-4 relative">
          {tabs.map(({ id, label, icon, path }) => {
            const isActive = activeTab === id;
            const colorClass = isActive ? "text-white" : "text-gray-400";
            return (
              <li
                key={`optionId-${id}`}
                ref={(el) => (tabRefs.current[id] = el)}
                className="inline-block relative px-4 py-2"
              >
                {path ? (
                  <Link
                    to={path}
                    className={`text-base flex items-center justify-between gap-1 ${colorClass}`}
                    onClick={() => {setActiveTab(id); handleTabClick(id)}}
                  >
                    {icon && icon}
                    {label}
                  </Link>
                ) : (
                  <button
                    className={`text-base flex items-center gap-1 ${colorClass}`}
                    onClick={() => handleTabClick(id)}
                  >
                    {icon}
                    {label}
                  </button>
                )}
              </li>
            );
          })}
          <span
            className="absolute bottom-0 h-[2px] bg-blue-700 rounded-full transition-all duration-300"
            style={{ left: indicatorStyles.left, width: indicatorStyles.width }}
          ></span>
        </ul>
      </nav>
    </div>
  );
}
