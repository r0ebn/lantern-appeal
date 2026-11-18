/**
 * Shared blocks, reused across the four roots.
 *
 * Wordmark, ImpactStats, GiftBreakdown, GalaDetails and the rest are plain
 * components that render Hyper Elements, so the email, the page, the receipt
 * document and the canvas all stay on-brand from the same code. The drawn
 * motifs (LanternMark, StarField, Flourish) are Svg, which Email doesn't
 * support — they are used by the Page, Document and Canvas only; the email
 * gets the same rhythm from Dividers and colour bands instead.
 */
import {
  Button,
  Circle,
  Column,
  Ellipse,
  Line,
  LineBreak,
  Link,
  Path,
  Polygon,
  Rect,
  Row,
  Svg,
  Text,
  Grid,
  token,
} from "@hyper-elements/react";
import { charity, donor, gala, giftBreakdown, giftTotalCents, impactStats, thankYouQuote, tiers, usd } from "./data.js";
import { PALETTE, SANS, SERIF } from "./theme.js";

/* ------------------------------------------------------------------ */
/* Wordmark                                                            */
/* ------------------------------------------------------------------ */

/** The charity's name, set in the serif with wide tracking. */
export function Wordmark({ light = false, size = 20 }: { light?: boolean; size?: number }) {
  const color = light ? token("colors.onDark") : token("colors.foreground");
  const sub = light ? token("colors.onDarkMuted") : token("colors.muted");
  return (
    <Column style={{ gap: 2 }}>
      <Text
        style={{
          fontFamily: SERIF,
          fontSize: size,
          fontWeight: 700,
          letterSpacing: 3.5,
          textTransform: "uppercase",
          lineHeight: 1.1,
          color,
        }}
      >
        Brightpath
      </Text>
      <Text style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3.2, textTransform: "uppercase", color: sub }}>
        Literacy Fund · Est. 2014
      </Text>
    </Column>
  );
}

/* ------------------------------------------------------------------ */
/* Drawn motifs (Svg — Page, Document and Canvas only)                 */
/* ------------------------------------------------------------------ */

/** A four-pointed star (a diamond with concave edges, approximated by a polygon). */
function Star({ x, y, size, fill, opacity = 1 }: { x: number; y: number; size: number; fill: string; opacity?: number }) {
  const s = size / 2;
  const k = size * 0.16;
  return (
    <Polygon
      points={`${x},${y - s} ${x + k},${y - k} ${x + s},${y} ${x + k},${y + k} ${x},${y + s} ${x - k},${y + k} ${x - s},${y} ${x - k},${y - k}`}
      style={{ fill, opacity }}
    />
  );
}

/**
 * The lantern: a hanging paper lantern with a warm flame inside, drawn in
 * Svg shapes. The glow behind it is a soft amber circle; the flame is two
 * nested paths. `height` scales the whole lantern (width is 5/7 of height).
 */
