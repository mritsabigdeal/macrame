export interface Person {
  id: string
  name: string
  initials: string
  role: string
  org: 'agency' | 'client'
  color: string
}

export interface Client {
  id: string
  name: string
  tag: string
  swatch: string
  activeProjects: number
  status: 'active' | 'archived'
}

export interface ClientProfile {
  id: string
  name: string
  swatch: string
  tagline: string
  leadReviewer: string
  reviewedAssets: number
  notesAvg: string
  voice: string
  likes: string[]
  dislikes: string[]
  pastQuotes: string[]
  cadence: string
}

export type ProjectTag = 'Ad' | 'Social Post' | 'Social Reel' | 'Billboard'

export interface Project {
  id: string
  clientId: string
  title: string
  dueDate: string
  tag: ProjectTag
  status: 'active' | 'completed'
}

export interface InboxItem {
  id: string
  assetName: string
  type: 'image' | 'video'
  project: string
  clientId: string
  stage: string
  request: string
  age: string
  priority: 'high' | 'normal'
}

// Keep from before:
export type MemoryType =
  | "client_preference"
  | "revision_pattern"
  | "tone_preference"
  | "editing_preference"
  | "delivery_feedback"
  | "project_context"
  | "brand_constraint"
  | "editor_note"
  | "performance_signal"

export interface MemoryItem {
  id?: string
  type: MemoryType
  clientId: string
  projectId?: string
  source: string
  content: string
  timestamp?: string
  importance?: number
  tags?: string[]
}

export interface RecallChunk {
  chunk_uuid: string
  source_id: string
  chunk_content: string
  relevancy_score: number
}

export interface TasteProfile {
  clientId: string
  summary: string
  tonePreferences: string[]
  editingPreferences: string[]
  pacingPreferences: string[]
  dislikes: string[]
  revisionTriggers: string[]
  deliveryPreferences: string[]
  highConfidencePatterns: string[]
  evolvingSignals: string[]
  confidenceNotes: string[]
  supportingMemories: string[]
}

export interface DeliveryReview {
  alignmentScore: number
  predictedRevisionRisks: string[]
  recommendedChanges: string[]
  deliveryFraming: string[]
  confidenceNotes: string[]
  supportingMemories: string[]
  rationale: string
}

export interface CurrentDelivery {
  script?: string
  editSummary?: string
  caption?: string
  deliveryNotes?: string
}

export interface IngestRequest {
  clientId: string
  items: Omit<MemoryItem, "clientId" | "id">[]
}

export interface TasteProfileRequest {
  clientId: string
}

export interface PreDeliveryRequest {
  clientId: string
  currentDelivery: CurrentDelivery
}
