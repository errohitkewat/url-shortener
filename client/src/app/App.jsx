import "../app/App.css";
import UrlCard from "./components/UrlCard";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import CreateShortCodeInput from "./components/CreateShortCodeInput";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



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
    <main className="min-h-screen bg-[#f7f1e6] px-4 py-6 text-[#231f1a] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-5">
        <header className="flex flex-col gap-4 border-b border-[#ded1bd] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8c7252]">
              Link atelier
            </p>
            <h1 className="mt-3 max-w-2xl text-2xl font-semibold tracking-normal text-[#211c17] sm:text-3xl">
              Short links, quietly organized.
            </h1>
            <p className="mt-2 max-w-xl text-xs leading-5 text-[#776958] sm:text-sm">
              Create compact URLs and keep every recent link in a calm, polished workspace.
            </p>
          </div>
          <div className="w-fit border border-[#ded1bd] bg-[#fffaf1] px-3 py-2 text-xs text-[#6f604f] shadow-[0_10px_30px_rgba(58,45,31,0.06)]">
            {urls.length} { urls.length === 1 ? "link" : "links"}
          </div>
        </header>




        
        <CreateShortCodeInput inputValue={inputValue} createShortUrl={createShortUrl} setInputValue={ setInputValue } />




        <div className="border border-[#d8cab5] bg-[#29241e] p-4 text-[#fff8ec] shadow-[0_18px_50px_rgba(54,43,31,0.18)] sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d9c39d]">
                Current shortened URL
              </p>
              <a
                href={`${BACKEND_URL}/${currentUrl?.shortCode}`}
                target="_blank"
                className="mt-2 block break-all text-sm font-medium tracking-normal text-[#fffaf1] sm:text-base">
                { 
                  currentUrl ? `${BACKEND_URL}/${currentUrl.shortCode}` : "No URL created yet"
                }
              </a>
            </div>
            { 
              currentUrl ? <button
                type="button"
                onClick={() => copyShortUrl(`${BACKEND_URL}/${currentUrl?.shortCode}`)}
                className="min-h-9 border border-[#f5e5c9] bg-[#fff8ec] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#29241e] transition hover:bg-[#efe0c3]"
              >
                Copy
              </button> : ""
            }
          </div>
        </div>



        <div className="overflow-hidden border border-[#ded1bd] bg-[#fffaf1] shadow-[0_24px_70px_rgba(58,45,31,0.08)]">
          <div className="flex flex-col gap-2 border-b border-[#e8dcc9] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2c261f]">
                All shortened URLs
              </h2>
              <p className="mt-1 text-xs text-[#827260]">
                Review your recent links, clicks, and quick actions.
              </p>
            </div>
            <span className="w-fit border border-[#ded1bd] bg-[#f7f1e6] px-3 py-1 text-[11px] font-semibold text-[#6e5536]">
              {urls.length} { urls.length === 1 ? "link" : "links"}
            </span>
          </div>

          <div className="divide-y divide-[#e8dcc9]">
            {urls.map((url) => (
              <UrlCard BACKEND_URL={BACKEND_URL} copyShortUrl={ copyShortUrl } deleteUrl={ deleteUrl } key={url._id} url={url} />
            ))}
          </div>
        </div>



      </section>
    </main>
  )
}

export default App
