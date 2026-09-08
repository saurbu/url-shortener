function Header() {
  return (
    <header className="text-center">
      <div className="mb-5 inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-purple-300">
        URL SHORTENER
      </div>

      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Make your links
        <span className="text-purple-500"> shorter.</span>
      </h1>

    </header>
  )
}

export default Header