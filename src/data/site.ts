// Central site configuration — brand, contact, navigation, services & pricing.
export const site = {
  name: 'Thryv',
  legalName: 'Thryv Accountants (Pty) Ltd',
  tagline: 'Accounting firm in South Africa',
  description:
    'Thryv is a chartered accounting firm in Cape Town & Stellenbosch helping South African small businesses grow with fixed-fee accounting, bookkeeping, tax, payroll and advisory services.',
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
      'Comprehensive monthly accounting that takes the workload and stress off your plate — bookkeeping, reporting, compliance and advice in one fixed package.',
    icon: 'calculator',
  },
  {
    slug: 'bookkeeping-services',
    title: 'Bookkeeping',
    tagline: 'Keep your finances on track',
    summary:
      'Accurate, up-to-date books so you always know where your business stands. Outsource the admin and reclaim your time.',
    icon: 'book',
  },
  {
    slug: 'tax-services',
    title: 'Tax Services',
    tagline: 'SARS compliance made simple',
    summary:
      'Navigate income tax, provisional tax and VAT with expert guidance that keeps you compliant and optimised.',
    icon: 'receipt',
  },
  {
    slug: 'payroll-services',
    title: 'Payroll',
    tagline: 'Accurate, compliant payroll',
    summary:
      'Streamlined payroll processing and SARS / Department of Labour submissions, so your team is paid right and on time.',
    icon: 'users',
  },
  {
    slug: 'audit-services',
    title: 'Audit Services',
    tagline: 'Transparent financial assurance',
    summary:
      'Independent audits that uncover insight and give investors, lenders and regulators confidence in your numbers.',
    icon: 'shield',
  },
  {
    slug: 'independent-review',
    title: 'Independent Review',
    tagline: 'Trustworthy evaluations',
    summary:
      'A cost-effective alternative to a full audit that satisfies the Companies Act and reassures your stakeholders.',
    icon: 'search',
  },
  {
    slug: 'financial-statement-preparation',
    title: 'Financial Statements',
    tagline: 'Precise, compliant statements',
    summary:
      'Professionally prepared annual financial statements that unlock the power of your financial data.',
    icon: 'chart',
  },
  {
    slug: 'company-secretary',
    title: 'Company Secretary',
    tagline: 'Corporate compliance handled',
    summary:
      'CIPC annual returns and statutory compliance managed for you, so you can focus on growth.',
    icon: 'briefcase',
  },
  {
    slug: 'finance-consultancy-services',
    title: 'Finance Consultancy',
    tagline: 'Strategic financial expertise',
    summary:
      'Timely, precise financial insight and analytics to help you make confident decisions and grow.',
    icon: 'compass',
  },
  {
    slug: 'employer-of-record',
    title: 'Employer of Record',
    tagline: 'Hire in South Africa, compliantly',
    summary:
      'Expand into South Africa without setting up an entity — we handle employment, payroll and compliance.',
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
