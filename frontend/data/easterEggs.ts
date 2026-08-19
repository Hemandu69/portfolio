export interface EasterEggConfig {
  id: string;
  title: string;
  messages: string[];
  reward?: string;
}

export const EASTER_EGGS: Record<string, EasterEggConfig> = {
  "egg-hero-status": {
    id: "egg-hero-status",
    title: "CONGRATULATIONS.",
    messages: [
      "You clicked something that absolutely did not need clicking. Thank you for your contribution.",
      "You investigated a piece of text. The text has requested legal representation.",
      "Congratulations. You just spent several seconds finding something I intentionally made useless."
    ],
    reward: "Reward: Nothing."
  },
  "egg-identity-heading": {
    id: "egg-identity-heading",
    title: "ACHIEVEMENT UNLOCKED",
    messages: [
      "You had nothing better to do.",
      "You clicked the thing. The thing has now been clicked. That's it.",
      "You have successfully demonstrated curiosity. Unfortunately, curiosity has no monetary value."
    ],
    reward: "+0 XP | Career impact: negligible"
  },
  "egg-currently-heading": {
    id: "egg-currently-heading",
    title: "YOU FOUND AN EASTER EGG.",
    messages: [
      "Unfortunately, it is just an egg. 🥚 Please continue with your life.",
      "SECRET DISCOVERED. Unfortunately, the secret is that there was no secret.",
      "IMPORTANT SYSTEM UPDATE: You have gained 0 items, 0 points, 0 money, 0 useful information."
    ],
    reward: "Inventory: Unchanged."
  },
  "egg-projects-label": {
    id: "egg-projects-label",
    title: "REWARD CLAIMED.",
    messages: [
      "You have received ABSOLUTELY NOTHING. Inventory updated successfully.",
      "Incredible work. You found a clickable pixel in production.",
      "You clicked on projects. The code is blushing."
    ],
    reward: "0 items added to bag."
  },
  "egg-experience-label": {
    id: "egg-experience-label",
    title: "TIME WASTED SUCCESSFULLY.",
    messages: [
      "You inspected the timeline. The timeline confirms that time is indeed passing.",
      "You clicked a label expecting a secret document. You received text instead.",
      "Congratulations, you clicked something that took 10 minutes to code for no reason."
    ],
    reward: "Time remaining: Slightly less."
  },
  "egg-contact-heading": {
    id: "egg-contact-heading",
    title: "COMMUNICATION ATTEMPTED.",
    messages: [
      "You clicked the contact section without typing anything. Bold strategy.",
      "The contact form noticed you clicking around. It is politely waiting.",
      "You are trying to find secrets in the contact section. Respect."
    ],
    reward: "Form status: Still waiting."
  },
  "egg-footer-copy": {
    id: "egg-footer-copy",
    title: "FOOTER INSPECTOR DETECTED.",
    messages: [
      "You scrolled all the way to the bottom and started clicking microcopy.",
      "The bugs were not consulted during production, and neither were you.",
      "Built with questionable decisions and clickable text."
    ],
    reward: "Bugs consulted: 0"
  },
  "egg-footer-copyright": {
    id: "egg-footer-copyright",
    title: "COPYRIGHT CLAIMED.",
    messages: [
      "© 2026 Hemandu. You clicked the copyright. It remains copyrighted.",
      "You tried to inspect the copyright date. It is still 2026.",
      "This copyright text has survived all your clicking."
    ],
    reward: "Legal status: Maintained."
  },
  "egg-404-header": {
    id: "egg-404-header",
    title: "LOST & FOUND.",
    messages: [
      "You found a secret on a page that doesn't exist. Meta.",
      "404 Easter Egg. The egg was not found, yet here we are.",
      "You clicked 404 text on a 404 page. Double 404."
    ],
    reward: "Error status: Emotionally stable."
  },
  "egg-bad-header": {
    id: "egg-bad-header",
    title: "BAD DECISION BONUS.",
    messages: [
      "You are on the bad decisions page clicking on random header labels.",
      "This is a bad decision within a bad decision. Inception.",
      "You were warned, yet here you are clicking headers."
    ],
    reward: "Regret multiplier: x2"
  }
};

export const REPEAT_MESSAGES = [
  "You already found this.",
  "You're clicking it again.",
  "I respect the commitment.",
  "Please stop.",
  "Seriously, nothing else will happen here."
];

export function getHumorousCountLabel(count: number): string {
  if (count === 1) return "One questionable discovery.";
  if (count <= 3) return `${count} questionable decisions.`;
  if (count <= 6) return "You've made this a habit.";
  if (count <= 9) return "This is becoming concerning.";
  return "All secrets unlocked. Go outside.";
}