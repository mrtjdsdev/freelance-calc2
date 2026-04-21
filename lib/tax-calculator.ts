/**
 * Simplified freelance tax estimates for planning — not tax advice.
 * Federal: 2026 ordinary brackets & standard deductions (IRS inflation figures).
 * SE tax: 15.3% of net profit as requested (full net × 15.3%).
 * State: CA/NY marginal models; IL flat; no-tax states; others use rounded flat approximation.
 */

export type FilingStatus = "single" | "married";

/** All 50 US state postal abbreviations (alphabetical). */
export const US_STATE_CODES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
] as const;

export type USStateCode = (typeof US_STATE_CODES)[number];

export const STATE_LABELS: Record<USStateCode, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

export const STATE_OPTIONS: { code: USStateCode; label: string }[] = [...US_STATE_CODES]
  .map((code) => ({ code, label: STATE_LABELS[code] }))
  .sort((a, b) => a.label.localeCompare(b.label));

const STATE_CODE_SET = new Set<string>(US_STATE_CODES);

/** SEO-friendly path segment per state, e.g. `california`, `new-york`. */
export function labelToStatePathSlug(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const STATE_PATH_SLUG_BY_CODE: Record<USStateCode, string> = Object.fromEntries(
  US_STATE_CODES.map((code) => [code, labelToStatePathSlug(STATE_LABELS[code])]),
) as Record<USStateCode, string>;

const PATH_SLUG_TO_CODE = new Map<string, USStateCode>(
  US_STATE_CODES.map((code) => [STATE_PATH_SLUG_BY_CODE[code], code]),
);

/** States with no broad-based personal income tax in this simplified model. */
const NO_INCOME_TAX_STATES = new Set<USStateCode>(["AK", "FL", "NV", "NH", "SD", "TN", "TX", "WA", "WY"]);

/**
 * Rough flat rates on generic state taxable income for remaining states (planning-only).
 * CA / NY use dedicated brackets; IL uses its own flat rule with IL-specific subtraction.
 */
const FLAT_APPROX_RATE: Partial<Record<USStateCode, number>> = {
  AL: 0.05,
  AZ: 0.0259,
  AR: 0.049,
  CO: 0.044,
  CT: 0.05,
  DE: 0.055,
  GA: 0.0549,
  HI: 0.065,
  ID: 0.058,
  IN: 0.0305,
  IA: 0.057,
  KS: 0.0525,
  KY: 0.045,
  LA: 0.0425,
  ME: 0.0715,
  MD: 0.0575,
  MA: 0.05,
  MI: 0.0425,
  MN: 0.068,
  MS: 0.05,
  MO: 0.048,
  MT: 0.059,
  NE: 0.0584,
  NJ: 0.0637,
  NM: 0.049,
  NC: 0.0475,
  ND: 0.019,
  OH: 0.035,
  OK: 0.0475,
  OR: 0.0875,
  PA: 0.0307,
  RI: 0.0599,
  SC: 0.065,
  UT: 0.0485,
  VT: 0.066,
  VA: 0.0575,
  WV: 0.055,
  WI: 0.053,
};

const GENERIC_STATE_STANDARD: Record<FilingStatus, number> = {
  single: 2_500,
  married: 5_000,
};

export interface TaxInputs {
  grossIncome: number;
  businessExpenses: number;
  filingStatus: FilingStatus;
  state: USStateCode;
}

export interface TaxBreakdown {
  netProfit: number;
  selfEmploymentTax: number;
  federalIncomeTax: number;
  stateIncomeTax: number;
  totalTax: number;
  netTakeHome: number;
}

/** Progressive tax: each rate applies to income between edges[i] and edges[i+1]. */
function progressiveTax(income: number, edges: number[], rates: number[]): number {
  if (income <= 0 || rates.length === 0) return 0;
  let tax = 0;
  for (let i = 0; i < rates.length; i++) {
    const low = edges[i] ?? 0;
    const high = edges[i + 1] ?? Infinity;
    if (income <= low) break;
    const sliceTop = Math.min(income, high);
    const slice = sliceTop - low;
    if (slice > 0) tax += slice * rates[i];
  }
  return Math.round(tax * 100) / 100;
}

// TY 2026 federal ordinary brackets & standard deductions (IRS / public summaries)
const FEDERAL_EDGES: Record<FilingStatus, number[]> = {
  single: [0, 12_400, 50_400, 105_700, 201_775, 256_225, 640_600],
  married: [0, 24_800, 100_800, 211_400, 403_550, 512_450, 768_700],
};

const FEDERAL_RATES = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];

const FEDERAL_STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16_100,
  married: 32_200,
};

