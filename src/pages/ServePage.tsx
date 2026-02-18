import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import {
  Search,
  Users,
  Music,
  Video,
  Heart,
  Calendar,
  ArrowRight,
  Gift,
} from "lucide-react";

const ServePage: React.FC = () => {
  // Sample service opportunities data
  const allOpportunities = [
    {
      id: 1,
      title: "Worship Team",
      category: "music",
      commitment: "weekly",
      description:
        "Join our team of musicians and vocalists to lead the congregation in worship during services.",
      image: "/images/worship_team.jpeg",
      requirements: "Musical ability, audition required, heart for worship",
      contactPerson: "Sarah Johnson",
    },
    {
      id: 2,
      title: "Media & Tech Team",
      category: "media",
      commitment: "weekly",
      description:
        "Help with sound, lighting, cameras, and presentations during services and events.",
      image: "/images/hero_img.jpg",
      requirements: "Technical aptitude, attention to detail, reliability",
      contactPerson: "Michael Robinson",
    },
    {
      id: 3,
      title: "Ushers & Greeters",
      category: "ushers",
      commitment: "bi-weekly",
      description:
        "Welcome attendees, distribute programs, assist with seating, and help visitors find their way.",
      image: "/images/ushers.jpeg",
      requirements: "Friendly personality, punctuality, heart for hospitality",
      contactPerson: "David Thompson",
    },
    {
      id: 4,
      title: "Children's Ministry",
      category: "children",
      commitment: "bi-weekly",
      description:
        "Help teach and care for children during services, creating a fun and safe environment.",
      image: "/images/children_team.jpeg",
      requirements: "Love for children, background check required, patience",
      contactPerson: "Rebecca Williams",
    },
    {
      id: 5,
      title: "Prayer Team",
      category: "prayer",
      commitment: "weekly",
      description:
        "Participate in regular prayer meetings and provide prayer support during and after services.",
      image: "/images/prayer_team.jpeg",
      requirements: "Commitment to prayer, spiritual maturity, confidentiality",
      contactPerson: "Pastor Tony Kapola",
    },
    {
      id: 6,
      title: "Outreach Volunteers",
      category: "outreach",
      commitment: "monthly",
      description:
        "Assist with community service projects, food drives, and other outreach initiatives.",
      image: "/images/volunteers.jpeg",
      requirements: "Heart for service, reliability, teamwork",
      contactPerson: "Maria Garcia",
    },
  ];

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filtered opportunities
  const filteredOpportunities = allOpportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || opportunity.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Function to get the appropriate icon for each category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "music":
        return <Music className="h-8 w-8 text-church-purple" />;
      case "media":
        return <Video className="h-8 w-8 text-church-purple" />;
      case "ushers":
        return <Users className="h-8 w-8 text-church-purple" />;
      case "children":
        return <Users className="h-8 w-8 text-church-purple" />;
      case "prayer":
        return <Heart className="h-8 w-8 text-church-purple" />;
      case "outreach":
        return <Heart className="h-8 w-8 text-church-purple" />;
      default:
        return <Users className="h-8 w-8 text-church-purple" />;
    }
  };

  const scrollToFindYourPlace = () => {
    const findYourPlaceSection = document.getElementById('find-your-place');
    if (findYourPlaceSection) {
      findYourPlaceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div
          className="hero-bg"
          style={{ backgroundImage: 'url("/images/serve_bg.jpeg")' }}
        ></div>
        <div className="hero-gradient"></div>
        <div className="hero-content">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Serve With Us
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Use your gifts and talents to make a difference in our church and
            community.
          </p>
          <Button
            asChild
            className="bg-church-gold hover:bg-church-gold/90 text-church-dark text-lg font-medium rounded-full"
            onClick={scrollToFindYourPlace}
          >
            <Link to="#opportunities">Find Your Place</Link>
          </Button>
        </div>
      </section>

      {/* Why Serve Section */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Why Serve?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Serving is an essential part of our faith journey and an
              opportunity to use our God-given gifts to build His kingdom.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-church-purple/10">
                <Users className="h-8 w-8 text-church-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Build Community</h3>
              <p className="text-gray-600">
                Develop meaningful relationships with others who share your
                faith and passion for service.
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-church-purple/10">
                <Gift className="h-8 w-8 text-church-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Use Your Gifts</h3>
              <p className="text-gray-600">
                Discover and utilize your unique God-given talents and abilities
                in ways that make a difference.
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-church-purple/10">
                <Heart className="h-8 w-8 text-church-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Grow Spiritually</h3>
              <p className="text-gray-600">
                Deepen your relationship with God as you serve others and
                participate in His work.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-gray-50 py-12" id="opportunities">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GlassCard>
              <h2 className="text-2xl font-bold mb-6 text-center">
                Find Your Serving Opportunity
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    className="pl-10 pr-4 py-3 rounded-lg border border-gray-200 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-48">
                  <select
                    className="w-full p-3 rounded-lg border border-gray-200"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Areas</option>
                    <option value="music">Choir & Music</option>
                    <option value="media">Media Team</option>
                    <option value="ushers">Ushers & Protocol</option>
                    <option value="children">Children's Ministry</option>
                    <option value="prayer">Prayer Team</option>
                    <option value="outreach">Outreach</option>
                  </select>
                </div>
                <Button className="bg-church-purple hover:bg-church-purple/90 rounded-full">
                  Search
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="section-padding bg-gray-50">
        <div className="page-container">
          {filteredOpportunities.length === 0 ? (
            <GlassCard>
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-2">
                  No opportunities found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter
                </p>
              </div>
            </GlassCard>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <GlassCard
                  key={opportunity.id}
                  className="flex flex-col h-full"
                >
                  <div className="mb-4">
                    <img
                      src={opportunity.image}
                      alt={opportunity.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-full bg-church-purple/10">
                        {getCategoryIcon(opportunity.category)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {opportunity.title}
                        </h3>
                        <span className="text-sm text-church-purple">
                          {opportunity.commitment === "weekly"
                            ? "Weekly Commitment"
                            : opportunity.commitment === "bi-weekly"
                            ? "Bi-Weekly Commitment"
                            : "Monthly Commitment"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {opportunity.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-medium">Requirements:</p>
                      <p className="text-sm text-gray-600">
                        {opportunity.requirements}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-medium">Contact:</p>
                      <p className="text-sm text-gray-600">
                        {opportunity.contactPerson}
                      </p>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-church-purple hover:bg-church-purple/90 rounded-full mt-4"
                  >
                    <Link to="#">Apply to Serve</Link>
                  </Button>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-church-purple/10 to-church-blue/10 -z-10"></div>
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Volunteer Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from members of our community about their experiences serving
              at Pastor Tony Ministry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="relative">
              <div className="text-5xl text-church-purple/30 absolute top-4 left-4">
                "
              </div>
              <div className="pt-8 relative z-10">
                <p className="mb-6">
                  Volunteering with the worship team has been such a blessing.
                  I've grown so much in my faith and musical abilities, and I've
                  found a community that feels like family.
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder.svg"
                    alt="Testimonial"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-bold">James Wilson</p>
                    <p className="text-sm text-church-purple">Worship Team</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="relative">
              <div className="text-5xl text-church-purple/30 absolute top-4 left-4">
                "
              </div>
              <div className="pt-8 relative z-10">
                <p className="mb-6">
                  Serving in the children's ministry has been incredibly
                  rewarding. Seeing the kids grow in their understanding of
                  God's love makes every minute worth it.
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder.svg"
                    alt="Testimonial"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-bold">Lisa Martinez</p>
                    <p className="text-sm text-church-purple">
                      Children's Ministry
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="relative">
              <div className="text-5xl text-church-purple/30 absolute top-4 left-4">
                "
              </div>
              <div className="pt-8 relative z-10">
                <p className="mb-6">
                  Being part of the media team has allowed me to use my
                  technical skills to support our church's mission. It's amazing
                  to see how technology can enhance worship.
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder.svg"
                    alt="Testimonial"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-bold">Robert Chen</p>
                    <p className="text-sm text-church-purple">Media Team</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Upcoming Training */}
      <section className="section-padding bg-church-dark text-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-church-gold">
              Upcoming Volunteer Training
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Get equipped to serve effectively through our training sessions
              and workshops.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard variant="dark">
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="h-8 w-8 text-church-gold" />
                <span className="text-church-gold font-medium">
                  May 5, 2025
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                New Volunteer Orientation
              </h3>
              <p className="mb-4">
                An introduction to serving at Pastor Tony Ministry for all new
                volunteers. Learn about our mission, values, and procedures.
              </p>
              <div className="flex justify-between items-center">
                <span>6:30 PM - 8:00 PM</span>
                <Link to="#" className="text-church-gold hover:underline">
                  Register
                </Link>
              </div>
            </GlassCard>

            <GlassCard variant="dark">
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="h-8 w-8 text-church-gold" />
                <span className="text-church-gold font-medium">
                  May 12, 2025
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Children's Ministry Training
              </h3>
              <p className="mb-4">
                Specialized training for those interested in serving with our
                children's programs. Learn safety protocols and teaching
                techniques.
              </p>
              <div className="flex justify-between items-center">
                <span>6:00 PM - 8:30 PM</span>
                <Link to="#" className="text-church-gold hover:underline">
                  Register
                </Link>
              </div>
            </GlassCard>

            <GlassCard variant="dark">
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="h-8 w-8 text-church-gold" />
                <span className="text-church-gold font-medium">
                  May 19, 2025
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Media Team Workshop</h3>
              <p className="mb-4">
                Hands-on training with our audio-visual equipment and software
                for those interested in joining the media team.
              </p>
              <div className="flex justify-between items-center">
                <span>7:00 PM - 9:00 PM</span>
                <Link to="#" className="text-church-gold hover:underline">
                  Register
                </Link>
              </div>
            </GlassCard>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="glass-button-dark">
              <Link to="#">View All Training Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="find-your-place" className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Ready to Serve?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to express your interest in serving, and
              we'll connect you with the appropriate ministry leader.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <GlassCard>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-1 font-medium"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full p-3 rounded-lg border border-gray-200"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-1 font-medium"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full p-3 rounded-lg border border-gray-200"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 rounded-lg border border-gray-200"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-1 font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-3 rounded-lg border border-gray-200"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="interests" className="block mb-1 font-medium">
                    Areas of Interest
                  </label>
                  <select
                    id="interests"
                    className="w-full p-3 rounded-lg border border-gray-200"
                  >
                    <option value="">Select an area</option>
                    <option value="worship">Worship Team</option>
                    <option value="media">Media & Tech Team</option>
                    <option value="ushers">Ushers & Greeters</option>
                    <option value="children">Children's Ministry</option>
                    <option value="prayer">Prayer Team</option>
                    <option value="outreach">Outreach</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="experience"
                    className="block mb-1 font-medium"
                  >
                    Relevant Experience
                  </label>
                  <textarea
                    id="experience"
                    rows={4}
                    className="w-full p-3 rounded-lg border border-gray-200"
                    placeholder="Describe any relevant experience or skills you have..."
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="availability"
                    className="block mb-1 font-medium"
                  >
                    Availability
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        name="availability"
                        value="sunday_morning"
                      />
                      Sunday Mornings
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        name="availability"
                        value="sunday_evening"
                      />
                      Sunday Evenings
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        name="availability"
                        value="weekdays"
                      />
                      Weekdays
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        name="availability"
                        value="special_events"
                      />
                      Special Events
                    </label>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button className="bg-church-purple hover:bg-church-purple/90 rounded-full px-8 py-6 text-lg">
                    Submit Application
                  </Button>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-church text-white">
        <div className="page-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Service Makes a Difference
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Every volunteer plays a vital role in our ministry. Join us as we
            serve God and our community together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-white text-church-purple hover:bg-white/90 rounded-full"
            >
              <a href="#opportunities">Find Your Place</a>
            </Button>
            <Button asChild className="glass-button-dark">
              <Link to="/events">Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServePage;
