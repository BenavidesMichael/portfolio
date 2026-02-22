/**
 * Centralized technology constants — single source of truth
 * Referenced by skills.data.ts and experience.data.ts
 */
export const TECH = {
  // Frontend
  Angular: 'Angular',
  TypeScript: 'TypeScript',
  JavaScript: 'JavaScript',
  RxJS: 'RxJS',
  AngularMaterial: 'Angular Material',
  TailwindCSS: 'Tailwind CSS',
  Bootstrap: 'Bootstrap',
  MaterializeCSS: 'Materialize CSS',
  HTML_CSS_SASS: 'HTML / CSS / SASS',
  SASS: 'SASS',
  jQuery: 'jQuery',
  ngxTranslate: 'ngx-translate',

  // Backend
  NestJS: 'NestJS',
  DotNETCore: '.NET Core',
  DotNETFramework: '.NET Framework',
  ASPNETCore: 'ASP.NET Core',
  ASPNETMVC: 'ASP.NET MVC',
  EntityFramework: 'Entity Framework',
  EntityFrameworkCore: 'Entity Framework Core',
  Sequelize: 'Sequelize',
  WebAPI: 'Web API',
  SignalR: 'SignalR',
  PassportJS: 'Passport.js',
  JWT: 'JWT',
  NodeJS: 'Node.js',
  WindowsForms: 'Windows Forms',
  LINQ: 'LINQ',
  ExcelJS: 'ExcelJS',
  Umzug: 'Umzug',
  SendGrid: 'SendGrid',

  // Languages
  CSharp: 'C#',
  SQL: 'SQL (T-SQL / Oracle)',

  // Database
  MSSQLServer: 'MS SQL Server',
  OracleDB: 'Oracle DB',
  IBMDB2: 'IBM DB2',
  AzureSQL: 'Azure SQL',
  SQLServer: 'SQL Server',

  // Cloud & DevOps
  Azure: 'Azure',
  AzureAD: 'Azure AD / MSAL',
  AzureKeyVault: 'Azure Key Vault',
  AzureAppService: 'Azure App Service',
  AzureStorage: 'Azure Storage',
  AppInsights: 'Application Insights',
  ElasticAPM: 'Elastic APM',
  SonarQube: 'SonarQube',
  Git: 'Git / GitHub',
  Docker: 'Docker',

  // Tools & Quality
  Swagger: 'Swagger / OpenAPI',
  ESLint: 'ESLint',
  Husky: 'Husky / Commitlint',
  VSCode: 'VS Code',
  Jest: 'Jest',
  Cypress: 'Cypress',
  Moq: 'Moq',
  FluentValidation: 'FluentValidation',

  // Protocols & Patterns
  OAuth2: 'OAuth2 / Azure AD',
  SOAP: 'SOAP / WSDL',
  REST: 'REST',
  MicrosoftGraphAPI: 'Microsoft Graph API',

  // AI & LLM
  ClaudeCode: 'Claude Code',
  PromptEngineering: 'Prompt Engineering',
  CustomRulesSkills: 'Custom Rules & Skills',

  // Misc
  GoogleChart: 'Google Chart',
  FullCalendar: 'FullCalendar',
  DataTable: 'DataTable',
  iCalNET: 'iCal.NET',
  PDFMake: 'PDFMake',
  APPS72: 'APPS72',
  OracleFunctions: 'Oracle Functions',
  StoredProcedures: 'Stored Procedures',
  ngChart2: 'ngChart2',
} as const;

export type TechName = (typeof TECH)[keyof typeof TECH];
