import type { Flashcard } from '../types';

export const flashcards: Flashcard[] = [
  {
    id: 'f1',
    topicId: 'cloud-concepts-01',
    front: 'What is cloud computing?',
    back: 'Delivery of computing services over the internet with pay-as-you-go pricing.',
    mnemonic: 'On-demand access to IT resources via internet'
  },
  {
    id: 'f2',
    topicId: 'cloud-models',
    front: 'IaaS vs PaaS vs SaaS - which manages the OS?',
    back: 'IaaS: You manage OS. PaaS: Provider manages OS. SaaS: Provider manages OS.',
    mnemonic: 'More management responsibility as you go down? No - IaaS = most control',
    example: 'IaaS: Virtual Machines, PaaS: App Service, SaaS: Microsoft 365'
  },
  {
    id: 'f3',
    topicId: 'shared-responsibility',
    front: 'Who is always responsible for customer data?',
    back: 'The customer - always responsible for data regardless of service model.',
    mnemonic: 'Your data = your responsibility'
  },
  {
    id: 'f4',
    topicId: 'azure-regions',
    front: 'Difference between Availability Zone and Region Pair?',
    back: 'Availability Zone: separate datacenters within SAME region (for high availability). Region Pair: two different regions (for disaster recovery).',
    mnemonic: 'AZ = same region, different buildings. Region Pair = different regions, different cities.'
  },
  {
    id: 'f5',
    topicId: 'entra-id',
    front: 'Authentication vs Authorization',
    back: 'Authentication = Who are you? (verify identity). Authorization = What can you do? (permissions).',
    mnemonic: 'AuthN = identity verification, AuthZ = access rights'
  },
  {
    id: 'f6',
    topicId: 'rbac',
    front: 'What is least privilege principle?',
    back: 'Grant users only the minimum permissions needed to do their job - nothing more.',
    mnemonic: 'Need to know / need to access only'
  }
];
