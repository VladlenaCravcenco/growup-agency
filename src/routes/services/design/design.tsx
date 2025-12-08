// src/content/services/socialMediaService.ts
import type { ServicePageData } from '~/components/service-page/types';

export const design: ServicePageData = {
  badge: 'design',
  titleLine1: 'design',
  titleLine2: 'Turning Scrolls Into Sales',
  subtitle: 'Data-driven social media campaigns tailored to your brand.',
  description:
    'We build and manage social media strategies that turn attention into measurable growth. From content and creatives to ads and analytics — you get a partner who runs the entire social media engine, so you can focus on the business.',
  heroImage: '/images/services/smm-hero.png',
  heroImageAlt: 'Social media marketing illustration',

  ctaPrimary: 'Discuss my project',
  ctaSecondary: 'See social media cases',
  ctaSecondaryLink: '/projects?filter=social-media',

  projects: {
    label: 'Our social media success stories',
    title: 'Brands that grew with our social media strategies',
    allLink: '/projects?filter=social-media',
    items: [
      {
        slug: 'real-estate-leads',
        title: 'Aarav Realty',
        tagline: 'Real estate lead generation via Instagram & Facebook Ads',
        client: 'Aarav Realty',
        image: '/images/projects/aarav-realty.jpg',
      },
      {
        slug: 'consultancy-awareness',
        title: 'Beqube Consultancy',
        tagline: 'Awareness & trust-building campaigns for finance consultancy',
        client: 'Beqube Consultancy',
        image: '/images/projects/beqube-consultancy.jpg',
      },
    ],
  },

  process: {
    label: 'Our process',
    titleLine1: 'Building your',
    titleLine2: 'digital presence',
    steps: [
      {
        title: 'Brand understanding',
        text: 'We analyze your brand, audience and offers to set clear goals and positioning for social media.',
      },
      {
        title: 'Content strategy & calendar',
        text: 'We define content pillars, posting frequency and format mix for each platform.',
      },
      {
        title: 'Creative production',
        text: 'We create visuals, carousels, reels and stories that align with your brand and stop the scroll.',
      },
      {
        title: 'Campaign setup & management',
        text: 'We launch, test and optimize campaigns across Meta, LinkedIn and other platforms.',
      },
      {
        title: 'Analytics & optimisation',
        text: 'We track performance, report in simple language and scale what works.',
      },
    ],
  },

  offers: [
    {
      label: 'Our offerings',
      title: 'Instagram, Facebook & LinkedIn strategies',
      subtitle: 'Grow your presence where it matters most with platform-specific strategies.',
      points: [
        'Platform-focused growth with audience segmentation',
        'Consistent posting calendars aligned with your sales cycles',
        'Content boosting and ad support for higher reach',
        'Hashtag and trend integration without cringe',
      ],
      image: '/images/services/smm-strategy.jpg',
      imageAlt: 'Person working on digital marketing strategy',
    },
    {
      label: 'Content creation',
      title: 'Content creation services',
      subtitle: 'Scroll-stopping visuals and stories that connect with your audience.',
      points: [
        'Branded reel and short-form video production',
        'Carousel design and caption writing',
        'Storytelling-focused visual concepts',
        'Tone of voice aligned with your niche',
      ],
      image: '/images/services/smm-content.jpg',
      imageAlt: 'Content creation behind the scenes',
    },
    {
      label: 'Influencer & partnerships',
      title: 'Influencer collaboration and partnerships',
      subtitle: 'Build credibility and reach through authentic creator collaborations.',
      points: [
        'Influencer research and outreach',
        'Contract and deliverables planning',
        'Performance tracking of influencer posts',
        'Integration with paid campaigns',
      ],
      image: '/images/services/smm-influencers.jpg',
      imageAlt: 'People collaborating on influencer marketing',
    },
    {
      label: 'Analytics',
      title: 'Monthly analytics & reporting',
      subtitle: 'Turn data into clear decisions and next steps.',
      points: [
        'Platform performance dashboards',
        'Follower growth and engagement metrics',
        'Ad ROI tracking and optimisation',
        'Data-backed strategy updates every month',
      ],
      image: '/images/services/smm-analytics.jpg',
      imageAlt: 'Marketing analytics dashboard',
    },
  ],

  faq: {
    titleLine1: 'Social media marketing',
    titleLine2: 'FAQs',
    items: [
      {
        question: 'How much does social media marketing cost?',
        answer:
          'Pricing depends on the number of platforms, posting frequency, content volume and ad budget. We discuss your goals first and then suggest a realistic monthly package.',
      },
      {
        question: 'Which social media platforms are best for my business?',
        answer:
          'We look at your industry, audience and sales process, then choose 1–3 focus platforms instead of trying to be everywhere.',
      },
      {
        question: 'How long does it take to see results?',
        answer:
          'Brand awareness and engagement usually grow within 1–3 months. Performance campaigns can bring first leads or sales within 2–4 weeks, depending on your offer.',
      },
      {
        question: 'Do you create content or just manage posting?',
        answer:
          'We can fully take over content creation or work with your in-house team if you already have designers and copywriters.',
      },
    ],
  },

  brief: {
    title: 'Ready to grow through social media?',
    text: 'Fill in a short brief so we can prepare a clear growth plan and budget for your brand.',
    link: '/brief',
    button: 'Fill out the brief',
  },
};