export function LanternMark({
  height = 168,
  glow = true,
  frame = PALETTE.amber,
  glass = PALETTE.goldPale,
}: {
  height?: number;
  glow?: boolean;
  frame?: string;
  glass?: string;
}) {
  const width = Math.round((height * 120) / 168);
  return (
    <Svg width={width} height={height} viewBox="0 0 120 168" title="A lit lantern">
      {glow && <Circle cx={60} cy={84} r={54} style={{ fill: PALETTE.amber, opacity: 0.14 }} />}
      {/* hanger */}
      <Circle cx={60} cy={8} r={5} style={{ fill: "transparent", stroke: frame, strokeWidth: 3 }} />
      <Line x1={60} y1={13} x2={60} y2={22} style={{ stroke: frame, strokeWidth: 3 }} />
      {/* cap and base */}
      <Rect x={44} y={22} width={32} height={10} rx={3} style={{ fill: PALETTE.amberDeep }} />
      <Rect x={38} y={132} width={44} height={10} rx={3} style={{ fill: PALETTE.amberDeep }} />
      <Rect x={44} y={142} width={6} height={7} style={{ fill: PALETTE.amberDeep }} />
      <Rect x={70} y={142} width={6} height={7} style={{ fill: PALETTE.amberDeep }} />
      {/* body: frame, glass, ribs */}
      <Rect x={32} y={32} width={56} height={100} rx={10} style={{ fill: glass, opacity: 0.3, stroke: frame, strokeWidth: 3 }} />
      <Rect x={39} y={39} width={42} height={86} rx={6} style={{ fill: glass, opacity: 0.55 }} />
      <Line x1={52} y1={39} x2={52} y2={125} style={{ stroke: frame, strokeWidth: 2, opacity: 0.55 }} />
      <Line x1={68} y1={39} x2={68} y2={125} style={{ stroke: frame, strokeWidth: 2, opacity: 0.55 }} />
      {/* flame: outer tongue and inner heart */}
      <Path
        d="M60 58 C63 66 70 69 70 77 A10 10 0 1 1 50 77 C50 72 52 68 54 63 C55 67 56 68 57 68 C56 64 58 60 60 58 Z"
        style={{ fill: "#E07B24" }}
      />
      <Path
        d="M60 71 C62 74 64 75 64 78 A4 4 0 1 1 56 78 C56 75 58 74 60 71 Z"
        style={{ fill: "#FBE8B0" }}
      />
      {/* wick and base of the flame */}
      <Line x1={60} y1={86} x2={60} y2={92} style={{ stroke: PALETTE.amberDeep, strokeWidth: 2 }} />
      <Ellipse cx={60} cy={96} rx={10} ry={2.5} style={{ fill: PALETTE.amberDeep, opacity: 0.7 }} />
      {/* sparks */}
      <Star x={18} y={30} size={10} fill={frame} opacity={0.9} />
      <Star x={104} y={48} size={8} fill={frame} opacity={0.8} />
      <Star x={100} y={120} size={7} fill={frame} opacity={0.7} />
      <Star x={16} y={104} size={6} fill={frame} opacity={0.7} />
    </Svg>
  );
}

/**
 * A field of small stars for a dark hero band. Star positions are fractions
 * of the given width/height, so every shape stays inside the viewBox —
 * shapes drawn outside it (with opacity) crash resvg when the Canvas is
 * rasterised to PNG.
 */
export function StarField({ width = 960, height = 120, color = PALETTE.amberBright, hidden }: { width?: number; height?: number; color?: string; hidden?: { mobile?: boolean } }) {
  const stars: Array<[number, number, number, number]> = [
    // [x fraction, y fraction, size, opacity]
    [0.04, 0.25, 12, 0.9],
    [0.16, 0.68, 8, 0.7],
    [0.3, 0.2, 10, 0.8],
    [0.45, 0.78, 7, 0.6],
    [0.58, 0.3, 12, 0.9],
    [0.73, 0.7, 8, 0.7],
    [0.86, 0.24, 10, 0.8],
    [0.96, 0.62, 7, 0.6],
  ];
  const dots: Array<[number, number, number, number]> = [
    [0.1, 0.5, 2, 0.7],
    [0.37, 0.55, 2.5, 0.6],
    [0.64, 0.85, 2, 0.7],
    [0.8, 0.5, 2.5, 0.6],
  ];
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} title="" hidden={hidden}>
      {stars.map(([fx, fy, size, opacity], i) => (
        <Star key={`s${i}`} x={Math.round(fx * width)} y={Math.round(fy * height)} size={size} fill={color} opacity={opacity} />
      ))}
      {dots.map(([fx, fy, r, opacity], i) => (
        <Circle key={`d${i}`} cx={Math.round(fx * width)} cy={Math.round(fy * height)} r={r} style={{ fill: color, opacity }} />
      ))}
    </Svg>
  );
}

