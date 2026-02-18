import React, { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

const GalleryPage: React.FC = () => {
  // Sample gallery images
  const galleryImages = [
    "/images/people.png",
    "/images/people.png",
    "/images/people1.png",
    "/images/people.png",
    "/images/people1.png",
    "/images/people.png",
     "/images/people1.png",
    "/images/people.png",
    "/images/people1.png",
    "/images/people.png",
    "/images/people1.png",
    "/images/people.png",
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Filter images if search is used
  const filteredImages = galleryImages.filter((img) =>
    img.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section relative flex items-center justify-center" style={{ minHeight: '50vh' }}>
        <div className="hero-bg absolute inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: 'url("/images/people.png")' }}></div>
        <div className="hero-gradient absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 -z-10"></div>
        <div className="hero-content text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Marathon Gallery
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore the exciting moments from the Pugu Marathon 2026!
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-gray-50">
        <div className="page-container">
          {/* Optional Search */}
          {/* <div className="mb-8">
            <input
              type="text"
              placeholder="Search images..."
              className="w-full md:w-1/2 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-church-purple"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredImages.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                No images found.
              </div>
            ) : (
              filteredImages.map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={img}
                    alt={`Gallery image ${idx + 1}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="section-padding bg-gradient-church text-white">
        <div className="page-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Share Your Marathon Moments
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Contact us to submit your photos or videos from the Pugu Marathon 2026.
          </p>
          <a href="mailto:gallery@pugumarathon.co.tz">
            <button className="bg-white text-church-purple hover:bg-white/90 rounded-full px-8 py-3 text-lg font-medium">
              Submit Your Media
            </button>
          </a>
        </div>
      </section> */}
    </>
  );
};

export default GalleryPage;