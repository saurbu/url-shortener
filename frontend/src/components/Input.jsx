import { useState } from "react"

function Input({ onResult, onLoading, onError, result }) {
  const [url, setUrl] = useState("")

  const shortenUrl = async (e) => {
    e.preventDefault()

    if (!url.trim()) {
      onError("Please enter a URL")
      return
    }

    onLoading(true)
    onError("")
    onResult(null)

    try {
      const response = await fetch(
        "https://url-shortener-c0jw.onrender.com/api/url/shorten",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            url: url.trim()
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong")
      }

      onResult(data)
    } catch (error) {
      onError(error.message)
    } finally {
      onLoading(false)
    }
  }

  const clearInput = () => {
    setUrl("")
    onError("")
  }

  const newCreation = () => {
    setUrl("")
    onResult(null)
    onError("")
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <form
        onSubmit={shortenUrl}
        className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-purple-950/20 sm:flex-row"
      >
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-600"
        />

        {url && (
          <button
            type="button"
            onClick={clearInput}
            className="rounded-xl border border-white/10 px-5 py-4 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            Clear
          </button>
        )}

        <button
          type="submit"
          className="rounded-xl bg-purple-600 px-7 py-4 text-sm font-semibold transition hover:bg-purple-500 active:scale-[0.98]"
        >
          Shorten URL
        </button>
      </form>

      {result && (
        <button
          type="button"
          onClick={newCreation}
          className="mt-4 w-full rounded-xl border border-purple-500/30 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/20"
        >
          + Create New Short URL
        </button>
      )}
    </div>
  )
}

export default Input