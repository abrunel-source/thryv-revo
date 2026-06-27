// Central site configuration — brand, contact, navigation, services & pricing.
export const site = {
  name: 'Thryv',
  legalName: 'Thryv Accountants (Pty) Ltd',
  tagline: 'Small Business Accountants in Cape Town',
  description:
    'Thryv is a chartered accountant firm in Cape Town & Stellenbosch. We help South African small businesses grow with fixed-fee accounting, bookkeeping, tax, payroll and SARS compliance — all handled for one predictable monthly fee.',
  url: 'https://thryv.co.za',
  logo: '/img/thryv-logo.png',
  ogImage: '/img/og-image.webp',
  email: 'admin@thryv.co.za',
  phoneDisplay: '+27 73 142 1010',
  phoneHref: 'tel:+27731421010',
  locations: ['Cape Town', 'Stellenbosch'],
  founders: [
    { name: 'Arnaud Brunel', role: 'Founder' },
    { name: 'Conrad Botha', role: 'Co-Founder · Chartered Accountant (CA)' },
  ],
  social: {
    facebook: 'https://www.facebook.com/thryvCA',
    linkedin: 'https://www.linkedin.com/company/thryv-chartered-accountants-pty-ltd/',
    twitter: 'https://twitter.com/Thryv_capetown',
  },
};

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  icon: string;
};

export const services: Service[] = [
  {
    slug: 'accounting-services',
    title: 'Accounting Services',
    tagline: 'Fixed-fee monthly accounting',
    summary:
      'Fixed-fee accounting services for small businesses — bookkeeping, reporting, SARS compliance and advice in one monthly package, handled by chartered accountants.',
    icon: 'calculator',
  },
  {
    slug: 'bookkeeping-services',
    title: 'Bookkeeping',
    tagline: 'Keep your finances on track',
    summary:
      'Outsourced bookkeeping services that keep your books accurate and up to date, so you always know where your small business stands — and reclaim hours every week.',
    icon: 'book',
  },
  {
    slug: 'tax-services',
    title: 'Tax Services',
    tagline: 'SARS compliance made simple',
    summary:
      'Income tax, provisional tax and VAT handled by registered tax practitioners who keep your business compliant with SARS and legally pay less tax.',
    icon: 'receipt',
  },
  {
    slug: 'payroll-services',
    title: 'Payroll',
    tagline: 'Accurate, compliant payroll',
    summary:
      'Outsourced payroll services with PAYE, UIF, SDL and Department of Labour submissions handled, so your team is paid right and on time, every month.',
    icon: 'users',
  },
  {
    slug: 'audit-services',
    title: 'Audit Services',
    tagline: 'Transparent financial assurance',
    summary:
      'Independent statutory and voluntary audits that give investors, lenders and SARS confidence in your numbers and meet your Companies Act obligations.',
    icon: 'shield',
  },
  {
    slug: 'independent-review',
    title: 'Independent Review',
    tagline: 'A cost-effective audit alternative',
    summary:
      'For companies that don\'t need a full audit, an independent review satisfies the Companies Act and reassures your stakeholders — at a fraction of the cost.',
    icon: 'search',
  },
  {
    slug: 'financial-statement-preparation',
    title: 'Financial Statements',
    tagline: 'Precise, compliant statements',
    summary:
      'Annual financial statements prepared to IFRS for SMEs — funding-ready, SARS-compliant reporting that unlocks the real story behind your numbers.',
    icon: 'chart',
  },
  {
    slug: 'company-secretary',
    title: 'Company Secretary',
    tagline: 'Corporate compliance handled',
    summary:
      'Company secretary services covering CIPC annual returns, beneficial ownership filings and statutory registers — so you never miss a deadline.',
    icon: 'briefcase',
  },
  {
    slug: 'finance-consultancy-services',
    title: 'Finance Consultancy',
    tagline: 'Strategic financial expertise',
    summary:
      'Cash-flow forecasting, management accounts and business advice from a finance partner who helps small business owners make confident, data-driven decisions.',
    icon: 'compass',
  },
  {
    slug: 'employer-of-record',
    title: 'Employer of Record',
    tagline: 'Hire in South Africa, compliantly',
    summary:
      'Employer of Record services that let you hire and pay staff in South Africa without setting up an entity — we handle employment, payroll and compliance.',
    icon: 'globe',
  },
];

export type Package = {
  name: string;
  price: number;
  best?: boolean;
  blurb: string;
  features: string[];
};

export const packages: Package[] = [
  {
    name: 'Bronze',
    price: 3500,
    blurb: "For SMBs starting to grow their business.",
    features: [
      'Monthly bookkeeping (up to 50 transactions)',
      'Income Tax & Provisional Tax',
      'VAT returns prepared & submitted to SARS',
      'Cloud accounting software subscription',
    ],
  },
  {
    name: 'Silver',
    price: 5500,
    best: true,
    blurb: 'For businesses that need payroll & DoL submissions.',
    features: [
      'Monthly bookkeeping (up to 100 transactions)',
      'VAT returns prepared & submitted to SARS',
      'Payroll & SARS submissions (up to 5 employees)',
      'Department of Labour — WCA & UIF registration',
      'Income Tax & Provisional Tax',
      'Annual Financial Statement preparation',
      'Cloud accounting software subscription',
    ],
  },
  {
    name: 'Gold',
    price: 7500,
    blurb: 'The complete accounting solution for larger businesses.',
    features: [
      'Monthly bookkeeping (up to 200 transactions)',
      'VAT returns prepared & submitted to SARS',
      'Payroll & SARS submissions (up to 25 employees)',
      'Department of Labour — WCA & UIF registration',
      'Income Tax & Provisional Tax',
      'Annual Financial Statement preparation',
      'Company secretarial — CIPC annual return',
      'Quarterly management meetings',
      'Monthly management accounts',
    ],
  },
];

export const currency = 'R';
