import {
  House,
  Heart,
  CalendarDays,
  BookHeart,
  Gift,
  MessageCircleHeart,
} from "lucide-react";

import "../styles/BottomNav.css";

function BottomNav() {
  const menuItems = [
    {
      label: "Home",
      icon: House,
      target: "opening",
    },
    {
      label: "Mempelai",
      icon: Heart,
      target: "mempelai",
    },
    {
      label: "Acara",
      icon: CalendarDays,
      target: "acara",
    },
    {
      label: "Story",
      icon: BookHeart,
      target: "love-story",
    },
    {
      label: "Gift",
      icon: Gift,
      target: "wedding-gift",
    },
    {
      label: "Ucapan",
      icon: MessageCircleHeart,
      target: "ucapan",
    },
  ];

  const handleClick = (target) => {
    const element = document.getElementById(target);

    if (!element) {
      console.error(
        `Element dengan id="${target}" tidak ditemukan`
      );
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.target}
              type="button"
              className="bottom-nav-item"
              onClick={() => handleClick(item.target)}
            >
              <span className="bottom-nav-icon">
                <Icon
                  size={19}
                  strokeWidth={1.7}
                />
              </span>

              <span className="bottom-nav-label">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;