/**
 * Single source of truth for business details.
 * Items marked TODO are UNCONFIRMED — confirm with the client before launch.
 */
export const site = {
  url: 'https://www.kanprinters.co.za',
  // TODO confirm: trading name — "Kan Screenprinters" vs logo "Kan Printers & Promo". Use ONE name everywhere (Google Business, socials, site).
  name: 'Kan Printers & Promo',
  legalName: 'Kan Screenprinters', // TODO confirm registered/trading name
  tagline: 'Personalised. Precise. Printed with Pride.',
  foundingYear: 2000,
  phoneDisplay: '021 691 0170',
  phoneE164: '+27216910170',
  // TODO confirm: WhatsApp Business number (digits only, international format, no +). Placeholder below.
  whatsapp: '27000000000',
  whatsappMessage: "Hi Kan Printers, I'd like a quote please.",
  email: 'kanprinters@mweb.co.za', // TODO confirm public enquiry email
  address: {
    // TODO confirm: address still current
    street: 'Unit 14 Regency Park, 6 Induland Crescent',
    locality: 'Lansdowne',
    city: 'Cape Town',
    region: 'Western Cape',
    postalCode: '7780', // TODO confirm postal code
    country: 'ZA',
  },
  // TODO confirm: opening hours
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
  // TODO: hero video — export the 9:16 ROYALTY-FREE cut to /public/media/hero.mp4 (+ hero-poster.jpg) and set to true. Never use the copyrighted-song cut.
  heroVideo: false,
};

export const waLink = (msg = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
