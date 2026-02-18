import React from "react";
import { Link } from "react-router-dom";
import GlassCard from "@/components/ui/GlassCard";
import {
  ArrowRight,
  Video,
  BookOpen,
  Mic,
  HeartHandshake,
  History,
  Gamepad2,
} from "lucide-react";

const PuguMarathonFeaturesSection: React.FC = () => {
  const marathonFeatures = [
    {
      title: "Register & Participate",
      description:
        "Sign up for the Pugu Marathon and secure your spot to run, compete, or support the race in various categories.",
      icon: <HeartHandshake className="h-10 w-10 text-[#6A10CB]" />,
    },
    // {
    //   title: "Track Your Progress",
    //   description:
    //     "Monitor your training and race performance, check your timing, and see improvements over time leading up to marathon day.",
    //   icon: <History className="h-10 w-10 text-[#6A10CB]" />,
    // },
    {
      title: "Marathon Tips & Insights",
      description:
        "Receive daily running tips, motivational advice, and insights to improve endurance and get ready for race day.",
      icon: <BookOpen className="h-10 w-10 text-[#6A10CB]" />,
    },
    {
      title: "Race Highlights & Media",
      description:
        "Watch recorded marathon highlights, interviews with participants, and motivational talks from previous events.",
      icon: <Mic className="h-10 w-10 text-[#6A10CB]" />,
    },
    // {
    //   title: "Community & Volunteers",
    //   description:
    //     "Connect with fellow runners, volunteers, and supporters who make the Pugu Marathon a memorable community event.",
    //   icon: <Video className="h-10 w-10 text-[#6A10CB]" />,
    // },
    // {
    //   title: "Fun Challenges & Activities",
    //   description:
    //     "Participate in pre-marathon challenges, interactive quizzes, and mini-events designed for fitness and fun.",
    //   icon: <Gamepad2 className="h-10 w-10 text-[#6A10CB]" />,
    // },
  ];

  return (
    <section
      className="section-padding bg-gray-100"
      style={{
        backgroundImage: "url('/images/marathon_bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Discover the Pugu Marathon Experience
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of runners and supporters for the Pugu Marathon. Explore the race, track your training, connect with the community, and make every step count for a positive impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathonFeatures.map((feature, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <GlassCard className="h-full flex flex-col justify-between p-6">
                <div>
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 text-center">{feature.description}</p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PuguMarathonFeaturesSection;