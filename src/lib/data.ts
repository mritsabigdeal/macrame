import type { Person, Client, ClientProfile, InboxItem, Project } from './types'

export const TEAM: Record<string, Person> = {
  mira:   { id: 'mira',   name: 'Mira Okafor',      initials: 'MO', role: 'Creative Director',       org: 'agency',  color: 'oklch(0.78 0.16 65)' },
  theo:   { id: 'theo',   name: 'Theo Park',         initials: 'TP', role: 'Senior Designer',          org: 'agency',  color: 'oklch(0.72 0.16 220)' },
  jules:  { id: 'jules',  name: 'Jules Renaud',      initials: 'JR', role: 'Producer',                 org: 'agency',  color: 'oklch(0.78 0.13 150)' },
  sana:   { id: 'sana',   name: 'Sana Iyer',         initials: 'SI', role: 'Copywriter',               org: 'agency',  color: 'oklch(0.70 0.17 25)' },
  kit:    { id: 'kit',    name: 'Kit Alvarez',        initials: 'KA', role: 'Motion',                   org: 'agency',  color: 'oklch(0.74 0.14 300)' },
  daniel: { id: 'daniel', name: 'Daniel Brink',      initials: 'DB', role: 'Brand Lead',               org: 'client',  color: 'oklch(0.82 0.14 85)' },
  aya:    { id: 'aya',    name: 'Aya Tanaka',         initials: 'AT', role: 'Marketing',                org: 'client',  color: 'oklch(0.75 0.14 180)' },
  sora:   { id: 'sora',   name: 'Sora Halberstam',   initials: 'SH', role: 'Creative Director, Lumen', org: 'client',  color: 'oklch(0.78 0.10 80)' },
  tomas:  { id: 'tomas',  name: 'Tomás Reyes',       initials: 'TR', role: 'Brand Director, Northstar', org: 'client', color: 'oklch(0.62 0.10 200)' },
  priya:  { id: 'priya',  name: 'Priya Shah',         initials: 'PS', role: 'CMO, Verge',               org: 'client',  color: 'oklch(0.62 0.18 25)' },
}

export const CLIENTS: Client[] = [
  { id: 'field-notes', name: 'Field Notes Coffee', tag: 'FNC', swatch: 'oklch(0.55 0.10 50)',  activeProjects: 2, status: 'active' },
  { id: 'lumen',       name: 'Lumen Atelier',       tag: 'LMN', swatch: 'oklch(0.78 0.06 80)',  activeProjects: 1, status: 'active' },
  { id: 'northstar',   name: 'Northstar Outdoors',   tag: 'NSO', swatch: 'oklch(0.55 0.08 200)', activeProjects: 3, status: 'active' },
  { id: 'verge',       name: 'Verge Mobility',       tag: 'VRG', swatch: 'oklch(0.50 0.18 25)',  activeProjects: 1, status: 'active' },
]

