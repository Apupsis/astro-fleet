import type { ImageMetadata } from 'astro';
import heroDusk from '../assets/photos/hero-dusk.jpg';
import pillarHand from '../assets/photos/pillar-hand.jpg';
import pillarCalm from '../assets/photos/pillar-calm.jpg';
import pillarAnatomy from '../assets/photos/pillar-anatomy.jpg';
import aboutAtmosphere from '../assets/photos/about-atmosphere.jpg';
import workSoft from '../assets/photos/work-soft.jpg';
import workCalm from '../assets/photos/work-calm.jpg';
import workAnatomy from '../assets/photos/work-anatomy.jpg';

export type SiteImage = {
  src: ImageMetadata;
  alt: string;
};

export const photos = {
  heroDusk: {
    src: heroDusk,
    alt: 'حصان عربي يتحرك في ضوء الغسق الهادئ',
  },
  pillarHand: {
    src: pillarHand,
    alt: 'منظر قريب لتواصل هادئ باليد مع حصان',
  },
  pillarCalm: {
    src: pillarCalm,
    alt: 'وجه حصان عربي هادئ في حالة راحة',
  },
  pillarAnatomy: {
    src: pillarAnatomy,
    alt: 'جسم الحصان وبنيته من الجانب',
  },
  aboutAtmosphere: {
    src: aboutAtmosphere,
    alt: 'منظر فروسي هادئ في ضوء خافت',
  },
  workSoft: {
    src: workSoft,
    alt: 'فارس وحصان في تواصل ناعم ومنضبط',
  },
  workCalm: {
    src: workCalm,
    alt: 'عمل مع الحصان في الحلبة بتركيز ثابت',
  },
  workAnatomy: {
    src: workAnatomy,
    alt: 'تكوين الحصان وحركته تحت السرج',
  },
} as const satisfies Record<string, SiteImage>;
