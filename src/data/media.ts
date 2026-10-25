// Product stills cropped from James's royalty-free promo video (no caption band / watermark).
export type Still = { src: string; alt: string; title: string; sub: string };
const p = (n: string) => `/images/products/${n}`;
export const stills: Record<string, Still> = {
  bobblehead: { src: p('bobblehead'), alt: 'Custom 3D bobblehead figurine of a man in a printed T-shirt on a blue base', title: 'Custom 3D Bobbleheads', sub: 'Made in your likeness' },
  memorial: { src: p('memorial-plaque'), alt: 'Glowing round memorial plaque engraved “No longer by my side, but forever in my heart”', title: 'Memorial Plaques', sub: 'Plaques • Memorials • Keepsakes' },
  keyManUtd: { src: p('key-man-united'), alt: 'Red acrylic 21st birthday key with a Manchester United crest, engraved with the owner’s name (client work)', title: 'Club & Fan Keys', sub: 'Your team. Your name.' },
  keyVw: { src: p('key-vw'), alt: 'Silver and black acrylic key plaque with a VW badge and engraved name (client work)', title: 'Custom Acrylic Keys', sub: 'Cut & engraved in-house' },
  laser: { src: p('laser-engraver'), alt: 'Laser engraver cutting a design into blue acrylic in the Kan Screenprinters factory', title: 'Laser Engraving', sub: 'Precision in every detail' },
  keyManCity: { src: p('key-man-city'), alt: 'Blue acrylic key plaque with a Manchester City crest and engraved name (client work)', title: 'Club & Fan Keys', sub: 'Your team. Your name.' },
  key60: { src: p('key-60th'), alt: 'Clear acrylic 60th birthday key plaque with a photo collage', title: 'Milestone Birthdays', sub: '21st • 50th • 60th & beyond' },
  crystalCube: { src: p('crystal-cube'), alt: '3D laser-engraved photo crystal cube glowing blue on an LED base', title: '3D Crystal Memories', sub: 'Your photo, lit up in glass' },
  crystalPortrait: { src: p('crystal-portrait'), alt: 'Tall crystal block with a 3D engraved portrait, lit pink from below', title: '3D Crystal Memories', sub: 'Your photo, lit up in glass' },
  carDisplay: { src: p('car-display'), alt: 'Custom 21st display with a model sports car on a gold mirror acrylic base', title: 'Made to Order', sub: 'Trophies • Displays • Gifts' },
  edgeLit: { src: p('edge-lit-plaque'), alt: 'Edge-lit green acrylic 21st birthday key glowing on a black LED base', title: 'Edge-Lit Plaques', sub: 'Your words, lit up' },
};