/** CA: simplified marginal structure; MFJ thresholds ≈ 2× single (common convention). */
const CA_EDGES: Record<FilingStatus, number[]> = {
  single: [0, 10_412, 24_684, 38_959, 54_081, 68_350, 349_137],
  married: [0, 20_824, 49_368, 77_918, 108_162, 136_700, 698_274],
};

const CA_RATES = [0.01, 0.02, 0.04, 0.06, 0.08, 0.093, 0.103];

const CA_STANDARD: Record<FilingStatus, number> = {
  single: 5_500,
  married: 11_000,
};

/** NY State: condensed resident brackets (single vs married filing jointly). */
const NY_EDGES: Record<FilingStatus, number[]> = {
  single: [0, 8_500, 11_700, 13_900, 80_650, 215_400, 1_077_550],
  married: [0, 17_150, 23_500, 27_900, 161_550, 323_200, 2_155_350],
};

const NY_RATES = [0.04, 0.045, 0.0525, 0.055, 0.059, 0.0609, 0.0965];

const NY_STANDARD: Record<FilingStatus, number> = {
  single: 8_000,
  married: 16_050,
};

const IL_STANDARD: Record<FilingStatus, number> = {
  single: 2_850,
  married: 5_700,
};

const IL_FLAT_RATE = 0.0495;

function flatStateTax(
  netProfit: number,
  halfSETaxDeduction: number,
  filing: FilingStatus,
  standard: Record<FilingStatus, number>,
  rate: number,
): number {
  const taxable = Math.max(0, netProfit - halfSETaxDeduction - standard[filing]);
  return Math.round(taxable * rate * 100) / 100;
}

export function calculateFreelanceTax(inputs: TaxInputs): TaxBreakdown {
  const gross = Math.max(0, inputs.grossIncome);
  const expenses = Math.max(0, inputs.businessExpenses);
  const netProfit = Math.max(0, gross - expenses);

  const selfEmploymentTax = Math.round(netProfit * 0.153 * 100) / 100;

  const halfSETaxDeduction = selfEmploymentTax / 2;
  const federalTaxable = Math.max(
    0,
    netProfit - halfSETaxDeduction - FEDERAL_STANDARD_DEDUCTION[inputs.filingStatus],
  );
  const federalIncomeTax = progressiveTax(
    federalTaxable,
    FEDERAL_EDGES[inputs.filingStatus],
    FEDERAL_RATES,
  );

  let stateIncomeTax = 0;
  const st = inputs.state;

  if (NO_INCOME_TAX_STATES.has(st)) {
    stateIncomeTax = 0;
  } else if (st === "CA") {
    const caTaxable = Math.max(
      0,
      netProfit - halfSETaxDeduction - CA_STANDARD[inputs.filingStatus],
    );
    stateIncomeTax = progressiveTax(caTaxable, CA_EDGES[inputs.filingStatus], CA_RATES);
  } else if (st === "NY") {
    const nyTaxable = Math.max(
      0,
      netProfit - halfSETaxDeduction - NY_STANDARD[inputs.filingStatus],
    );
    stateIncomeTax = progressiveTax(nyTaxable, NY_EDGES[inputs.filingStatus], NY_RATES);
  } else if (st === "IL") {
    stateIncomeTax = flatStateTax(
      netProfit,
      halfSETaxDeduction,
      inputs.filingStatus,
      IL_STANDARD,
      IL_FLAT_RATE,
    );
  } else {
    const rate = FLAT_APPROX_RATE[st];
    if (rate !== undefined) {
      stateIncomeTax = flatStateTax(
        netProfit,
        halfSETaxDeduction,
        inputs.filingStatus,
        GENERIC_STATE_STANDARD,
        rate,
      );
    }
  }

  const totalTax =
    Math.round((selfEmploymentTax + federalIncomeTax + stateIncomeTax) * 100) / 100;
  const netTakeHome = Math.round((netProfit - totalTax) * 100) / 100;

  return {
    netProfit,
    selfEmploymentTax,
    federalIncomeTax,
    stateIncomeTax,
    totalTax,
    netTakeHome,
  };
}

export function getStateLabel(code: USStateCode): string {
  return STATE_LABELS[code];
}

/** URL path slug for routes under `/tax-calculator/[state]`, e.g. `california`. */
export function stateSlugFromCode(code: USStateCode): string {
  return STATE_PATH_SLUG_BY_CODE[code];
}

/**
 * Accepts a URL segment: two-letter code (`ca`), full-name slug (`california`), or hyphenated
 * multi-word state (`new-york`). Returns a valid code, or `null`.
 */
export function parseStateSlug(slug: string): USStateCode | null {
  const trimmed = slug.trim();
  const lower = trimmed.toLowerCase();
  const upper = trimmed.toUpperCase();

  if (STATE_CODE_SET.has(upper)) return upper as USStateCode;

  const fromPath = PATH_SLUG_TO_CODE.get(lower);
  if (fromPath) return fromPath;

  return null;
}
