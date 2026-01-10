import { useLocation, useNavigate } from "react-router-dom";

import InactiveRecord from "../../assets/icons/graynote.svg";
import ActiveRecord from "../../assets/icons/orangenote.svg";

import InactivePickCandy from "../../assets/icons/grayCandy.svg";
import ActivePickCandy from "../../assets/icons/orangeCandy.svg";

import InactivePen from "../../assets/icons/graypen.svg";
import ActivePen from "../../assets/icons/orangepen.svg";

const navItems = [
  {
    label: "기록하기",
    path: "/",
    activePaths: ["/"],
    exact: true,
    ActiveIcon: ActivePen,
    InactiveIcon: InactivePen,
  },
  {
    label: "행운 뽑기",
    path: "/pick",
    activePaths: ["/pick"],
    exact: false,
    ActiveIcon: ActivePickCandy,
    InactiveIcon: InactivePickCandy,
  },
  {
    label: "지난 일기",
    path: "/archive",
    activePaths: ["/archive"],
    exact: false,
    ActiveIcon: ActiveRecord,
    InactiveIcon: InactiveRecord,
  },
];

export default function FooterBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t bg-white">
      <ul className="flex h-[72px]">
        {navItems.map(
          ({ label, path, activePaths, exact, ActiveIcon, InactiveIcon }) => {
            const isActive = exact
              ? pathname === path
              : activePaths.some((p) => pathname.startsWith(p));

            const iconSrc = isActive ? ActiveIcon : InactiveIcon;

            return (
              <li key={path} className="flex-1">
                <button
                  type="button"
                  onClick={() => navigate(path)}
                  className={`flex h-full w-full flex-col items-center justify-center gap-1 text-xs transition
                  ${
                    isActive
                      ? "font-semibold text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  <img src={iconSrc} alt={label} className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              </li>
            );
          }
        )}
      </ul>
    </nav>
  );
}
