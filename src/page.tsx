/**
 * The page: the gala + impact page, 960px wide.
 *
 * A dark teal hero with the drawn lantern and a field of stars, the fund's
 * impact stats, what the gift funds, the gala details with its programme,
 * the giving tiers, and a footer with the charity's details. On phones the
 * hero stacks, the stats go two-up and the tiers go one under another.
 */
import { Column, Divider, Grid, Heading, LineBreak, Link, List, ListItem, Page, Row, Section, Span, Table, TableCell, TableRow, Text, token } from "@hyper-elements/react";
import { charity, donor, gala, usd } from "./data.js";
import {
  FictionNote,
  FooterNote,
  GalaCTA,
  GalaDetails,
  GiftBreakdown,
  GiveCTA,
  ImpactStats,
  LanternMark,
  StarField,
  ThankYouQuote,
  TierCards,
  Wordmark,
} from "./components.js";
import { lanternAppeal, WEB_FONTS } from "./theme.js";

export default function GalaImpactPage() {
  return (
    <Page
      width={960}
      theme={lanternAppeal}
      lang="en-GB"
      title={`${gala.name} — ${charity.name}`}
      description="The Lantern Appeal: one evening of dinner, music and lantern light to fund next year's reading rooms."
      fonts={[...WEB_FONTS]}
    >
      {/* Hero: dark teal, lantern, stars */}
      <Section style={{ backgroundColor: token("colors.tealDeep"), color: token("colors.onDark"), padding: [24, 48, 56], gap: 0, mobile: { padding: [24, 24, 40] } }}>
        <Row style={{ alignItems: "center" }}>
          <Column>
            <Wordmark light />
          </Column>
          <Column>
            <Text style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.onDarkMuted"), textAlign: "right", mobile: { textAlign: "left" } }}>
              {gala.dateShort} · {gala.venue}
            </Text>
          </Column>
        </Row>
        <StarField width={864} height={72} hidden={{ mobile: true }} />
        <Row style={{ gap: 48, alignItems: "center" }}>
          <Column style={{ gap: 18 }}>
            <Text style={{ apply: ["eyebrowLight"] }}>A gala for young readers</Text>
            <Heading level={1} style={{ fontSize: 60, color: token("colors.onDark"), mobile: { fontSize: 42 } }}>
              The Lantern Appeal
            </Heading>
            <Text style={{ fontSize: 18, lineHeight: 1.6, color: token("colors.onDarkMuted") }}>{gala.intro}</Text>
            <Text style={{ fontSize: 15, lineHeight: 1.6, color: token("colors.onDarkMuted") }}>
              {gala.date} · {gala.timeLong} · {gala.venue}, {gala.city} · {gala.dress}
            </Text>
            <GalaCTA light />
          </Column>
          <Column style={{ width: 220, alignItems: "center" }}>
            <LanternMark height={280} />
          </Column>
        </Row>
      </Section>

      {/* Impact stats */}
      <Section style={{ padding: [56, 48, 0], gap: 20, mobile: { padding: [40, 24, 0] } }}>
        <Column style={{ gap: 8 }}>
          <Text style={{ apply: ["eyebrow"] }}>What Brightpath does</Text>
          <Heading level={2}>Twelve thousand children, reading</Heading>
          <Text style={{ fontSize: 16, lineHeight: 1.65, color: token("colors.inkSoft"), maxWidth: 720 }}>{charity.mission}</Text>
        </Column>
        <ImpactStats columns={4} />
      </Section>

      {/* What the gift funds */}
      <Section style={{ padding: [56, 48, 0], gap: 20, mobile: { padding: [40, 24, 0] } }}>
        <Grid columns={2} style={{ gap: 32 }}>
          <Column style={{ gap: 16 }}>
            <Column style={{ gap: 8 }}>
              <Text style={{ apply: ["eyebrow"] }}>One gift, itemised</Text>
              <Heading level={2}>What {usd(donor.giftCents)} funds</Heading>
              <Text style={{ fontSize: 15, lineHeight: 1.65, color: token("colors.inkSoft") }}>
                {donor.firstName} {donor.fullName.split(" ")[1]} gave {usd(donor.giftCents)} on {donor.giftDate} and
                joined the {donor.tier}. Here's exactly where it goes — every gift is itemised the same way.
              </Text>
            </Column>
            <GiftBreakdown />
          </Column>
          <Column style={{ gap: 20 }}>
            <Column style={{ apply: ["card"], gap: 16 }}>
              <ThankYouQuote />
            </Column>
            <Column style={{ apply: ["panel"], gap: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.amberDeep") }}>
                {donor.tier}
              </Text>
              <Text style={{ fontSize: 15, lineHeight: 1.65, color: token("colors.inkSoft") }}>{donor.tierNote}</Text>
            </Column>
          </Column>
        </Grid>
      </Section>

      {/* The gala */}
      <Section style={{ padding: [56, 48, 0], gap: 20, mobile: { padding: [40, 24, 0] } }}>
        <Column style={{ gap: 8 }}>
          <Text style={{ apply: ["eyebrow"] }}>The evening</Text>
          <Heading level={2}>An evening under the lanterns</Heading>
        </Column>
        <Grid columns={2} style={{ gap: 32 }}>
          <Column style={{ gap: 20 }}>
            <GalaDetails />
            <Text style={{ fontSize: 15, lineHeight: 1.65, color: token("colors.inkSoft") }}>
              Dinner is served in the Orangery at long tables, lit by paper lanterns. The auction's star lot is a
              first edition of <Span style={{ fontStyle: "italic" }}>The Tale of Peter Rabbit</Span>, donated by a
              friend of the fund.
            </Text>
            <GalaCTA label="Reserve your seat" />
          </Column>
          <Column style={{ gap: 12 }}>
            <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.muted") }}>
              Programme
            </Text>
            <Table style={{ cellPadding: [10, 0], rowBorder: { width: 1, style: "solid", color: token("colors.border") } }}>
              {gala.programme.map((slot) => (
                <TableRow key={slot.time}>
                  <TableCell style={{ width: 96, fontSize: 14, fontWeight: 700, color: token("colors.teal"), verticalAlign: "top" }}>{slot.time}</TableCell>
                  <TableCell style={{ fontSize: 14, lineHeight: 1.55, verticalAlign: "top" }}>{slot.item}</TableCell>
                </TableRow>
              ))}
            </Table>
            <List type="bullet">
              <ListItem>Two seats are held for every Lantern Circle member.</ListItem>
              <ListItem>Step-free access throughout Kew Gardens.</ListItem>
            </List>
          </Column>
        </Grid>
      </Section>

      {/* How to give */}
      <Section style={{ padding: [56, 48, 0], gap: 20, mobile: { padding: [40, 24, 0] } }}>
        <Column style={{ gap: 8 }}>
          <Text style={{ apply: ["eyebrow"] }}>How to give</Text>
          <Heading level={2}>Light a lantern of your own</Heading>
          <Text style={{ fontSize: 16, lineHeight: 1.65, color: token("colors.inkSoft"), maxWidth: 720 }}>
            Every gift is itemised like {donor.firstName}'s, and every donor gets a receipt and an invitation to the
            gala. Give once, or monthly — the reading rooms run all year.
          </Text>
        </Column>
        <TierCards />
        <GiveCTA />
      </Section>

      {/* Footer */}
      <Section style={{ padding: [56, 48, 48], gap: 16, mobile: { padding: [40, 24, 40] } }}>
        <Divider />
        <Row style={{ gap: 32 }}>
          <Column style={{ gap: 12 }}>
            <Wordmark size={16} />
            <FooterNote />
          </Column>
          <Column style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.muted") }}>The fund</Text>
            <Text style={{ fontSize: 14, lineHeight: 1.8 }}>
              <Link href={charity.giveUrl}>Give</Link>
              <LineBreak />
              <Link href={charity.galaUrl}>The Lantern Appeal</Link>
              <LineBreak />
              <Link href={`${charity.site}/impact`}>Our impact</Link>
            </Text>
          </Column>
        </Row>
        <FictionNote />
      </Section>
    </Page>
  );
}
