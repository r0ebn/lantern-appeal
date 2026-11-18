/**
 * The document: a donation receipt, A4 portrait.
 *
 * One page: the lantern and the charity at the top, the receipt number and
 * date, the donor's gift in large serif, the gift facts, the itemised
 * breakdown, the tax note, and a signature line. A header and a footer
 * (with page numbers) repeat on every page. render() writes the print HTML;
 * renderPdf() the PDF, from the same tree.
 */
import { Column, Divider, Document, Heading, PageFooter, PageHeader, PageNumber, Row, Span, Text, token } from "@hyper-elements/react";
import { charity, donor, gala, taxNote, usd } from "./data.js";
import { DonorFacts, FictionNote, Flourish, GiftBreakdown, LanternMark, Wordmark } from "./components.js";
import { lanternAppeal, WEB_FONTS } from "./theme.js";

export default function DonationReceipt() {
  return (
    <Document size="A4" margin={48} theme={lanternAppeal} lang="en-GB" title={`Donation receipt ${donor.receiptNumber} — ${charity.name}`} fonts={[...WEB_FONTS]}>
      <PageHeader style={{ padding: [0, 0, 12], border: { bottom: { width: 1, style: "solid", color: token("colors.border") } } }}>
        <Row stackOnMobile={false} style={{ alignItems: "center" }}>
          <Column>
            <Wordmark size={15} />
          </Column>
          <Column>
            <Text style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.muted"), textAlign: "right" }}>
              Donation receipt · {donor.receiptNumber}
            </Text>
          </Column>
        </Row>
      </PageHeader>

      <Document.Page style={{ gap: 12 }}>
        {/* Masthead: lantern, title, receipt number */}
        <Column style={{ gap: 8, alignItems: "center" }}>
          <LanternMark height={56} glow={false} />
          <Heading level={1} style={{ fontSize: 32, textAlign: "center" }}>
            Donation Receipt
          </Heading>
          <Text style={{ apply: ["eyebrow"], textAlign: "center" }}>
            {gala.name} · {donor.giftDate}
          </Text>
          <Text style={{ fontSize: 14, lineHeight: 1.6, color: token("colors.muted"), textAlign: "center", maxWidth: 560 }}>
            Thank you, {donor.firstName}. This is your record of a gift to the {charity.name} — and of forty books,
            two reading sessions and a library shelf finding their way to a classroom.
          </Text>
        </Column>

        {/* The gift, large */}
        <Column style={{ gap: 4, alignItems: "center" }}>
          <Text style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.05, color: token("colors.teal") }}>{usd(donor.giftCents)}</Text>
          <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.amberDeep") }}>
            {donor.tier} · {donor.method}
          </Text>
        </Column>

        {/* Facts and breakdown */}
        <Column style={{ apply: ["card"], gap: 12 }}>
          <DonorFacts />
          <Divider />
          <GiftBreakdown />
        </Column>

        {/* Tax note, signature, sign-off */}
        <Column style={{ gap: 10 }}>
          <Text style={{ apply: ["smallMuted"], textAlign: "center", maxWidth: 620 }}>{taxNote}</Text>
          <Flourish />
          <Row stackOnMobile={false} style={{ gap: 32 }}>
            <Column style={{ gap: 8 }}>
              <Text style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontStyle: "italic", color: token("colors.teal") }}>
                Maya Osei
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", color: token("colors.muted") }}>
                Maya Osei · Founder
              </Text>
            </Column>
            <Column style={{ gap: 8 }}>
              <Text style={{ fontSize: 13, lineHeight: 1.6, color: token("colors.inkSoft") }}>
                Questions about this receipt? Write to{" "}
                <Span style={{ fontWeight: 600 }}>{charity.email}</Span> or call {charity.phone}.
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", color: token("colors.muted") }}>
                {charity.site.replace("https://", "")}
              </Text>
            </Column>
          </Row>
          <FictionNote />
        </Column>
      </Document.Page>

      <PageFooter style={{ padding: [12, 0, 0], border: { top: { width: 1, style: "solid", color: token("colors.border") } } }}>
        <Row stackOnMobile={false} style={{ alignItems: "center" }}>
          <Column>
            <Text style={{ fontSize: 11, color: token("colors.muted") }}>
              {charity.name} · {charity.address.join(", ")} · Charity no. {charity.charityNumber}
            </Text>
          </Column>
          <Column>
            <Text style={{ fontSize: 11, color: token("colors.muted"), textAlign: "right" }}>
              Page <PageNumber /> of <PageNumber total />
            </Text>
          </Column>
        </Row>
      </PageFooter>
    </Document>
  );
}
