import type { MemoryType } from '../types'

export interface SeedMemory {
  type: MemoryType
  source: string
  content: string
  timestamp: string
  importance: number
  tags: string[]
}

export const CLIENT_SEED_MEMORIES: Record<string, SeedMemory[]> = {

  // ─── FIELD NOTES COFFEE ────────────────────────────────────────────────────
  // Daniel Brink: surgical, sensory, allergic to marketing language.
  // Aya Tanaka: seconds Daniel's notes and adds warmth.
  // ───────────────────────────────────────────────────────────────────────────
  'field-notes': [

    // — ADS (static, print/digital) —
    {
      type: 'editing_preference',
      source: 'Daniel Brink — Ad review, Spring Counter Ritual print',
      content: 'Ad format: negative space upper-left must remain clear. That is where the headline lives on every print placement. Any product encroaching on that quadrant gets pulled back.',
      timestamp: '2025-11-14',
      importance: 10,
      tags: ['ad', 'composition', 'headline', 'layout'],
    },
    {
      type: 'delivery_feedback',
      source: 'Daniel Brink — Ad review, Summer Beans Drop static',
      content: 'The orange in the highlights is competing with the hand. For ads, the hand is the subject — the cup is secondary. Pull the orange 8–10% in the highlights and resubmit.',
      timestamp: '2025-10-12',
      importance: 9,
      tags: ['ad', 'color', 'composition', 'hero'],
    },
    {
      type: 'tone_preference',
      source: 'Daniel Brink — Ad copy review, Spring launch',
      content: 'Ad headline: "Elevated morning ritual" — cut it. Every word. Write the gram weight. Write the brew temperature. Write the bloom time. One declarative sentence with one number.',
      timestamp: '2025-10-05',
      importance: 10,
      tags: ['ad', 'copy', 'specificity', 'marketing-speak'],
    },
    {
      type: 'revision_pattern',
      source: 'Daniel Brink — Ad round 2, Steam detail',
      content: 'Ad deliverables: the steam is composited. You can see it hold shape. Real steam disperses at the edges. Either reshoot with practical steam or remove it — do not leave a CG plate in a paid placement.',
      timestamp: '2025-10-22',
      importance: 9,
      tags: ['ad', 'steam', 'compositing', 'authenticity'],
    },
    {
      type: 'revision_pattern',
      source: 'Daniel Brink — Ad crop note, saucer',
      content: 'The saucer is cropped at the bottom. For ads at this scale, the full ceramic must be visible. The Heath piece is part of the brand — clipping it is clipping the argument.',
      timestamp: '2025-11-01',
      importance: 9,
      tags: ['ad', 'crop', 'prop', 'ceramic'],
    },
    {
      type: 'performance_signal',
      source: 'Daniel Brink — post-campaign review, Winter Origin ad',
      content: 'The static ad outperformed the digital display benchmark by 2.7x. Daniel attributed it to the single-image discipline — one subject, one surface, one light source. No secondary story.',
      timestamp: '2025-12-18',
      importance: 10,
      tags: ['ad', 'performance', 'single-image', 'discipline'],
    },

    // — SOCIAL REELS (video) —
    {
      type: 'client_preference',
      source: 'Daniel Brink — Reel brief, market update series',
      content: 'Reels: music should pull back into the pour, not build toward it. We want ambient room tone as the bed — faint, present, never leading. If the music swells in the first 8 seconds, the whole audio track gets pulled.',
      timestamp: '2025-09-18',
      importance: 10,
      tags: ['reel', 'music', 'audio', 'pacing'],
    },
    {
      type: 'revision_pattern',
      source: 'Daniel Brink — Reel review, Spring spot 30s',
      content: 'The cut at 0:08 has a beat-drop sync. Do not sync cuts to music. The pour determines the edit rhythm — the music is underneath that, not driving it.',
      timestamp: '2025-11-20',
      importance: 9,
      tags: ['reel', 'editing', 'music-sync', 'pacing'],
    },
    {
      type: 'delivery_feedback',
      source: 'Daniel Brink — Reel opener review, Winter Beans reel',
      content: 'The reel opens with the logo. Cut it. Open on the hand, the ceramic, or the grind — something with texture. Give the viewer a reason to stop scrolling before you show them who we are.',
      timestamp: '2025-11-08',
      importance: 10,
      tags: ['reel', 'opener', 'logo', 'hook'],
    },
    {
      type: 'performance_signal',
      source: 'Daniel Brink — post-campaign review, Winter Origin reel',
      content: 'The reel outperformed paid media benchmark by 3.1x. Daniel attributed the performance specifically to the 8-second silence at the top and the direct cut opener — no title card, no logo, no music until the pour.',
      timestamp: '2025-12-18',
      importance: 10,
      tags: ['reel', 'performance', 'silence', 'opener'],
    },
    {
      type: 'revision_pattern',
      source: 'Aya Tanaka — Reel review, pour-over detail 15s',
      content: 'The hand in the pour-over detail reads dark on mobile. For reels viewed on phone, open exposure slightly — this is where Daniel and I agree every time. The hand carries the emotion of the whole piece.',
      timestamp: '2025-10-30',
      importance: 8,
      tags: ['reel', 'exposure', 'hand', 'mobile'],
    },
    {
      type: 'editing_preference',
      source: 'Daniel Brink — Reel pacing note, origin series',
      content: 'Reels should not exceed 28 seconds. Past that we lose the viewer and we lose the discipline of the format. Every cut must earn its place. If a frame does not add a detail or advance the texture, cut it.',
      timestamp: '2025-10-08',
      importance: 9,
      tags: ['reel', 'pacing', 'duration', 'editing'],
    },

    // — SOCIAL POSTS (static social) —
    {
      type: 'tone_preference',
      source: 'Daniel Brink — Social Post review, CTA note',
      content: 'Social post CTA: "Find yours nearby" tells nobody anything. Write a neighborhood. Write a street name. We use specific intersections in our own emails — the post should do the same.',
      timestamp: '2025-11-20',
      importance: 9,
      tags: ['social-post', 'cta', 'copy', 'specificity'],
    },
    {
      type: 'revision_pattern',
      source: 'Daniel Brink — Social Post caption review',
      content: 'Caption has three hashtags. Remove all of them. If the image needs hashtags to be found, the image is not strong enough. We do not tag to trend.',
      timestamp: '2025-11-05',
      importance: 8,
      tags: ['social-post', 'caption', 'hashtags'],
    },
    {
      type: 'delivery_feedback',
      source: 'Aya Tanaka — Social Post review, warm approval',
      content: 'This one works. The caption is two sentences, both specific, neither of them marketing. Keep this as the template for the next three posts.',
      timestamp: '2025-12-02',
      importance: 8,
      tags: ['social-post', 'approved', 'caption', 'template'],
    },

    // — BILLBOARDS (large format OOH) —
    {
      type: 'brand_constraint',
      source: 'Daniel Brink — Billboard standard, confirmed via brand brief',
      content: 'Billboard: tagline only. "Made slowly, on purpose." — that is the only copy. No secondary line, no URL, no store name. The billboard is a photograph and that phrase.',
      timestamp: '2025-09-25',
      importance: 10,
      tags: ['billboard', 'tagline', 'copy', 'locked'],
    },
    {
      type: 'revision_pattern',
      source: 'Daniel Brink — Billboard review, texture resolution issue',
      content: 'The linen grain disappears at billboard scale. This image was not tested at 100%. For OOH deliverables, check texture at actual output resolution before submission — if it disappears, reshoot.',
      timestamp: '2025-10-12',
      importance: 9,
      tags: ['billboard', 'texture', 'resolution', 'linen'],
    },
    {
      type: 'editing_preference',
      source: 'Daniel Brink — Billboard composition note',
      content: 'At billboard scale the hand dominates. That is correct. Do not try to balance it with secondary product — the hand and the cup, nothing else in the frame. Crop everything else out.',
      timestamp: '2025-09-30',
      importance: 9,
      tags: ['billboard', 'composition', 'crop', 'hand'],
    },

    // — CROSS-FORMAT / GENERAL —
    {
      type: 'brand_constraint',
      source: 'Daniel Brink — locked tagline confirmation',
      content: '"Made slowly, on purpose." is locked with legal. Do not alter it, do not punctuate it differently, do not translate it into a visual metaphor. It is exact across all formats.',
      timestamp: '2025-09-25',
      importance: 10,
      tags: ['brand', 'tagline', 'legal', 'locked'],
    },
    {
      type: 'editor_note',
      source: 'Internal note — Daniel delivery framing',
      content: 'Daniel responds well when delivery messages reference a specific earlier decision. "We kept the linen visible at the bottom edge, as you asked in October" lands. Generic delivery emails get ignored.',
      timestamp: '2025-12-02',
      importance: 7,
      tags: ['communication', 'delivery', 'framing'],
    },
    {
      type: 'client_preference',
      source: 'Daniel Brink — brand review session',
      content: 'Saturated orange is banned across all formats. Warm neutrals only — cream, oat, raw umber. If a color reads warm on a calibrated monitor, it is too warm for us.',
      timestamp: '2025-09-10',
      importance: 10,
      tags: ['color', 'palette', 'orange', 'brand'],
    },
    {
      type: 'revision_pattern',
      source: 'Daniel Brink — lifestyle model note',
      content: 'Lifestyle smiles to camera get cut every time, across every format. The subject should be looking at the cup, the pour, or off frame — not at the viewer.',
      timestamp: '2025-10-18',
      importance: 9,
      tags: ['lifestyle', 'model', 'expression'],
    },
    {
      type: 'client_preference',
      source: 'Daniel Brink — prop standards, all deliverables',
      content: 'Ceramic and wood only. No plastic props in frame, ever. Linen, ceramic, wood — those are the surfaces. If a stylist brings anything else, send it back before the shoot.',
      timestamp: '2025-09-14',
      importance: 9,
      tags: ['props', 'brand', 'materials'],
    },
  ],

  // ─── LUMEN ATELIER ─────────────────────────────────────────────────────────
  // Sora Halberstam: gallerist voice, speaks in millimetres, composition-first.
  // ───────────────────────────────────────────────────────────────────────────
  'lumen': [

    // — ADS (static, editorial/print) —
    {
      type: 'delivery_feedback',
      source: 'Sora Halberstam — Ad review, SS26 Pendant hero',
      content: 'Ad deliverable: the pendant is 3.5° off vertical. This is not stylistic — it is a production error. For a print placement at this scale, correct before the next round.',
      timestamp: '2025-11-08',
      importance: 10,
      tags: ['ad', 'alignment', 'precision', 'pendant'],
    },
    {
      type: 'revision_pattern',
      source: 'Sora Halberstam — Ad color note, brass grading',
      content: 'Ad grade: the brass is reading yellow under tungsten. Warm-cool means shadow side pulls slightly blue while the face stays amber. Yellow means the grade is wrong. Fix the grade, do not fix the image.',
      timestamp: '2025-10-14',
      importance: 10,
      tags: ['ad', 'color', 'brass', 'grading'],
    },
    {
      type: 'editing_preference',
      source: 'Sora Halberstam — Ad depth of field note',
      content: 'For product ads, full surface must be in focus. I need the chain, the clasp, and the face of the pendant — all sharp. Shoot stopped down or use focus stacking. Bokeh on product reads lifestyle, not editorial.',
      timestamp: '2025-09-22',
      importance: 9,
      tags: ['ad', 'dof', 'focus', 'product'],
    },
    {
      type: 'revision_pattern',
      source: 'Sora Halberstam — Ad symmetry check, pendant detail',
      content: 'Ad composition is off-axis by approximately 6 pixels left. I can see it on a 27-inch monitor. Correct before delivery — do not assume it is within tolerance for print.',
      timestamp: '2025-11-22',
      importance: 9,
      tags: ['ad', 'symmetry', 'composition', 'precision'],
    },
    {
      type: 'delivery_feedback',
      source: 'Sora Halberstam — Ad lighting review, shadow',
      content: 'The shadow on the left plane has gone soft. We chose single-source lighting to create hard geometry. A soft shadow means fill was added after. Remove the fill — for ads this is the only acceptable shadow.',
      timestamp: '2025-11-20',
      importance: 9,
      tags: ['ad', 'lighting', 'shadow', 'fill'],
    },
    {
      type: 'performance_signal',
      source: 'Sora Halberstam — Ad approval, Oak Series final',
      content: 'No notes. The proportions are correct. Approved.',
      timestamp: '2025-10-20',
      importance: 10,
      tags: ['ad', 'approved', 'silence-is-approval'],
    },

    // — SOCIAL REELS (motion/video) —
    {
      type: 'delivery_feedback',
      source: 'Sora Halberstam — Reel review, brand intro loop',
      content: 'Reel transition eases in with a spring — approximately 0.3s overshoot at the end. Remove it. Linear in, linear out. We are not an app. Motion should feel like turning a page, not pressing a button.',
      timestamp: '2025-11-15',
      importance: 10,
      tags: ['reel', 'motion', 'easing', 'overshoot'],
    },
    {
      type: 'revision_pattern',
      source: 'Sora Halberstam — Reel pacing note, pendant reveal',
      content: 'The pendant reveal takes 4 seconds. It should take 1.5. Hold the static frame longer, then cut — do not animate the reveal itself. The pendant should appear, not arrive.',
      timestamp: '2025-11-18',
      importance: 9,
      tags: ['reel', 'pacing', 'reveal', 'motion'],
    },
    {
      type: 'client_preference',
      source: 'Sora Halberstam — Reel music brief',
      content: 'Reels: no music with rhythm. Tone, yes. Rhythm, no. Rhythm implies energy — we are not energetic, we are precise. A single sustained note or ambient texture is acceptable. Anything with a beat is not.',
      timestamp: '2025-10-10',
      importance: 10,
      tags: ['reel', 'music', 'audio', 'tone'],
    },
    {
      type: 'revision_pattern',
      source: 'Sora Halberstam — Reel cut note, Oak Series',
      content: 'The cut between the grain detail and the full piece is jump-cut in feel — the eyeline does not carry. Match the cut on movement or use a dissolve at 12 frames. Nothing faster.',
      timestamp: '2025-10-25',
      importance: 8,
      tags: ['reel', 'editing', 'cut', 'eyeline'],
    },
    {
      type: 'delivery_feedback',
      source: 'Sora Halberstam — Reel opener note',
      content: 'The reel opens on the logo. Open on the material — the oak grain, the brass surface, the light hitting the chain. Let the viewer understand what we make before they know who we are.',
      timestamp: '2025-11-01',
      importance: 9,
      tags: ['reel', 'opener', 'logo', 'material'],
    },

    // — SOCIAL POSTS (static social) —
    {
      type: 'client_preference',
      source: 'Sora Halberstam — Social Post caption standard',
      content: 'Social post captions: product name, material, and one sentence. Nothing else. No price, no URL, no call to action. If someone wants to buy it, they know how to find us.',
      timestamp: '2025-09-28',
      importance: 9,
      tags: ['social-post', 'caption', 'copy', 'minimal'],
    },
    {
      type: 'revision_pattern',
      source: 'Sora Halberstam — Social Post caption tracking',
      content: 'Caption text tracking is 0.08em in the social template. It should be 0.14em minimum. Small caps at 0.08em reads compressed. This applies to every post, every caption, every time.',
      timestamp: '2025-10-01',
      importance: 8,
      tags: ['social-post', 'typography', 'tracking', 'small-caps'],
    },
    {
      type: 'delivery_feedback',
      source: 'Sora Halberstam — Social Post image note',
      content: 'The image for this post is a lifestyle context shot — pendant on a table with coffee and a book. Remove. Use the isolated product shot from the studio day. Social posts are not mood boards.',
      timestamp: '2025-11-05',
      importance: 8,
      tags: ['social-post', 'lifestyle', 'rejected', 'product-shot'],
    },

    // — BILLBOARDS (large format) —
    {
      type: 'editing_preference',
      source: 'Sora Halberstam — Billboard image standard',
      content: 'Billboard: one image, no copy other than the brand mark in small caps. The piece should be large enough to read material from across the street. No secondary product in frame.',
      timestamp: '2025-09-20',
      importance: 10,
      tags: ['billboard', 'composition', 'copy', 'brand-mark'],
    },
    {
      type: 'revision_pattern',
      source: 'Sora Halberstam — Billboard alignment, SS26',
      content: 'At billboard scale the 3.5° off-vertical is visible from 20 meters. If we cannot correct it in post without degrading the brass edge, we reshoot. There is no acceptable version of a crooked pendant at this size.',
      timestamp: '2025-11-28',
      importance: 10,
      tags: ['billboard', 'alignment', 'reshoot', 'pendant'],
    },
    {
      type: 'delivery_feedback',
      source: 'Sora Halberstam — Billboard brass tone check',
      content: 'At large format the brass reads yellow in ambient light conditions. Grade it cooler before billboard output — what looks correct on screen reads yellow on backlit vinyl.',
      timestamp: '2025-12-01',
      importance: 9,
      tags: ['billboard', 'color', 'brass', 'output'],
    },

    // — CROSS-FORMAT / GENERAL —
    {
      type: 'tone_preference',
      source: 'Sora Halberstam — copy review, brand refresh',
      content: '"Handcrafted with care" — remove both words, across all formats. Show the joinery in the photograph. If the photograph does not show craft, the photograph is wrong.',
      timestamp: '2025-10-08',
      importance: 10,
      tags: ['copy', 'faux-craft', 'brand', 'show-dont-tell'],
    },
    {
      type: 'editing_preference',
      source: 'Sora Halberstam — scale note, oak texture',
      content: 'Oak grain reads miniaturized across every format when shot with a standard zoom. Shoot closer or use a longer lens at greater distance. The texture must feel true to scale.',
      timestamp: '2025-09-30',
      importance: 8,
      tags: ['texture', 'scale', 'oak', 'focal-length'],
    },
    {
      type: 'brand_constraint',
      source: 'Klaus Renner — caption standard confirmation',
      content: 'Small caps, tracking no less than 0.12em, across all formats: print, digital, social, OOH. Sora will catch it. This is a brand standard, not a preference.',
      timestamp: '2025-10-03',
      importance: 8,
      tags: ['typography', 'small-caps', 'brand-standard'],
    },
    {
      type: 'editor_note',
      source: 'Internal note — Sora review cadence',
      content: 'Sora responds within 2 hours or not at all that day. If no response in 24 hours, the asset is approved. Do not follow up. She will note what is wrong; silence means everything is correct.',
      timestamp: '2025-09-15',
      importance: 9,
      tags: ['cadence', 'communication', 'approval'],
    },
    {
      type: 'client_preference',
      source: 'Sora Halberstam — material standard',
      content: 'Brass and oak are the only surfaces. Any prop that is not brass, oak, or negative space is wrong. No linen, no marble, no concrete. Those belong to other brands.',
      timestamp: '2025-09-08',
      importance: 9,
      tags: ['props', 'brand', 'materials'],
    },
    {
      type: 'revision_pattern',
      source: 'Sora Halberstam — off-axis rejection, recurring',
      content: 'Off-axis crops appear repeatedly. Rule of thirds is acceptable. Random off-axis is not. Either center the subject or follow rule-of-thirds strictly — in-between reads like a production mistake.',
      timestamp: '2025-10-28',
      importance: 8,
      tags: ['composition', 'crop', 'alignment', 'rule-of-thirds'],
    },
  ],

  // ─── NORTHSTAR OUTDOORS ─────────────────────────────────────────────────────
  // Tomás Reyes: guide voice, blunt, specific, occasionally dry.
  // Renée Castille: accuracy-focused, checks SKUs and specs.
  // ───────────────────────────────────────────────────────────────────────────
  'northstar': [

    // — ADS (static print/digital) —
    {
      type: 'delivery_feedback',
      source: 'Tomás Reyes — Ad review, Alpine Campaign hero',
      content: 'He is dry. The ad should look like effort costs something. Pull the take after the climb — the one with the breathing. That is the shot that sells the jacket.',
      timestamp: '2025-11-10',
      importance: 10,
      tags: ['ad', 'athlete', 'authenticity', 'effort'],
    },
    {
      type: 'revision_pattern',
      source: 'Tomás Reyes — Ad lighting review, trail shot',
      content: 'Studio flash on a trail print ad. I am looking at it. Flat fill at f/11, no shadows. This is a catalog shot. Kill it and reshoot in actual weather.',
      timestamp: '2025-10-18',
      importance: 10,
      tags: ['ad', 'lighting', 'catalog-look', 'reshoot'],
    },
    {
      type: 'tone_preference',
      source: 'Tomás Reyes — Ad copy review, FW26',
      content: 'Ad headline: "Adventure awaits." Remove it. Write the trail name. Write the elevation. Write the temperature. Give the reader something true — the product is specific, the headline should be too.',
      timestamp: '2025-11-05',
      importance: 10,
      tags: ['ad', 'copy', 'banned-words', 'specificity'],
    },
    {
      type: 'revision_pattern',
      source: 'Renée Castille — Ad product review, gear shot',
      content: 'Ad features the FW25 jacket. We are running an FW26 campaign. Pull the tag or reshoot with the correct SKU. Do not deliver an ad with last season\'s product.',
      timestamp: '2025-11-18',
      importance: 10,
      tags: ['ad', 'sku', 'accuracy', 'product'],
    },
    {
      type: 'brand_constraint',
      source: 'Tomás Reyes — Logo placement, all static ads',
      content: 'Logo is always corner placement for ads. Never centered, never floated over the scene. Corner. Bottom-right for vertical, bottom-left for horizontal. We have been over this.',
      timestamp: '2025-09-20',
      importance: 10,
      tags: ['ad', 'logo', 'placement', 'brand-standard'],
    },
    {
      type: 'delivery_feedback',
      source: 'Tomás Reyes — Ad sky note, landscape hero',
      content: 'The sky in the ad is flat — featureless blue. We should have waited for weather. Going forward, ads with landscape backgrounds require visible weather: cloud layer, light variation, or overcast. Blue sky reads like stock.',
      timestamp: '2025-10-25',
      importance: 9,
      tags: ['ad', 'sky', 'weather', 'landscape'],
    },

    // — SOCIAL REELS (video) —
    {
      type: 'revision_pattern',
      source: 'Tomás Reyes — Reel review, slow-motion jump',
      content: 'Slow motion on the hero jump. He is an athlete, not a dancer. Reels should run at normal speed on athletic moments — the impact should feel like impact, not a highlight reel from figure skating.',
      timestamp: '2025-11-02',
      importance: 9,
      tags: ['reel', 'slow-motion', 'pacing', 'athlete'],
    },
    {
      type: 'client_preference',
      source: 'Tomás Reyes — Reel music brief',
      content: 'Reels: no vocals. Instrumental or silence. Wind, footfall, gear sound, rain — those are acceptable. If a track has lyrics and I catch it on delivery, the entire audio track gets pulled and we recut.',
      timestamp: '2025-09-12',
      importance: 10,
      tags: ['reel', 'music', 'vocals', 'audio'],
    },
    {
      type: 'delivery_feedback',
      source: 'Tomás Reyes — Reel sweat note, athlete series',
      content: 'Four reels in a row and nobody is sweating. We make wet-weather gear. The athlete should look like they have been out for four hours, not forty minutes. Real exertion, real weather.',
      timestamp: '2025-10-30',
      importance: 9,
      tags: ['reel', 'athlete', 'authenticity', 'weather'],
    },
    {
      type: 'revision_pattern',
      source: 'Tomás Reyes — Reel text overlay',
      content: 'Text overlay on the reel is centered and fades in. Move it to bottom-left, no fade — cut on. And do not put copy over the athlete\'s face. Ever.',
      timestamp: '2025-11-12',
      importance: 9,
      tags: ['reel', 'text-overlay', 'composition'],
    },
    {
      type: 'performance_signal',
      source: 'Tomás Reyes — Reel approval, Trail Series v2',
      content: 'Approved. Fast turnaround. This is what happens when the cut matches the terrain instead of the music.',
      timestamp: '2025-11-22',
      importance: 10,
      tags: ['reel', 'approved', 'editing', 'pacing'],
    },
    {
      type: 'revision_pattern',
      source: 'Tomás Reyes — Reel opener note',
      content: 'The reel opens with the brand name and a wide establishing shot. Cut both. Open mid-action — boot on a rock, pack strap tightening, headlamp clicking on. Drop viewers into the situation.',
      timestamp: '2025-11-15',
      importance: 9,
      tags: ['reel', 'opener', 'action', 'hook'],
    },

    // — SOCIAL POSTS (static social) —
    {
      type: 'tone_preference',
      source: 'Tomás Reyes — Social Post caption review',
      content: 'Social post caption should read: trail name, distance, elevation, temperature. Four facts, no adjectives. "Relentless." is not a caption. It is a bumper sticker.',
      timestamp: '2025-11-08',
      importance: 9,
      tags: ['social-post', 'caption', 'specificity', 'copy'],
    },
    {
      type: 'revision_pattern',
      source: 'Tomás Reyes — Social Post gear visibility',
      content: 'Gear is only partially visible in the social post. The product is the proof point — the jacket zipper, the boot sole, the jacket seam in rain. If it is not visible, the post is not doing its job.',
      timestamp: '2025-11-20',
      importance: 8,
      tags: ['social-post', 'product', 'visibility'],
    },
    {
      type: 'delivery_feedback',
      source: 'Renée Castille — Social Post spec accuracy',
      content: 'The post copy says "waterproof to 20,000mm." The spec is 15,000mm. Fix before publishing. I check every number before it goes live.',
      timestamp: '2025-10-22',
      importance: 10,
      tags: ['social-post', 'specs', 'accuracy', 'copy'],
    },

    // — BILLBOARDS (OOH) —
    {
      type: 'editing_preference',
      source: 'Tomás Reyes — Billboard image brief',
      content: 'Billboard: one athlete, one environment, one line of copy — the trail name and a spec. That is it. No secondary product, no tagline, no social handle.',
      timestamp: '2025-09-25',
      importance: 10,
      tags: ['billboard', 'composition', 'copy', 'discipline'],
    },
    {
      type: 'revision_pattern',
      source: 'Tomás Reyes — Billboard studio model note',
      content: 'The billboard submission uses a model. Not an athlete — a model. You can see it in the hands, the posture, the expression. We do not run studio models at billboard scale. Reshoot with a real athlete.',
      timestamp: '2025-11-25',
      importance: 10,
      tags: ['billboard', 'model', 'athlete', 'reshoot'],
    },
    {
      type: 'delivery_feedback',
      source: 'Tomás Reyes — Billboard copy legibility',
      content: 'Trail name on the billboard is readable from 30 meters. It should read from 100 meters. Increase type size or reduce the number of words. One word at 200pt beats four words at 80pt.',
      timestamp: '2025-12-01',
      importance: 9,
      tags: ['billboard', 'copy', 'legibility', 'type-size'],
    },

    // — CROSS-FORMAT / GENERAL —
    {
      type: 'tone_preference',
      source: 'Tomás Reyes — banned word list, confirmed via email',
      content: 'These words do not appear in any Northstar deliverable across any format: adventure, explore, elevate, journey, wild, thrive, fearless, limitless, inspire. If a copywriter uses any of them, the draft comes back.',
      timestamp: '2025-08-30',
      importance: 10,
      tags: ['copy', 'banned-words', 'tone', 'brand'],
    },
    {
      type: 'client_preference',
      source: 'Tomás Reyes — athlete standard',
      content: 'Real athletes only, across all formats. Not fitness models, not climbers-who-model — guides, race finishers, working athletes. If they look too clean, they are the wrong person.',
      timestamp: '2025-09-05',
      importance: 10,
      tags: ['athlete', 'casting', 'authenticity'],
    },
    {
      type: 'revision_pattern',
      source: 'Tomás Reyes — aspirational imagery note',
      content: 'Aspirational shots with no friction get rejected every time. I do not care how good the light is. If there is no mud, no weather, no physical cost visible in the frame, it is not ours.',
      timestamp: '2025-10-08',
      importance: 9,
      tags: ['aspirational', 'rejected', 'authenticity', 'friction'],
    },
    {
      type: 'editor_note',
      source: 'Internal note — Tomás review cadence',
      content: 'Tomás approves or rejects same-day. If he says no, he is done — do not send options or ask for clarification. Fix it and resubmit clean. He will not explain himself twice.',
      timestamp: '2025-09-28',
      importance: 9,
      tags: ['cadence', 'communication', 'rejection'],
    },
    {
      type: 'client_preference',
      source: 'Tomás Reyes — weather policy, all outdoor shoots',
      content: 'We do not retouch weather into shots. If the shoot day is clear, we reschedule or we accept a clear sky. I would rather delay a deadline than fake the conditions.',
      timestamp: '2025-09-18',
      importance: 9,
      tags: ['weather', 'retouching', 'authenticity', 'scheduling'],
    },
  ],

  // ─── VERGE MOBILITY ─────────────────────────────────────────────────────────
  // Priya Shah: aggressive, high-volume notes, rewrites copy in markup.
  // Jaden Kwon: spec accuracy, typography weight, em-dash patrol.
  // ───────────────────────────────────────────────────────────────────────────
  'verge': [

    // — ADS (static, print/digital) —
    {
      type: 'delivery_feedback',
      source: 'Priya Shah — Ad round 1, Urban Commuter launch',
      content: 'This is a brochure for a bank. The bike should be off-center — 70% frame right. Put the orange on the left third. Make it louder. Do this before anything else on the ad.',
      timestamp: '2025-11-12',
      importance: 10,
      tags: ['ad', 'composition', 'bold', 'orange'],
    },
    {
      type: 'client_preference',
      source: 'Priya Shah — Ad typography brief',
      content: 'Ad font weight: 500 in the layout. Go to 800. We are competing with outdoor advertising at a bus stop — the headline should be readable at walking speed from across the street.',
      timestamp: '2025-10-01',
      importance: 10,
      tags: ['ad', 'typography', 'weight', 'bold'],
    },
    {
      type: 'revision_pattern',
      source: 'Priya Shah — Ad lifestyle rejection',
      content: 'I do not want a lifestyle ad. I want the bike against concrete with the orange at 80% of the frame. Stop trying to make it warm. It is not warm. It is fast. That is the ad.',
      timestamp: '2025-11-20',
      importance: 10,
      tags: ['ad', 'lifestyle', 'rejected', 'orange'],
    },
    {
      type: 'tone_preference',
      source: 'Priya Shah — Ad copy rewrite, Urban Commuter',
      content: '"Innovative urban mobility solution." That is four things wrong in one sentence. Replace with: "28 mph. No apology." If legal has an issue, I will deal with legal.',
      timestamp: '2025-11-15',
      importance: 10,
      tags: ['ad', 'copy', 'banned-phrases', 'bold'],
    },
    {
      type: 'revision_pattern',
      source: 'Priya Shah — Ad spec end card',
      content: 'The spec number in the ad end card is 14px. Make it 48px. Lead with the number — the number is the argument. Everything else is decoration.',
      timestamp: '2025-10-28',
      importance: 9,
      tags: ['ad', 'specs', 'type-size', 'end-card'],
    },
    {
      type: 'revision_pattern',
      source: 'Priya Shah — Ad smile rejection, round 3',
      content: 'Three ad revisions and we still have a smile. Smiling cyclists do not buy expensive bikes. Find the take where he looks focused, not happy. This goes back until the expression is correct.',
      timestamp: '2025-11-24',
      importance: 10,
      tags: ['ad', 'smile', 'expression', 'athlete'],
    },

    // — SOCIAL REELS (video) —
    {
      type: 'delivery_feedback',
      source: 'Priya Shah — Reel review, Speed Series',
      content: 'Motion blur on the spokes. Good. Do more of it. At 28 mph the wheel should be completely illegible. If you can read individual spokes, the reel reads slow.',
      timestamp: '2025-10-15',
      importance: 9,
      tags: ['reel', 'motion-blur', 'spokes', 'speed'],
    },
    {
      type: 'revision_pattern',
      source: 'Priya Shah — Reel opener, Urban Commuter',
      content: 'The reel opens with a title card and a fade. Cut both. Open on the wheel mid-motion. The viewer decides in the first 0.5 seconds. You gave them a title card. Start faster.',
      timestamp: '2025-11-08',
      importance: 10,
      tags: ['reel', 'opener', 'title-card', 'hook'],
    },
    {
      type: 'client_preference',
      source: 'Priya Shah — Reel music brief',
      content: 'Reels need tracks with tempo. Not ambient, not texture — tempo. Hard cuts on the beat. Light streaks on the transition. If the music sounds like it belongs in a meditation app, it does not belong in our reel.',
      timestamp: '2025-09-28',
      importance: 10,
      tags: ['reel', 'music', 'tempo', 'energy'],
    },
    {
      type: 'revision_pattern',
      source: 'Priya Shah — Reel soft palette rejection',
      content: 'The reel color grade is warm and soft. We are not a wellness brand. The palette is orange, concrete, black. Pull down the warmth, pull down the exposure on the highlights. Make it harder.',
      timestamp: '2025-11-05',
      importance: 9,
      tags: ['reel', 'color', 'grading', 'palette'],
    },
    {
      type: 'delivery_feedback',
      source: 'Priya Shah — Reel speed sequence, approved',
      content: 'The light streak on the turn at 0:12 is the best frame we have ever delivered. Use this approach for the FW26 campaign reel — show me a version with three of these.',
      timestamp: '2025-11-28',
      importance: 9,
      tags: ['reel', 'approved', 'light-streaks', 'speed'],
    },
    {
      type: 'revision_pattern',
      source: 'Priya Shah — Reel athlete note',
      content: 'The reel cuts between four different riders. Pick one. Story is one athlete, one route, one ride. Cutting between people makes it feel like an ad for a club, not a machine.',
      timestamp: '2025-11-18',
      importance: 8,
      tags: ['reel', 'athlete', 'narrative', 'editing'],
    },

    // — SOCIAL POSTS (static social) —
    {
      type: 'tone_preference',
      source: 'Priya Shah — Social Post copy, spec-first approach',
      content: 'Social post copy: lead with the number. "28 mph. 45-mile range. Ships in 3 days." That is a caption. "Experience the future of urban commuting" is not. Numbers first, always.',
      timestamp: '2025-11-10',
      importance: 9,
      tags: ['social-post', 'copy', 'specs', 'numbers'],
    },
    {
      type: 'revision_pattern',
      source: 'Priya Shah — Social Post image note',
      content: 'The social post image has the bike centered on a white background. That is a product listing, not a post. Concrete, off-center, orange in frame. Every. Single. Post.',
      timestamp: '2025-11-02',
      importance: 9,
      tags: ['social-post', 'composition', 'background', 'product'],
    },
    {
      type: 'delivery_feedback',
      source: 'Jaden Kwon — Social Post spec accuracy check',
      content: 'Post copy says "up to 50-mile range." The spec sheet says 45 miles. Fix the number before posting. I check every spec against the product sheet before it goes live.',
      timestamp: '2025-10-20',
      importance: 10,
      tags: ['social-post', 'specs', 'accuracy', 'copy'],
    },

    // — BILLBOARDS (OOH, large format) —
    {
      type: 'editing_preference',
      source: 'Priya Shah — Billboard brief, Urban Commuter OOH',
      content: 'Billboard: one number at maximum type size. "28 mph" all caps, white on orange, bike off-center below. No tagline. No secondary copy. If someone has to read it twice to get it, it is wrong.',
      timestamp: '2025-09-22',
      importance: 10,
      tags: ['billboard', 'copy', 'type-size', 'composition'],
    },
    {
      type: 'revision_pattern',
      source: 'Priya Shah — Billboard palette correction',
      content: 'The billboard background is grey with an orange accent. Flip it. Orange should be the primary field, grey or concrete as accent. At scale, orange dominant is the only way this reads at 60mph.',
      timestamp: '2025-11-26',
      importance: 9,
      tags: ['billboard', 'color', 'orange', 'palette'],
    },
    {
      type: 'delivery_feedback',
      source: 'Priya Shah — Billboard soft gradient note',
      content: 'There is a soft gradient on the billboard background — it goes from orange to soft amber. Remove it. Flat orange. Gradients at OOH scale read as a printing error.',
      timestamp: '2025-12-02',
      importance: 9,
      tags: ['billboard', 'color', 'gradient', 'ooh'],
    },

    // — CROSS-FORMAT / GENERAL —
    {
      type: 'client_preference',
      source: 'Priya Shah — color policy, all deliverables',
      content: 'Soft palettes do not exist in our work. Beige, sage, anything that belongs in a wellness brand gets returned. The palette is orange, concrete, and black across every format.',
      timestamp: '2025-09-10',
      importance: 10,
      tags: ['color', 'palette', 'brand', 'policy'],
    },
    {
      type: 'brand_constraint',
      source: 'Priya Shah — AI imagery policy',
      content: 'No generative AI imagery. Not in concepting, not in mockups, not in finals. If I find out an asset was AI-generated and delivered without disclosure, the relationship ends. This is not negotiable.',
      timestamp: '2025-09-05',
      importance: 10,
      tags: ['ai-imagery', 'policy', 'non-negotiable'],
    },
    {
      type: 'revision_pattern',
      source: 'Priya Shah — em-dash note, recurring',
      content: 'Em-dashes in headlines get removed every time — Jaden flags them, I remove them. Use a period or a line break. We have sent this back on four separate deliverables.',
      timestamp: '2025-10-12',
      importance: 8,
      tags: ['typography', 'em-dash', 'copy', 'recurring'],
    },
    {
      type: 'editor_note',
      source: 'Internal note — Priya review expectations',
      content: 'Expect a minimum of v3 on every Verge deliverable regardless of format. Priya rewrites copy directly in PDF markup — paste her exact version. She will notice if a word is changed.',
      timestamp: '2025-09-20',
      importance: 9,
      tags: ['cadence', 'copy', 'markup', 'revisions'],
    },
    {
      type: 'revision_pattern',
      source: 'Priya Shah — centered layout rejection',
      content: 'Centered, polite layouts get rejected across every format — ad, post, reel, billboard. Off-center, aggressive, high-contrast. Every layout should feel like it is competing for attention.',
      timestamp: '2025-10-08',
      importance: 9,
      tags: ['layout', 'composition', 'bold', 'recurring'],
    },
  ],
}
