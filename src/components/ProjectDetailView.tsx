import { useState, useRef, useCallback } from 'react'
import { CLIENT_PROFILES, TEAM } from '../lib/data'
import { Avatar } from './Avatar'
import { api } from '../lib/api'
import type { Project, DeliveryReview } from '../lib/types'

interface ProjectDetailViewProps {
  project: Project
  clientId: string
  onBack: () => void
}

const TAG_COLORS: Record<string, string> = {
  'Ad':          'var(--info)',
  'Social Post': 'var(--accent)',
  'Social Reel': 'var(--accent-2)',
  'Billboard':   'var(--warn)',
}

const SAMPLE_NOTES: Record<string, string[]> = {
  'fnc-spring-26':  ['"Counter Ritual" tagline locked. Pull the orange back — it reads too warm against the ceramic.', 'Hands in frame are working. Keep that. The steam plate looks CG on the second shot.'],
  'fnc-summer-drop': ['Summer Beans palette needs to feel dry and hand-roasted. Avoid anything tropical.', '"Drop" needs to feel deliberate, not hype. One declarative sentence max.'],
  'fnc-winter-25':  ['Origin Series: faces optional. Texture is the story. Cold light, not warm.'],
  'fnc-holiday-24': ['Gift Campaign sign-off: removed "gift the experience" — rewrote to "give the morning."'],
  'lmn-ss26':       ['"SS26 Pendant" — The pendant was 3° off vertical in v2. Sora called it immediately. Re-shot.', 'Bokeh was removed per Sora feedback. Product at actual scale, single light source.'],
  'lmn-brand':      ['Brand Identity: Sora signed off on small caps + generous tracking for caption system.', '"Handcrafted" struck from all copy. Show it, don\'t say it.'],
  'lmn-oak-series': ['Oak Series: the grain needs to read warm-cool, not yellow. Brass tone calibrated.'],
  'nso-fw26':       ['FW26 Alpine: need real athletes. Nobody smiled in the final cut. That\'s correct.', '"Embark" cut. Trail name in copy instead. Tomás approved same day.'],
  'nso-trails':     ['"Trail Series Reels" — wide angle, weather you can feel. Gear partially out of frame approved.'],
  'nso-wet-gear':   ['Wet Weather: slow-mo on the river crossing was cut. Tomás: "He\'s not tired enough. Where\'s the effort?"'],
  'nso-summit-25':  ['Summit Hero — "adventure" and "wild" scrubbed. Short declarative lines only.'],
  'vrg-urban':      ['"Urban Commuter" v3 finally approved. First two too soft. Priya: "Make it louder."', 'Cyclist was off-center, orange pushed to 75% of frame — approved on v3.'],
  'vrg-speed':      ['Speed Series: motion blur and light streaks added late. Priya: no smiling cyclists. 0 approved in 14 months.'],
  'vrg-specs':      ['Spec Sheet: numbers large, specs larger. "Innovation" and "future of" struck on round 1.'],
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? 'var(--success)' : score >= 60 ? 'var(--warn)' : 'var(--danger)'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 6, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.6s ease' }} />
      </div>
      <span style={{ fontSize: 20, fontWeight: 700, color, fontFamily: 'var(--font-mono)', minWidth: 42 }}>{score}</span>
    </div>
  )
}

function ReviewSection({ label, items, color }: { label: string; items?: string[]; color: string }) {
  if (!items?.length) return null
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.55,
            padding: '8px 12px', background: 'var(--bg-canvas)',
            borderRadius: 'var(--radius-sm)', borderLeft: `2px solid ${color}`,
          }}>{item}</div>
        ))}
      </div>
    </div>
  )
}

