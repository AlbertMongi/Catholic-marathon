import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import {
  Search,
  Calendar,
  Play,
  Download,
  Headphones,
  Filter,
  Video,
  ArrowRight,
} from "lucide-react";

const WatchPage: React.FC = () => {
  // Sample media data
  const allMedia = [
    {
      id: 1,
      title: "Finding Peace in Troubled Times",
      date: "April 23, 2025",
      speaker: "Pastor Tony Kapola",
      description:
        "Discover how to find God's peace even in life's most challenging circumstances.",
      type: "video",
      thumbnail: "/placeholder.svg",
      duration: "45:27",
      topic: "faith",
      videoUrl: "https://www.youtube.com/results?search_query=jesus"
    },
    {
      id: 2,
      title: "The Power of Prayer",
      date: "April 16, 2025",
      speaker: "Pastor Tony Kapola",
      description:
        "Learn how developing a consistent prayer life can transform your relationship with God.",
      type: "video",
      thumbnail: "/placeholder.svg",
      duration: "42:15",
      topic: "prayer",
      videoUrl: "https://www.youtube.com/embed/g-6BTKOR0x"
    },
    {
      id: 3,
      title: "Living with Purpose",
      date: "April 9, 2025",
      speaker: "Pastor Tony Kapola",
      description:
        "Discover your God-given purpose and learn how to live a life of meaningful impact.",
      type: "audio",
      thumbnail: "/placeholder.svg",
      duration: "38:52",
      topic: "purpose",
      videoUrl:  "https://www.youtube.com/results?search_query=jesus"
    },
    {
      id: 4,
      title: "Building Strong Families",
      date: "April 2, 2025",
      speaker: "Pastor Tony Kapola",
      description:
        "Biblical principles for creating healthy, thriving family relationships.",
      type: "video",
      thumbnail: "/placeholder.svg",
      duration: "47:10",
      topic: "family",
      videoUrl: "https://www.youtube.com/embed/LjLxsD8lMQ"
    },
    {
      id: 5,
      title: "Overcoming Fear with Faith",
      date: "March 26, 2025",
      speaker: "Pastor Tony Kapola",
      description:
        "How to face your fears and live boldly through the power of faith.",
      type: "audio",
      thumbnail: "/placeholder.svg",
      duration: "41:05",
      topic: "faith",
      videoUrl: "https://open.spotify.com/embed/episode/7j76pikRk6tOmVRIcqYV9?si=6OVvfm4RSXW5E7mws-Az4w"
    },
    {
      id: 6,
      title: "The Heart of Worship",
      date: "March 19, 2025",
      speaker: "Pastor Tony Kapola",
      description:
        "Rediscover the true meaning and purpose of worship in the Christian life.",
      type: "video",
      thumbnail: "/placeholder.svg",
      duration: "39:48",
      topic: "worship",
      videoUrl: "https://www.youtube.com/embeddlpPKhRsq_8"
    },
  ];

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");

  // Filtered media
  const filteredMedia = allMedia.filter((media) => {
    const matchesSearch =
      media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.speaker.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || media.type === typeFilter;

    const matchesTopic = topicFilter === "all" || media.topic === topicFilter;

    return matchesSearch && matchesType && matchesTopic;
  });

  const scrollToLatestMessagesOnline = () => {
    const latestMessagesSection = document.getElementById('latest-messages');
    if (latestMessagesSection) {
      latestMessagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div
          className="hero-bg"
          style={{ backgroundImage: 'url("/images/watch.jpeg")' }}
        ></div>
        <div className="hero-gradient"></div>
        <div className="hero-content">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Watch & Listen
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Access sermons, teaching series, and worship music to grow your
            faith anytime, anywhere.
          </p>
          <Button
            
            className="bg-church-gold hover:bg-church-gold/90 text-church-dark text-lg font-medium rounded-full"
            onClick={scrollToLatestMessagesOnline}
          >
            <Link to="#">Latest Message</Link>
          </Button>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="transform -mt-20 z-20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="pl-10 pr-4 py-3 rounded-lg border border-gray-200 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button className="bg-church-purple hover:bg-church-purple/90 rounded-full">
                  Search
                </Button>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block mb-2 font-medium">Media Type</label>
                  <select
                    className="w-full p-3 rounded-lg border border-gray-200"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">All Media</option>
                    <option value="video">Videos</option>
                    <option value="audio">Audio</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block mb-2 font-medium">Topic</label>
                  <select
                    className="w-full p-3 rounded-lg border border-gray-200"
                    value={topicFilter}
                    onChange={(e) => setTopicFilter(e.target.value)}
                  >
                    <option value="all">All Topics</option>
                    <option value="faith">Faith</option>
                    <option value="prayer">Prayer</option>
                    <option value="purpose">Purpose</option>
                    <option value="family">Family</option>
                    <option value="worship">Worship</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Latest Videos & Audios */}
      <section id="latest-messages" className="section-padding bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Latest Messages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch and listen to our most recent sermons, teachings, and
              worship experiences.
            </p>
          </div>

          {filteredMedia.length === 0 ? (
            <GlassCard>
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-2">No messages found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters
                </p>
              </div>
            </GlassCard>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((media) => (
                <GlassCard key={media.id} className="flex flex-col h-full">
                  <div className="relative mb-4">
  {media.videoUrl ? (
  <iframe
    width="100%"
    height="230"
    src={media.videoUrl}
    title={media.title}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="rounded-lg"
  ></iframe>
) : (
  <>
    <img
      src={media.thumbnail}
      alt={media.title}
      className="w-full h-48 object-cover rounded-lg"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <button className="w-12 h-12 rounded-full bg-church-purple/90 flex items-center justify-center text-white">
        <Headphones className="h-5 w-5" />
      </button>
    </div>
  </>
)}
</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{media.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={14} className="mr-1" />
                        {media.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        {media.speaker}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{media.description}</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      className="rounded-full border-church-purple text-church-purple hover:bg-church-purple/10"
                    >
                      Watch Now
                    </Button>
                    <button className="text-church-purple hover:text-church-blue">
                      <Download size={20} />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button
              asChild
              className="bg-church-purple hover:bg-church-purple/90 rounded-full"
            >
              <Link to="https://www.youtube.com/pastortonykapola">Load More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Message Series */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-church-purple/10 to-church-blue/10 -z-10"></div>
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Message Series
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections of messages organized by theme or
              topic.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard className="overflow-hidden">
              <iframe
    width="100%"
    height="200" 
    src="https://www.youtube.com/embed/WXvDJxzpCM?list=PL3IPHSHdQHI0nHvm3vz8MjQcodfnaGH9c" 
    title="Faith Foundations Message Series" 
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    className="w-full rounded-lg mb-4" 
  ></iframe>
              <h3 className="text-xl font-bold mb-2">40 Days of Fasting and Prayer</h3>
              <p className="text-gray-600 mb-4">
                Explore Christian faith's core elements in this extensive 40-part series. Gain practical, biblical insights to build a strong spiritual foundation for your life.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">40 Messages</span>
                <Link
                  to="https://www.youtube.com/playlst?list=PL3IPHSHdQHI0nHvm3vz8MjQcodfnaGH9c"
                  className="flex items-center text-church-purple hover:text-church-blue"
                >
                  View Series <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden">
              <iframe
    width="100%"
    height="200" 
    src="https://www.youtube.com/embed/N_TC-gcJhM?list=PL3IPHSHdQHI1qXYrnN2ZSCS60stPCwY3z" 
    title="Faith Foundations Message Series" 
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    className="w-full rounded-lg mb-4" 
  ></iframe>
              <h3 className="text-xl font-bold mb-2">
                Matters of the Blood
              </h3>
              <p className="text-gray-600 mb-4">
                This message explores the biblical significance of blood—its role in covenant, atonement, and new life, revealing profound spiritual truths.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">8 Messages</span>
                <Link
                  to="https://www.youtube.com/playist?list=PL3IPHSHdQHI1qXYrnN2ZSCS60stPCwY3z"
                  className="flex items-center text-church-purple hover:text-church-blue"
                >
                  View Series <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden">
              <iframe
    width="100%"
    height="200" 
    src="https://www.youtube.com/embed/wTie9fgJ1F8?ist=PL3IPHSHdQHI1t6tfx5oTr8bloZCAJNZnG" 
    title="Faith Foundations Message Series" 
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    className="w-full rounded-lg mb-4" 
  ></iframe>
              <h3 className="text-xl font-bold mb-2">Signs and Tokens</h3>
              <p className="text-gray-600 mb-4">
                This message explores the biblical meaning of signs and tokens, revealing them as divine confirmations, prophetic indicators, and symbols of God's covenant
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">12 Messages</span>
                <Link
                  to="https://www.youtube.com/playlist?lst=PL3IPHSHdQHI1t6tfx5oTr8bloZCAJNZnG"
                  className="flex items-center text-church-purple hover:text-church-blue"
                >
                  View Series <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </GlassCard>
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              className="border-church-purple text-church-purple hover:bg-church-purple/10 rounded-full"
            >
              <Link to="https://www.youtube.com/@patortonykapola">View All Series</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      {/* <section className="section-padding bg-church-dark text-white">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-church-gold">
                Never Miss a Message
              </h2>
              <p className="text-white/80 mb-6">
                Subscribe to our podcast and receive the latest sermons
                automatically on your favorite podcast platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-church-dark hover:bg-white/90 rounded-full">
                  Apple Podcasts
                </Button>
                <Button className="bg-white text-church-dark hover:bg-white/90 rounded-full">
                  Spotify
                </Button>
                <Button className="glass-button-dark">Google Podcasts</Button>
              </div>
            </div>

            <div>
              <GlassCard variant="dark">
                <h3 className="text-xl font-bold mb-4">Get Email Updates</h3>
                <p className="mb-6">
                  Sign up to receive weekly email notifications when new
                  messages are available.
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="text-right">
                    <Button className="bg-church-gold hover:bg-church-gold/90 text-church-dark rounded-full">
                      Subscribe
                    </Button>
                  </div>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default WatchPage;
