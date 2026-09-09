/**
 * Site-wide details. Update this file with your real information.
 */
export const site = {
  name: 'Tek Jung',
  shortName: 'TekJ',
  role: 'AI Engineer, Developer, and writer.',
  description:
    'I enjoy building software, exploring machine learning, and understanding how systems work from the ground up.',
  url: 'https://www.tekjung.com.np',
  email: 'tek.jung@tekjung.com.np',
  locale: 'en_US',
  twitter: '',
  social: {
    github: 'https://github.com/jung1ek',
    linkedin: 'https://www.linkedin.com/jung1ek',
    resume: '/resume',
  },
  newsletter: {
    enabled: true,
    heading: 'Occasional notes',
    blurb: 'A short email when I publish something new. No cadence promises, no ads.',
    /** Replace with a Formspark / Buttondown / Getform endpoint when you have one. */
    action: '',
  },
} as const;
