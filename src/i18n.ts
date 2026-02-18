import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  en: {
    translation: {
      home: "Home",
      about: "About",
      gallery: "Gallery",
      register: "Register",
      cart: "Cart",
    countdown_title: "Countdown to Pugu Marathon",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
       hero_title: "Pugu Marathon 2026 is Here!",
      hero_subtitle:
        "Join hundreds of runners for an unforgettable race through the beautiful landscapes of Pugu for Tsh.30,000 only.",
      hero_register: "Register Now",
            features_section_title: "Discover the Pugu Marathon Experience",
      features_section_desc:
        "Join thousands of runners and supporters for the Pugu Marathon. Explore the race, track your training, connect with the community, and make every step count for a positive impact.",
      feature_register: "Register & Participate",
      feature_register_desc:
        "Sign up for the Pugu Marathon and secure your spot to run, compete, or support the race in various categories.",
      feature_tips: "Marathon Tips & Insights",
      feature_tips_desc:
        "Receive daily running tips, motivational advice, and insights to improve endurance and get ready for race day.",
      feature_media: "Race Highlights & Media",
      feature_media_desc:
        "Watch recorded marathon highlights, interviews with participants, and motivational talks from previous events.",
       marathon_moments_title: "Pugu Marathon Moments & Highlights",
          watch_marathon_title: "Watch about Pugu Marathon",
             visit_our_page: "Visit our {{platform}} page",
    quick_links: "Quick Links",
    about_pugu_marathon: "About Pugu Marathon",
    register_to_run: "Register to Run",
    contact_us: "Contact Us",
    marathon_highlights: "Marathon Highlights",
    race_day_excitement: "Race Day Excitement",
    race_day_description: "Join thousands of runners in a community event",
    training_tips: "Training Tips",
    training_tips_description: "Prepare and improve your performance",
    community_engagement: "Community Engagement",
    community_engagement_description: "Connect with volunteers, supporters & sponsors",
    location: "Dar es Salaam, Tanzania",
    call_us: "Call us at +255 716 400 001",
    email_us: "Email us at info@evmak.com",
    all_rights_reserved: "All Rights Reserved.",
    footer_tagline: "Run • Connect • Inspire",

    // ABOUT SCREEN
      about_pugu_marathon_title: "About Pugu Marathon 2026",
    our_purpose_title: "Our Purpose",
    our_purpose_content: "To inspire a healthy, active lifestyle and bring the community together through an exciting, well-organized marathon event.",
    our_mission_title: "Our Mission",
    our_mission_content: "To provide a safe, inclusive, and enjoyable marathon experience while encouraging fitness, community engagement, and personal achievement.",
    our_vision_title: "Our Vision",
    our_vision_content: "A vibrant running community where every participant feels motivated, supported, and part of a memorable event that promotes wellness and togetherness.",
    our_core_values_title: "Our Core Values",
    our_core_values_content: "The principles that guide everything we do at Pugu Marathon.",
    community_spirit_title: "Community Spirit",
    community_spirit_content: "We celebrate participation, teamwork, and the joy of running together through Pugu's scenic routes.",
    safety_first_title: "Safety First",
    safety_first_content: "Runner safety is our top priority. We ensure secure routes, medical assistance, and clear guidance throughout the marathon.",
    inspiration_title: "Inspiration",
    inspiration_content: "The marathon inspires individuals to challenge themselves, improve fitness, and embrace a healthy lifestyle.",
    integrity_title: "Integrity & Fair Play",
    integrity_content: "We uphold fairness, honesty, and ethical standards in organizing the event, registrations, and results.",
    pugu_marathon_route: "Pugu Marathon route",
    },
  },
  sw: {
    translation: {
      home: "Nyumbani",
      about: "Kuhusu",
      gallery: "Maktaba",
      register: "Jisajili",
      cart: "Kikapu",
       countdown_title: "Kihesabu cha Pugu Marathon",
      days: "Siku",
      hours: "Saa",
      minutes: "Dakika",
        hero_title: "Pugu Marathon 2026 Iko Hapa!",
      hero_subtitle:
        "Jiunge na mamia ya wakimbiaji kwa mbio zisizosahaulika kupitia mandhari mazuri ya Pugu kwa Tsh.30,000 tu.",
      hero_register: "Jisajili Sasa",
        features_section_title: "Gundua Uzoefu wa Pugu Marathon",
      features_section_desc:
        "Jiunge na maelfu ya wakimbiaji na wafuasi wa Pugu Marathon. Chunguza mbio, fuatilia mazoezi yako, ungana na jamii, na hakikisha kila hatua inachangia matokeo chanya.",
      feature_register: "Jisajili & Shirikisha",
      feature_register_desc:
        "Jisajili kwa Pugu Marathon na hakikisha nafasi yako ya kukimbia, kushindana, au kusaidia mbio katika kategoria mbalimbali.",
      feature_tips: "Vidokezo & Ushauri wa Marathon",
      feature_tips_desc:
        "Pokea vidokezo vya kila siku vya kukimbia, ushauri wa motisha, na mwanga wa kuboresha uvumilivu kujiandaa kwa siku ya mbio.",
      feature_media: "Matukio & Vyombo vya Habari",
      feature_media_desc:
        "Tazama matukio yaliyorekodiwa ya marathon, mahojiano na washiriki, na mihadhara ya motisha kutoka matukio ya awali.",
         marathon_moments_title: "Matukio & Tukio za Pugu Marathon",
           watch_marathon_title: "Tazama Kuhusu Pugu Marathon",
            visit_our_page: "Tembelea ukurasa wetu wa {{platform}}",
    quick_links: "Viungo vya Haraka",
    about_pugu_marathon: "Kuhusu Pugu Marathon",
    register_to_run: "Jisajili Kuendesha",
    contact_us: "Wasiliana Nasi",
    marathon_highlights: "Matukio ya Marathon",
    race_day_excitement: "Msisimko wa Siku ya Mashindano",
    race_day_description: "Jiunge na maelfu ya wakimbiaji katika tukio la jamii",
    training_tips: "Vidokezo vya Mafunzo",
    training_tips_description: "Jiandae na boresha utendaji wako",
    community_engagement: "Ushirikiano wa Jamii",
    community_engagement_description: "Ungana na wajitoleaji, wafuasi na wadhamini",
    location: "Dar es Salaam, Tanzania",
    call_us: "Tupigie simu kwa +255 716 400 001",
    email_us: "Tukutumie barua pepe kwa info@evmak.com",
    all_rights_reserved: "Haki Zote Zimehifadhiwa.",
    footer_tagline: "Kimbia • Ungana • Chochea",

    // ABOUT SCREEN
      about_pugu_marathon_title: "Kuhusu Pugu Marathon 2026",
    our_purpose_title: "Madhumuni Yetu",
    our_purpose_content: "Kuchochea mtindo wa maisha wenye afya na kufanya jamii ijumlishe kupitia tukio la marathon lililopangwa vizuri na lenye furaha.",
    our_mission_title: "Dhamira Yetu",
    our_mission_content: "Kutoa uzoefu wa marathon salama, jumuishi, na wenye furaha huku tukihimiza mazoezi, ushirikiano wa jamii, na mafanikio binafsi.",
    our_vision_title: "Maono Yetu",
    our_vision_content: "Jumuiya ya wakimbiaji yenye nguvu ambapo kila mshiriki anahamasishwa, anaungwa mkono, na ni sehemu ya tukio la kukumbukwa linalokuza ustawi na mshikamano.",
    our_core_values_title: "Thamani Zetu Kuu",
    our_core_values_content: "Kanuni zinazotuongoza katika kila kitu tunachofanya katika Pugu Marathon.",
    community_spirit_title: "Roho ya Jamii",
    community_spirit_content: "Tunasherehekea ushiriki, kazi ya pamoja, na furaha ya kukimbia pamoja kupitia njia nzuri za Pugu.",
    safety_first_title: "Usalama Kwanza",
    safety_first_content: "Usalama wa wakimbiaji ndio kipaumbele chetu. Tunahakikisha njia salama, msaada wa matibabu, na mwongozo wazi wakati wote wa marathon.",
    inspiration_title: "Motisha",
    inspiration_content: "Marathon inahamasisha watu kujaribu uwezo wao, kuboresha afya, na kuishi maisha yenye afya.",
    integrity_title: "Uadilifu & Uchezaji wa Haki",
    integrity_content: "Tunashikilia usawa, uaminifu, na viwango vya maadili katika kupanga tukio, usajili, na matokeo.",
    pugu_marathon_route: "Njia ya Pugu Marathon",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;