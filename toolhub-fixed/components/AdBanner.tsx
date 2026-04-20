'use client'
import { useEffect, useRef } from 'react'

// ─── Replace with your real AdSense publisher ID after approval ───────────
const PUBLISHER_ID = 'ca-pub-XXXXXXXXXX'
// ─────────────────────────────────────────────────────────────────────────

export { AD_SLOTS } from '@/lib/adSlots'

interface Props {
  slot: string
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical'
  /** Extra Tailwind classes on the outer wrapper */
  className?: string
  /** Show a subtle "Advertisement" label above the ad (default true) */
  showLabel?: boolean
}

declare global {
  interface Window { adsbygoogle: unknown[] }
}

export default function AdBanner({ slot, format = 'auto', className = '', showLabel = true }: Props) {
  const ref = useRef<HTMLModElement>(null)

  useEffect(() => {
    try {
      const adsByGoogle = window.adsbygoogle || []
      adsByGoogle.push({})
      window.adsbygoogle = adsByGoogle
    } catch {}
  }, [])

  return (
    <div className={`overflow-hidden text-center ${className}`} aria-label="Advertisement">
      {showLabel && (
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-medium select-none">
          Advertisement
        </p>
      )}
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
