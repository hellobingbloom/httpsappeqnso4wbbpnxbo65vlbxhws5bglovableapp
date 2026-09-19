# Player, Analytics, and Detail-Page Ads

## Scope

- Remove the standalone native ad directly below the movie title on the movie watch page.
- Initialize Google Analytics from `VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID`, with the existing measurement ID as a safe fallback, and retain single SPA page-view tracking plus existing custom events.
- Add the responsive 468×60 banner to TV details; anime detail routes inherit it because they resolve to the TV details experience.
- Move the TV native placement above the episode cards and keep it as four compact inline ads across, including mobile.
- Verify types and test the movie, TV, and anime routes in the preview.

## Technical details

- Reuse `Banner468Ad`, `InlineAdRow`, `RouteAnalytics`, and the shared analytics helper.
- Keep ad scripts isolated in their existing iframes.
- Do not add a backend dependency.
