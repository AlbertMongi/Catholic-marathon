import React, { useState, useMemo, useEffect } from 'react';
import { Download, Share2, X } from 'lucide-react';
 // ← modern icons
const ads2023Filenames = [
  "ADS_5858.jpg", "ADS_5859.jpg", "ADS_5863.jpg", "ADS_5864.jpg", "ADS_5865.jpg",
  "ADS_5869.jpg", "ADS_5872.jpg", "ADS_5876.jpg", "ADS_5877.jpg", "ADS_5879.jpg",
  "ADS_5883.jpg", "ADS_5888.jpg", "ADS_5889.jpg", "ADS_5890.jpg", "ADS_5891.jpg",
  "ADS_5892.jpg", "ADS_5893.jpg", "ADS_5896.jpg", "ADS_5899.jpg", "ADS_5912.jpg",
  "ADS_5914.jpg", "ADS_5916.jpg", "ADS_5918.jpg", "ADS_5920.jpg", "ADS_5921.jpg",
  "ADS_5922.jpg", "ADS_5924.jpg", "ADS_5927.jpg", "ADS_5929.jpg", "ADS_5934.jpg",
  "ADS_5938.jpg", "ADS_5939.jpg", "ADS_5940.jpg", "ADS_5944.jpg", "ADS_5948.jpg",
  "ADS_5954.jpg", "ADS_5955.jpg", "ADS_5956.jpg", "ADS_5960.jpg", "ADS_5961.jpg",
  "ADS_5962.jpg", "ADS_5964.jpg", "ADS_5966.jpg", "ADS_5968.jpg", "ADS_5971.jpg",
  "ADS_5973.jpg", "ADS_5974.jpg", "ADS_5976.jpg", "ADS_5978.jpg", "ADS_5980.jpg",
  "ADS_5981.jpg", "ADS_5983.jpg", "ADS_5984.jpg", "ADS_5986.jpg", "ADS_5989.jpg",
  "ADS_5994.jpg", "ADS_5995.jpg", "ADS_5996.jpg", "ADS_5997.jpg", "ADS_6001.jpg",
  "ADS_6004.jpg", "ADS_6007.jpg", "ADS_6008.jpg", "ADS_6009.jpg", "ADS_6011.jpg",
  "ADS_6020.jpg", "ADS_6024.jpg", "ADS_6025.jpg", "ADS_6030.jpg", "ADS_6033.jpg",
  "ADS_6035.jpg", "ADS_6036.jpg", "ADS_6037.jpg", "ADS_6038.jpg", "ADS_6040.jpg",
  "ADS_6041.jpg", "ADS_6042.jpg", "ADS_6043.jpg", "ADS_6044.jpg", "ADS_6046.jpg",
  "ADS_6051.jpg", "ADS_6052.jpg", "ADS_6053.jpg", "ADS_6056.jpg", "ADS_6057.jpg",
  "ADS_6058.jpg", "ADS_6059.jpg", "ADS_6062.jpg", "ADS_6063.jpg", "ADS_6064.jpg",
  "ADS_6066.jpg", "ADS_6067.jpg", "ADS_6068.jpg", "ADS_6069.jpg", "ADS_6071.jpg",
  "ADS_6072.jpg", "ADS_6074.jpg", "ADS_6077.jpg", "ADS_6080.jpg", "ADS_6095.jpg",
  "ADS_6106.jpg", "ADS_6109.jpg", "ADS_6115.jpg", "ADS_6118.jpg", "ADS_6119.jpg",
  "ADS_6120.jpg", "ADS_6123.jpg", "ADS_6125.jpg", "ADS_6126.jpg", "ADS_6127.jpg",
  "ADS_6128.jpg", "ADS_6129.jpg", "ADS_6130.jpg", "ADS_6131.jpg", "ADS_6132.jpg",
  "ADS_6133.jpg", "ADS_6134.jpg", "ADS_6135.jpg", "ADS_6137.jpg", "ADS_6139.jpg",
  "ADS_6140.jpg", "ADS_6143.jpg", "ADS_6146.jpg", "ADS_6148.jpg", "ADS_6150.jpg",
  "ADS_6151.jpg", "ADS_6152.jpg", "ADS_6153.jpg", "ADS_6155.jpg", "ADS_6156.jpg",
  "ADS_6157.jpg", "ADS_6158.jpg", "ADS_6162.jpg", "ADS_6163.jpg", "ADS_6164.jpg",
  "ADS_6165.jpg", "ADS_6166.jpg", "ADS_6168.jpg", "ADS_6169.jpg", "ADS_6170.jpg",
  "ADS_6171.jpg", "ADS_6172.jpg", "ADS_6173.jpg", "ADS_6174.jpg", "ADS_6176.jpg",
  "ADS_6177.jpg", "ADS_6179.jpg", "ADS_6180.jpg", "ADS_6181.jpg", "ADS_6183.jpg",
  "ADS_6185.jpg", "ADS_6186.jpg", "ADS_6187.jpg", "ADS_6188.jpg", "ADS_6189.jpg",
  "ADS_6191.jpg", "ADS_6192.jpg", "ADS_6193.jpg", "ADS_6194.jpg", "ADS_6195.jpg",
  "ADS_6197.jpg", "ADS_6198.jpg", "ADS_6199.jpg", "ADS_6200.jpg", "ADS_6201.jpg",
  "ADS_6202.jpg", "ADS_6203.jpg", "ADS_6204.jpg", "ADS_6205.jpg", "ADS_6207.jpg",
  "ADS_6208.jpg", "ADS_6209.jpg", "ADS_6210.jpg", "ADS_6211.jpg", "ADS_6213.jpg",
  "ADS_6214.jpg", "ADS_6216.jpg", "ADS_6219.jpg", "ADS_6221.jpg", "ADS_6223.jpg",
  "ADS_6224.jpg", "ADS_6225.jpg", "ADS_6226.jpg", "ADS_6228.jpg", "ADS_6229.jpg",
  "ADS_6231.jpg", "ADS_6232.jpg", "ADS_6233.jpg", "ADS_6234.jpg", "ADS_6237.jpg",
  "ADS_6239.jpg", "ADS_6242.jpg", "ADS_6244.jpg", "ADS_6247.jpg", "ADS_6249.jpg",
  "ADS_6250.jpg", "ADS_6251.jpg", "ADS_6252.jpg", "ADS_6253.jpg", "ADS_6254.jpg",
  "ADS_6257.jpg", "ADS_6258.jpg", "ADS_6259.jpg", "ADS_6261.jpg", "ADS_6262.jpg",
  "ADS_6263.jpg", "ADS_6264.jpg", "ADS_6265.jpg", "ADS_6266.jpg", "ADS_6267.jpg",
  "ADS_6268.jpg", "ADS_6270.jpg", "ADS_6271.jpg", "ADS_6272.jpg", "ADS_6274.jpg",
  "ADS_6277.jpg", "ADS_6281.jpg", "ADS_6284.jpg", "ADS_6285.jpg", "ADS_6286.jpg",
  "ADS_6287.jpg", "ADS_6289.jpg", "ADS_6290.jpg", "ADS_6292.jpg", "ADS_6293.jpg",
  "ADS_6295.jpg", "ADS_6296.jpg", "ADS_6297.jpg", "ADS_6298.jpg", "ADS_6302.jpg",
  "ADS_6304.jpg", "ADS_6305.jpg", "ADS_6306.jpg", "ADS_6307.jpg", "ADS_6308.jpg",
  "ADS_6310.jpg", "ADS_6311.jpg", "ADS_6313.jpg", "ADS_6314.jpg", "ADS_6315.jpg",
  "ADS_6316.jpg", "ADS_6317.jpg", "ADS_6318.jpg", "ADS_6319.jpg", "ADS_6321.jpg",
  "ADS_6322.jpg", "ADS_6323.jpg", "ADS_6326.jpg", "ADS_6328.jpg", "ADS_6329.jpg",
  "ADS_6330.jpg", "ADS_6331.jpg", "ADS_6332.jpg", "ADS_6333.jpg", "ADS_6334.jpg",
  "ADS_6335.jpg", "ADS_6336.jpg", "ADS_6337.jpg", "ADS_6340.jpg", "ADS_6341.jpg",
  "ADS_6342.jpg", "ADS_6345.jpg", "ADS_6347.jpg", "ADS_6348.jpg", "ADS_6349.jpg",
  "ADS_6350.jpg", "ADS_6351.jpg", "ADS_6352.jpg", "ADS_6354.jpg", "ADS_6356.jpg",
  "ADS_6357.jpg", "ADS_6360.jpg", "ADS_6361.jpg", "ADS_6364.jpg", "ADS_6366.jpg",
  "ADS_6367.jpg", "ADS_6368.jpg", "ADS_6369.jpg", "ADS_6370.jpg", "ADS_6372.jpg",
  "ADS_6373.jpg", "ADS_6376.jpg", "ADS_6377.jpg", "ADS_6378.jpg", "ADS_6380.jpg",
  "ADS_6381.jpg", "ADS_6384.jpg", "ADS_6385.jpg", "ADS_6387.jpg", "ADS_6389.jpg",
  "ADS_6390.jpg", "ADS_6391.jpg", "ADS_6392.jpg", "ADS_6393.jpg", "ADS_6394.jpg",
  "ADS_6398.jpg", "ADS_6400.jpg", "ADS_6403.jpg", "ADS_6405.jpg", "ADS_6406.jpg",
  "ADS_6407.jpg", "ADS_6408.jpg", "ADS_6409.jpg", "ADS_6411.jpg", "ADS_6412.jpg",
  "ADS_6414.jpg", "ADS_6415.jpg", "ADS_6418.jpg", "ADS_6419.jpg", "ADS_6422.jpg",
  "ADS_6424.jpg", "ADS_6425.jpg", "ADS_6427.jpg", "ADS_6429.jpg", "ADS_6430.jpg",
  "ADS_6431.jpg", "ADS_6432.jpg", "ADS_6434.jpg", "ADS_6435.jpg", "ADS_6436.jpg",
  "ADS_6437.jpg", "ADS_6440.jpg", "ADS_6441.jpg", "ADS_6442.jpg", "ADS_6443.jpg",
  "ADS_6445.jpg", "ADS_6446.jpg", "ADS_6449.jpg", "ADS_6450.jpg", "ADS_6451.jpg",
  "ADS_6453.jpg", "ADS_6455.jpg", "ADS_6459.jpg", "ADS_6460.jpg", "ADS_6461.jpg",
  "ADS_6463.jpg", "ADS_6466.jpg", "ADS_6468.jpg", "ADS_6469.jpg", "ADS_6470.jpg",
  "ADS_6471.jpg", "ADS_6473.jpg", "ADS_6474.jpg", "ADS_6475.jpg", "ADS_6478.jpg",
  "ADS_6480.jpg", "ADS_6482.jpg", "ADS_6486.jpg", "ADS_6487.jpg", "ADS_6488.jpg",
  "ADS_6489.jpg", "ADS_6492.jpg", "ADS_6493.jpg", "ADS_6494.jpg", "ADS_6495.jpg",
  "ADS_6496.jpg", "ADS_6500.jpg", "ADS_6502.jpg", "ADS_6503.jpg", "ADS_6505.jpg",
  "ADS_6507.jpg", "ADS_6508.jpg", "ADS_6510.jpg", "ADS_6513.jpg", "ADS_6518.jpg",
  "ADS_6521.jpg", "ADS_6527.jpg", "ADS_6528.jpg", "ADS_6533.jpg", "ADS_6536.jpg",
  "ADS_6543.jpg", "ADS_6546.jpg", "ADS_6549.jpg", "ADS_6550.jpg", "ADS_6554.jpg",
  "ADS_6557.jpg", "ADS_6560.jpg", "ADS_6563.jpg", "ADS_6565.jpg", "ADS_6571.jpg",
  "ADS_6573.jpg", "ADS_6574.jpg", "ADS_6580.jpg", "ADS_6582.jpg", "ADS_6585.jpg",
  "ADS_6587.jpg", "ADS_6589.jpg", "ADS_6590.jpg", "ADS_6591.jpg", "ADS_6593.jpg",
  "ADS_6594.jpg", "ADS_6595.jpg", "ADS_6596.jpg", "ADS_6597.jpg", "ADS_6602.jpg",
  "ADS_6607.jpg", "ADS_6610.jpg", "ADS_6611.jpg", "ADS_6614.jpg", "ADS_6615.jpg",
  "ADS_6618.jpg", "ADS_6619.jpg", "ADS_6620.jpg", "ADS_6621.jpg", "ADS_6622.jpg",
  "ADS_6624.jpg", "ADS_6628.jpg", "ADS_6629.jpg", "ADS_6630.jpg", "ADS_6630_1.jpg",
  "ADS_6631.jpg", "ADS_6633.jpg", "ADS_6636.jpg", "ADS_6642.jpg", "ADS_6643.jpg",
  "ADS_6644.jpg", "ADS_6649.jpg", "ADS_6650.jpg", "ADS_6651.jpg", "ADS_6652.jpg",
  "ADS_6656.jpg", "ADS_6657.jpg", "ADS_6662.jpg", "ADS_6665.jpg", "ADS_6666.jpg",
  "ADS_6669.jpg", "ADS_6671.jpg", "ADS_6672.jpg", "ADS_6673.jpg", "ADS_6676.jpg",
  "ADS_6677.jpg", "ADS_6678.jpg", "ADS_6680.jpg", "ADS_6682.jpg", "ADS_6687.jpg",
  "ADS_6688.jpg", "ADS_6692.jpg", "ADS_6697.jpg", "ADS_6699.jpg", "ADS_6702.jpg",
  "ADS_6706.jpg", "ADS_6709.jpg", "ADS_6712.jpg", "ADS_6716.jpg", "ADS_6717.jpg",
  "ADS_6725.jpg", "ADS_6729.jpg", "ADS_6730.jpg", "ADS_6732.jpg", "ADS_6739.jpg",
  "ADS_6747.jpg", "ADS_6750.jpg", "ADS_6751.jpg", "ADS_6752.jpg", "ADS_6756.jpg",
  "ADS_6757.jpg", "ADS_6758.jpg", "ADS_6760.jpg", "ADS_6761.jpg", "ADS_6762.jpg",
  "ADS_6764.jpg", "ADS_6765.jpg", "ADS_6769.jpg", "ADS_6770.jpg", "ADS_6771.jpg",
  "ADS_6772.jpg", "ADS_6773.jpg", "ADS_6777.jpg", "ADS_6778.jpg", "ADS_6779.jpg",
  "ADS_6783.jpg", "ADS_6784.jpg", "ADS_6791.jpg", "ADS_6793.jpg", "ADS_6796.jpg",
  "ADS_6797.jpg", "ADS_6800.jpg", "ADS_6802.jpg", "ADS_6803.jpg", "ADS_6805.jpg",
  "ADS_6807.jpg", "ADS_6811.jpg", "ADS_6813.jpg", "ADS_6814.jpg", "ADS_6817.jpg",
  "ADS_6821.jpg", "ADS_6823.jpg", "ADS_6824.jpg", "ADS_6827.jpg", "ADS_6828.jpg",
  "ADS_6829.jpg", "ADS_6830.jpg", "ADS_6831.jpg", "ADS_6833.jpg", "ADS_6834.jpg",
  "ADS_6836.jpg", "ADS_6837.jpg",
];

const images2023 = ads2023Filenames.map((name) => ({
  src: `/images/${name}`,
  year: 2023,
}));


const galleryImages = [
   ...images2023,
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