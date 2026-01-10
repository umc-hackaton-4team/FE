import { useLocation, useNavigate } from "react-router-dom";

import InactiveRecord from "../../assets/icons/graynote.svg";
//import ActiveRecord from "../../assets/icons/orangenote.svg";

import InactivePickBox from "../../assets/icons/graybox.svg";
import ActivePickBox from "../../assets/icons/orangebox.svg";


import InactivePen from "../../assets/icons/graypen.svg";
import ActivePen from "../../assets/icons/orangepen.svg";

const navItems = [
  {
    label: "기록하기",
    path: "/",
    activePaths: ["/"],
    ActiveIcon: ActivePen,
    InactiveIcon:InactivePen,

  },
  {
    label: "할 일 뽑기",
    path: "/pick",
    activePaths: ["/pick"],
    ActiveIcon: ActivePickBox,
    InactiveIcon: InactivePickBox,
  },
  {
    label: "지난 일기",
    path: "/archive",
    activePaths: ["/archive"],
    //ActiveIcon: ActiveRecord,
    InactiveIcon: InactiveRecord,
  },
];

export default function FooterBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t bg-white">
      <ul className="flex h-16">
        {navItems.map(({ label, path, activePaths, ActiveIcon, InactiveIcon }) => {
           const isActive = activePaths.some((activePath) =>
          location.pathname.startsWith(activePath)
        );

          const iconSrc = isActive ? ActiveIcon : InactiveIcon;

          return (
            <li key={path} className="flex-1">
              <button
                type="button"
                onClick={() => navigate(path)}
                className={`flex h-full w-full flex-col items-center justify-center gap-1 text-xs transition
                ${
                  isActive
                    ? "text-red-500 font-semibold"
                    : "text-gray-400"
                }`}
              >
                <img src={iconSrc} alt={label} className="h-5 w-5" />
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
