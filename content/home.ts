/** Homepage copy: a practical explanation for an established coaching business. */
export const home = {
  hero: {
    headline: ['Your reputation brings them here.', 'Give them a clear way to book.'],
    description: ["Before someone books, they need to know ", { highlight: 'whether your coaching fits' }, ", what the conversation is for and what happens next. Your website can give them those answers."],
    audience: 'For established executive, leadership and business coaches.',
  },
  opportunity: {
    paragraph: ["A referral, a useful LinkedIn post or a good conversation can earn someone's interest before they reach your website. From there, your page needs to ", { strong: 'carry the conversation forward' }, ": explain who you help, what working with you involves and how to get in touch. When those answers are easy to find, ", { highlight: 'taking the next step asks less' }, " of the person who's already considering you."],
  },
  evidence: {
    heading: 'Make booking the easy part.',
    introduction: ["When someone is ready to speak with you, they should know what they're booking, which details you need and what happens next. Every question and instruction should ", { strong: 'help them move forward.' }],
    finding: ["In a study with ", { strong: '65 people' }, ", improved versions of three website forms took less time to finish and were more often completed correctly on the first try. It's a useful reminder: ", { highlight: 'make the next step easy to understand and finish.' }],
  },
  benefits: {
    heading: 'Start the conversation with the right context.',
    paragraph: ["A clear page helps people recognise whether your coaching is relevant. The booking questions give you useful context. Confirmation and preparation emails explain what the conversation is for and what to bring. By the time you meet, you can spend more of the call on ", { highlight: 'their situation and whether you can help.' }],
  },
  service: {
    heading: 'Your page, booking and follow-up, handled together.',
    description: ["At Compel, we write and build these parts around ", { strong: 'your offer, your clients and the way you work' }, ", so the experience stays clear from the first visit to the conversation."],
    elements: [
      { title: 'The coaching page', description: ["We explain who you help, what working with you involves and why someone should consider your offer. Your experience and client evidence appear where they ", { strong: 'help people make a decision.' }] },
      { title: 'The booking process', description: ["We clarify who the conversation is for, ask for the information you need and set up a straightforward route to booking. ", { strong: 'Each step has a reason to be there.' }] },
      { title: 'The emails around it', description: ["We write the confirmations, preparation, reminders and follow-up your business needs. People know what to expect, and you spend ", { strong: 'less time explaining the same details.' }] },
    ],
  },
  approach: {
    heading: 'You know the business. We handle the build.',
    description: ["We start by looking at your current page, booking process and emails. Then we agree what needs improving and what the work will include. You give us the context and feedback; we take care of ", { highlight: 'the writing, design and implementation' }, ", and review the finished experience with you."],
  },
  closing: {
    headline: ['Get a second opinion on your website.', 'And a clear idea of what to improve.'],
    description: ["Send us your website and a little about your coaching. We'll look at the page, the route to booking and what happens afterwards, then ", { strong: "reply by email with where we'd start." }],
  },
} as const;
