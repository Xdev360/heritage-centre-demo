# Heritage Centre Lounge Section - Asset Placeholders

## Missing Image Assets

Due to this being a demo project, the following image assets are referenced but not included. You can replace these with your own images:

### Lounge Hero & Backgrounds
- `assets/lounge-ambient.mp4` - Background video for lounge hero section
- `assets/vip-lounge.mp4` - Background video for VIP page hero

### Menu Items
- `assets/menu/bruschetta.jpg`
- `assets/menu/oysters.jpg`
- `assets/menu/bisque.jpg`
- `assets/menu/carpaccio.jpg`
- `assets/menu/seabass.jpg`
- `assets/menu/wagyu.jpg`
- `assets/menu/lobster.jpg`
- `assets/menu/duck.jpg`
- `assets/menu/risotto.jpg`
- `assets/menu/champagne.jpg`
- `assets/menu/oldfashioned.jpg`
- `assets/menu/espressomartini.jpg`
- `assets/menu/signature.jpg`
- `assets/menu/whisky.jpg`
- `assets/menu/fondant.jpg`
- `assets/menu/cremebrulee.jpg`
- `assets/menu/tiramisu.jpg`
- `assets/menu/jollof.jpg`
- `assets/menu/suya.jpg`
- `assets/menu/peppersoup.jpg`

### Events
- `assets/events/jazz.jpg`
- `assets/events/wine.jpg`
- `assets/events/gala.jpg`
- `assets/events/djnight.jpg`
- `assets/events/cocktails.jpg`

### Past Events Gallery
- `assets/gallery/past-jazz.jpg`
- `assets/gallery/past-wine.jpg`
- `assets/gallery/past-gala.jpg`
- `assets/gallery/past-dj.jpg`

### VIP Gallery
- `assets/vip/vip-seating.jpg`
- `assets/vip/vip-service.jpg`
- `assets/vip/vip-drinks.jpg`
- `assets/vip/vip-food.jpg`
- `assets/vip/vip-ambiance.jpg`

### Fallback Placeholders
- `assets/placeholder-food.jpg` - Generic food placeholder
- `assets/placeholder-event.jpg` - Generic event placeholder
- `assets/placeholder-vip.jpg` - Generic VIP placeholder

## Quick Setup

To quickly test without images, you can:

1. Use the `onerror` handlers already in place - images will gracefully fall back to placeholders
2. Replace placeholder paths in `js/lounge.js` with free stock image URLs (e.g., Unsplash)
3. Use solid color divs temporarily (add `background: linear-gradient(135deg, #D4AF37, #1A1A1A);` to `.lounge-menu-card-image img`)

## Recommended Image Dimensions

- Menu items: 800x600px (4:3 ratio)
- Events: 1200x800px (3:2 ratio)
- VIP gallery: 1200x900px (4:3 ratio)
- Hero videos: 1920x1080px (16:9 ratio)

All images should be optimized for web (compressed, WebP format recommended).
