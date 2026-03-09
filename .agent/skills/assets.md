# Skill: Asset Management

**Read this when:** adding images, icons, or fonts to the project, displaying images in components, or referencing any file from the `public/` folder.

---

## Rule: All Assets Go Through `index.ts`

**CRITICAL:** Never reference asset paths directly as strings in components. Every asset in `public/` must be exported from its folder's `index.ts` first.

---

## Folder Structure

```
public/
├── icons/
│   ├── index.ts      ← export all icons here
│   └── *.svg
├── images/
│   ├── index.ts      ← export all images here
│   └── *.*
└── fonts/
    ├── index.ts      ← export all fonts here
    └── *.*
```

---

## Workflow: Adding a New Asset

### Adding an Image

```typescript
// Step 1: Place file at public/images/hero-banner.jpg

// Step 2: Add to public/images/index.ts
export const images = {
  heroBanner: '/images/hero-banner.jpg',
  profileAvatar: '/images/profile-avatar.png',
  // ... all other images
} as const;

// Step 3: Use in component
import Image from 'next/image';
import { images } from '@/public/images';

<Image src={images.heroBanner} alt="Hero" width={800} height={400} priority />
```

### Adding an Icon

```typescript
// Step 1: Place file at public/icons/close.svg

// Step 2: Add to public/icons/index.ts
export const icons = {
  close: '/icons/close.svg',
  search: '/icons/search.svg',
  // ... all other icons
} as const;

// Step 3: Use in component
import { icons } from '@/public/icons';
import Image from 'next/image';

<Image src={icons.close} alt="Close" width={24} height={24} />
```

---

## Rule: Always Use Next.js `<Image />`

**CRITICAL:** Never use the native `<img>` tag for displaying images. Always use the Next.js `Image` component.

```typescript
// ❌ NEVER
<img src="/images/hero.jpg" alt="Hero" />
<img src={images.hero} alt="Hero" />

// ✅ ALWAYS
import Image from 'next/image';
<Image src={images.hero} alt="Hero" width={800} height={400} />
```

### Common Image Props

```typescript
// Fixed size image
<Image src={images.logo} alt="Logo" width={120} height={40} />

// Fill parent container (parent must have position: relative + defined size)
<div style={{ position: 'relative', width: '100%', height: '300px' }}>
  <Image src={images.banner} alt="Banner" fill style={{ objectFit: 'cover' }} />
</div>

// Above-the-fold image (disables lazy loading)
<Image src={images.hero} alt="Hero" width={1200} height={600} priority />

// Responsive image with sizes hint
<Image
  src={images.card}
  alt="Card"
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, 400px"
/>
```

**Why `<Image />`?**
- Automatic WebP/AVIF format conversion
- Lazy loading by default
- Prevents layout shift (CLS)
- Responsive sizing built-in
- Better Core Web Vitals scores

---

## Anti-Patterns

```typescript
// ❌ Hardcoded path in JSX
<img src="/images/hero.jpg" />

// ❌ Path string directly in Next/Image without index.ts
<Image src="/images/hero.jpg" alt="Hero" width={800} height={400} />

// ❌ Importing image file directly without index.ts export
import heroImg from '@/public/images/hero.jpg';

// ✅ Correct pattern
import { images } from '@/public/images';
<Image src={images.hero} alt="Hero" width={800} height={400} />
```
