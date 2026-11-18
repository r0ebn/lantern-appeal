/**
 * The Lantern Appeal — the single source of truth.
 *
 * One fictional charity, one donor, one gala, one gift. Every output (email,
 * page, receipt document, social canvas) reads from this file, so changing
 * the donor or the gift here changes it everywhere. Nothing here is real:
 * the charity, the donor, the gala and the links are invented for the
 * template.
 */

/** Money is integer cents; format it with `usd()`. */
export const usd = (cents: number): string =>
  `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Whole dollars, no cents, for headlines and the share card. */
export const usdWhole = (cents: number): string => `$${Math.round(cents / 100).toLocaleString("en-US")}`;

export const charity = {
  name: "Brightpath Literacy Fund",
  shortName: "Brightpath",
  tagline: "Every child, a reader.",
  mission:
    "Brightpath puts books, tutors and libraries into the schools that need them most — so that every child leaves primary school able to read, and wanting to.",
  founded: 2014,
  /** Fictional registered charity number (England & Wales). */
  charityNumber: "1182047",
  address: ["12 Lantern Yard, Clerkenwell", "London EC1R 5DP"],
  phone: "+44 20 7946 0318",
  email: "hello@brightpath.example",
  site: "https://brightpath.example",
  giveUrl: "https://brightpath.example/give",
  galaUrl: "https://brightpath.example/lantern-appeal",
  rsvpUrl: "https://brightpath.example/lantern-appeal/rsvp",
};

export const gala = {
  name: "The Lantern Appeal",
  /** Long form for headings and the email. */
  date: "Saturday 6 February 2027",
  dateShort: "SAT 6 FEB 2027",
  time: "7:00 PM",
  timeLong: "7:00 PM – 11:30 PM",
  venue: "The Orangery, Kew Gardens",
  city: "London",
  dress: "Black tie",
  intro:
    "One evening of dinner, music and lantern light — and the night we raise the money for next year's reading rooms. Every seat at the table funds a shelf of books.",
  programme: [
    { time: "7:00 PM", item: "Doors open — drinks in the Orangery" },
    { time: "7:45 PM", item: "Dinner, with readings from our young authors" },
    { time: "9:00 PM", item: "The auction — and the lantern lighting" },
    { time: "10:30 PM", item: "Music and dancing under the lanterns" },
  ],
};

export const donor = {
  firstName: "Amara",
  fullName: "Amara Okafor",
  /** Gift in integer cents. */
  giftCents: 50000,
  giftDate: "28 January 2027",
  /** Short form for the receipt and the email. */
  giftDateShort: "28 Jan 2027",
  method: "Online gift · Card ending 4242",
  receiptNumber: "BPL-2027-01842",
  tier: "Lantern Circle",
  tierNote: "Lantern Circle members give $500 or more a year — and light a whole reading room.",
};

/** What the gift funds. Amounts in integer cents; they sum to the gift. */
export interface GiftLine {
  id: string;
  item: string;
  detail: string;
  amountCents: number;
}

export const giftBreakdown: GiftLine[] = [
  {
    id: "books",
    item: "40 new books",
    detail: "For the reading corner at St. Hilda's Primary",
    amountCents: 20000,
  },
  {
    id: "sessions",
    item: "2 after-school reading sessions",
    detail: "A trained tutor, twice a week, for a term",
    amountCents: 18000,
  },
  {
    id: "shelf",
    item: "1 library shelf starter",
    detail: "Shelving and a first set of early readers",
    amountCents: 12000,
  },
];

export const giftTotalCents = giftBreakdown.reduce((sum, line) => sum + line.amountCents, 0);

/** The fund's impact, shown on the page and in the email. */
export interface ImpactStat {
  id: string;
  value: string;
  label: string;
}

export const impactStats: ImpactStat[] = [
  { id: "children", value: "12,400", label: "children taught to read" },
  { id: "libraries", value: "86", label: "school libraries stocked" },
  { id: "tutors", value: "214", label: "volunteer tutors trained" },
  { id: "grade", value: "96%", label: "reading at grade level after one year" },
];

/** Giving tiers, shown on the page's "how to give" section. */
export interface Tier {
  id: string;
  name: string;
  amountCents: number;
  line: string;
}

export const tiers: Tier[] = [
  { id: "spark", name: "Spark", amountCents: 5000, line: "Ten books for a classroom shelf." },
  { id: "flame", name: "Flame", amountCents: 15000, line: "A term of after-school reading for one child." },
  { id: "lantern", name: "Lantern Circle", amountCents: 50000, line: "A whole reading room, lit for a year." },
];

export const taxNote =
  "Brightpath Literacy Fund is a registered charity in England and Wales (no. 1182047). No goods or services were provided in exchange for this gift. Please keep this receipt for your tax records.";

export const thankYouQuote = {
  text: "When a child reads their first book alone, the room changes. You just lit that room for forty children.",
  name: "Maya Osei",
  title: "Founder, Brightpath Literacy Fund",
};
