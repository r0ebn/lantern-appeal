/**
 * The Lantern Appeal — the brand, written once.
 *
 * One theme drives all four roots (Email, Page, Document, Canvas): the same
 * deep teal / warm amber / cream palette, the same serif + sans pairing, the
 * same named styles. Inside the theme, tokens are written "{colors.amber}";
 * in templates they are read with token("colors.amber").
 */
import { defineTheme } from "@hyper-elements/react";

export const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
export const SANS = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

/** The palette as plain constants, for Svg shapes (which take literal colours). */
export const PALETTE = {
  cream: "#FAF4E8",
  parchment: "#F3EAD7",
  teal: "#0B3B3B",
  tealDeep: "#072727",
  tealSoft: "#14524F",
  tealMist: "#DCE8E3",
  ink: "#1F2A26",
  inkSoft: "#43534D",
  muted: "#6E7B74",
  border: "#E2D8C2",
  amber: "#D99A2B",
  amberDeep: "#A86F12",
  amberBright: "#F0B94A",
  goldPale: "#F7D774",
  onDark: "#FAF4E8",
  onDarkMuted: "#C9D6CE",
  onDarkFaint: "#8FA89E",
} as const;

/**
 * The web fonts, as the roots' `fonts` prop. The woff2 files live on
 * fonts.gstatic.com (the URLs the Google Fonts CSS API returns for the latin
 * subset); every stack falls back to Georgia / Helvetica where a client
 * doesn't load web fonts. The same families are given as WOFF files to
 * renderPdf / renderImage (see src/fonts.ts) — those engines never fetch.
 */
export const WEB_FONTS = [
  {
    family: "Playfair Display",
    src: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2",
    format: "woff2",
    weight: "400 900",
  },
  {
    family: "Playfair Display",
    src: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFkD-vYSZviVYUb_rj3ij__anPXDTnogkk7.woff2",
    format: "woff2",
    weight: "400 900",
    style: "italic",
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2",
    format: "woff2",
    weight: "100 900",
  },
] as const;

export const lanternAppeal = defineTheme({
  colors: {
    background: PALETTE.cream,
    foreground: PALETTE.ink,
    primary: PALETTE.teal,
    primaryForeground: PALETTE.onDark,
    muted: PALETTE.muted,
    border: PALETTE.border,
    teal: PALETTE.teal,
    tealDeep: PALETTE.tealDeep,
    tealSoft: PALETTE.tealSoft,
    tealMist: PALETTE.tealMist,
    amber: PALETTE.amber,
    amberDeep: PALETTE.amberDeep,
    amberBright: PALETTE.amberBright,
    cream: PALETTE.cream,
    parchment: PALETTE.parchment,
    inkSoft: PALETTE.inkSoft,
    onDark: PALETTE.onDark,
    onDarkMuted: PALETTE.onDarkMuted,
  },
  fonts: {
    body: SANS,
    heading: SERIF,
  },
  fontSizes: {
    body: 16,
    small: 13,
    eyebrow: 12,
  },
  lineHeights: {
    body: 1.6,
  },
  elements: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 44, fontWeight: 600, lineHeight: 1.05, letterSpacing: -0.5, mobile: { fontSize: 34 } },
          2: { fontSize: 32, fontWeight: 600, lineHeight: 1.12, letterSpacing: -0.5, mobile: { fontSize: 26 } },
          3: { fontSize: 22, fontWeight: 600, lineHeight: 1.2 },
        },
      },
    },
    Button: {
      backgroundColor: "{colors.amber}",
      color: "{colors.tealDeep}",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: 1.4,
      textTransform: "uppercase",
      padding: [16, 28],
      borderRadius: 2,
      hover: { backgroundColor: PALETTE.amberBright },
    },
  },
  styles: {
    /** Small caps label above a heading. */
    eyebrow: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 2.4,
      textTransform: "uppercase",
      color: "{colors.amberDeep}",
    },
    /** The same, on a dark band. */
    eyebrowLight: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 2.4,
      textTransform: "uppercase",
      color: "{colors.amberBright}",
    },
    /** A parchment panel (gift card, receipt box). */
    card: {
      backgroundColor: "{colors.parchment}",
      padding: 28,
      gap: 12,
      borderRadius: 4,
    },
    /** A white panel on the cream page. */
    panel: {
      backgroundColor: "#FFFFFF",
      padding: 28,
      gap: 12,
      borderRadius: 4,
      border: { width: 1, style: "solid", color: "{colors.border}" },
    },
    /** One line of the gift breakdown: item, detail, amount. */
    giftRow: {
      gap: 16,
      padding: [14, 0],
      border: { top: { width: 1, style: "solid", color: "{colors.border}" } },
    },
    /** A gift amount, set in the serif. */
    amount: {
      fontFamily: SERIF,
      fontSize: 21,
      fontWeight: 700,
      lineHeight: 1.2,
      textAlign: "right",
    },
    /** Small muted supporting text. */
    smallMuted: {
      fontSize: 13,
      lineHeight: 1.6,
      color: "{colors.muted}",
    },
    /** A stat's big number, set in the serif. */
    statValue: {
      fontFamily: SERIF,
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.1,
    },
    /** A stat's label. */
    statLabel: {
      fontSize: 13,
      lineHeight: 1.45,
      color: "{colors.muted}",
    },
  },
  formats: {
    email: {
      elements: {
        Heading: {
          by: {
            level: {
              1: { fontSize: 40, mobile: { fontSize: 32 } },
              2: { fontSize: 28, mobile: { fontSize: 24 } },
            },
          },
        },
      },
    },
  },
});

/** Types every token() path and style.apply name in this project. */
declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof lanternAppeal;
  }
}
