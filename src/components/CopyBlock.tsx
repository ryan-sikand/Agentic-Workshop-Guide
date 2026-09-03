import { Check, Clipboard } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@uipath/apollo-wind/components/ui/button'
import { toast } from '@uipath/apollo-wind/components/ui/sonner'

type CopyBlockProps = {
  label: string
  value: string
  language?: 'json' | 'text'
  maxHeight?: string
}

export function CopyBlock({ label, value, language = 'text', maxHeight = 'max-h-80' }: CopyBlockProps) {
  const [copied, setCopied] = useState(false)

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.success(`${label} copied`)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      toast.error('Copy failed. Select the text and copy it manually.')
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-zinc-950 text-zinc-100 shadow-sm">
      <div className="flex min-w-0 items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-3 py-2 sm:px-4">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300" title={label}>
            {label}
          </p>
          <p className="text-[11px] text-zinc-500">{language === 'json' ? 'JSON' : 'Prompt'}</p>
        </div>
        <Button
          className="shrink-0 border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white"
          onClick={copyValue}
          size="sm"
          variant="outline"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      {/* Wrap rather than scroll sideways: these are prompts to read, and a long
          single-line prompt was hiding most of itself off the right edge. */}
      <pre
        className={`${maxHeight} overflow-auto whitespace-pre-wrap break-words p-4 text-xs leading-6 sm:text-sm`}
      >
        <code>{value}</code>
      </pre>
    </div>
  )
}
