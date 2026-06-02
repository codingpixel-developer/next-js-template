import Image from 'next/image';
import { images } from '@/app/_shared/assets/images';
import styles from './heroSection.module.scss';

const AVATAR_PALETTE = [
  { bg: '#E6C9A8', color: '#14110F', initial: 'A' },
  { bg: '#C9D8C8', color: '#14110F', initial: 'B' },
  { bg: '#DCD4E5', color: '#14110F', initial: 'C' },
];

const AppStoreBadge = () => (
  <a href="#download" className={styles.badge} aria-label="Download on the App Store">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
    <div className={styles.badgeText}>
      <span className={styles.badgeSmall}>Download on the</span>
      <span className={styles.badgeLarge}>App Store</span>
    </div>
  </a>
);

const GooglePlayBadge = () => (
  <a href="#download" className={styles.badge} aria-label="Get it on Google Play">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.18 23.76a2 2 0 0 0 2.16-.22l12.44-7.19-2.93-2.93-11.67 10.34zM.5 1.05C.18 1.42 0 1.96 0 2.67v18.67c0 .71.18 1.24.51 1.61l.09.08L10.25 13.4v-.23L.59.96l-.09.09zm20.37 9.43-3.05-1.76-3.27 3.27 3.27 3.27 3.07-1.77a2.06 2.06 0 0 0 0-3.01zm-19.69 11.3 11.16-9.9-2.92-2.92-8.24 12.82z" />
    </svg>
    <div className={styles.badgeText}>
      <span className={styles.badgeSmall}>GET IT ON</span>
      <span className={styles.badgeLarge}>Google Play</span>
    </div>
  </a>
);

export const HeroSection = () => {
  return (
    <section className={styles.hero} id="home">
      {/* Background image + overlay */}
      <div className={styles.bgWrapper}>
        <Image
          src={images.heroMotorcycle}
          alt="Motorcycle rider on mountain road"
          fill
          priority
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.bgOverlay} />
      </div>

      {/* Content row */}
      <div className={styles.content}>
        {/* Left — text */}
        <div className={styles.left}>
          <span className={styles.brandLabel}>STEELANGEL</span>

          <h1 className={styles.headline}>
            RIDE FREELY.<br />
            THEY KNOW<br />
            YOU&apos;RE SAFE.
          </h1>

          <p className={styles.subtitle}>
            Steelangel is a smart motorcycle safety system that helps
            your loved ones know you&apos;re safe, every mile of the way.
          </p>

          <div className={styles.ctaRow}>
            <a href="#download" className={styles.downloadBtn}>
              DOWNLOAD THE APP
            </a>
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>

          <div className={styles.trustRow}>
            <div className={styles.avatarStack}>
              {AVATAR_PALETTE.map((av, i) => (
                <div
                  key={i}
                  className={styles.avatar}
                  style={{ background: av.bg, color: av.color, zIndex: 3 - i }}
                >
                  {av.initial}
                </div>
              ))}
            </div>
            <div>
              <div className={styles.stars}>★★★★★</div>
              <div className={styles.trustLabel}>
                Trusted by riders. Loved by families.
              </div>
            </div>
          </div>
        </div>

        {/* Right — phone mockup */}
        <div className={styles.right}>
          <div className={styles.phoneWrapper}>
            <Image
              src={images.phoneMockupFull}
              alt="SteelAngel app — live ride tracking"
              width={300}
              height={600}
              className={styles.phone}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