export const CLIENT_PROFILES: Record<string, ClientProfile> = {
  'field-notes': {
    id: 'field-notes',
    name: 'Field Notes Coffee',
    swatch: 'oklch(0.55 0.10 50)',
    tagline: 'Quiet, slow, made with hands.',
    leadReviewer: 'daniel',
    reviewedAssets: 47,
    notesAvg: '14 per asset',
    voice: 'Restrained, observant, allergic to marketing-speak. Will rewrite a line three times to remove an adjective.',
    likes: [
      'Linen, ceramic, wood — texture you can almost feel',
      'Hands in frame; faces optional',
      'Warm neutrals: cream, oat, raw umber',
      'Short declarative sentences with one specific number',
      'Negative space upper-left where headlines land',
    ],
    dislikes: [
      'Anything described as "elevated", "curated", or "experience"',
      'Steam plates that read CG',
      'Saturated oranges',
      'Music that swells',
      'Lifestyle smiles to camera',
    ],
    pastQuotes: [
      '"Pull the orange back ~10%. Cup is competing with the hand."',
      '"Made slowly, on purpose." — locked tagline, do not change.',
      '"If we have to explain it on a card, the photo isn\'t doing the job."',
    ],
    cadence: 'Pinpoint, line-level. Daniel leaves 4–6 surgical notes; Aya tends to second one and add a kindness.',
  },
  'lumen': {
    id: 'lumen',
    name: 'Lumen Atelier',
    swatch: 'oklch(0.78 0.06 80)',
    tagline: 'Brass, oak, and the angle of light at 4pm.',
    leadReviewer: 'sora',
    reviewedAssets: 28,
    notesAvg: '9 per asset',
    voice: 'Architectural. Sora reviews like a gallerist — composition first, color second, copy almost never.',
    likes: [
      'Editorial, single-light, hard shadows',
      'Brass that reads warm-cool not yellow',
      'Symmetrical or rule-of-thirds',
      'Materials at actual scale',
      'Captions in small caps, generous tracking',
    ],
    dislikes: [
      'Bokeh on product (reads "lifestyle")',
      'Faux-craft language: "handcrafted", "thoughtful"',
      'Brass that turns yellow under tungsten',
      'Off-axis crops',
      'Any motion with easing overshoot',
    ],
    pastQuotes: [
      '"The pendant is 3° off vertical. Re-shoot or rotate."',
      '"Drop the word craftsmanship. Show it instead."',
      '"The brass needs more cool in the highlight."',
    ],
    cadence: 'Few notes, high specificity. A single Sora pin can require a re-shoot. Silence is approval.',
  },
  'northstar': {
    id: 'northstar',
    name: 'Northstar Outdoors',
    swatch: 'oklch(0.55 0.08 200)',
    tagline: 'Wet rocks, hard weather, plain words.',
    leadReviewer: 'tomas',
    reviewedAssets: 112,
    notesAvg: '6 per asset',
    voice: 'Plainspoken to a fault. Tomás writes like a guide — short, useful, occasionally funny.',
    likes: [
      'People mid-action — sweat, breath, weight on foot',
      'Wide angles, weather you can feel',
      'Real athletes, never models',
      'Imperfect crops — gear partially out of frame is a feature',
      'Copy that names the trail, fabric, temperature',
    ],
    dislikes: [
      'Studio lighting on people',
      'Adventure, explore, elevate, journey, wild — banned',
      'Slow-mo on hero athletic moments',
      'Aspirational shots with no friction',
      'Logos floated over scene',
    ],
    pastQuotes: [
      '"This looks like a catalog. Where\'s the wind?"',
      '"Cut \'embark\'. Replace with the trail name."',
      '"He\'s not tired enough. Is there a take after the climb?"',
    ],
    cadence: 'Fast, blunt, decisive. Approves or rejects same-day.',
  },
  'verge': {
    id: 'verge',
    name: 'Verge Mobility',
    swatch: 'oklch(0.50 0.18 25)',
    tagline: 'Hard edges, hot color, no apology.',
    leadReviewer: 'priya',
    reviewedAssets: 19,
    notesAvg: '21 per asset',
    voice: 'Direct, demanding, energetic. Priya pushes for boldness — rejects for being too safe more than too aggressive.',
    likes: [
      'Hard color blocking — molten orange against concrete',
      'Isometric product on monolithic backdrops',
      'Type that fights for attention',
      'Speed cues: motion blur, light streaks',
      'Numbers large. Specs larger.',
    ],
    dislikes: [
      'Soft palettes; anything beige',
      'Cyclists smiling (not approved one in 14 months)',
      'Generative AI imagery — ever',
      'Centered polite layouts',
      '"Innovation", "future of", "revolution"',
    ],
    pastQuotes: [
      '"Make it louder. We\'re not a wellness brand."',
      '"Move the bike off-center, push the orange to 80% of the frame."',
      '"This is the third version with a smile. Please."',
    ],
    cadence: 'Many notes, fast turnaround, often rewrites copy in markup. Expect v3 minimum.',
  },
}

