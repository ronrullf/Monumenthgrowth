// International format, digits only, no "+".
export const WHATSAPP_NUMBER = '584248166789';

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const MESSAGES = {
  default:
    "Hi Monumenth Growth, I'd like to get more booked remodeling jobs. Can we talk?",
  hero:
    "Hi Monumenth Growth — I want more booked remodeling projects from social media. Can we talk?",
  problem:
    'Hi Monumenth Growth — my content gets views but no booked jobs. Can you help?',
  howItWorks:
    'Hi Monumenth Growth — I want the done-for-you content + funnel system. Where do we start?',
  proof:
    'Hi Monumenth Growth — I run a kitchen & bath remodeling business and want to know if this fits. Can we talk?',
  offer:
    "Hi Monumenth Growth — I'm interested in the done-for-you package. Can you send details?",
  faq:
    'Hi Monumenth Growth — I have a question about how this works. Can we talk?',
  finalCta:
    "Hi Monumenth Growth — I'm ready to turn my footage into booked jobs. Let's talk.",
} as const;
