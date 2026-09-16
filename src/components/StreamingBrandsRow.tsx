import { Link } from "react-router-dom";
import netflix from "@/assets/brands/netflix.png.asset.json";
import prime from "@/assets/brands/prime.png.asset.json";
import tubi from "@/assets/brands/tubi.png.asset.json";
import disney from "@/assets/brands/disney.png.asset.json";
import dreamworks from "@/assets/brands/dreamworks.png.asset.json";
import imax from "@/assets/brands/imax.png.asset.json";

/**
 * TMDB filters behind each card. Streaming services use watch-provider ids;
 * studios (DreamWorks, IMAX) have no provider so they filter by company id.
 */
const BRANDS = [
  { slug: "netflix",    label: "Netflix",     img: netflix.url, providerId: 8,   companyId: 0 },
  { slug: "prime",      label: "Prime Video", img: prime.url, providerId: 9,   companyId: 0 },
  { slug: "tubi",       label: "Tubi",        img: tubi.url, providerId: 73,  companyId: 0 },
  { slug: "disney",     label: "Disney+",     img: disney.url, providerId: 337, companyId: 0 },
  { slug: "dreamworks", label: "DreamWorks",  img: dreamworks.url, providerId: 0,   companyId: 521 },
  { slug: "imax",       label: "IMAX",        img: imax.url, providerId: 0,   companyId: 41077 },
];

/**
 * Streaming Universe rail. Tapping a card routes to the explore/search screen
 * filtered to that service's catalogue.
 */
const StreamingBrandsRow = () => (
  <section className="px-4 md:px-10 lg:px-14 py-4 md:py-6">
    <div className="flex items-baseline justify-between mb-3">
      <h2 className="font-display text-2xl md:text-3xl text-foreground">Channels & Apps</h2>
      <span className="text-[10px] uppercase text-muted-foreground">Browse by service</span>
    </div>
    <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      {BRANDS.map((b) => (
        <Link
          key={b.slug}
          to={`/search?provider=${b.slug}`}
          className="group grid h-[72px] w-[128px] flex-shrink-0 place-items-center overflow-hidden rounded-sm border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary md:h-[92px] md:w-[172px]"
          aria-label={`${b.label} titles`}
        >
          <img
            src={b.img}
            alt={b.label}
            loading="lazy"
            className="max-w-[86%] max-h-[70%] object-contain drop-shadow-md"
          />
        </Link>
      ))}
    </div>
  </section>
);

export default StreamingBrandsRow;

// Exposed for other pages (search, etc.) that need to translate a slug into a
// TMDB filter.
export const BRAND_PROVIDER_MAP: Record<
  string,
  { label: string; providerId: number; companyId: number }
> = Object.fromEntries(
  BRANDS.map((b) => [b.slug, { label: b.label, providerId: b.providerId, companyId: b.companyId }]),
);
