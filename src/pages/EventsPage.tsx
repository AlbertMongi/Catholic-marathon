import React, { useState, useMemo, useEffect } from 'react';
import { Download, Share2, X } from 'lucide-react'; // ← modern icons
const galleryImages = [
    // Your original 2025 photos
  { src: "/images/JMN_9052.JPG",  year: 2026 },
  { src: "/images/JMN_9069.JPG",  year: 2026 },
  { src: "/images/JMN_9078.JPG",  year: 2026 },
  { src: "/images/JMN_9082.JPG",  year: 2026 },
  { src: "/images/JMN_9085.JPG",  year: 2026 },
  { src: "/images/JMN_9088.JPG",  year: 2026 },
  { src: "/images/JMN_9093.JPG",  year: 2026 },
  { src: "/images/JMN_9117.JPG",  year: 2026 },
  { src: "/images/JMN_9119.JPG",  year: 2026 },
  { src: "/images/JMN_9125.JPG",  year: 2026 },
  { src: "/images/JMN_9156.JPG",  year: 2026 },
  { src: "/images/JMN_9159.JPG",  year: 2026 },
  { src: "/images/JMN_9167.JPG",  year: 2026 },
  { src: "/images/JMN_9222.JPG",  year: 2026 },
  { src: "/images/JMN_9158.JPG",  year: 2026 },
  { src: "/images/JMN_9126.JPG",  year: 2026 },
    { src: "/images/4H7A0373.JPG", year: 2026},
  { src: "/images/4H7A0391.JPG", year: 2026 },
  // 2023 photos (from your screenshot)
    // Your original 2025 photos
  { src: "/images/WhatsApp Image 2026-02-25 at 20.44.36 (1).jpeg", year: 2024 },

{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.37 (1).jpeg", year: 2024 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.37 (2).jpeg", year: 2024 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.37.jpeg", year: 2024 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.38 (1).jpeg", year: 2024 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.38 (2).jpeg", year: 2024 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.38.jpeg", year: 2024 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.39 (1).jpeg", year: 2024 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.39.jpeg", year: 2024 },


// 2025 photos
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.36.jpeg", year: 2025 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.40 (1).jpeg", year: 2025 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.40 (2).jpeg", year: 2025 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.40.jpeg", year: 2025 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.41 (1).jpeg", year: 2025 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.41.jpeg", year: 2025 },
{ src: "/images/WhatsApp Image 2026-02-25 at 20.44.39 (2).jpeg", year: 2025 },

//  { src: "/images/DSC_0100.jpg",   year: 2023 },
  { src: "/images/DSC_0771-1.jpg", year: 2023 },
  { src: "/images/IMG_2193.jpg",   year: 2023 },
  { src: "/images/IMG_2201.jpg",   year: 2023 },
  { src: "/images/IMG_2208.jpg",   year: 2023 },
  { src: "/images/IMG_2214.jpg",   year: 2023 },
  { src: "/images/IMG_2216.jpg",   year: 2023 },
  { src: "/images/IMG_2221.jpg",   year: 2023 },
  { src: "/images/IMG_2232.jpg",   year: 2023 },
  { src: "/images/IMG_2236.jpg",   year: 2023 },
  { src: "/images/IMG_2238.jpg",   year: 2023 },
  { src: "/images/IMG_2240.jpg",   year: 2023 },
  { src: "/images/IMG_2241.jpg",   year: 2023 },
  { src: "/images/IMG_2243.jpg",   year: 2023 },
  { src: "/images/IMG_2244.jpg",   year: 2023 },
  { src: "/images/IMG_2247.jpg",   year: 2023 },
  { src: "/images/IMG_2248.jpg",   year: 2023 },
  { src: "/images/IMG_2249.jpg",   year: 2023 },
  { src: "/images/IMG_2250.jpg",   year: 2023 },
  { src: "/images/IMG_2252.jpg",   year: 2023 },
  // { src: "/images/IMG_2253.jpg",   year: 2023 },
  { src: "/images/IMG_2254.jpg",   year: 2023 },
  { src: "/images/IMG_2256.jpg",   year: 2023 },
  { src: "/images/IMG_2257.jpg",   year: 2023 },
  { src: "/images/IMG_2259.jpg",   year: 2023 },

  // { src: "/images/IMG_2265.jpg",   year: 2023 },
  // { src: "/images/IMG_2266.jpg",   year: 2023 },
  // { src: "/images/IMG_2267.jpg",   year: 2023 },
  // { src: "/images/IMG_2268.jpg",   year: 2023 },
  // { src: "/images/IMG_2274.jpg",   year: 2023 },

  



];

const GalleryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const availableYears = useMemo(() => {
    const years = new Set(galleryImages.map(img => img.year));
    return Array.from(years).sort((a, b) => b - a);
  }, []);

  const filteredImages = useMemo(() => {
    return galleryImages.filter((img) => {
      const matchesYear = selectedYear === "all" || img.year === selectedYear;
      const matchesSearch = img.src.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesYear && matchesSearch;
    });
  }, [searchTerm, selectedYear]);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setZoomLevel(1);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImageIndex(null);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (modalOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [modalOpen]);

  // Improved download with fallback for cross-origin issues
  const handleDownload = async (url: string, filename: string) => {
    try {
      // Try modern fetch + blob method (works better with CORS or when <a> fails)
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error('Fetch failed');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.warn("Blob download failed, trying fallback:", err);
      // Classic fallback (may still fail if no CORS headers)
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Last resort alert
      alert("Download started! If nothing happens, right-click the image and choose 'Save image as...'");
    }
  };

  const handleShare = async (url: string, title = "Marathon Photo") => {
    const fullUrl = window.location.origin + url;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: "Check out this great moment from the Marathon!",
          url: fullUrl,
        });
        return;
      } catch (err) {
        console.warn("Share canceled or failed:", err);
      }
    }

    // Fallback copy
    try {
      await navigator.clipboard.writeText(fullUrl);
      alert("Image link copied! You can now paste it in WhatsApp, Telegram, email, etc.");
    } catch (err) {
      alert(`Could not copy automatically.\n\nPlease copy this link manually:\n${fullUrl}`);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section relative flex items-center justify-center" style={{ minHeight: '40vh' }}>
        <div className="hero-bg absolute inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: 'url("/images/WhatsApp Image 2026-02-25 at 20.44.40 (2).jpeg")' }}></div>
        <div className="hero-gradient absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 -z-10"></div>
        <div className="hero-content text-center">
          
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-gray-50">
        <div className="page-container">

          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-church-purple bg-white min-w-[160px]"
            >
              <option value="all">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                No images found.
              </div>
            ) : (
              filteredImages.map((item, filteredIdx) => {
                const globalIndex = galleryImages.indexOf(item);
                const filename = item.src.split('/').pop() || `marathon-${filteredIdx + 1}.jpg`;

                return (
                  <div
                    key={filteredIdx}
                    className="group relative overflow-hidden rounded-lg shadow-lg bg-white cursor-pointer"
                    onClick={() => openModal(globalIndex)}
                  >
                    <img
                      src={item.src}
                      alt={`Marathon moment ${filteredIdx + 1} (${item.year})`}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover overlay - modern icons at bottom */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center pb-5 gap-4 pointer-events-none">
                      <div className="flex gap-16 pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(item.src, filename);
                          }}
                          className="text-white hover:text-gray-200 transition-colors p-3 rounded-full hover:bg-white/20"
                          title="Download"
                          aria-label="Download image"
                        >
                          <Download size={32} strokeWidth={2} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(item.src, `Marathon ${item.year}`);
                          }}
                          className="text-white hover:text-gray-200 transition-colors p-3 rounded-full hover:bg-white/20"
                          title="Share"
                          aria-label="Share image"
                        >
                          <Share2 size={32} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative w-full h-full flex items-center justify-center px-4 py-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 text-white text-5xl hover:text-gray-300 z-20 transition-colors"
              onClick={closeModal}
              aria-label="Close"
            >
              <X size={48} />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-black/60 px-8 py-4 rounded-full z-20">
              <button
                onClick={handleZoomOut}
                className="text-white text-4xl hover:text-gray-300 disabled:opacity-40 transition-colors"
                disabled={zoomLevel <= 0.5}
              >
                −
              </button>

              <span className="text-white text-xl font-medium min-w-[80px] text-center">
                {(zoomLevel * 100).toFixed(0)}%
              </span>

              <button
                onClick={handleZoomIn}
                className="text-white text-4xl hover:text-gray-300 disabled:opacity-40 transition-colors"
                disabled={zoomLevel >= 4}
              >
                +
              </button>
            </div>

            <img
              src={galleryImages[selectedImageIndex].src}
              alt="Zoomed marathon moment"
              className="max-w-full max-h-full object-contain transition-transform duration-200 ease-out touch-action-pan-y"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryPage;