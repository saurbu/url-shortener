function QRCard({ qrCode }) {
  const qrImage = `data:image/png;base64,${qrCode}`

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="rounded-xl bg-white p-3">
        <img
          src={qrImage}
          alt="QR Code"
          className="h-40 w-40 sm:h-48 sm:w-48"
        />
      </div>

      <a
        href={qrImage}
        download="qr-code.png"
        className="mt-5 rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
      >
        Download QR
      </a>
    </div>
  )
}

export default QRCard