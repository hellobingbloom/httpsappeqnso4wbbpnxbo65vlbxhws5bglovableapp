import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TmdbItem } from "@/lib/tmdb";
import TmdbCard from "./TmdbCard";

interface TmdbRowProps {
  title: string;
  items?: TmdbItem[];
  isLoading?: boolean;
  type?: "movie" | "tv";
  viewAll?: string;
  ranked?: boolean;
}

const TmdbRow = ({ title, items, isLoading, type, viewAll, ranked }: TmdbRowProps) => {
  if (!isLoading && (!items || items.length === 0)) return null;

  return (
    <section className="mb-7 md:mb-11">
      <div className="flex items-end justify-between px-4 md:px-10 lg:px-14 mb-3 md:mb-4">
        <h2 className="font-display text-2xl md:text-3xl text-foreground">{title}</h2>
        {viewAll && (
          <Link to={viewAll} className="flex items-center gap-0.5 text-[10px] md:text-xs uppercase text-muted-foreground font-semibold hover:text-primary">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>
      <div className="flex gap-2.5 md:gap-4 px-4 md:px-10 lg:px-14 overflow-x-auto scrollbar-hide pb-3 snap-x snap-mandatory">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[104px] sm:w-[128px] md:w-[154px] lg:w-[168px] aspect-[2/3] bg-card animate-pulse" />
            ))
          : items!.slice(0, 20).map((item, idx) => (
              <TmdbCard
                key={`${item.id}-${item.media_type ?? type}`}
                item={item}
                type={type}
                rank={ranked ? idx + 1 : undefined}
              />
            ))}
      </div>
    </section>
  );
};

export default TmdbRow;
