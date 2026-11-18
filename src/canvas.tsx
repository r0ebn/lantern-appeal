/**
 * The canvas: a 1200 × 627 social share card ("I gave to the Lantern
 * Appeal"), composed like a poster.
 *
 * Deep teal ground, a field of stars, the donor's name and gift set in the
 * serif on the left, and a large drawn lantern on the right. renderImage()
 * draws it as a PNG and as an SVG (whose text is paths, so it shows without
 * fonts). No images: every visual is a Hyper Elements element or a drawn Svg
 * shape.
 */
import { Canvas, Column, Heading, Row, Text, token } from "@hyper-elements/react";
import { charity, donor, gala, impactStats, usd } from "./data.js";
import { LanternMark, StarField, Wordmark } from "./components.js";
import { lanternAppeal, SERIF, WEB_FONTS } from "./theme.js";

export default function LanternShareCard() {
  return (
    <Canvas
      width={1200}
      height={627}
      theme={lanternAppeal}
      title={`I gave to ${gala.name} — ${charity.name}`}
      fonts={[...WEB_FONTS]}
      style={{ backgroundColor: token("colors.tealDeep"), color: token("colors.onDark"), padding: [48, 64], gap: 0, alignItems: "stretch", justifyContent: "space-between" }}
    >
      {/* Top: wordmark and gala date */}
      <Row stackOnMobile={false} style={{ alignItems: "center" }}>
        <Column>
          <Wordmark light size={20} />
        </Column>
        <Column>
          <Text style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: token("colors.onDarkMuted"), textAlign: "right" }}>
            {gala.dateShort} · {gala.venue}
          </Text>
        </Column>
      </Row>

      {/* Middle: the statement, the gift, the lantern */}
      <Row stackOnMobile={false} style={{ gap: 48, alignItems: "center" }}>
        <Column style={{ gap: 16 }}>
          <Text style={{ apply: ["eyebrowLight"] }}>I gave to the Lantern Appeal</Text>
          <Heading level={1} style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.02, letterSpacing: -0.5, color: token("colors.onDark") }}>
            {donor.firstName} lit a lantern for forty children.
          </Heading>
          <Text style={{ fontFamily: SERIF, fontSize: 30, fontStyle: "italic", fontWeight: 500, lineHeight: 1.2, color: token("colors.amberBright") }}>
            {usd(donor.giftCents)} · {donor.tier}
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 1.55, color: token("colors.onDarkMuted"), maxWidth: 560 }}>
            {impactStats[0].value} children taught to read · {impactStats[1].value} school libraries stocked ·{" "}
            {impactStats[2].value} volunteer tutors
          </Text>
        </Column>
        <Column style={{ width: 240, alignItems: "center" }}>
          <LanternMark height={300} />
        </Column>
      </Row>

      {/* Bottom: stars and the site */}
      <Column style={{ gap: 12 }}>
        <StarField width={1072} height={40} />
        <Row stackOnMobile={false} style={{ alignItems: "center" }}>
          <Column>
            <Text style={{ fontSize: 15, letterSpacing: 1.2, color: token("colors.onDarkMuted") }}>{charity.tagline}</Text>
          </Column>
          <Column>
            <Text style={{ fontSize: 15, fontWeight: 600, letterSpacing: 1.2, textAlign: "right", color: token("colors.onDark") }}>
              brightpath.example/give
            </Text>
          </Column>
        </Row>
      </Column>
    </Canvas>
  );
}
