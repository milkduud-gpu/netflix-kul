# Style Guide — Netflix-style Streaming App

- **Vibe:** cinematic and immersive, like the real Netflix. Dark, content-first, poster art does the talking. Not a generic dashboard.
- **Layout:** full-bleed hero banner at the top of Home (featured title, short description, Play + More Info buttons), followed by horizontally scrolling poster rows by genre ("Trending Now", "Action", "Comedy", "Continue Watching"). Design for desktop and mobile; rows become swipeable on touch.
- **Colors:** near-black background (`#141414`), white primary text (`#FFFFFF`), muted gray secondary text (`#B3B3B3`), ONE accent: Netflix red (`#E50914`) used for the logo, Play/primary buttons and highlights. Surfaces/cards use `#181818` to `#2F2F2F`. Error messages use a lighter orange-red (`#E87C03` or `#FF6B6B`) so they don't blend with the brand red.
- **Type:** bold, clean sans-serif (Netflix Sans look-alike: "Helvetica Neue", Arial, or Inter). Large bold titles over the hero; small, light gray metadata (year, rating, genre).
- **Posters & cards:** 16:9 or 2:3 thumbnails with rounded corners (4px). On hover, a card scales up (~1.3x) with a quick transition, revealing title, genre tags and a Play button. Rows have subtle left/right arrows on hover.
- **Buttons:** Play = white background, black text; More Info = translucent gray (`rgba(109,109,110,0.7)`), white text. Red is reserved for sign-in/sign-up and key actions. Touch targets at least 44px tall.
- **Navigation:** fixed top navbar with the red logo on the left, links (Home · History · Genres), a search icon/input on the right, and a profile avatar. Navbar is transparent over the hero and turns solid black on scroll. On mobile, collapse to a bottom tab bar or hamburger.
- **Search:** expands from the search icon; results appear instantly as a poster grid, filterable by title or genre.
- **Motion:** smooth and quick (150–300ms). Card hover zoom, navbar fade on scroll, fade-in for hero. Respect `prefers-reduced-motion`.
- **Empty states:** dark, centered, friendly message ("You haven't watched anything yet") with a red/white button to browse.
- **Accessibility:** visible keyboard focus ring (white outline), alt text on all posters, labeled inputs, contrast AA or better on text over images (use a dark gradient overlay on the hero).
