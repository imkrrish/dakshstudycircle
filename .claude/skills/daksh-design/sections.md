# Section design patterns

## All sections

- Container and spacing from SKILL.md. Consecutive split sections alternate image sides.
- Mobile: everything stacks into one column; text comes before images.

## hero

- Full-bleed (no container box), large = min-height about 92svh, content vertically centered. Its soft mesh wash
  (flame, saffron, a hint of navy at the sides, fading to the page background) starts at the top of the page,
  behind the transparent navbar; every hero adds the navbar height to its own top padding. Compact has a very faint wash.
- Order: filled ornament, muted eyebrow between hairlines, h1, description (max-w-xl), one primary button +
  optional outline button (stacked full width on mobile), proof line.
- h1 is an array of 1-2 lines: each line is a block from sm up, text flows balanced on mobile.
  `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`.
- Tiles sit beside the narrow rows (eyebrow, description, buttons), never beside the headline and never over text:
  lg 3 per side, md 2 per side, mobile one row of 3 below the proof line.
- The headline is never animated in. Only decoration (tiles, ornament) animates; static under reduced motion.

## split

- Two columns from md up; `imagePosition` decides the side on desktop only.
- Image with preset radius; text block vertically centered.

## card-grid

- 1 column on mobile, 2 on md, 3 on lg. Cards follow the card style in SKILL.md.
- Small icon or subject mark top-left.

## cta-band

- dark: ink → navy gradient, white h2, white button, no decoration.
- light: card background with border, primary button.
