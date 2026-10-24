import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'q1',
    topicId: 'cloud-concepts-01',
    category: 'cloud-concepts',
    difficulty: 'beginner',
    type: 'conceptual',
    questionText: 'What is cloud computing?',
    options: [
      { id: 'a', text: 'Using a local server in your office only' },
      { id: 'b', text: 'Delivery of computing services over the internet with pay-as-you-go pricing' },
      { id: 'c', text: 'Installing software on every computer manually' },
      { id: 'd', text: 'Storing files only on USB drives' }
    ],
    correctAnswerId: 'b',
    explanation: 'Cloud computing delivers computing services (servers, storage, databases, networking, software) over the internet with consumption-based pricing.',
    distractorExplanations: {
      'a': 'That describes on-premises/local infrastructure, not cloud computing.',
      'c': 'That is manual software installation, not cloud computing delivery model.',
      'd': 'That is local portable storage, not cloud computing.'
    },
    learningObjective: 'Define cloud computing'
  },
  {
    id: 'q2',
    topicId: 'cloud-models',
    category: 'cloud-concepts',
    difficulty: 'beginner',
    type: 'comparison',
    questionText: 'Which cloud service model gives you the most control over the operating system?',
    options: [
      { id: 'a', text: 'SaaS' },
      { id: 'b', text: 'PaaS' },
      { id: 'c', text: 'IaaS' },
      { id: 'd', text: 'All provide equal control' }
    ],
    correctAnswerId: 'c',
    explanation: 'IaaS (Infrastructure as a Service) gives you the most control - you manage the OS, middleware, runtime, and applications. The provider manages virtualization, servers, storage, and networking.',
    distractorExplanations: {
      'a': 'SaaS gives you the least control - you only configure application settings.',
      'b': 'PaaS gives you control over applications and data, but the provider manages OS and runtime.',
      'd': 'Control differs significantly across the models.'
    },
    learningObjective: 'Distinguish between IaaS, PaaS, and SaaS'
  },
  {
    id: 'q3',
    topicId: 'shared-responsibility',
    category: 'cloud-concepts',
    difficulty: 'beginner',
    type: 'conceptual',
    questionText: 'In the shared responsibility model, who is always responsible for securing customer data?',
    options: [
      { id: 'a', text: 'The cloud provider only' },
      { id: 'b', text: 'The customer only' },
      { id: 'c', text: 'Neither party' },
      { id: 'd', text: 'It depends on the weather' }
    ],
    correctAnswerId: 'b',
    explanation: 'The customer is always responsible for their data, regardless of whether using IaaS, PaaS, or SaaS. The division of other responsibilities changes by model.',
    distractorExplanations: {
      'a': 'The provider secures the infrastructure, but you are responsible for your data.',
      'c': "Data security is always the customer's responsibility.",
      'd': 'Not related to weather.'
    },
    learningObjective: 'Explain shared responsibility model'
  },
  {
    id: 'q4',
    topicId: 'cloud-models',
    category: 'cloud-concepts',
    difficulty: 'intermediate',
    type: 'scenario',
    questionText: 'You want to use a ready-made email service without managing servers or applications. Which model should you choose?',
    options: [
      { id: 'a', text: 'IaaS' },
      { id: 'b', text: 'PaaS' },
      { id: 'c', text: 'SaaS' },
      { id: 'd', text: 'On-premises' }
    ],
    correctAnswerId: 'c',
    explanation: 'SaaS (Software as a Service) provides ready-to-use software like Microsoft 365/Outlook - you just use it, no infrastructure or app management needed.',
    distractorExplanations: {
      'a': 'IaaS would mean you build/manage email infrastructure yourself.',
      'b': 'PaaS would mean you develop the email application on a platform.',
      'd': 'On-premises means you manage everything yourself.'
    },
    learningObjective: 'Choose appropriate model for different scenarios'
  },
  {
    id: 'q5',
    topicId: 'azure-regions',
    category: 'azure-architecture',
    difficulty: 'beginner',
    type: 'conceptual',
    questionText: 'What are Azure Availability Zones?',
    options: [
      { id: 'a', text: 'Different Azure subscriptions' },
      { id: 'b', text: 'Physically separate datacenters within an Azure region' },
      { id: 'c', text: 'Different pricing tiers' },
      { id: 'd', text: 'Backup storage locations' }
    ],
    correctAnswerId: 'b',
    explanation: 'Availability Zones are physically separate datacenters within the same Azure region, each with independent power, cooling, and networking for high availability.',
    distractorExplanations: {
      'a': 'Subscriptions are billing/access boundaries, not physical infrastructure.',
      'c': 'Pricing tiers are different from infrastructure organization.',
      'd': 'They provide high availability, not just backup storage locations.'
    },
    learningObjective: 'Understand availability zones'
  },
  {
    id: 'q6',
    topicId: 'resource-groups',
    category: 'azure-architecture',
    difficulty: 'beginner',
    type: 'conceptual',
    questionText: 'What happens if you delete a resource group?',
    options: [
      { id: 'a', text: 'Nothing happens' },
      { id: 'b', text: 'Only the resource group container is deleted' },
      { id: 'c', text: 'All resources in that resource group are deleted' },
      { id: 'd', text: 'Only resources from the last 24 hours are deleted' }
    ],
    correctAnswerId: 'c',
    explanation: 'Deleting a resource group deletes the resource group and all resources contained within it. This action is irreversible.',
    distractorExplanations: {
      'a': 'Deletion has significant impact.',
      'b': 'The resources are also deleted, not just the container.',
      'd': 'All resources are deleted regardless of age.'
    },
    learningObjective: 'Understand resource groups'
  },
  {
    id: 'q7',
    topicId: 'entra-id',
    category: 'azure-management',
    difficulty: 'beginner',
    type: 'comparison',
    questionText: 'What is the difference between authentication and authorization?',
    options: [
      { id: 'a', text: 'They mean the same thing' },
      { id: 'b', text: 'Authentication verifies identity; authorization determines permissions' },
      { id: 'c', text: 'Authentication is for admins only' },
      { id: 'd', text: 'Authorization comes before authentication' }
    ],
    correctAnswerId: 'b',
    explanation: 'Authentication (AuthN) confirms who you are (verifying identity). Authorization (AuthZ) determines what you are allowed to do (granting permissions).',
    distractorExplanations: {
      'a': 'They are different concepts.',
      'c': 'Authentication applies to all users.',
      'd': 'Authentication always happens first to verify identity before authorization.'
    },
    learningObjective: 'Understand authentication vs authorization'
  },
  {
    id: 'q8',
    topicId: 'rbac',
    category: 'azure-management',
    difficulty: 'intermediate',
    type: 'conceptual',
    questionText: 'What does the principle of least privilege mean in RBAC?',
    options: [
      { id: 'a', text: 'Give everyone admin access' },
      { id: 'b', text: 'Give users only the permissions they need to perform their job' },
      { id: 'c', text: 'Give access based on seniority only' },
      { id: 'd', text: 'Deny all access by default with no exceptions' }
    ],
    correctAnswerId: 'b',
    explanation: 'The principle of least privilege means granting users the minimum permissions necessary to complete their tasks - nothing more.',
    distractorExplanations: {
      'a': 'That violates least privilege and increases security risk.',
      'c': 'Access should be based on job requirements, not just seniority.',
      'd': 'While deny-by-default is good practice, least privilege means granting minimum necessary permissions.'
    },
    learningObjective: 'Apply principle of least privilege'
  }
];
