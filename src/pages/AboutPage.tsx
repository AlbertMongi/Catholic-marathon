import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import { Heart, Shield, Star, BookOpen } from "lucide-react";

const AboutPage: React.FC = () => {
  const values = [
    {
      title: "Community Spirit",
      content:
        "We celebrate participation, teamwork, and the joy of running together through Pugu's scenic routes.",
      icon: <Heart className="h-8 w-8 text-[#6A10CB]" />,
    },
    {
      title: "Safety First",
      content:
        "Runner safety is our top priority. We ensure secure routes, medical assistance, and clear guidance throughout the marathon.",
      icon: <Shield className="h-8 w-8 text-[#6A10CB]" />,
    },
    {
      title: "Inspiration",
      content:
        "The marathon inspires individuals to challenge themselves, improve fitness, and embrace a healthy lifestyle.",
      icon: <Star className="h-8 w-8 text-[#6A10CB]" />,
    },
    {
      title: "Integrity & Fair Play",
      content:
        "We uphold fairness, honesty, and ethical standards in organizing the event, registrations, and results.",
      icon: <BookOpen className="h-8 w-8 text-[#6A10CB]" />,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section relative flex items-center justify-center" style={{ minHeight: "500px", padding: "60px 20px" }}>
        <div className="absolute inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: 'url("/images/people.png")' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 -z-10"></div>
        <div className="hero-content text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
           About Pugu Marathon 2026
          </h1>
          {/* <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of runners for an unforgettable race through the beautiful landscapes of Pugu.
          </p> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Button asChild className="bg-[#6A10CB] hover:bg-[#6A10CB]/100 text-[#6A10CB] text-lg font-medium rounded-full">
              <Link to="/register">Register Now</Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Column */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Our Purpose</h2>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                To inspire a healthy, active lifestyle and bring the community together through an exciting, well-organized marathon event.
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                To provide a safe, inclusive, and enjoyable marathon experience while encouraging fitness, community engagement, and personal achievement.
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                A vibrant running community where every participant feels motivated, supported, and part of a memorable event that promotes wellness and togetherness.
              </p>
            </div>

            {/* Image Column */}
           <div className="flex justify-center">
  <img
    src="/images/map.png" // <-- your transparent route image
    alt="Pugu Marathon route"
    className="w-full h-80 md:h-96 lg:h-[28rem] object-contain"
  />
</div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-gray-40">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Pugu Marathon.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <GlassCard key={index} className="flex items-start">
                <div className="mr-4 mt-1">{value.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.content}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="section-padding bg-gradient-to-r from-[#6A10CB] to-[#FFB347] text-white">
        <div className="page-container text-center">
          <p className="text-lg md:text-xl text-white/100 mb-8 max-w-2xl mx-auto">
            Ready to be part of an unforgettable event? Register now for Pugu Marathon 2026 and join the community of runners!
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-white text-[#6A10CB] rounded-full">
              <Link to="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default AboutPage;