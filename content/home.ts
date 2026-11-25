export const home = {
  hero: {
    headline: 'Your site books more discovery calls.',
    payment: 'Or you pay us $0.',
    description: '“I just gave someone your name.” If you coach executives or business owners, you know that message. We rebuild what that person sees next, from the page they open to the email they get before the call.',
    terms: 'Our guarantee on eligible rebuilds. We agree on your starting numbers and which bookings count before we begin.',
  },
  problem: {
    heading: 'Your client explained your value in one sentence.',
    intro: 'Say a client recommends you to a new director. ',
    referral: '“Call her. She helped me manage the people I used to work alongside.”',
    question: 'That director opens your site with a very particular problem in mind. How far do they have to read before they ',
    recognition: 'recognise the coach their colleague just described?',
    calendar: 'Say your page gets that right. They open your calendar and see “Intro call · 30 min.” They know when you’re free. They’re still wondering, ',
    thought: '“What are we actually going to talk about?”',
  },
  solution: {
    heading: 'Show them what Tuesday at 10:30 is for.',
    description: 'Tell that director to bring one conversation they’re dreading with a former teammate. Now they have a reason to pick a time. When your email arrives on Monday, you have something worth reminding them about.',
    caption: 'What that could look like on your site',
    steps: ['On the page', 'On the calendar', 'In their inbox'],
    example: {
      practice: 'Executive coaching',
      offer: 'Managing the people who used to be your peers?',
      action: 'Talk through a team conversation',
      duration: 'One team conversation · 30 min',
      time: 'Tuesday at 10:30',
      zone: 'Shown in your time zone',
      emailLabel: 'A note before we meet',
      confirmation: 'See you tomorrow.',
      prep: 'Bring the conversation you’ve been putting off. We can start there.',
    },
    evidence: [
      { figure: '81%', description: 'of visits in Unbounce’s commercial and professional services benchmark happened on mobile. Your calendar needs to make sense on the phone where someone opened the referral.' },
      { figure: '25% and 33%', description: 'less time to finish two redesigned forms in a 65-person study. Across all three forms tested, more people got through on the first try.' },
    ],
  },
  framework: {
    lead: 'That’s why we built',
    name: 'P.A.C.E.',
    description: 'You might write your page one week, set up your calendar another, and leave the confirmation email on its default. Your referral reads them one after the other. To them, it’s all one conversation. We write it that way.',
    indexCaption: 'Choose a stage to see what we’d make for that coach.',
    stages: [
      {
        name: 'Position', deliverable: 'Offer brief',
        explanation: 'We find the sentence a client would use to recommend you, then build the offer around the person who needs to hear it.',
        sample: {
          title: 'For the director who got promoted on Friday and has to lead their old team on Monday.',
          detailLabel: 'What brings them in',
          detail: 'Their first performance review with someone who still thinks of them as a peer.',
        },
      },
      {
        name: 'Advance', deliverable: 'Landing page',
        explanation: 'We write the page so a referral can recognise their situation and see what they could work on with you.',
        sample: {
          title: 'How do you give feedback to someone who was your equal last week?',
          detailLabel: 'First conversation',
          detail: 'Bring the feedback you’ve been sitting on. We’ll talk through what you want them to hear and how you might open.',
        },
      },
      {
        name: 'Confirm', deliverable: 'Booking page',
        explanation: 'We name the appointment, connect your calendar, and keep the questions you’ll actually use to prepare.',
        sample: {
          title: 'Talk through one team conversation.',
          detailLabel: 'One question before we meet',
          detail: 'Who do you need to speak with, and what’s making the conversation difficult?',
          context: '30 minutes · Video call',
        },
      },
      {
        name: 'Engage', deliverable: 'Follow-up email',
        explanation: 'We give people who are still thinking it over a way back. Once they book, we pick up the thread in their inbox.',
        sample: {
          title: 'For our call on Tuesday',
          detailLabel: 'Hi Alex,',
          detail: 'You mentioned you need to give feedback to a former teammate. Bring the first sentence you’d like to say, even if it sounds rough. We’ll work on it together.',
          context: 'See you at 10:30.',
        },
      },
    ],
    termsHeading: 'How the $0 guarantee works',
    terms: 'If the full rebuild is a fit, we agree in writing which discovery calls count, how many you book now, and when we’ll compare. You pay nothing upfront. If bookings don’t beat that number under those terms, you owe us nothing for the rebuild.',
  },
  closing: {
    headline: 'Send us the link you’d give a referral.',
    description: 'We’ll follow it from the first sentence to the calendar and email you the first thing we’d change. The review is free. If we think a rebuild would help, we’ll tell you why.',
  },
} as const;
