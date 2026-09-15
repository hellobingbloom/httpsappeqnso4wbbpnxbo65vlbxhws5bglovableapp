import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { trackEvent } from "@/lib/analytics";

const SITE = "https://nowanime.lovable.app";
const KEY = "bb-anime-moved-dialog";

/**
 * Shown once per session on the Anime page: anime now lives on our dedicated
 * site. Dismissing keeps the user on this page with all routes intact.
 */
const AnimeMovedDialog = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (!seen) {
      setOpen(true);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
    }
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            We built a dedicated anime site
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[12.5px] leading-relaxed">
            Our anime collection has moved to NowAnime — a curated site just for
            anime, with a bigger library, subs and dubs, and faster streams.
            You can keep browsing here, or open NowAnime now.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-[12.5px]">Not now</AlertDialogCancel>
          <AlertDialogAction
            className="text-[12.5px]"
            onClick={() => {
              trackEvent("external_app_notice_click", { destination: SITE, source: "anime-dialog" });
              window.open(SITE, "_blank", "noopener,noreferrer");
            }}
          >
            Open NowAnime <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AnimeMovedDialog;
