/**
 * The email: a donor thank-you email, 600px wide.
 *
 * A deep teal hero band (wordmark, thank-you headline, the gift in large
 * serif), the gift facts and breakdown in a parchment card, the founder's
 * quote, a dark gala invitation card with the RSVP button, the fund's impact
 * stats, and a footer with the charity's details. No Svg here — Email
 * doesn't support it — so the rhythm comes from Dividers and colour bands.
 * render() writes the plain-text twin from the same tree.
 */
import { Column, Divider, Email, Heading, LineBreak, Link, Row, Section, Text, token } from "@hyper-elements/react";
import { charity, donor, gala, usd } from "./data.js";
import { DonorFacts, GalaCTA, GalaDetails, GiftBreakdown, ImpactStats, ThankYouQuote, Wordmark } from "./components.js";
import { lanternAppeal, WEB_FONTS } from "./theme.js";

export default function DonorThankYouEmail() {
  return (
    <Email
      width={600}
      theme={lanternAppeal}
      lang="en-GB"
      title={`Thank you, ${donor.firstName} — ${charity.name}`}
      previewText={`Your ${usd(donor.giftCents)} gift to the Lantern Appeal is in — and it lights a whole reading room. Receipt ${donor.receiptNumber}.`}
      fonts={[...WEB_FONTS]}
    >
      {/* The hero: teal band, wordmark, thank-you headline, the gift */}
      <Section style={{ backgroundColor: token("colors.teal"), color: token("colors.onDark"), padding: [40, 48, 44], gap: 32, mobile: { padding: [32, 24, 36], gap: 24 } }}>
        <Row style={{ alignItems: "center" }}>
          <Column>
            <Wordmark light />
          </Column>
          <Column>
            <Text style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.onDarkMuted"), textAlign: "right", mobile: { textAlign: "left" } }}>
              {gala.dateShort}
            </Text>
          </Column>
        </Row>
        <Column style={{ gap: 14 }}>
          <Text style={{ apply: ["eyebrowLight"] }}>Thank you for your gift</Text>
          <Heading level={1} style={{ color: token("colors.onDark") }}>
            Thank you, {donor.firstName}. You lit a lantern.
          </Heading>
          <Text style={{ fontSize: 18, lineHeight: 1.55, color: token("colors.onDarkMuted"), mobile: { fontSize: 16 } }}>
            Your gift to the Lantern Appeal is in — and it goes straight to the reading rooms. Forty children will
            open a new book because of it.
          </Text>
        </Column>
        <Row style={{ padding: [24, 0, 0], border: { top: { width: 1, style: "solid", color: "#1D5552" } } }}>
          <Column style={{ gap: 2 }}>
            <Text style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.05, color: token("colors.onDark") }}>{usd(donor.giftCents)}</Text>
            <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.amberBright") }}>
              {donor.tier} · {donor.giftDate}
            </Text>
          </Column>
        </Row>
      </Section>

      {/* The gift, in detail */}
      <Section style={{ padding: [40, 48, 0], gap: 20, mobile: { padding: [32, 24, 0], gap: 16 } }}>
        <Column style={{ gap: 8 }}>
          <Text style={{ apply: ["eyebrow"] }}>Your gift</Text>
          <Heading level={2}>What your {usd(donor.giftCents)} funds</Heading>
        </Column>
        <Column style={{ apply: ["card"], gap: 20 }}>
          <DonorFacts />
          <Divider />
          <GiftBreakdown />
        </Column>
        <ThankYouQuote />
      </Section>

      {/* The gala invitation */}
      <Section style={{ padding: [40, 48, 0], mobile: { padding: [32, 24, 0] } }}>
        <Column style={{ backgroundColor: token("colors.tealDeep"), padding: 28, gap: 20, borderRadius: 4 }}>
          <Column style={{ gap: 8 }}>
            <Text style={{ apply: ["eyebrowLight"] }}>You're invited</Text>
            <Heading level={2} style={{ color: token("colors.onDark") }}>
              {gala.name}
            </Heading>
            <Text style={{ fontSize: 15, lineHeight: 1.6, color: token("colors.onDarkMuted") }}>{gala.intro}</Text>
          </Column>
          <GalaDetails light />
          <GalaCTA light />
        </Column>
      </Section>

      {/* Impact and footer */}
      <Section style={{ padding: [40, 48, 48], gap: 24, mobile: { padding: [32, 24, 40] } }}>
        <Column style={{ gap: 16 }}>
          <Text style={{ apply: ["eyebrow"] }}>The difference so far</Text>
          <ImpactStats columns={2} />
        </Column>
        <Divider />
        <Text style={{ fontSize: 13, lineHeight: 1.7, color: token("colors.muted") }}>
          {charity.name} · {charity.address.join(", ")} · Registered charity no. {charity.charityNumber}
          <LineBreak />
          <Link href={`mailto:${charity.email}`} style={{ color: token("colors.muted") }}>
            {charity.email}
          </Link>
          {" · "}
          <Link href={charity.site} style={{ color: token("colors.muted") }}>
            brightpath.example
          </Link>
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 1.6, color: token("colors.muted") }}>
          You're receiving this because you gave to the Lantern Appeal. Your receipt is attached to this email as a
          PDF — or view it any time at{" "}
          <Link href={`${charity.site}/receipt/${donor.receiptNumber}`} style={{ color: token("colors.muted") }}>
            brightpath.example/receipt/{donor.receiptNumber}
          </Link>
          .
        </Text>
      </Section>
    </Email>
  );
}