/** A divider ornament: rule — diamond — rule. */
export function Flourish({ width = 120, color = PALETTE.amber }: { width?: number; color?: string }) {
  return (
    <Svg width={width} height={12} viewBox="0 0 120 12" title="">
      <Line x1={0} y1={6} x2={48} y2={6} style={{ stroke: PALETTE.border, strokeWidth: 1 }} />
      <Polygon points="60,1 65,6 60,11 55,6" style={{ fill: color }} />
      <Line x1={72} y1={6} x2={120} y2={6} style={{ stroke: PALETTE.border, strokeWidth: 1 }} />
    </Svg>
  );
}

/* ------------------------------------------------------------------ */
/* Impact stats                                                        */
/* ------------------------------------------------------------------ */

/** The fund's impact stats, as a grid of big serif numbers + labels. */
export function ImpactStats({ columns = 4, light = false }: { columns?: number; light?: boolean }) {
  const valueColor = light ? token("colors.onDark") : token("colors.teal");
  const labelColor = light ? token("colors.onDarkMuted") : token("colors.muted");
  return (
    <Grid columns={columns} style={{ gap: 24 }}>
      {impactStats.map((stat) => (
        <Column key={stat.id} style={{ gap: 6 }}>
          <Text style={{ apply: ["statValue"], color: valueColor }}>{stat.value}</Text>
          <Text style={{ apply: ["statLabel"], color: labelColor }}>{stat.label}</Text>
        </Column>
      ))}
    </Grid>
  );
}

/* ------------------------------------------------------------------ */
/* Gift breakdown                                                      */
/* ------------------------------------------------------------------ */

/** One line of the gift breakdown: item, detail, amount. */
function GiftRow({ item, detail, amountCents }: { item: string; detail: string; amountCents: number }) {
  return (
    <Row stackOnMobile={false} style={{ apply: ["giftRow"], gap: 16 }}>
      <Column style={{ gap: 3 }}>
        <Text style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 600, lineHeight: 1.25 }}>{item}</Text>
        <Text style={{ fontSize: 13, lineHeight: 1.5, color: token("colors.muted") }}>{detail}</Text>
      </Column>
      <Column style={{ width: 88 }}>
        <Text style={{ apply: ["amount"] }}>{usd(amountCents)}</Text>
      </Column>
    </Row>
  );
}

/** What the gift funds: ruled rows of gift lines, then the total. */
export function GiftBreakdown({ showTotal = true }: { showTotal?: boolean }) {
  return (
    <Column style={{ border: { bottom: { width: 1, style: "solid", color: token("colors.border") } } }}>
      {giftBreakdown.map((line) => (
        <GiftRow key={line.id} item={line.item} detail={line.detail} amountCents={line.amountCents} />
      ))}
      {showTotal && (
        <Row stackOnMobile={false} style={{ gap: 16, padding: [14, 0] }}>
          <Column>
            <Text style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.teal") }}>
              Total gift
            </Text>
          </Column>
          <Column style={{ width: 88 }}>
            <Text style={{ apply: ["amount"], color: token("colors.teal") }}>{usd(giftTotalCents)}</Text>
          </Column>
        </Row>
      )}
    </Column>
  );
}

/* ------------------------------------------------------------------ */
/* Donor facts, gala details, tiers                                    */
/* ------------------------------------------------------------------ */

/** Donor, gift, tier and receipt number, as a 2×2 facts block. */
export function DonorFacts() {
  const fact = (label: string, value: string) => (
    <Column style={{ gap: 3 }}>
      <Text style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.muted") }}>{label}</Text>
      <Text style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.35 }}>{value}</Text>
    </Column>
  );
  return (
    <Grid columns={2} style={{ gap: 20 }}>
      {fact("Donor", donor.fullName)}
      {fact("Gift", `${usd(donor.giftCents)} · ${donor.giftDateShort}`)}
      {fact("Giving circle", donor.tier)}
      {fact("Receipt", donor.receiptNumber)}
    </Grid>
  );
}

