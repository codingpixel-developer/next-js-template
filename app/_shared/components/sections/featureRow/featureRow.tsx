import { MapPin, Bell, CheckCircle2, Shield } from 'lucide-react';
import styles from './featureRow.module.scss';

const FEATURES = [
  {
    Icon: MapPin,
    title: 'REAL-TIME TRACKING',
    desc: 'See free live location and ride details in real time.',
  },
  {
    Icon: Bell,
    title: 'SMART ALERTS',
    desc: "Get notified if something doesn't feel right.",
  },
  {
    Icon: CheckCircle2,
    title: 'ONE TAP CHECK-IN',
    desc: "Riders can instantly let you know they're OK.",
  },
  {
    Icon: Shield,
    title: 'PEACE OF MIND',
    desc: 'Ride with freedom. They ride with confidence.',
  },
] as const;

export const FeatureRow = () => {
  return (
    <section className={styles.featureRow} id="features">
      <div className={styles.inner}>
        {FEATURES.map((feature, index) => (
          <div key={feature.title} className={styles.featureWrap}>
            <div className={styles.feature}>
              <div className={styles.iconWrap}>
                <feature.Icon size={18} strokeWidth={1.75} aria-hidden />
              </div>
              <div className={styles.text}>
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.desc}>{feature.desc}</p>
              </div>
            </div>
            {index < FEATURES.length - 1 && (
              <div className={styles.divider} aria-hidden />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
