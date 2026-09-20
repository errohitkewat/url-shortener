import "../app/App.css";
import UrlCard from "./components/UrlCard";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import CreateShortCodeInput from "./components/CreateShortCodeInput";




const App = () => {

  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);
  const [urls, setUrls] = useState([]);



  const fetchAllUrls = async () => { 
    const response = await axiosInstance.get("/api/url");
    console.log(response)
    setUrls(response.data.data.urls);
  }


  const createShortUrl = async () => { 
    const response = await axiosInstance.post("/api/url", {
      url: inputValue
    });

    console.log(response);

    setCurrentUrl(response.data.data.url)
    fetchAllUrls()

    setInputValue("");
  }



  const deleteUrl = async (id) => {
    await axiosInstance.delete(`/api/url/${id}`);
    fetchAllUrls();
  } 



  const copyShortUrl = async (shortUrl) => { 
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Url copied!")
    }
    catch (error) {
      console.error("Failed to copy URL:", error);
    }
  }



  useEffect(() => {
    fetchAllUrls();
  }, []);


  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-8 text-[#111827] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">



        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#0f172a] sm:text-4xl">
                Short links, cleanly managed.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748b] sm:text-base">
                Paste a long URL, create a compact link, and keep every shortened URL organized in one place.
              </p>
            </div>
          </div>
        </div>




        
        <CreateShortCodeInput inputValue={inputValue} createShortUrl={createShortUrl} setInputValue={ setInputValue } />




        <div className="rounded-[1.5rem] border border-[#dbe3ee] bg-[#0f172a] p-5 text-white shadow-[0_20px_70px_rgba(15,23,42,0.16)] sm:p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#93c5fd]">
                Current shortened URL
              </p>
              <a
                href={`http://localhost:3000/${currentUrl?.shortCode}`}
                target="_blank"
                className="mt-2 break-all text-lg font-semibold tracking-tight sm:text-xl">
                { 
                  currentUrl && `http://localhost:3000/${currentUrl.shortCode}`
                }
              </a>
            </div>
            { 
              currentUrl ? <button
                type="button"
                onClick={() => copyShortUrl(`http://localhost:3000/${currentUrl?.shortCode}`)}
                className="min-h-8 rounded-xl border border-white/15 bg-white px-5 text-sm font-semibold text-[#0f172a] transition hover:bg-[#e5efff]"
              >
                copy
              </button> : ""
            }
          </div>
        </div>



        <div className="overflow-hidden rounded-[1.75rem] border border-[#e1e6ef] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-2 border-b border-[#edf1f7] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#0f172a]">
                All shortened URLs
              </h2>
              <p className="mt-1 text-sm text-[#64748b]">
                Review your recent links, clicks, and quick actions.
              </p>
            </div>
            <span className="w-fit rounded-full bg-[#eff6ff] px-3 py-1 text-sm font-medium text-[#2563eb]">
              {urls.length} { urls.length === 1 ? "link" : "links"}
            </span>
          </div>

          <div className="divide-y divide-[#edf1f7]">
            {urls.map((url) => (
              <UrlCard copyShortUrl={ copyShortUrl } deleteUrl={ deleteUrl } key={url._id} url={url} />
            ))}
          </div>
        </div>



      </section>
    </main>
  )
}

export default App
