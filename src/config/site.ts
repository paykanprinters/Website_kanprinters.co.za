/**
 * Single source of truth for business details.
 * Items marked TODO are still UNCONFIRMED — confirm with the client before launch.
 */
export const site = {
  url: 'https://www.kanprinters.co.za',
  name: 'Kan Screenprinters',
  alternateName: 'Kan Printers & Promo', // name shown in the logo artwork
  tagline: 'Personalised. Precise. Printed with Pride.',
  foundingYear: 2000,
  phoneDisplay: '021 691 0170',
  phoneE164: '+27216910170',
  whatsapp: '27660877310', // +27 66 087 7310
  whatsappMessage: "Hi Kan Screenprinters, I'd like a quote please.",
  email: 'quote@kanprinters.co.za',
  address: {
    street: 'Unit 14 Regency Park, 6 Induland Crescent',
    locality: 'Lansdowne',
    city: 'Cape Town',
    region: 'Western Cape',
    country: 'ZA',
  },
  // TODO confirm days (08:00–17:00 confirmed; Mon–Fri assumed)
  hours: [{ days: 'Mon–Fri', open: '08:00', close: '17:00', schema: 'Mo-Fr 08:00-17:00' }],
  // TODO confirm: delivery / service area
  serviceArea: 'Cape Town & surrounds — nationwide courier on request',
  // TODO confirm: Google Business Profile URL (add to socials/sameAs once known)
  googleBusinessUrl: '',
  socials: {
    tiktok: 'https://www.tiktok.com/@kan.printers',
    instagram: 'https://www.instagram.com/kan_printers',
    facebook: 'https://www.facebook.com/profile.php?id=100063567161377',
  },
  formEndpoint: '/api/send.php',
  // Hero loop cut from the 9:16 ROYALTY-FREE promo (00:07–00:16). Never use the copyrighted-song cut.
  heroVideo: true,
};

export const waLink = (msg = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
