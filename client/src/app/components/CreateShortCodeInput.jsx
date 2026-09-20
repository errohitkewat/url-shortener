

const CreateShortCodeInput = ({ inputValue, createShortUrl, setInputValue }) => {
  return (
    <div className="flex flex-col gap-3 border border-[#ded1bd] bg-[#fffaf1] p-2 shadow-[0_18px_60px_rgba(58,45,31,0.08)] sm:flex-row sm:items-center">
        <input
          type="url"
          name="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste your long URL here"
          className="min-h-11 flex-1 border border-[#eadfce] bg-[#fffcf7] px-3 text-xs text-[#2b251f] outline-none transition placeholder:text-[#a79a8a] focus:border-[#8c7252] focus:bg-white sm:text-sm"
        />
        <button
          type="button"
          onClick={() => { 
            createShortUrl();
          }}
          className="min-h-11 bg-[#2b251f] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#fff8ec] shadow-[0_12px_28px_rgba(43,37,31,0.16)] transition hover:bg-[#4a3a2a]"
        >
          Shorten URL
        </button>
    </div>
  )
}

export default CreateShortCodeInput
