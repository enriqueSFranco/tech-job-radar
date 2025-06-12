import { useLocation, useNavigate } from "react-router";

type TabOption = {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
};
type TabOptions = TabOption[];

const LOCATION_DEFAULT = "Ciudad de Mexico"

export function useCurrentTab(tabOptions: TabOptions) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const currentTab = tabOptions.find((tab) =>
    location.pathname.startsWith(tab.path)
  )?.id;

  function selectTab() {
    const tabOption = tabOptions.find((tab) => pathname.startsWith(tab.path));
    if (!tabOption) return;
    // searchParams
    const currentParams = new URLSearchParams(location.search);
    const keyword = currentParams.get("keyword") ?? "";
    const locationParam = currentParams.get("location") ?? LOCATION_DEFAULT;
    navigate(`${tabOption.path}?keyword=${keyword}&location=${locationParam}`);
  }

  return { currentTab, selectTab };
}
