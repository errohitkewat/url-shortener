

const UrlCard = ({ url, deleteUrl, BACKEND_URL, copyShortUrl }) => {
  return (
    <article
      key={url.id}
      className="grid gap-4 px-4 py-4 transition hover:bg-[#fbf4e8] sm:px-5 lg:grid-cols-[1fr_auto]"
    >
      <div className="min-w-0">
        <a
          href={`${BACKEND_URL}/${url.shortCode}`}
          target="_blank"
          className="break-all text-sm font-semibold text-[#3d3329] transition hover:text-[#7d5d35]">
          {`${BACKEND_URL}/${url.shortCode}`}
        </a>
        <p className="mt-2 truncate text-xs text-[#837360]">
          {url.originalUrl}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="mr-1 flex items-center gap-2 border border-[#e3d6c3] bg-[#fffcf7] px-3 py-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#988773]">
            Clicks
          </p>
          <p className="text-xs font-semibold text-[#2b251f]">{url.clicks}</p>
        </div>
        <button
          type="button"
          onClick={() => { 
            copyShortUrl(`${BACKEND_URL}/${url.shortCode}`)
          }}
          className="min-h-8 border border-[#d6c8b4] bg-transparent px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4c4237] transition hover:border-[#8c7252] hover:bg-[#f2e5d0]"
        >
          Copy
        </button>
        <button
          type="button"
          onClick={() => { 
            deleteUrl(url._id)
          }}
          className="min-h-8 border border-[#ead1c8] bg-[#fff8f4] px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9d3f2f] transition hover:bg-[#f5dfd7]"
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default UrlCard
