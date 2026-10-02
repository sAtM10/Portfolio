// `primary: true` marks the stack used daily at work; it is highlighted in the UI.
const skill = (name, primary = false) => ({ name, primary });

export const skillGroups = [
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      skill('C#', true),
      skill('.NET', true),
      skill('.NET Core', true),
      skill('ASP.NET'),
      skill('REST APIs', true),
      skill('SOAP APIs', true),
      skill('Node.js'),
      skill('Express.js'),
      skill('Microservices'),
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      skill('Angular', true),
      skill('JavaScript (ES6+)', true),
      skill('React'),
      skill('Next.js'),
      skill('HTML'),
      skill('CSS'),
    ],
  },
  {
    id: 'database',
    title: 'Database',
    skills: [
      skill('SQL Server', true),
      skill('Stored Procedures', true),
      skill('Query Optimisation'),
      skill('MySQL'),
      skill('MongoDB'),
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery & DevOps',
    skills: [
      skill('GitHub Actions CI/CD'),
      skill('UAT & Production Deployment'),
      skill('IIS'),
      skill('API Gateway'),
      skill('TFS'),
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      skill('Git'),
      skill('Postman'),
      skill('Visual Studio'),
      skill('VS Code'),
      skill('JIRA'),
      skill('Salesforce'),
    ],
  },
  {
    id: 'practices',
    title: 'Practices',
    skills: [
      skill('Agile / Scrum'),
      skill('Waterfall'),
      skill('Unit & Integration Testing'),
      skill('API Testing'),
      skill('Root Cause Analysis'),
    ],
  },
];
