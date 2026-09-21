import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { TmdbItem, img } from "@/lib/tmdb";

interface TmdbCardProps {
  item: TmdbItem;
  type?: "movie" | "tv";
  width?: number;
  fill?: boolean;
  rank?: number;
}

/** NowAnime/MovieBox-style compact poster card. */
const TmdbCard = ({ item, type, width, fill, rank }: TmdbCardProps) => {
  const mediaType = type || item.media_type || (item.first_air_date ? "tv" : "movie");
  const to = `/${mediaType}/${item.id}`;
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const poster = img(item.poster_path, "w300") || "/placeholder.svg";

  const sizingClass = fill
    ? "w-full"
    : "w-[88px] sm:w-[120px] md:w-[148px] lg:w-[164px] xl:w-[176px]";
  const inlineStyle = !fill && width ? { width, minWidth: width } : undefined;

  return (
    <Link
      to={to}
      className={`group flex-shrink-0 snap-start ${sizingClass}`}
      style={inlineStyle}
    >
      <div className="aspect-[2/3] overflow-hidden relative bg-surface-2 ring-1 ring-border/60 transition duration-300 group-hover:-translate-y-1 group-hover:ring-primary/70">
        <img
          src={poster}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="rounded-full bg-primary p-3 text-primary-foreground shadow-xl">
            <Play className="w-3.5 h-3.5 fill-current" />
          </span>
        </div>
        {item.vote_average > 0 && (
          <div className="absolute top-1.5 left-1.5 bg-background/80 px-1.5 py-0.5 text-[9px] font-semibold text-foreground backdrop-blur-sm">
            {item.vote_average.toFixed(1)}
          </div>
        )}
        <div className="absolute top-1.5 right-1.5 bg-primary/90 px-1.5 py-0.5 text-[8px] font-bold uppercase text-primary-foreground">
          {mediaType === "tv" ? "TV" : "Movie"}
        </div>
        {rank !== undefined && (
          <div className="absolute bottom-0 left-0 flex h-20 w-full items-end bg-gradient-to-t from-background to-transparent">
            <span className="mb-1 ml-2 font-display text-4xl leading-none text-foreground">{String(rank).padStart(2, "0")}</span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-[11px] md:text-[13px] font-medium text-foreground line-clamp-1 group-hover:text-primary">{item.title}</p>
        {year && <p className="mt-0.5 text-[9px] md:text-[10px] uppercase text-muted-foreground">{year} · {mediaType === "tv" ? "Series" : "Film"}</p>}
      </div>
    </Link>
  );
};

export default TmdbCard;