export const PROJECTS: Project[] = [
  // Field Notes Coffee
  { id: 'fnc-spring-26',  clientId: 'field-notes', title: "Spring '26 — Counter Ritual",   dueDate: 'May 22',  tag: 'Social Reel', status: 'active'    },
  { id: 'fnc-summer-drop', clientId: 'field-notes', title: 'Summer Beans Drop',              dueDate: 'Jul 10',  tag: 'Ad',          status: 'active'    },
  { id: 'fnc-winter-25',  clientId: 'field-notes', title: "Winter '25 — Origin Series",     dueDate: 'Dec 12',  tag: 'Billboard',   status: 'completed' },
  { id: 'fnc-holiday-24', clientId: 'field-notes', title: 'Holiday Gift Campaign',           dueDate: 'Nov 30',  tag: 'Social Post', status: 'completed' },

  // Lumen Atelier
  { id: 'lmn-ss26',       clientId: 'lumen',       title: 'SS26 Pendant Collection',        dueDate: 'Jun 5',   tag: 'Billboard',   status: 'active'    },
  { id: 'lmn-brand',      clientId: 'lumen',       title: 'Brand Identity Refresh',          dueDate: 'Apr 30',  tag: 'Ad',          status: 'completed' },
  { id: 'lmn-oak-series', clientId: 'lumen',       title: 'Oak Series — Editorial',          dueDate: 'Mar 18',  tag: 'Social Post', status: 'completed' },

  // Northstar Outdoors
  { id: 'nso-fw26',       clientId: 'northstar',   title: 'FW26 Alpine Campaign',            dueDate: 'Aug 1',   tag: 'Ad',          status: 'active'    },
  { id: 'nso-trails',     clientId: 'northstar',   title: 'Trail Series Reels',              dueDate: 'Jun 20',  tag: 'Social Reel', status: 'active'    },
  { id: 'nso-wet-gear',   clientId: 'northstar',   title: 'Wet Weather Gear Launch',         dueDate: 'Sep 15',  tag: 'Social Post', status: 'active'    },
  { id: 'nso-summit-25',  clientId: 'northstar',   title: "Summit '25 — Hero Campaign",      dueDate: 'Oct 1',   tag: 'Billboard',   status: 'completed' },

  // Verge Mobility
  { id: 'vrg-urban',      clientId: 'verge',       title: 'Urban Commuter Launch',           dueDate: 'May 30',  tag: 'Ad',          status: 'active'    },
  { id: 'vrg-speed',      clientId: 'verge',       title: 'Speed Series',                    dueDate: 'Jun 12',  tag: 'Social Reel', status: 'completed' },
  { id: 'vrg-specs',      clientId: 'verge',       title: 'Spec Sheet Campaign',             dueDate: 'Apr 5',   tag: 'Billboard',   status: 'completed' },
]

export const INBOX_ITEMS: InboxItem[] = [
  { id: 'i1', assetName: 'Hero — Counter Ritual', type: 'image', project: "Field Notes — Spring '26", clientId: 'field-notes', stage: 'client',   request: 'Final review',    age: '2h',  priority: 'high'   },
  { id: 'i2', assetName: 'Spring Spot — 30s',     type: 'video', project: "Field Notes — Spring '26", clientId: 'field-notes', stage: 'client',   request: 'Final review',    age: '4h',  priority: 'high'   },
  { id: 'i3', assetName: 'Pour-over Detail',       type: 'image', project: "Field Notes — Spring '26", clientId: 'field-notes', stage: 'internal', request: 'Internal sign-off', age: '6h',  priority: 'normal' },
  { id: 'i4', assetName: 'Brand Hero',             type: 'image', project: 'Lumen — SS26',             clientId: 'lumen',       stage: 'internal', request: 'CD review',        age: '1d',  priority: 'normal' },
  { id: 'i5', assetName: 'Trail Campaign',         type: 'video', project: 'Northstar — FW26',         clientId: 'northstar',   stage: 'client',   request: 'Client approval',  age: '2d',  priority: 'high'   },
]
