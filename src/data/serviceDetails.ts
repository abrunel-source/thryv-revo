// Extended copy for each service detail page (keyed by slug).
export type ServiceDetail = {
  intro: string;
  included: string[];
  outcomes: { title: string; text: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'accounting-services': {
    intro:
      'Our fixed-fee monthly accounting gives you a complete finance function without the overhead of an in-house team. We handle the books, the compliance and the reporting — and give you the insight to grow.',
    included: [
      'Monthly bookkeeping and reconciliations',
      'VAT, income tax and provisional tax handled end-to-end',
      'Annual financial statements',
      'Cloud accounting software subscription',
      'Management accounts and growth advice',
    ],
    outcomes: [
      { title: 'One fixed fee', text: 'Predictable monthly pricing with no hourly billing or surprises.' },
      { title: 'Zero admin', text: 'We do every follow-up, filing and reconciliation for you.' },
      { title: 'Real insight', text: 'Clear reporting that helps you make confident decisions.' },
    ],
  },
  'bookkeeping-services': {
    intro:
      'Accurate, up-to-date books are the foundation of every healthy business. We keep your records clean and current so you always know exactly where you stand.',
    included: [
      'Transaction capture and categorisation',
      'Bank and credit-card reconciliations',
      'Accounts payable and receivable tracking',
      'Cloud bookkeeping with real-time dashboards',
      'Monthly close and reporting',
    ],
    outcomes: [
      { title: 'Always current', text: 'Real-time books, not a year-end scramble.' },
      { title: 'Save time', text: 'Reclaim hours every week by outsourcing the admin.' },
      { title: 'Audit-ready', text: 'Clean records that make tax and audits painless.' },
    ],
  },
  'tax-services': {
    intro:
      'SARS compliance is intricate and ever-changing. Our chartered accountants keep you compliant, optimised and penalty-free across income tax, provisional tax and VAT.',
    included: [
      'Income tax and provisional tax calculations and submissions',
      'VAT registration, preparation and submission',
      'SARS correspondence and dispute handling',
      'Tax planning to legally minimise your liability',
      'Deadline management so you never miss a filing',
    ],
    outcomes: [
      { title: 'Stay compliant', text: 'Every return filed correctly and on time.' },
      { title: 'Pay less, legally', text: 'Proactive planning that optimises your tax position.' },
      { title: 'No penalties', text: 'We manage every SARS deadline for you.' },
    ],
  },
  'payroll-services': {
    intro:
      'Payroll is rigorous and time-consuming. We process it accurately and handle all SARS and Department of Labour submissions so your team is paid right, every time.',
    included: [
      'Monthly payroll processing and payslips',
      'PAYE, UIF and SDL submissions to SARS',
      'Department of Labour — WCA and UIF registration',
      'Leave and statutory deduction management',
      'EMP201 and EMP501 reconciliations',
    ],
    outcomes: [
      { title: 'Accurate & on time', text: 'Your team paid correctly, every cycle.' },
      { title: 'Fully compliant', text: 'All statutory submissions handled for you.' },
      { title: 'Less risk', text: 'Avoid costly payroll and compliance errors.' },
    ],
  },
  'audit-services': {
    intro:
      'An audit provides the highest level of assurance over your financial statements — giving investors, lenders and regulators confidence in your numbers.',
    included: [
      'Statutory and voluntary audits',
      'Risk assessment and audit planning',
      'Substantive testing and verification',
      'Clear audit reports and recommendations',
      'Guidance on improving internal controls',
    ],
    outcomes: [
      { title: 'Build trust', text: 'Reasonable assurance that stakeholders rely on.' },
      { title: 'Find insight', text: 'Uncover risks and opportunities in your finances.' },
      { title: 'Stay compliant', text: 'Meet Companies Act audit requirements with ease.' },
    ],
  },
  'independent-review': {
    intro:
      'For companies that do not require a full audit, an independent review is a cost-effective way to satisfy the Companies Act and reassure your stakeholders.',
    included: [
      'Public Interest Score assessment',
      'Independent review engagement and reporting',
      'Limited-assurance financial review',
      'Reportable irregularity guidance',
      'Companies Act compliance',
    ],
    outcomes: [
      { title: 'Cost-effective', text: 'Compliance assurance without the cost of a full audit.' },
      { title: 'Compliant', text: 'Meet your obligations under the Companies Act.' },
      { title: 'Credible', text: 'Independent assurance your stakeholders trust.' },
    ],
  },
  'financial-statement-preparation': {
    intro:
      'Professionally prepared annual financial statements unlock the power of your financial data — for compliance, funding and better decisions.',
    included: [
      'Income statement, balance sheet and cash flow',
      'Statement of changes in equity',
      'IFRS / IFRS for SMEs compliant statements',
      'Notes and disclosures',
      'Director and stakeholder-ready reporting',
    ],
    outcomes: [
      { title: 'Funding-ready', text: 'Statements that satisfy banks and investors.' },
      { title: 'Compliant', text: 'Prepared to the correct reporting framework.' },
      { title: 'Clear', text: 'Understand your true financial position.' },
    ],
  },
  'company-secretary': {
    intro:
      'Stay on the right side of CIPC and statutory compliance. We manage your corporate secretarial obligations so you can focus on running the business.',
    included: [
      'CIPC annual returns',
      'Company registration and amendments',
      'Maintenance of statutory registers',
      'Director and shareholder changes',
      'Beneficial ownership filings',
    ],
    outcomes: [
      { title: 'Compliant', text: 'Never miss a CIPC deadline again.' },
      { title: 'Organised', text: 'Statutory records kept accurate and current.' },
      { title: 'Hands-off', text: 'We handle the paperwork end-to-end.' },
    ],
  },
  'finance-consultancy-services': {
    intro:
      'Beyond compliance, we give you the strategic financial expertise to plan, forecast and grow with confidence.',
    included: [
      'Budgeting and cash-flow forecasting',
      'Management accounts and KPI reporting',
      'Business planning and scenario modelling',
      'Funding and investment readiness',
      'Profitability and cost analysis',
    ],
    outcomes: [
      { title: 'Plan ahead', text: 'Forecasts that help you steer the business.' },
      { title: 'Grow smarter', text: 'Data-driven advice for better decisions.' },
      { title: 'Be ready', text: 'Investor- and lender-ready financials.' },
    ],
  },
  'employer-of-record': {
    intro:
      'Expand into South Africa without setting up a local entity. As your Employer of Record, we legally employ your team and handle payroll, tax and compliance.',
    included: [
      'Compliant local employment contracts',
      'Payroll and statutory submissions',
      'Tax, UIF and benefits administration',
      'Onboarding and HR compliance',
      'Ongoing labour-law compliance',
    ],
    outcomes: [
      { title: 'Hire fast', text: 'Employ in South Africa in days, not months.' },
      { title: 'No entity needed', text: 'Skip the cost and admin of a local company.' },
      { title: 'Fully compliant', text: 'We carry the employment compliance burden.' },
    ],
  },
};
