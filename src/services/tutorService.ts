export interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface TutorResponse {
  content: string;
  source: 'live' | 'fallback';
  notes?: string[];
}

const TUTOR_SYSTEM_PROMPT = `You are CloudPrep AI Tutor, a patient senior Azure Fundamentals (AZ-900) instructor teaching beginners.
Follow this teaching structure every time:
1. Identify the learner's question/misconception
2. Plain explanation
3. Relatable analogy (prefer African contexts when helpful, explain where analogy stops)
4. Azure example
5. Common mistake
6. Check your understanding (one short question)

Constraints:
- Do NOT invent official Microsoft exam questions, exam dumps, or service guarantees.
- Do NOT claim certification pass probability.
- Prefer accuracy over completeness. If unsure, say so and point to Learn/Practice.
- Focus on understanding and relationships, not memorisation alone.
- Be encouraging without guaranteeing results.
- Avoid exposing secrets.
`;

const buildFallback = (question: string): TutorResponse => {
  const q = question.toLowerCase();
  if (q.includes('iaas') && q.includes('paas') && q.includes('saas')) {
    return {
      source: 'fallback',
      content:
        "PLAIN EXPLANATION:\nIaaS gives you virtual infrastructure, PaaS gives you a managed platform to build apps, SaaS gives you ready-to-use software.\n\nANALOGY (African context):\nThink of running a restaurant in Kenya - IaaS is renting an empty kitchen (you supply and manage most things), PaaS is a food court kitchen with equipment (you focus on your recipe), SaaS is ordering food delivery (you just consume).\n\nWHERE THE ANALOGY STOPS:\nResponsibilities shift gradually and you can mix models; real Azure services have more nuance.\n\nAZURE EXAMPLE:\nAzure VMs (IaaS), Azure App Service (PaaS), Microsoft 365 (SaaS).\n\nCOMMON MISTAKE:\nAssuming \"cloud = SaaS only\". AZ-900 expects knowing all three models.\n\nCHECK YOUR UNDERSTANDING:\nIf you want to deploy a website without managing the web server, which model fits best?",
    };
  }
  if (q.includes('shared responsibility')) {
    return {
      source: 'fallback',
      content:
        "PLAIN EXPLANATION:\nSecurity is shared between you and Microsoft. The split changes by service model, but you always have some responsibility.\n\nANALOGY (African context):\nLike renting a stall in a market - the market secures the building and gates; you secure your goods, lock your stall, and control who gets a key.\n\nWHERE THE ANALOGY STOPS:\nIn the cloud, you must configure identity, access, and data controls yourself.\n\nAZURE EXAMPLE:\nIn all models you protect data and identities. In IaaS you also patch the OS; in PaaS/SaaS Microsoft manages more of the stack.\n\nCOMMON MISTAKE:\n\"Moving to cloud means Microsoft handles ALL security\" - false.\n\nCHECK YOUR UNDERSTANDING:\nWith Microsoft 365 (SaaS), who is responsible for your user accounts and sharing permissions?",
    };
  }
  if (q.includes('region') && (q.includes('zone') || q.includes('availability'))) {
    return {
      source: 'fallback',
      content:
        "PLAIN EXPLANATION:\nAn Azure Region is a geographic area with datacenters. Availability Zones are physically separate datacenters within the same region.\n\nANALOGY (African context):\nLike a bank with branches across Nairobi (region). Within Nairobi, branches in different neighbourhoods in separate buildings with backup power are like availability zones.\n\nWHERE THE ANALOGY STOPS:\nAZs are far more isolated (separate power, cooling, networking) than typical bank branches.\n\nAZURE EXAMPLE:\nDeploying across Availability Zones improves high availability within a region.\n\nCOMMON MISTAKE:\nTreating \"region\" and \"availability zone\" as identical.\n\nCHECK YOUR UNDERSTANDING:\nFor high availability within the same region, would you use Availability Zones or two regions?",
    };
  }
  return {
    source: 'fallback',
    notes: ['AI not configured - using curated AZ-900 content'],
    content:
      `PLAIN EXPLANATION:\nI don't have a live AI endpoint configured in this environment, so I'm giving curated guidance.\n\nYour question: "${question}"\n\nSUGGESTED PATH:\n1. Open Learn to review related AZ-900 topics with explanations and analogies.\n2. Use Practice to test with original questions and read the explanations.\n3. Use Flashcards for active recall on concepts you keep missing.\n\nTEACHING TIP:\nFor AZ-900, focus on understanding relationships (who is responsible, when to use IaaS/PaaS/SaaS) rather than memorising service names.\n\nCHECK YOUR UNDERSTANDING:\nWhich area feels hardest right now - concepts, architecture, or management/governance? Start there.`,
  };
};

export class TutorService {
  private endpoint: string | undefined;
  private apiKey: string | undefined;

  constructor() {
    this.endpoint = (import.meta as any).env?.VITE_TUTOR_ENDPOINT;
    this.apiKey = (import.meta as any).env?.VITE_TUTOR_API_KEY;
  }

  async ask(question: string): Promise<TutorResponse> {
    const trimmed = question.trim();
    if (!trimmed) {
      return buildFallback('empty question');
    }

    if (this.endpoint && this.apiKey) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            system: TUTOR_SYSTEM_PROMPT,
            question: trimmed,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!res.ok) throw new Error(`Tutor request failed: ${res.status}`);
        const data = await res.json();
        const content = data?.answer ?? data?.content ?? data?.message;
        if (typeof content === 'string' && content.trim()) {
          return { source: 'live', content };
        }
        throw new Error('Invalid tutor response');
      } catch (err) {
        console.warn('Falling back to curated tutor content', err);
      }
    }

    return buildFallback(trimmed);
  }

  getStatus() {
    return {
      configured: Boolean(this.endpoint && this.apiKey),
      source: this.endpoint && this.apiKey ? ('live' as const) : ('fallback' as const),
    };
  }
}

export const tutorService = new TutorService();
export { TUTOR_SYSTEM_PROMPT };
