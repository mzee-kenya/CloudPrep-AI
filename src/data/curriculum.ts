import type { CurriculumTopic } from '../types';

export const curriculumTopics: CurriculumTopic[] = [
  {
    id: 'cloud-concepts-01',
    title: 'Cloud Computing Fundamentals',
    category: 'cloud-concepts',
    description: 'Understand what cloud computing is and why organizations use it.',
    learningObjectives: [
      'Define cloud computing',
      'Understand the benefits of cloud computing',
      'Differentiate between on-premises and cloud'
    ],
    explanation: 'Cloud computing is the delivery of computing services (servers, storage, databases, networking, software, analytics, and intelligence) over the internet with pay-as-you-go pricing.',
    analogy: 'Like using electricity from a power grid - you pay for what you use without building your own power plant.',
    analogyNote: 'The analogy is similar but unlike electricity, cloud services give you different levels of control over your resources.',
    commonMisconception: "Cloud is not \"someone else's computer\" in a simplistic sense - it's a distributed, managed infrastructure with specific responsibilities.",
    memoryAid: 'Remember: On-demand, self-service, broad network access, resource pooling, rapid elasticity, measured service (NIST characteristics)',
    relatedTopics: ['cloud-models'],
    order: 1
  },
  {
    id: 'cloud-models',
    title: 'Cloud Service Models (IaaS, PaaS, SaaS)',
    category: 'cloud-concepts',
    description: 'Understand the differences between Infrastructure, Platform, and Software as a Service.',
    learningObjectives: [
      'Distinguish between IaaS, PaaS, and SaaS',
      'Understand shared responsibility in each model',
      'Choose appropriate model for different scenarios'
    ],
    explanation: 'IaaS gives you virtualized computing resources; PaaS provides a platform for developing apps; SaaS delivers ready-to-use software over the internet.',
    analogy: 'Think of building a meal: IaaS = renting a kitchen, PaaS = using a meal-kit service, SaaS = ordering takeout.',
    analogyNote: 'This helps understand responsibility levels, though real cloud services have more nuance.',
    commonMisconception: 'Responsibilities vary - in SaaS, you manage almost nothing; in IaaS, you manage most of the OS and above.',
    memoryAid: 'ISP analogy: IaaS (Infrastructure), PaaS (Platform), SaaS (Software)',
    relatedTopics: ['shared-responsibility', 'cloud-concepts-01'],
    order: 2
  },
  {
    id: 'shared-responsibility',
    title: 'Shared Responsibility Model',
    category: 'cloud-concepts',
    description: 'Understand who is responsible for security in different cloud models.',
    learningObjectives: [
      'Explain the shared responsibility model',
      'Know responsibilities differ by model (IaaS/PaaS/SaaS)',
      'Understand that you always retain some responsibility'
    ],
    explanation: 'Security is a shared responsibility between the cloud provider and the customer. The division depends on whether using IaaS, PaaS, or SaaS.',
    analogy: 'Like renting an apartment - landlord secures the building, but you secure your belongings and lock your door.',
    analogyNote: 'Exact division depends on your specific service and configuration.',
    commonMisconception: 'Moving to cloud does not mean "no security responsibility" - you always have responsibilities.',
    memoryAid: 'Customer is always responsible for data, identities, devices, and accounts',
    relatedTopics: ['cloud-models'],
    order: 3
  },
  {
    id: 'azure-regions',
    title: 'Azure Regions, Availability Zones & Region Pairs',
    category: 'azure-architecture',
    description: "Understand Azure's global infrastructure for availability and disaster recovery.",
    learningObjectives: [
      'Define Azure regions and region pairs',
      'Understand availability zones',
      'Explain how they improve resilience'
    ],
    explanation: 'Azure has datacenters grouped into regions. Availability Zones are physically separate datacenters within a region. Region pairs provide disaster recovery across regions.',
    analogy: 'Like having multiple branches of a bank in different buildings (AZs) and different cities (region pairs) for resilience.',
    analogyNote: 'Not all regions have availability zones or the same number of them.',
    commonMisconception: "A region is not a single datacenter - it's a set of datacenters in a defined geographic area.",
    memoryAid: 'AZ = Availability Zone (separate datacenters in same region). Region Pair = two regions for DR.',
    relatedTopics: ['resource-groups'],
    order: 10
  },
  {
    id: 'resource-groups',
    title: 'Azure Resources, Resource Groups & Subscriptions',
    category: 'azure-architecture',
    description: 'Understand how Azure organizes and manages resources.',
    learningObjectives: [
      'Explain resources and resource groups',
      'Understand subscriptions and management groups',
      'Know how organization works in Azure'
    ],
    explanation: 'A resource is an Azure service instance. Resource groups logically contain related resources. Subscriptions provide access control and billing boundaries.',
    analogy: 'Like folders on a computer - resources are files, resource groups are folders organizing related items, subscriptions are separate drives with billing.',
    analogyNote: 'A resource must belong to exactly one resource group.',
    commonMisconception: 'Deleting a resource group deletes all resources in it - this is irreversible.',
    memoryAid: 'RG = container for resources that share lifecycle',
    relatedTopics: ['azure-regions'],
    order: 11
  },
  {
    id: 'entra-id',
    title: 'Microsoft Entra ID (Azure AD)',
    category: 'azure-management',
    description: 'Understand identity and access management in Azure.',
    learningObjectives: [
      'Define Microsoft Entra ID',
      'Understand authentication vs authorization',
      'Explain MFA and RBAC basics'
    ],
    explanation: "Microsoft Entra ID is Azure's cloud-based identity and access management service. It handles authentication (who you are) and can control authorization (what you can access).",
    analogy: 'Like a security desk at a building - checks your ID (authentication) then gives access to certain floors/rooms based on permissions (authorization).',
    analogyNote: 'MFA adds extra verification like showing ID plus a badge code.',
    commonMisconception: 'Authentication is different from authorization - verifying identity vs granting permissions.',
    memoryAid: 'AuthN = Authentication (identity), AuthZ = Authorization (permissions)',
    relatedTopics: ['rbac'],
    order: 20
  },
  {
    id: 'rbac',
    title: 'Role-Based Access Control (RBAC)',
    category: 'azure-management',
    description: 'Understand how to grant appropriate access in Azure.',
    learningObjectives: [
      'Explain RBAC concept',
      'Understand roles, scope, and assignments',
      'Apply principle of least privilege'
    ],
    explanation: 'RBAC allows you to grant users only the permissions they need to do their job at the appropriate scope (management group, subscription, resource group, or resource).',
    analogy: 'Like giving different keys to different people - janitor gets certain keys, manager gets more, CEO gets all needed keys.',
    analogyNote: 'Follow principle of least privilege - give minimum access needed.',
    commonMisconception: 'RBAC is about who can do what, not just who can sign in.',
    memoryAid: 'Least privilege = give minimum permissions necessary',
    relatedTopics: ['entra-id'],
    order: 21
  }
];
