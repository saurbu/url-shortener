import { useState } from "react"
import Header from "./components/Header"
import Input from "./components/Input"
import Output from "./components/Output"

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  return (
    <main className="min-h-screen bg-[#07070a] px-5 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Header />

        <Input
          onResult={setResult}
          onLoading={setLoading}
          onError={setError}
        />

        {loading && (
          <p className="mt-5 text-center text-sm text-zinc-500">
            Creating your short URL...
          </p>
        )}

        {error && (
          <div className="mx-auto mt-5 max-w-3xl rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {result && <Output result={result} />}

      </div>
    </main>
  )
}

export default App