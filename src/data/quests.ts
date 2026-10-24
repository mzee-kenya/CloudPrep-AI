import type { Quest } from '../types';

export const quests: Quest[] = [
  {
    id: 'quest-student-portal',
    title: 'Cloud Quest: The University Student Portal',
    summary:
      'A Nairobi university wants a student records portal. Make the right architectural and governance decisions to finish the quest.',
    topicIds: ['cloud-models', 'shared-responsibility', 'resource-groups'],
    xpReward: 30,
    steps: [
      {
        id: 'step-1',
        scenario:
          'The university has a small IT team. They want to deploy a web app quickly without managing servers or the operating system.',
        question: 'Which Azure service model best fits this need?',
        options: [
          { id: 'a', text: 'IaaS - provision virtual machines and manage everything' },
          { id: 'b', text: 'PaaS - use a managed app platform' },
          { id: 'c', text: 'On-premises servers in the campus basement' },
          { id: 'd', text: 'SaaS - buy an unrelated productivity suite' },
        ],
        correctOptionId: 'b',
        explanation:
          'PaaS (for example Azure App Service) lets the team deploy code while Microsoft manages the servers, OS, and runtime. That matches a small team that wants speed without infrastructure work.',
      },
      {
        id: 'step-2',
        scenario:
          'The portal stores student records. The team debates who is responsible for protecting that data once it is in Azure.',
        question: 'In the shared responsibility model, who protects the student data itself?',
        options: [
          { id: 'a', text: 'Microsoft, because the data lives in Azure' },
          { id: 'b', text: 'The university, with Microsoft protecting the underlying platform' },
          { id: 'c', text: 'Nobody - cloud data is public by default' },
          { id: 'd', text: 'The students, because they own their records' },
        ],
        correctOptionId: 'b',
        explanation:
          'The customer is always responsible for their own data, identities, and access configuration. Microsoft secures the physical and platform layers, but data classification, access, and governance remain with the university.',
      },
      {
        id: 'step-3',
        scenario:
          'The team wants to delete a temporary test environment. All test servers live in one resource group.',
        question: 'What should the team expect when deleting that resource group?',
        options: [
          { id: 'a', text: 'Only the empty group is removed' },
          { id: 'b', text: 'All resources inside the group are deleted with it' },
          { id: 'c', text: 'Resources move automatically to a default group' },
          { id: 'd', text: 'Nothing is deleted until the subscription expires' },
        ],
        correctOptionId: 'b',
        explanation:
          'Deleting a resource group deletes every resource it contains and cannot be undone. This is why temporary environments should be isolated in their own resource group.',
      },
    ],
  },
  {
    id: 'quest-online-shop',
    title: 'Cloud Quest: The Kenyan Online Shop',
    summary:
      'A growing online shop in Mombasa has unpredictable traffic around sale days. Help the owners choose resilient and elastic options.',
    topicIds: ['azure-regions', 'shared-responsibility', 'cloud-concepts-01'],
    xpReward: 30,
    steps: [
      {
        id: 'step-1',
        scenario:
          'Traffic spikes during flash sales, then drops. The owners do not want to pay for idle capacity all month.',
        question: 'Which cloud characteristic helps most here?',
        options: [
          { id: 'a', text: 'Elasticity with consumption-based pricing' },
          { id: 'b', text: 'A fixed number of on-premises servers' },
          { id: 'c', text: 'Buying a bigger office' },
          { id: 'd', text: 'Storing backups on USB drives' },
        ],
        correctOptionId: 'a',
        explanation:
          'Elasticity lets resources scale with demand, and consumption-based pricing means the shop pays for what it uses. That suits spiky sale-day traffic.',
      },
      {
        id: 'step-2',
        scenario:
          'The shop wants protection if one datacenter in a region fails, while keeping the application in the same region.',
        question: 'Which Azure construct provides this?',
        options: [
          { id: 'a', text: 'Availability Zones within the region' },
          { id: 'b', text: 'A single virtual machine' },
          { id: 'c', text: 'A resource lock' },
          { id: 'd', text: 'A tag on the subscription' },
        ],
        correctOptionId: 'a',
        explanation:
          'Availability Zones are physically separate datacenters within a region. Distributing across zones protects against a single datacenter failure.',
      },
      {
        id: 'step-3',
        scenario:
          'The shop uses a SaaS payment dashboard and assumes Microsoft handles all security.',
        question: 'Which statement is the most accurate?',
        options: [
          { id: 'a', text: 'SaaS removes all customer security responsibilities' },
          { id: 'b', text: 'The provider secures the service, but the shop still protects users, data, and access' },
          { id: 'c', text: 'SaaS means data is automatically public' },
          { id: 'd', text: 'The shop must patch the provider datacenters' },
        ],
        correctOptionId: 'b',
        explanation:
          'In SaaS the provider manages the application and platform, but the customer remains responsible for identities, data governance, and who can access the service.',
      },
    ],
  },
];