// Real client photos (from the Facebook page), optimised in /images/portfolio/.
export type Cat = 'gifts' | 'plaques' | 'engraving' | 'printing' | 'corporate';
export const cats: [Cat, string][] = [['gifts', 'Gifts'], ['plaques', 'Plaques & Awards'], ['engraving', 'Engraving'], ['printing', 'Printing'], ['corporate', 'Corporate / Branded']];
export type Photo = { file: string; alt: string; cats: Cat[] };
export const photos: Photo[] = [
  { file: 'bobblehead-01', alt: 'Custom bobblehead with a blue 50th birthday stand and photo frame', cats: ['gifts'] },
  { file: '3d-figurines-01', alt: 'Three unpainted 3D-printed family figurines made from photos', cats: ['gifts'] },
  { file: 'crystal-3d-car-01', alt: '3D crystal block next to a red 21st display with a model sports car', cats: ['gifts'] },
  { file: 'crystal-3d-02', alt: 'Clear acrylic 60th birthday display with a printed photo', cats: ['gifts', 'plaques'] },
  { file: 'key-plaque-acrylic-01', alt: 'Red, blue and silver acrylic key plaques for milestone birthdays', cats: ['gifts', 'plaques'] },
  { file: 'liverpool-acrylic-plaque-01', alt: 'Red 21st key plaque with a Liverpool FC crest (client work)', cats: ['gifts', 'plaques'] },
  { file: 'vw-acrylic-plaque-01', alt: 'Mirror-silver acrylic key with a VW badge and engraved name (client work)', cats: ['gifts', 'plaques'] },
  { file: 'wood-acrylic-vw-plaque-01', alt: 'Two VW-themed 21st and 50th key plaques in wood and acrylic (client work)', cats: ['gifts', 'plaques'] },
  { file: 'laser-wood-vw-plaque-01', alt: 'Gold 50th birthday key with VW badge on a clear acrylic base (client work)', cats: ['gifts', 'plaques', 'engraving'] },
  { file: 'award-plaque-01', alt: 'Laser-cut wooden star awards on wood and grey bases', cats: ['plaques', 'engraving', 'corporate'] },
  { file: 'love-plaque-stand-01', alt: 'Round wooden plaque engraved “May love be the heart of this home” on a stand', cats: ['plaques', 'engraving', 'gifts'] },
  { file: 'memorial-plaque-stand-01', alt: 'Set of engraved wooden monogram coasters on a laser-cut stand', cats: ['engraving', 'gifts'] },
  { file: 'family-sign-laser-01', alt: 'Engraved wooden “Petersen Family” key holder sign', cats: ['engraving', 'gifts'] },
  { file: 'clock-livelaugh-01', alt: 'Black laser-cut “Live Love Laugh” wall clock', cats: ['engraving', 'gifts'] },
  { file: 'laser-clock-01', alt: 'Engraved wooden Father’s Day clock with a personal message', cats: ['engraving', 'gifts'] },
  { file: 'wine-glass-engraved-01', alt: 'Wine glass printed with “Pour the wine” lettering', cats: ['printing', 'gifts'] },
  { file: 'shot-glasses-engraved-01', alt: 'Branded shot glasses for a darts league competition', cats: ['printing', 'corporate'] },
  { file: 'glass-vinyl-01', alt: 'Glass panel with a “Kan do it” vinyl print', cats: ['printing'] },
  { file: 'mug-print-01', alt: 'Black and yellow mug printed with a colourful chameleon artwork', cats: ['printing', 'gifts'] },
  { file: 'planter-vinyl-print-01', alt: 'White concrete planter printed with “Believe in yourself”', cats: ['printing', 'gifts'] },
  { file: 'planter-vinyl-print-02', alt: 'Succulent planter printed with “Live Laugh Love”', cats: ['printing', 'gifts'] },
  { file: 'skull-planters-01', alt: 'Three white skull planters with succulents', cats: ['gifts'] },
  { file: 'hard-hat-print-01', alt: 'Yellow hard hat printed with a company logo', cats: ['printing', 'corporate'] },
  { file: 'notebook-engraved-01', alt: 'Red branded notebook with the Kan Printers logo', cats: ['corporate', 'engraving'] },
  { file: 'desk-organiser-01', alt: 'Laser-cut wooden desk organiser with a printed photo panel and pens', cats: ['corporate', 'engraving'] },
  { file: 'desk-organiser-02', alt: 'Wooden desk organiser with branded business-card holder', cats: ['corporate', 'engraving'] },
  { file: 'key-tag-numberplate-01', alt: 'Number-plate style key tags reading CAA 431-759', cats: ['corporate', 'gifts'] },
  { file: 'charlene-screenprinting-01', alt: 'Charlene pulling a squeegee across a screen to print a teal design onto a tote bag in our Lansdowne factory', cats: ['printing', 'corporate'] },
  { file: 'screenprint-tote-01', alt: 'Close-up of a tote bag freshly screenprinted in teal by Charlene in our factory', cats: ['printing', 'corporate'] },
  { file: 'iring-owner-mario', alt: 'Mario Kanasashi, owner, checking a run of iRing iRite! tees', cats: ['printing', 'corporate'] },
  { file: 'iring-charlene-client', alt: 'Charlene with our client and the finished totes', cats: ['printing', 'corporate'] },
  { file: 'iring-client-tees-totes', alt: 'Happy client with her tees and totes', cats: ['printing', 'corporate'] },
  { file: 'screenprint-tshirt-01', alt: 'Close-up of a white screenprinted logo on a dark grey T-shirt', cats: ['printing', 'corporate'] },
  { file: 'screenprint-tshirt-02', alt: 'Dark T-shirt screenprinted with the Kan Screenprinters logo', cats: ['printing', 'corporate'] },
];
export const photoByFile = (f: string) => photos.find((x) => x.file === f)!;

// Which media appears on each gift / service page.
export const pageMedia: Record<string, { stills: string[]; photos: string[] }> = {
  bobbleheads: { stills: ['bobblehead'], photos: ['bobblehead-01', '3d-figurines-01'] },
  'key-plaques': { stills: ['key60', 'keyManUtd', 'keyVw', 'keyManCity'], photos: ['key-plaque-acrylic-01', 'liverpool-acrylic-plaque-01', 'wood-acrylic-vw-plaque-01', 'laser-wood-vw-plaque-01'] },
  'memorial-plaques': { stills: ['memorial', 'edgeLit'], photos: ['love-plaque-stand-01'] },
  crystals: { stills: ['crystalCube', 'crystalPortrait'], photos: ['crystal-3d-car-01', 'crystal-3d-02'] },
  engraving: { stills: ['laser', 'carDisplay'], photos: ['award-plaque-01', 'family-sign-laser-01', 'laser-clock-01', 'clock-livelaugh-01', 'desk-organiser-01', 'memorial-plaque-stand-01'] },
  screenprinting: { stills: [], photos: ['charlene-screenprinting-01', 'screenprint-tote-01', 'iring-owner-mario', 'iring-client-tees-totes', 'screenprint-tshirt-02', 'screenprint-tshirt-01'] },
  'digital-printing': { stills: [], photos: ['mug-print-01', 'hard-hat-print-01', 'planter-vinyl-print-01', 'shot-glasses-engraved-01', 'glass-vinyl-01', 'wine-glass-engraved-01'] },
  // TODO: no real photos yet for DTF, UV or pad printing — placeholders shown.
  'dtf-printing': { stills: [], photos: [] },
  'uv-printing': { stills: [], photos: [] },
  'pad-printing': { stills: [], photos: [] },
};
