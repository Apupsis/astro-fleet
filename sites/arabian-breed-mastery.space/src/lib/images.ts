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
    alt: 'Arabian horse moving through soft dusk light',
  },
  pillarHand: {
    src: pillarHand,
    alt: 'Close view of quiet hand contact with a horse',
  },
  pillarCalm: {
    src: pillarCalm,
    alt: 'Calm Arabian horse face at rest',
  },
  pillarAnatomy: {
    src: pillarAnatomy,
    alt: 'Horse body and structure in profile',
  },
  aboutAtmosphere: {
    src: aboutAtmosphere,
    alt: 'Quiet equestrian landscape at low light',
  },
  workSoft: {
    src: workSoft,
    alt: 'Rider and horse in soft, controlled contact',
  },
  workCalm: {
    src: workCalm,
    alt: 'Horse work in an arena with steady focus',
  },
  workAnatomy: {
    src: workAnatomy,
    alt: 'Horse conformation and movement under saddle',
  },
} as const satisfies Record<string, SiteImage>;
