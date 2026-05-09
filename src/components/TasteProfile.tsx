import { useState } from "react"
import { api } from "../lib/api"
import { EvidenceCard } from "./EvidenceCard"
import type { TasteProfile as TasteProfileType } from "../lib/types"

interface Props {
  clientId: string
  memoriesLoaded: boolean
}

function ProfileSection({ label, items, accent = false }: { label: string; items: string[]; accent?: boolean }) {
  if (!items?.length) return null
  return (
    <div>
      <p className="label mb-2">{label}</p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li key={i} className={`text-sm leading-relaxed flex gap-2 ${accent ? "text-zinc-200" : "text-zinc-400"}`}>
            <span className="text-gold-dim shrink-0 mt-0.5">—</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TasteProfile({ clientId, memoriesLoaded }: Props) {
  const [profile, setProfile] = useState<TasteProfileType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function generate() {
    if (!clientId) return
    setLoading(true)
    setError(null)
    try {
      const result = await api.tasteProfile({ clientId })
      setProfile(result)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="label mb-1">Taste Profile</p>
            <p className="text-sm text-zinc-500">
              {memoriesLoaded
                ? `Synthesizing from ${clientId} memory`
                : "Load client memory first"}
            </p>
          </div>
          <button
            className="btn-primary shrink-0"
            onClick={generate}
            disabled={loading || !memoriesLoaded || !clientId}
          >
            {loading ? "Generating…" : profile ? "Regenerate" : "Generate Profile"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm px-4 py-3 rounded-md bg-red-950 text-red-400 border border-red-900">
          {error}
        </p>
      )}

      {loading && (
        <div className="card flex flex-col gap-4 animate-pulse">
          <div className="h-4 bg-zinc-800 rounded w-3/4" />
          <div className="h-3 bg-zinc-800 rounded w-full" />
          <div className="h-3 bg-zinc-800 rounded w-5/6" />
          <div className="h-3 bg-zinc-800 rounded w-4/6" />
        </div>
      )}

      {profile && !loading && (
        <>
          {/* Summary */}
          <div className="card border-gold/20">
            <p className="label mb-2">Editorial Summary</p>
            <p className="text-zinc-200 leading-relaxed">{profile.summary}</p>
          </div>

          {/* Preferences grid */}
          <div className="grid grid-cols-1 gap-4">
            <div className="card">
              <ProfileSection label="Tone Preferences" items={profile.tonePreferences} />
            </div>
            <div className="card">
              <ProfileSection label="Editing Preferences" items={profile.editingPreferences} />
            </div>
            <div className="card">
              <ProfileSection label="Pacing" items={profile.pacingPreferences} />
            </div>
            <div className="card">
              <p className="label mb-2">Dislikes</p>
              <ul className="flex flex-col gap-1.5">
                {profile.dislikes?.map((item, i) => (
                  <li key={i} className="text-sm text-red-400 leading-relaxed flex gap-2">
                    <span className="shrink-0 mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <ProfileSection label="Revision Triggers" items={profile.revisionTriggers} accent />
            </div>
            <div className="card">
              <ProfileSection label="Delivery Preferences" items={profile.deliveryPreferences} />
            </div>
          </div>

          {/* High confidence patterns */}
          {profile.highConfidencePatterns?.length > 0 && (
            <div className="card border-emerald-900/40">
              <p className="label mb-3">High-Confidence Patterns</p>
              <ul className="flex flex-col gap-2">
                {profile.highConfidencePatterns.map((p, i) => (
                  <li key={i} className="text-sm text-emerald-400 flex gap-2">
                    <span className="shrink-0">◆</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Evolving signals */}
          {profile.evolvingSignals?.length > 0 && (
            <div className="card border-amber-900/40">
              <p className="label mb-3">Evolving Signals</p>
              <ul className="flex flex-col gap-2">
                {profile.evolvingSignals.map((s, i) => (
                  <li key={i} className="text-sm text-amber-400 flex gap-2">
                    <span className="shrink-0">↑</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Supporting evidence */}
          {profile.supportingMemories?.length > 0 && (
            <div>
              <p className="label mb-3">Supporting Evidence</p>
              <div className="flex flex-col gap-2">
                {profile.supportingMemories.map((m, i) => (
                  <EvidenceCard key={i} text={m} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Confidence notes */}
          {profile.confidenceNotes?.length > 0 && (
            <div className="card border-zinc-800">
              <p className="label mb-2">Confidence Notes</p>
              <ul className="flex flex-col gap-1.5">
                {profile.confidenceNotes.map((n, i) => (
                  <li key={i} className="text-xs text-zinc-500 leading-relaxed flex gap-2">
                    <span className="shrink-0">·</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}
