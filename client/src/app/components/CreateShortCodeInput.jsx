

const CreateShortCodeInput = ({ inputValue, createShortUrl, setInputValue }) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#e5e9f2] bg-[#f9fafc] p-3 sm:flex-row sm:items-center">
        <input
          type="url"
          name="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste your long URL here"
          className="min-h-12 flex-1 rounded-xl border border-transparent bg-white px-4 text-sm text-[#0f172a] outline-none ring-1 ring-[#e5e7eb] transition placeholder:text-[#94a3b8] focus:ring-2 focus:ring-[#2563eb]"
        />
        <button
          type="button"
          onClick={() => { 
            createShortUrl();
          }}
          className="min-h-12 rounded-xl bg-[#111827] px-6 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-[#1f2937]"
        >
          Shorten URL
        </button>
    </div>
  )
}

export default CreateShortCodeInput