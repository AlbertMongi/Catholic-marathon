// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import GlassCard from "@/components/ui/GlassCard";
// import { Heart, Shield, Star, BookOpen } from "lucide-react";
// import { useTranslation } from "react-i18next";

// const AboutPage: React.FC = () => {
//   const { t } = useTranslation();
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const values = [
//     {
//       title: t("community_spirit_title"),
//       content: t("community_spirit_content"),
//       icon: <Heart className="h-8 w-8 text-[#6A10CB]" />,
//     },
//     {
//       title: t("safety_first_title"),
//       content: t("safety_first_content"),
//       icon: <Shield className="h-8 w-8 text-[#6A10CB]" />,
//     },
//     {
//       title: t("inspiration_title"),
//       content: t("inspiration_content"),
//       icon: <Star className="h-8 w-8 text-[#6A10CB]" />,
//     },
//     {
//       title: t("integrity_title"),
//       content: t("integrity_content"),
//       icon: <BookOpen className="h-8 w-8 text-[#6A10CB]" />,
//     },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <section
//         className="relative flex items-center justify-center"
//         style={{ minHeight: "585px", padding: "60px 20px" }}
//       >
//         <div
//           className="absolute inset-0 bg-cover bg-center -z-10"
//           style={{ backgroundImage: 'url("/images/team.jpeg")' }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 -z-10"></div>

//         <div className="text-center">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
//             {t("about_pugu_marathon_title")}
//           </h1>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               {/* <h2 className="text-3xl font-bold mb-6 gradient-text">
//                 {t("our_purpose_title")}
//               </h2>
//               <p className="text-lg text-gray-700 mb-10 leading-relaxed">
//                 {t("our_purpose_content")}
//               </p> */}

//               <h2 className="text-3xl font-bold mb-6 gradient-text">
//                 {t("our_mission_title")}
//               </h2>
//               <p className="text-lg text-gray-700 mb-10 leading-relaxed">
//                 {t("our_mission_content")}
//               </p>

//               <h2 className="text-3xl font-bold mb-6 gradient-text">
//                 {t("our_vision_title")}
//               </h2>
//               <p className="text-lg text-gray-700 leading-relaxed">
//                 {t("our_vision_content")}
//               </p>
//             </div>

//             <div className="flex justify-center">
//               <img
//                 src="/images/map.png"
//                 alt="Route"
//                 className="w-full h-80 md:h-96 lg:h-[28rem] object-contain"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Team */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
//               {t("our_team_title")}
//             </h2>
//             {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               {t("our_team_subtitle")}
//             </p> */}
//           </div>

//           <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//             {[
//               { src: "/images/team.jpeg", name: "Kamati Kuu" },
//               { src: "/images/tendaji.jpeg", name: "Kamati Tendaji" },
//               { src: "/images/mwenyekiti.jpeg", name: "Adam Nderumaki", role: "Mwenyekiti" },
//               { src: "/images/makamu.jpeg", name: "Yolanda Kahunduka", role: "Makamu Mwenyekiti" },
//                         { src: "/images/katibu1.jpeg", name: "Walter Nguma", role: "Katibu" },
//               { src: "/images/katibu.jpeg", name: "Emmanuel Mlay", role: "Katibu Msaidizi" },
//               { src: "/images/mwekahazina.jpeg", name: "Deogratius Kessy", role: "Mhazini" },
//               { src: "/images/mlezi.jpeg", name: " Fr. Romwald Mukandara", role: "Mlezi" },
              
    
//             ].map((member, index) => (
//               <div key={index} className="group text-center">
//                 <div
//                   className="overflow-hidden rounded-2xl shadow-lg cursor-pointer"
//                   onClick={() => setSelectedImage(member.src)}
//                 >
//                   <img
//                     src={member.src}
//                     alt={member.name}
//                     className="w-full h-80 object-cover group-hover:scale-105 transition duration-300"
//                   />
//                 </div>
//                 <h3 className="mt-5 text-xl font-bold">{member.name}</h3>
//                 {member.role && (
//                   <p className="text-gray-600">{member.role}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Image Modal */}
//         {selectedImage && (
//           <div
//             className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
//             onClick={() => setSelectedImage(null)}
//           >
//             <div
//               className="relative max-w-4xl w-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={selectedImage}
//                 alt="Preview"
//                 className="w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
//               />

//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold hover:bg-gray-200 transition"
//               >
//                 ✕
//               </button>
//             </div>
//           </div>
//         )}
//       </section>
//     </>
//   );
// };

// export default AboutPage;
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Star, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!contactData.name || !contactData.email || !contactData.message) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      // Ensure the response is JSON
      const text = await res.text();
      const data = text ? JSON.parse(text) : { message: "Success" };

      if (res.ok) {
        setMessage(data.message || "Your message has been sent successfully!");
        setContactData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Hakuna mtandao, jaribu tena baadae.");
    } finally {
      setLoading(false);
    }
  };

  const values = [
    {
      title: t("community_spirit_title"),
      content: t("community_spirit_content"),
      icon: <Heart className="h-8 w-8 text-[#6A10CB]" />,
    },
    {
      title: t("safety_first_title"),
      content: t("safety_first_content"),
      icon: <Shield className="h-8 w-8 text-[#6A10CB]" />,
    },
    {
      title: t("inspiration_title"),
      content: t("inspiration_content"),
      icon: <Star className="h-8 w-8 text-[#6A10CB]" />,
    },
    {
      title: t("integrity_title"),
      content: t("integrity_content"),
      icon: <BookOpen className="h-8 w-8 text-[#6A10CB]" />,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: "500px", padding: "40px 20px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: 'url("/images/team.jpeg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 -z-10"></div>

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t("about_pugu_marathon_title")}
          </h1>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 gradient-text">{t("our_mission_title")}</h2>
              <p className="text-gray-900 mb-9">{t("our_mission_content")}</p>

              {/* <h2 className="text-3xl font-bold mb-4 gradient-text">{t("our_vision_title")}</h2>
              <p className="text-gray-700">{t("our_vision_content")}</p> */}
            </div>

            <div className="flex justify-center">
              <img
                src="/images/map.png"
                alt="Route"
                className="w-full h-72 md:h-80 lg:h-96 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              {t("our_team_title")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { src: "/images/team.jpeg", name: "Kamati Kuu" },
              { src: "/images/tendaji.jpeg", name: "Kamati Tendaji" },
              { src: "/images/mwenyekiti.jpeg", name: "Adam Nderumaki", role: "Mwenyekiti" },
              { src: "/images/makamu.jpeg", name: "Yolanda Kahunduka", role: "Makamu Mwenyekiti" },
              { src: "/images/katibu1.jpeg", name: "Walter Nguma", role: "Katibu" },
              { src: "/images/katibu.jpeg", name: "Emmanuel Mlay", role: "Katibu Msaidizi" },
              { src: "/images/mwekahazina.jpeg", name: "Deogratius Kessy", role: "Mhazini" },
              { src: "/images/mlezi.jpeg", name: "Fr. Romwald Mukandara", role: "Mlezi" },
            ].map((member, index) => (
              <div key={index} className="group text-center">
                <div
                  className="overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                  onClick={() => setSelectedImage(member.src)}
                >
                  <img
                    src={member.src}
                    alt={member.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
                {member.role && <p className="text-gray-600">{member.role}</p>}
              </div>
            ))}
          </div>
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold hover:bg-gray-200 transition"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Contact Form */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6 gradient-text">
            {t("contact_us_title")}
          </h2>

          <div className="rounded-3xl bg-white border border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.6)] overflow-hidden p-8 md:p-12">
            {message && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-center">
                {message}
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t("form.full_name")} <span className="text-red-500"></span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactData.name}
                  onChange={handleChange}
                  placeholder={t("form.full_name_placeholder")}
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t("form.email")} <span className="text-red-500"></span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleChange}
                  placeholder={t("form.email_placeholder")}
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t("form_subject")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={contactData.subject}
                  onChange={handleChange}
                  placeholder={t("subject_placeholder")}
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t("form_message")} <span className="text-red-500"></span>
                </label>
                <textarea
                  name="message"
                  value={contactData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={t("message_placeholder")}
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg disabled:opacity-60"
              >
                {loading ? t("form.sending") : t("form_send_message")}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;