export function ProjectDetailView({ project, clientId, onBack }: ProjectDetailViewProps) {
  const profile = CLIENT_PROFILES[clientId]
  const reviewer = profile ? TEAM[profile.leadReviewer] : null
  const tagColor = TAG_COLORS[project.tag] ?? 'var(--fg-muted)'
  const sampleNotes = SAMPLE_NOTES[project.id] ?? []

  const [assetFile, setAssetFile] = useState<File | null>(null)
  const [assetPreview, setAssetPreview] = useState<string | null>(null)
  const [assetType, setAssetType] = useState<'image' | 'video' | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [deliveryNotes, setDeliveryNotes] = useState('')
  const [review, setReview] = useState<DeliveryReview | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    const isVideo = file.type.startsWith('video/')
    const isImage = file.type.startsWith('image/')
    if (!isVideo && !isImage) return
    setAssetFile(file)
    setAssetType(isVideo ? 'video' : 'image')
    const url = URL.createObjectURL(file)
    setAssetPreview(url)
    setReview(null)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  async function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        // Strip the data URL prefix, keep only the base64 payload
        resolve(result.split(',')[1])
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function handleAnalyze() {
    setAnalyzing(true)
    setAnalyzeError(null)
    setReview(null)
    try {
      let imageBase64: string | undefined
      let imageMediaType: string | undefined

      if (assetFile && assetType === 'image') {
        imageBase64 = await toBase64(assetFile)
        imageMediaType = assetFile.type
      }

      const result = await api.preDeliveryReview({
        clientId,
        currentDelivery: {
          editSummary: `Project: ${project.title}. Format: ${project.tag}.${assetFile ? ` Asset: ${assetFile.name}.` : ''}`,
          deliveryNotes: deliveryNotes || undefined,
          imageBase64,
          imageMediaType,
        },
      })
      setReview(result)
    } catch (e) {
      setAnalyzeError(e instanceof Error ? e.message : String(e))
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100 }}>

      {/* Back + breadcrumb */}
      <button
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--fg-subtle)', fontSize: 12, fontFamily: 'var(--font-mono)',
          padding: '0 0 20px', marginBottom: 4,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {profile?.name ?? clientId}
      </button>

      {/* Project header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28,
        padding: '18px 22px', background: 'var(--bg-surface)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius)',
        borderLeft: `3px solid ${tagColor}`,
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, fontWeight: 400, color: 'var(--fg)', lineHeight: 1.1, marginBottom: 6 }}>
            {project.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-mono)',
              color: tagColor, padding: '2px 8px', borderRadius: 999,
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            }}>{project.tag.toUpperCase()}</span>
            {project.status === 'completed'
              ? <span style={{ fontSize: 11, color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>✓ Completed</span>
              : <span style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>Due {project.dueDate}</span>
            }
          </div>
        </div>
        {reviewer && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar initials={reviewer.initials} color={reviewer.color} size="sm" />
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: reviewer.color }}>{reviewer.name}</div>
              <div style={{ fontSize: 10, color: 'var(--fg-subtle)' }}>Lead reviewer</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24 }}>

        {/* Left — asset upload + review notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Asset upload zone */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 10 }}>
              Asset
            </div>
            {assetPreview ? (
              <div style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-canvas)' }}>
                {assetType === 'video' ? (
                  <video
                    src={assetPreview}
                    controls
                    style={{ width: '100%', maxHeight: 380, display: 'block', background: '#000' }}
                  />
                ) : (
                  <img
                    src={assetPreview}
                    alt="Uploaded asset"
                    style={{ width: '100%', maxHeight: 380, objectFit: 'contain', display: 'block' }}
                  />
                )}
                <button
                  onClick={() => { setAssetFile(null); setAssetPreview(null); setAssetType(null); setReview(null) }}
                  style={{
                    position: 'absolute', top: 10, right: 10,
                    background: 'oklch(0.10 0.008 60 / 0.85)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', color: 'var(--fg-muted)', cursor: 'pointer',
                    padding: '4px 10px', fontSize: 11, fontFamily: 'var(--font-mono)',
                  }}
                >Remove</button>
              </div>
            ) : (
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  height: 260, border: `1.5px dashed ${dragOver ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 10,
                  cursor: 'pointer', transition: 'all 0.15s',
                  background: dragOver ? 'oklch(0.78 0.16 65 / 0.04)' : 'var(--bg-canvas)',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--fg-subtle)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 4 }}>Drop image or video here</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)' }}>Images are analyzed by GPT-4o vision · video uses metadata only</div>
                </div>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*,video/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
          </div>

          {/* Delivery context */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 10 }}>
              Delivery context <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </div>
            <textarea
              value={deliveryNotes}
              onChange={e => setDeliveryNotes(e.target.value)}
              placeholder="Describe the asset — edit choices, framing, copy direction, anything the AI should know before predicting feedback…"
              style={{
                width: '100%', minHeight: 100, padding: '12px 14px',
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', color: 'var(--fg)', fontSize: 13,
                lineHeight: 1.6, resize: 'vertical', fontFamily: 'var(--font-sans)',
                outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--border-strong)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          {/* Analyze button */}
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 'var(--radius)',
              background: analyzing ? 'var(--bg-elevated)' : 'var(--accent)',
              border: '1px solid transparent',
              color: analyzing ? 'var(--fg-muted)' : 'oklch(0.12 0.008 60)',
              fontSize: 13, fontWeight: 600, cursor: analyzing ? 'default' : 'pointer',
              transition: 'all 0.15s', opacity: analyzing ? 0.7 : 1,
            }}
          >
            {analyzing ? (
              <>
                <div style={{ width: 14, height: 14, border: '2px solid var(--fg-subtle)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Analyzing…
              </>
            ) : '→ Predict Client Feedback'}
          </button>

          {analyzeError && (
            <div style={{ fontSize: 12, color: 'var(--danger)', background: 'oklch(0.68 0.20 25 / 0.10)', border: '1px solid oklch(0.68 0.20 25 / 0.30)', borderRadius: 'var(--radius-sm)', padding: '10px 14px' }}>
              {analyzeError}
            </div>
          )}

          {/* Previous review notes */}
          {sampleNotes.length > 0 && (
            <div style={{ padding: '18px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 12 }}>
                Previous review notes
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sampleNotes.map((note, i) => (
                  <blockquote key={i} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)',
                    borderLeft: '2px solid var(--border-strong)', paddingLeft: 12, margin: 0, lineHeight: 1.6,
                  }}>{note}</blockquote>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — AI feedback panel */}
        <div style={{ position: 'sticky', top: 20, alignSelf: 'start' }}>
          <div style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 4 }}>
              Pre-Delivery Review
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 16 }}>AI prediction based on {profile?.reviewedAssets ?? 0} reviewed assets</div>

            {!review && !analyzing && (
              <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--fg-subtle)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--fg-subtle)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 14px', display: 'block', opacity: 0.4 }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <div style={{ fontSize: 13, marginBottom: 4 }}>No analysis yet</div>
                <div style={{ fontSize: 12 }}>Upload an asset and click Predict to see how {reviewer?.name ?? 'the client'} will respond.</div>
              </div>
            )}

            {analyzing && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 0' }}>
                <div style={{ fontSize: 12, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>Recalling client memory…</div>
                {[90, 65, 80, 50, 75, 40].map((w, i) => (
                  <div key={i} style={{ height: 10, background: 'var(--bg-elevated)', borderRadius: 4, width: `${w}%`, opacity: 0.5 }} />
                ))}
              </div>
            )}

            {review && (
              <div>
                {/* Alignment score */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-subtle)', letterSpacing: '0.04em', marginBottom: 8 }}>Alignment score</div>
                  <ScoreBar score={review.alignmentScore} />
                </div>

                {/* Rationale */}
                {review.rationale && (
                  <div style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.65, padding: '12px 14px', background: 'var(--bg-tint)', borderRadius: 'var(--radius-sm)', marginBottom: 16, borderLeft: '2px solid var(--accent)' }}>
                    {review.rationale}
                  </div>
                )}

                <ReviewSection label="Revision risks" items={review.predictedRevisionRisks} color="var(--danger)" />
                <ReviewSection label="Recommended changes" items={review.recommendedChanges} color="var(--warn)" />
                <ReviewSection label="Delivery framing" items={review.deliveryFraming} color="var(--info)" />
                <ReviewSection label="Confidence notes" items={review.confidenceNotes} color="var(--fg-subtle)" />

                {review.supportingMemories?.length > 0 && (
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 8 }}>
                      Supporting evidence
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {review.supportingMemories.map((m, i) => (
                        <div key={i} style={{
                          fontSize: 11, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)',
                          padding: '6px 10px', background: 'var(--bg-canvas)',
                          borderRadius: 'var(--radius-sm)', lineHeight: 1.55,
                        }}>
                          {m.slice(0, 120)}{m.length > 120 ? '…' : ''}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
