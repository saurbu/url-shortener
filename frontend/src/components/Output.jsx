import { useState } from "react"
import QRCard from "./QRCard"

function Output({ result }) {
  const [copied, setCopied] = useState(false)

  const copyUrl = async () => {
    await navigator.clipboard.writeText(result.short_url)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <section className="mx-auto mt-8 grid max-w-4xl gap-5 lg:grid-cols-[1fr_260px]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-purple-400">
          YOUR SHORT URL
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={result.short_url}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 flex-1 truncate rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-purple-400 hover:text-purple-300"
          >
            {result.short_url}
          </a>

          <button
            onClick={copyUrl}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
            Original URL
          </p>

          <p className="mt-2 break-all text-sm leading-6 text-zinc-400">
            {result.original_url}
          </p>
        </div>

        <div className="mt-6 flex gap-8 border-t border-white/10 pt-5">
          <div>
            <p className="text-xs text-zinc-600">Clicks</p>
            <p className="mt-1 text-xl font-semibold">{result.clicks}</p>
          </div>

          <div>
            <p className="text-xs text-zinc-600">Code</p>
            <p className="mt-1 font-mono text-xl font-semibold">
              {result.short_code}
            </p>
          </div>
        </div>
      </div>

      <QRCard qrCode={result.qr_code} />
    </section>
  )
}

export default Output