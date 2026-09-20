

const UrlCard = ({ url, deleteUrl, copyShortUrl }) => {
  return (
    <article
      key={url.id}
      className="grid gap-4 px-5 py-5 transition hover:bg-[#f8fafc] sm:px-6 lg:grid-cols-[1fr_auto]"
    >
      <div className="min-w-0">
        <a
          href={`http://localhost:3000/${url.shortCode}`}
          target="_blank"
          className="break-all text-base font-semibold text-[#2563eb]">
          {`http://localhost:3000/${url.shortCode}`}
        </a>
        <p className="mt-2 truncate text-sm text-[#64748b]">
          {url.originalUrl}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className=" flex gap-2 ">
          <p className="text-xs font-medium  tracking-[0.14em] text-[#94a3b8]">
            Clicks
          </p>
          <p className="text-xs font-semibold text-[#0f172a]">{url.clicks}</p>
        </div>
        <button
          type="button"
          onClick={() => { 
            copyShortUrl(`http://localhost:3000/${url.shortCode}`)
          }}
          className=" rounded-lg py-1 border border-[#dbe3ee] px-4 text-sm font-semibold text-[#334155] transition hover:border-[#2563eb] hover:text-[#2563eb]"
        >
          Copy
        </button>
        <button
          type="button"
          onClick={() => { 
            deleteUrl(url._id)
          }}
          className="py-1 text-sm rounded-lg border border-[#fee2e2] bg-[#fff7f7] px-4 font-semibold text-[#dc2626] transition hover:bg-[#fee2e2]"
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default UrlCard