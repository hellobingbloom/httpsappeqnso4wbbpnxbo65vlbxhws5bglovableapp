import { Link, useLocation } from "react-router-dom";

const chips = [
  { to: "/home", label: "Trending" },
  { to: "/movies", label: "Movies" },
  { to: "/tv", label: "TV" },
  { to: "/anime", label: "Anime" },
  { to: "/animation", label: "Animation" },
  { to: "/documentary", label: "Docs" },
  { to: "/live-tv", label: "Live" },
  { to: "/genre/comedy", label: "Comedy" },
  { to: "/genre/action", label: "Action" },
  { to: "/genre/horror", label: "Horror" },
  { to: "/my-downloads", label: "Downloads" },
];

/** Horizontal scrollable chip bar — matches the reference mockups (image 7/13). */
const CategoryChips = () => {
  const { pathname } = useLocation();
  return (
    <div className="sticky top-12 md:top-[72px] z-30 bg-background/90 backdrop-blur-md border-b border-border/40">
      <div className="flex gap-2 overflow-x-auto px-4 md:px-10 lg:px-14 py-2.5 scrollbar-hide">
        {chips.map((c) => {
          const active = pathname === c.to;
          return (
            <Link
              key={c.to}
              to={c.to}
              className={`shrink-0 rounded-sm px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap transition ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-secondary/70 text-foreground/75 hover:border-primary"
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryChips;