/** Gala date, time, venue and dress code, as a 2×2 facts block. */
export function GalaDetails({ light = false }: { light?: boolean }) {
  const labelColor = light ? token("colors.onDarkMuted") : token("colors.muted");
  const valueColor = light ? token("colors.onDark") : token("colors.foreground");
  const fact = (label: string, value: string) => (
    <Column style={{ gap: 3 }}>
      <Text style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: labelColor }}>{label}</Text>
      <Text style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.35, color: valueColor }}>{value}</Text>
    </Column>
  );
  return (
    <Grid columns={2} style={{ gap: 20 }}>
      {fact("Date", gala.date)}
      {fact("Time", gala.timeLong)}
      {fact("Venue", `${gala.venue}, ${gala.city}`)}
      {fact("Dress", gala.dress)}
    </Grid>
  );
}

/** The giving tiers, as three cards. */
export function TierCards() {
  return (
    <Grid columns={3} style={{ gap: 16 }}>
      {tiers.map((tier) => (
        <Column key={tier.id} style={{ apply: ["panel"], gap: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.amberDeep") }}>
            {tier.name}
          </Text>
          <Text style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, lineHeight: 1.1 }}>{usd(tier.amountCents)}</Text>
          <Text style={{ fontSize: 14, lineHeight: 1.55, color: token("colors.inkSoft") }}>{tier.line}</Text>
        </Column>
      ))}
    </Grid>
  );
}

/* ------------------------------------------------------------------ */
/* Quote, CTAs, footer                                                 */
/* ------------------------------------------------------------------ */

/** The founder's thank-you quote. */
export function ThankYouQuote({ center = false }: { center?: boolean }) {
  return (
    <Column style={{ gap: 12 }}>
      <Text style={{ fontFamily: SERIF, fontSize: 24, fontStyle: "italic", fontWeight: 500, lineHeight: 1.35, textAlign: center ? "center" : "left" }}>
        “{thankYouQuote.text}”
      </Text>
      <Text style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.amberDeep"), textAlign: center ? "center" : "left" }}>
        {thankYouQuote.name} · {thankYouQuote.title}
      </Text>
    </Column>
  );
}

/** The gala RSVP button, with the date under it. `light` for dark bands. */
export function GalaCTA({ label = "Reserve your seat", light = false }: { label?: string; light?: boolean }) {
  return (
    <Column style={{ gap: 10 }}>
      <Button href={charity.rsvpUrl} style={{ width: 280, color: token("colors.tealDeep"), mobile: { width: "100%" } }}>
        {label}
      </Button>
      <Text style={{ apply: ["smallMuted"], color: light ? token("colors.onDarkMuted") : token("colors.muted") }}>
        {gala.name} · {gala.date} · {gala.venue}
      </Text>
    </Column>
  );
}

/** The give button, with the charity line under it. */
export function GiveCTA({ label = "Give to Brightpath" }: { label?: string }) {
  return (
    <Column style={{ gap: 10 }}>
      <Button href={charity.giveUrl} style={{ width: 280, mobile: { width: "100%" } }}>
        {label}
      </Button>
      <Text style={{ apply: ["smallMuted"] }}>{charity.tagline} Registered charity no. {charity.charityNumber}.</Text>
    </Column>
  );
}

/** The charity's address and contact lines, for footers. */
export function FooterNote({ light = false }: { light?: boolean }) {
  const color = light ? token("colors.onDarkMuted") : token("colors.muted");
  return (
    <Text style={{ fontSize: 13, lineHeight: 1.7, color }}>
      {charity.name} · {charity.address.join(", ")} · Registered charity no. {charity.charityNumber}
      <LineBreak />
      <Link href={`tel:${charity.phone.replace(/\s/g, "")}`} style={{ color }}>
        {charity.phone}
      </Link>
      {" · "}
      <Link href={`mailto:${charity.email}`} style={{ color }}>
        {charity.email}
      </Link>
      {" · "}
      <Link href={charity.site} style={{ color }}>
        brightpath.example
      </Link>
    </Text>
  );
}

/** A small "this is fictional" note, for the page and receipt footers. */
export function FictionNote() {
  return (
    <Text style={{ fontSize: 12, lineHeight: 1.6, color: token("colors.muted") }}>
      Brightpath Literacy Fund, Amara Okafor and {gala.name} are fictional — created for this template.
    </Text>
  );
}
