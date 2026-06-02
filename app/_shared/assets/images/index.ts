import heroMotorcycle from './hero-motorcycle.jpg';
import logoWhite from './logo-white.jpg';
import phoneMockupFull from './phone-mockup-full.png';
import phoneMockupCropped from './phone-mockup-cropped.png';

export const images = {
  heroMotorcycle,
  logoWhite,
  phoneMockupFull,
  phoneMockupCropped,
} as const;

export type ImageKey = keyof typeof images;
