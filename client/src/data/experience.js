// Mirrors the Experience API model (Phase 4) so the source can switch to the API.
// Dates are ISO "YYYY-MM"; endDate null means "Present".
export const experience = [
  {
    id: 'generali-sde',
    company: 'Generali Central Insurance',
    role: 'Software Development Engineer',
    level: 'Executive',
    location: 'Navi Mumbai, Maharashtra',
    startDate: '2024-07',
    endDate: null,
    description:
      'Building and supporting enterprise insurance applications across .NET Core APIs, SQL Server and Angular / React front ends — delivering change and service requests from development through UAT to production.',
    highlights: [
      'Develop full-stack features for internal insurance-operations applications with C#, .NET Core, Angular and React.',
      'Own a GitHub Actions CI/CD pipeline that builds and deploys to UAT through pull-request and merge workflows, removing manual deployment steps.',
      'Cut SQL Server query latency by 15% through query analysis, index optimisation and stored-procedure refactoring on high-traffic paths.',
      'Integrated and verified 30+ REST and SOAP API endpoints with Postman, working with microservice and API-gateway patterns.',
      'Triaged and resolved 50+ production incidents with a focus on root-cause fixes that prevent repeat failures.',
      'Deliver across 5+ projects in Agile and Waterfall tracks alongside business analysts, QA engineers and product owners.',
      'Applied generative-AI tooling to QA workflows, reducing manual testing effort by about 20% per sprint.',
    ],
    technologies: [
      'C#',
      '.NET Core',
      'ASP.NET',
      'Angular',
      'React',
      'SQL Server',
      'Stored Procedures',
      'REST',
      'SOAP',
      'GitHub Actions',
      'IIS',
      'Salesforce',
    ],
    order: 1,
  },
];
