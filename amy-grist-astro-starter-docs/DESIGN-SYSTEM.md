# Design System Baseline

This is a migration baseline extracted from the current Salient configuration. It should reproduce the existing site first; refinement can follow after the replica is stable.

## Core colours

```css
:root {
  --color-page-bg: #f5f5f5;
  --color-text-brand: #bc5f6a;

  --color-accent: #19b3b1;
  --color-soft-rose: #e3a6a1;
  --color-rose: #bc5f6a;
  --color-deep-teal: #034b61;

  --color-white: #ffffff;
  --color-black: #000000;
}
```

Salient source:
- overall background `#f5f5f5`
- overall font colour `#bc5f6a`
- accent `#19b3b1`
- extra colour 1 `#e3a6a1`
- extra colour 2 `#bc5f6a`
- extra colour 3 `#034b61`

## Typography

Current theme configuration:
- Body: **Poppins**, weight 300, 16px
- Headings H1–H5: **Ovo**, weight 400
- Logo/type treatment: **Ovo**, 30px
- Primary navigation: **Josefin Sans**, 400, uppercase, 15px
- Dropdown navigation: **Josefin Sans**, 400, 14px, capitalized
- Mobile/off-canvas navigation: **Josefin Sans**, 400, 22px
- Testimonial typography: **Poppins**, weight 300, 20px

Current heading base sizes:
- H1 55px
- H2 40px
- H3 30px
- H4 25px
- H5 20px

Responsive percentage settings in Salient are preserved as reference rather than copied blindly. Implement fluid/responsive typography deliberately and compare against the existing site at 375 / 768 / 1440px.

### Font-delivery decision

The current WordPress theme marks these as Google Fonts. The Astro build should avoid runtime Google Fonts by default. Self-host only if licensed font files are available; otherwise record the chosen delivery method before implementation.

## Content/container

Current Salient configuration:
- maximum container width: **1425px**
- extended responsive desktop padding: **90px**
- mobile padding: **6%** (with 20px setting also present)

Treat these as visual-reference values. Establish a small set of content widths rather than letting every section invent its own width.

Suggested tokens:

```css
:root {
  --container-max: 1425px;
  --page-pad-desktop: 90px;
  --page-pad-mobile: 6%;
  --content-reading: 800px;
}
```

## Buttons

Current Salient default:
- style: `slightly_rounded_shadow`
- roundness: 4px

Start with:

```css
:root {
  --button-radius: 4px;
}
```

Build explicit Button variants instead of copying Nectar button attributes into pages.

## Header

Current Salient behaviour:
- centred-menu format
- custom header background `#e3a6a1`
- header text `#ffffff`
- hover `#bc5f6a`
- dropdown background `#e3a6a1`
- dropdown hover background `#bc5f6a`
- dropdown text/hover text `#ffffff`
- transparent header enabled
- transparent starting text `#ffffff`
- transparent starting opacity `0.75`
- resize on scroll enabled
- large box shadow
- menu item spacing 10
- desktop logo height 90
- mobile logo height 70
- mobile menu breakpoint 1000px
- mobile fixed header enabled
- menu hover effect: animated underline
- mega-menu width: contained
- search disabled
- Instagram enabled in header

Logo assets:
- standard dark logo: media ID 543
- retina dark logo: ID 544
- transparent/white logo: ID 547
- retina white logo: ID 548

Do not encode all of these as independent arbitrary CSS values. Model the header as a few explicit states:
1. normal solid
2. transparent over hero
3. scrolled/resized
4. mobile

## Footer

The normal Salient footer areas are disabled. The visible site footer is global section **1225**, inserted above the footer location. Rebuild that section as `Footer.astro`, not as a WordPress-theme-footer clone.

The global section contains:
- central logo
- Instagram icon/link
- short practitioner bio
- service descriptor line
- deep-teal copyright strip
- Typeface credit
- Pay Me link

The section itself contains the authoritative visible footer styling/content.

## Homepage / section colours

Existing WPBakery content repeatedly uses the core palette for full-width bands:
- rose `#bc5f6a`
- soft rose `#e3a6a1`
- deep teal `#034b61`

Use named section variants such as `rose`, `soft-rose`, `deep-teal`, `default` rather than embedding hex codes throughout route files.

## Blog

Current Salient settings include:
- featured image inherited into single-post header
- minimal/default blog header
- white default-minimal header text
- dark overlay reference `#2d2d2d`

Reproduce the actual current blog visually before treating every stored theme option as required behaviour.

## Initial CSS token draft

```css
:root {
  --c-bg: #f5f5f5;
  --c-accent: #19b3b1;
  --c-soft-rose: #e3a6a1;
  --c-rose: #bc5f6a;
  --c-deep-teal: #034b61;
  --c-white: #fff;
  --c-black: #000;

  --ff-body: "Poppins", sans-serif;
  --ff-heading: "Ovo", serif;
  --ff-nav: "Josefin Sans", sans-serif;

  --container-max: 1425px;
  --page-pad-wide: 90px;
  --page-pad-mobile: 6%;
  --button-radius: 4px;
}
```

These are migration tokens, not a final redesign specification.
