import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API_BASE = "https://portal.pugumarathon.or.tz/api"; // ← change to production URL later

const decaniaParokiaMap: Record<string, string[]> = {
  "Chanika": [
    "Chakenge", "Chanika", "Dominiko", "Homboza", "Msongora B",
    "Mvuti", "Nyeburu", "Vikongoro", "Yongwe", "Zingiziwa",
  ],
  "Kibaha": [
    "Chang'ombe", "Garagaza", "Hondogo", "Jamaika", "Kibaha", "Kibamba",
    "Kibwegere", "Kidimu", "Kiluvya", "Kongowele", "Kwembe", "Lulanzi",
    "Mabwepande", "Makurunge", "Miembesaba", "Misugusugu", "Mkuza",
    "Mlandizi", "Mpiji", "Visiga",
  ],
  "Kigamboni": [
    "Gezaulole", "Kibada", "Kigamboni", "Kimbiji", "Kisarawe II",
    "Kongowe", "Lugwadu", "Mikwambe", "Mji Mwema", "Mkokozi",
    "Mlamleni", "Mwongozo", "Toangoma", "Vijibweni",
  ],
  "Kilimahewa": [
    "Bungu", "Ikwiriri", "Kibiti", "Kisiju Pwani", "Kisegese",
    "Kilimahewa", "Marogoro", "Mkuranga", "Utete", "Vianzi", "Vikindu",
  ],
  "Makuburi": [
    "Baruti", "Bonyokwa", "Kibangu", "Kilungule", "Kimara Mavurunza",
    "Kimara Mtoni", "Luhanga", "Mabibo", "Makoka", "Makuburi",
    "Maria Goreti", "Nzasa", "Tabata Kisiwani",
  ],
  "Mavurunza": [
    "Goba", "Matosa", "Mavurunza", "Mbezi Mwisho", "Msingwa",
    "Stop-Over", "Tagaste", "Temboni", "Temboni- Ritha",
  ],
  "Mbagala": [
    "Chamazi", "Kijichi", "Kilamba", "Kingugi", "Kizinga", "Kizuiani",
    "Majimatitu", "Mbande", "Mbagala Kuu", "Mbagala Zakhem",
    "Mgeninani", "Msongola A", "Vigoa", "Vigozi",
  ],
  "Mbezi Luis": [
    "Mageti - Mt. Simon Stock", "Makabe", "Malamba Mawili", "Mbezi Luis",
    "Mpiji Magohe", "Msakuzi", "Mshikamano", "Msumi", "Pande", "Tegeta A",
  ],
  "Mt. Joseph": [
    "Bareni - Mafia", "Buguruni", "Chang'ombe", "Gonge - Mafia", "Keko",
    "Kurasini", "Mafia", "Mburahati", "Mikoroshoni", "Mtoni",
    "Msimbazi", "Muhimbili", "St. Joseph", "Upanga",
  ],
  "Mt. Petro": [
    "Hananasifu", "Kawe", "Kijitonyama", "Magomeni", "Makongo Juu",
    "Mikocheni", "Mwananyamala", "Mwenge", "Oysterbay", "Sinza",
  ],
  "Mt. Thomas More": [
    "BMMH - Mbezi Beach", "BMMK - Goba", "Mt. Ambrose - IPTL",
    "Mt. Cecilia - Kinzudi", "Mt. Dominico - Mbezi Juu", "Mt. Gasper - Mbezi Beach",
    "Mt. Kizito - Kilongawima", "Mt. Monica - Mbezi Manyema",
    "Mt. Nicholous - Kunduchi Mtongani", "Mt. Ritha - Goba Mwisho",
    "Mt. Thelesia - Salasala Kilimahewa", "Mt. Augustino - Salasala",
    "Thomas More (Mbezi Beach)", "Toleo la Bwana - Kinzudi",
    "Utatu Mtakatifu - Skanska",
  ],
  "Pugu": [
    "Bombambili", "Buyuni",  "Kigenzi",
     "Masaki", "Mji Mpya Relini",  
    "Mzenga",  "Pugu", "Rada", "Viwege",
  ],
  "Segerea": [
    "Bangulo", "Kifuru", "Kimanga", "King'azi", "Kinyerezi", "Kipawa",
    "Kisukuru", "Manabii", "Mongo la Ndege", "Segerea", "Sitakishari",
    "Tabata", "Ulongoni", "Vingunguti",
  ],
  "Ubungo": [
    "Changanyikeni", "Chuo Kikuu", "Kimara", "Korogwe", "Manzese",
    "Michungwani", "Tandale", "Ubungo Msewe",
  ],
  "Ukonga": [
    "Buza", "Gongolamboto", "Kipunguni", "Kitunda", "Kivule", "Magole",
    "Minazini", "Mwanagati", "Nyantira", "Ukonga", "Yombo Dovya",
    "Yombo Kiwalani", "Yombo Vituka",
  ],
};

type Step = "participant" | "payment" | "success";
type RegistrationType = "mshiriki" | "mchangiaji";

const MarathonRegistrationPage: React.FC = () => {
  const { t } = useTranslation();

  const [registrationType, setRegistrationType] = useState<RegistrationType>("mshiriki");
  const [step, setStep] = useState<Step>("participant");
  const [paymentAction, setPaymentAction] = useState<"pay_now" | "pay_later" | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    age: "",
    sex: "",
    phone_number: "",
    email_address: "",
    race_category: "",
    kit_size: "",
    religion: "",           // changed from membership → religion
    decania: "",
    parokia: "",
    pickup_point: "",
  });

  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [confirmedAmount, setConfirmedAmount] = useState<number>(0);
  const [registrationId, setRegistrationId] = useState<number | null>(null);

  const [paymentData, setPaymentData] = useState({
    payment_type: "" as "" | "mobile" | "card",
    mobile_method: "",
    phone_number: "",
    email: "",
    address: "",
    postal_code: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const getFullName = () =>
    [formData.first_name, formData.middle_name, formData.last_name]
      .filter(Boolean)
      .join(" ");

  const formatAmount = (amount: number) => `TZS ${amount.toLocaleString("en-TZ")}`;

  const handleTypeSwitch = (type: RegistrationType) => {
    setRegistrationType(type);
    setStep("participant");
    setError(null);
    setMessage(null);
    setRegistrationId(null);
    setPaymentAction(null);
    setDonationAmount(0);
    setConfirmedAmount(0);
    setFormData((prev) => ({
      ...prev,
      religion: "",
      decania: "",
      parokia: "",
      pickup_point: "",
      race_category: "",
      kit_size: "",
    }));
  };

  // ── Form change handler (unified for both types) ───────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "religion") {
      setFormData((prev) => ({
        ...prev,
        religion: value,
        decania: "",
        parokia: "",
        pickup_point: "",
      }));
    }
    if (name === "decania") {
      setFormData((prev) => ({ ...prev, decania: value, parokia: "" }));
    }
  };

  // ── Unified registration submit ────────────────────────────────────────────
  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    // ── Client-side validation ───────────────────────────────────────────────
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      setError("Tafadhali ingiza jina la kwanza na la mwisho.");
      setLoading(false);
      return;
    }

    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 5 || Number(formData.age) > 100) {
      setError("Umri lazima uwe kati ya miaka 5–100.");
      setLoading(false);
      return;
    }

    if (!formData.sex) {
      setError("Tafadhali chagua jinsia.");
      setLoading(false);
      return;
    }

    if (!formData.phone_number.match(/^0[67][1-9]\d{7}$/)) {
      setError("Namba ya simu si sahihi (07XXXXXXXX au 06XXXXXXXX).");
      setLoading(false);
      return;
    }

    const minAmount = registrationType === "mshiriki" ? 30000 : 1000;
    if (!donationAmount || donationAmount < minAmount) {
      setError(
        registrationType === "mshiriki"
          ? `Kiasi cha usajili lazima kiwe angalau TZS 30,000.`
          : `Kiasi cha mchango lazima kiwe angalau TZS 1,000.`
      );
      setLoading(false);
      return;
    }

    if (registrationType === "mshiriki") {
      if (!formData.race_category || !formData.kit_size || !formData.religion) {
        setError("Tafadhali jaza sehemu zote zinazohitajika.");
        setLoading(false);
        return;
      }
      if (formData.religion === "catholic" && (!formData.decania || !formData.parokia)) {
        setError("Tafadhali chagua Decania na Parokia.");
        setLoading(false);
        return;
      }
      if (formData.religion === "other" && !formData.pickup_point) {
        setError("Tafadhali chagua eneo la kuchukulia jezi.");
        setLoading(false);
        return;
      }
    }

    // ── Prepare payload ──────────────────────────────────────────────────────
    const payload: any = {
      first_name: formData.first_name,
      middle_name: formData.middle_name || null,
      last_name: formData.last_name,
      full_name: getFullName(),
      age: Number(formData.age),
      sex: formData.sex,
      phone_number: formData.phone_number,
      email_address: formData.email_address || null,
      donation_amount: donationAmount,
    };

   if (registrationType === "mshiriki") {
      payload.participant_type = "mkimbiaji";
      payload.religion = formData.religion;
      payload.race_category = formData.race_category;
      payload.kit_size = formData.kit_size;
      payload.decania = formData.decania || null;
      payload.parokia = formData.parokia || null;
      payload.pickup_point = formData.pickup_point || null;
    } else {
      payload.participant_type = "mchangiaji";
      payload.religion = "other";
      payload.race_category = "mchangiaji";
      payload.kit_size = "N/A";
      payload.pickup_point = "N/A";
      payload.decania = null;
      payload.parokia = null;
    }

    try {
      const res = await fetch(`${API_BASE}/marathon-registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.registration_id) {
        setRegistrationId(data.registration_id);
        setConfirmedAmount(data.amount ?? donationAmount);
        setPaymentData((prev) => ({
          ...prev,
          phone_number: formData.phone_number,
          email: formData.email_address || "",
        }));
        setStep("payment");
        // setMessage("Usajili umefanikiwa! Endelea na malipo ili uthibitishe nafasi yako.");
      } else {
        setError(data.message || data.error || t("registration.error_generic") || "Tatizo la usajili. Jaribu tena.");
      }
    } catch (err) {
      setError(t("error.network_issue") || "Tatizo la mtandao. Hakikisha una muunganisho mzuri.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── Payment handlers ───────────────────────────────────────────────────────
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentTypeChange = (value: "mobile" | "card") => {
    setPaymentData((prev) => ({
      ...prev,
      payment_type: value,
      mobile_method: value === "mobile" ? prev.mobile_method : "",
    }));
  };

  const handleMobileMethodChange = (value: string) => {
    setPaymentData((prev) => ({ ...prev, mobile_method: value }));
  };

  const handlePaymentAction = async (action: "pay_now" | "pay_later") => {
    if (!registrationId) return;
    setError(null);
    setLoading(true);

    if (!paymentData.terms) {
      setError("Lazima ukubali sheria na masharti.");
      setLoading(false);
      return;
    }

    // Card payment
    if (paymentData.payment_type === "card") {
      if (action !== "pay_now") return;

      if (!paymentData.email) {
        setError("Barua pepe inahitajika kwa malipo ya kadi.");
        setLoading(false);
        return;
      }
      if (!paymentData.phone_number.match(/^0[67][1-9]\d{7}$/)) {
        setError("Namba ya simu si sahihi.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/marathon/card/${registrationId}/initiate`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            email: paymentData.email,
            phone_number: paymentData.phone_number,
            address: paymentData.address || undefined,
            postal_code: paymentData.postal_code || undefined,
          }),
        });

        const data = await res.json();
        if (res.ok && data.success && data.payment_url) {
          window.location.href = data.payment_url;
        } else {
          setError(data.error || data.message || "Tatizo la kuanzisha malipo ya kadi.");
        }
      } catch (err) {
        setError("Tatizo la mtandao wakati wa malipo ya kadi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Mobile payment
    if (!paymentData.phone_number.match(/^0[67][1-9]\d{7}$/)) {
      setError("Namba ya simu inahitajika na lazima iwe sahihi.");
      setLoading(false);
      return;
    }

    if (action === "pay_now" && !paymentData.mobile_method) {
      setError("Tafadhali chagua mtandao wa malipo.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/marathon-registration/${registrationId}/process-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          phone_number: paymentData.phone_number,
          payment_method: paymentData.mobile_method,
          action,
          terms: true,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPaymentAction(action);
        setMessage(
          action === "pay_now"
            ? data.message || "Ombi la malipo limetumwa kwenye simu yako. Thibitisha malipo."
            : data.message || "Usajili umehifadhiwa. Lipa baadaye ndani ya saa 24."
        );
        setStep("success");
      } else {
        setError(data.message || data.error || "Tatizo la kuanzisha malipo.");
      }
    } catch (err) {
      setError("Tatizo la mtandao wakati wa malipo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── UI helpers ─────────────────────────────────────────────────────────────
  const isCatholic = formData.religion === "catholic";
  const showParokia = isCatholic && !!formData.decania;
  const isOther = formData.religion === "other";
  const availableParokia = formData.decania ? decaniaParokiaMap[formData.decania] ?? [] : [];
  const showMobileFields = paymentData.payment_type === "mobile";
  const showCardFields = paymentData.payment_type === "card";

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.85]"
          style={{ backgroundImage: 'url("/images/running.png")' }}
        />
        <div className="relative z-10 text-center text-white px-6" />
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-purple-50/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage: `url("/images/pugu.png"), url("/images/pugu_black.png")`,
              backgroundSize: "160px 160px, 160px 160px",
              backgroundPosition: "0 0, 80px 80px",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          {step === "participant" && (
            <div className="mb-8">
              {/* <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Chagua aina ya usajili
              </p> */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleTypeSwitch("mshiriki")}
                  className={`relative rounded-2xl p-5 text-left border-2 transition-all duration-200 focus:outline-none ${
                    registrationType === "mshiriki"
                      ? "border-purple-600 bg-gradient-to-br from-purple-700 to-indigo-600 shadow-lg shadow-purple-200"
                      : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                  }`}
                >
                  {registrationType === "mshiriki" && (
                    <span className="absolute top-3 right-3 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                      <svg className="w-3 h-3 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                    registrationType === "mshiriki" ? "bg-white/20" : "bg-purple-50"
                  }`}>
                    <svg className={`w-6 h-6 ${registrationType === "mshiriki" ? "text-white" : "text-purple-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className={`text-base font-bold mb-1 ${registrationType === "mshiriki" ? "text-white" : "text-gray-800"}`}>
                    {t("mshiriki")}
                  </p>
                  <p className={`text-xs leading-snug ${registrationType === "mshiriki" ? "text-purple-100" : "text-gray-400"}`}>
                    {t("mshiriki1")}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeSwitch("mchangiaji")}
                  className={`relative rounded-2xl p-5 text-left border-2 transition-all duration-200 focus:outline-none ${
                    registrationType === "mchangiaji"
                      ? "border-purple-600 bg-gradient-to-br from-purple-700 to-indigo-600 shadow-lg shadow-purple-200"
                      : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                  }`}
                >
                  {registrationType === "mchangiaji" && (
                    <span className="absolute top-3 right-3 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                      <svg className="w-3 h-3 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                    registrationType === "mchangiaji" ? "bg-white/20" : "bg-purple-50"
                  }`}>
                    <svg className={`w-6 h-6 ${registrationType === "mchangiaji" ? "text-white" : "text-purple-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className={`text-base font-bold mb-1 ${registrationType === "mchangiaji" ? "text-white" : "text-gray-800"}`}>
                   {t("contributor")}
                  </p>
                  <p className={`text-xs leading-snug ${registrationType === "mchangiaji" ? "text-purple-100" : "text-gray-400"}`}>
                    {t("contributor1")}
                  </p>
                </button>
              </div>
            </div>
          )}

          <div className="rounded-3xl overflow-hidden bg-white border border-purple-200 shadow-xl shadow-purple-100/40">
            {/* PARTICIPANT STEP */}
            {step === "participant" && (
              <div className="p-8 md:p-12">
                {error && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                  {/* Names */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        {t("form.first_name") || "Jina la Kwanza"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder={t("form.first_name_placeholder") || "Jina la kwanza"}
                        className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        {t("form.middle_name") || "Jina la Kati"}
                      </label>
                      <input
                        type="text"
                        name="middle_name"
                        value={formData.middle_name}
                        onChange={handleChange}
                        placeholder={t("form.middle_name_placeholder") || "Jina la kati (si lazima)"}
                        className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      {t("form.last_name") || "Jina la Mwisho"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder={t("form.last_name_placeholder") || "Jina la mwisho"}
                      className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                      required
                    />
                  </div>

                  {/* Age + Sex */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        {t("form.age") || "Umri"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Mfano: 25"
                        min={5}
                        max={100}
                        className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        {t("form.sex") || "Jinsia"} <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.sex}
                        onValueChange={(v) => setFormData((p) => ({ ...p, sex: v }))}
                      >
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder={t("form.select_sex") || "Chagua jinsia"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{t("sex.male") || "Mme"}</SelectItem>
                          <SelectItem value="female">{t("sex.female") || "Mke"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Phone + Email */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        {t("form.phone_number")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="07XXXXXXXX"
                        className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        {t("form.email") || "Barua Pepe"}
                      </label>
                      <input
                        type="email"
                        name="email_address"
                        value={formData.email_address}
                        onChange={handleChange}
                        placeholder={t("form.email_placeholder") || "mfano@barua.pepe"}
                        className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Mshiriki only fields */}
                  {registrationType === "mshiriki" && (
                    <>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="block font-medium text-gray-700 mb-2">
                            {t("form.race_category")} <span className="text-red-500">*</span>
                          </label>
                          <Select
                            value={formData.race_category}
                            onValueChange={(v) => setFormData((p) => ({ ...p, race_category: v }))}
                          >
                            <SelectTrigger className="h-12 rounded-xl">
                              <SelectValue placeholder={t("form.select_distance") || "Chagua umbali"} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2km">2 km</SelectItem>
                              <SelectItem value="5km">5 km</SelectItem>
                              <SelectItem value="10km">10 km</SelectItem>
                              <SelectItem value="21km">21 km (Nusu Marathon)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block font-medium text-gray-700 mb-2">
                            {t("form.tshirt_size")} <span className="text-red-500">*</span>
                          </label>
                          <Select
                            value={formData.kit_size}
                            onValueChange={(v) => setFormData((p) => ({ ...p, kit_size: v }))}
                          >
                            <SelectTrigger className="h-12 rounded-xl">
                              <SelectValue placeholder={t("form.select_size") || "Chagua saizi"} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="S">S</SelectItem>
                              <SelectItem value="M">M</SelectItem>
                              <SelectItem value="L">L</SelectItem>
                              <SelectItem value="XL">XL</SelectItem>
                              <SelectItem value="XXL">XXL</SelectItem>
                              <SelectItem value="XXXL">XXXL</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium text-gray-700 mb-2">
                          {t("form.membership") || "Uanachama"} <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={formData.religion}
                          onValueChange={(v) => setFormData((p) => ({ ...p, religion: v }))}
                        >
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder={t("form.select_membership") || "Chagua uanachama"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="catholic">{t("catholic") || "Mwanakatoliki"}</SelectItem>
<SelectItem value="other">{t("nonCatholic") || "Si Mwanakatoliki"}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {isCatholic && (
                        <>
                          <div>
                            <label className="block font-medium text-gray-700 mb-2">
                              {t("form.decania") || "Decania"} <span className="text-red-500">*</span>
                            </label>
                            <Select
                              value={formData.decania}
                              onValueChange={(v) => setFormData((p) => ({ ...p, decania: v, parokia: "" }))}
                            >
                              <SelectTrigger className="h-12 rounded-xl">
                                <SelectValue placeholder={t("form.select_decania") || "Chagua Decania"} />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.keys(decaniaParokiaMap).map((dec) => (
                                  <SelectItem key={dec} value={dec}>
                                    {dec}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {showParokia && (
                            <div>
                              <label className="block font-medium text-gray-700 mb-2">
                                {t("form.parokia") || "Parokia"} <span className="text-red-500">*</span>
                              </label>
                              <Select
                                value={formData.parokia}
                                onValueChange={(v) => setFormData((p) => ({ ...p, parokia: v }))}
                              >
                                <SelectTrigger className="h-12 rounded-xl">
                                  <SelectValue placeholder={t("form.select_parokia") || "Chagua Parokia"} />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableParokia.map((par) => (
                                    <SelectItem key={par} value={par}>
                                      {par}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </>
                      )}

                      {isOther && (
                        <div>
                          <label className="block font-medium text-gray-700 mb-2">
                            {t("form.pickup_point") || "Eneo la Kuchukulia Jezi"} <span className="text-red-500">*</span>
                          </label>
                          <Select
                            value={formData.pickup_point}
                            onValueChange={(v) => setFormData((p) => ({ ...p, pickup_point: v }))}
                          >
                            <SelectTrigger className="h-12 rounded-xl">
                              <SelectValue placeholder={t("form.select_pickup") || "Chagua eneo"} />
                            </SelectTrigger>
                            <SelectContent>
                                                       <SelectItem value="CRDB Mlimani City">Mlimani City</SelectItem>
                          <SelectItem value="Mkombozi Bank Msimbazi Center">Mkombozi Bank Msimbazi Center</SelectItem>
                          <SelectItem value="Mkombozi Bank Tegeta">Mkombozi Bank Tegeta</SelectItem>
                          <SelectItem value="Kanisa Katoliki Mt. Petro - Oysterbay">Kanisa Katoliki Mt. Petro - Oysterbay</SelectItem>
                          <SelectItem value="Kanisa Katoliki Kristo Mfalme - Tabata">Kanisa Katoliki Kristo Mfalme - Tabata</SelectItem>
                          <SelectItem value="Kanisa Katoliki Segerea">Kanisa Katoliki Segerea</SelectItem>
                          <SelectItem value="Kanisa Katoliki Mt. Yosefu - Posta">Kanisa Katoliki Mt. Yosefu - Posta</SelectItem>
                          <SelectItem value="Kanisa Katoliki Pugu">Kanisa Katoliki Pugu</SelectItem>
                          <SelectItem value="Kibo Complex Tegeta">Kibo Complex Tegeta</SelectItem>
                          <SelectItem value="Kariakoo">Kariakoo</SelectItem>
                          <SelectItem value="KKKT Kijitonyama">KKKT Kijitonyama</SelectItem>
                          <SelectItem value="IFM">IFM</SelectItem>
                          <SelectItem value="Chuo Kikuu">Chuo Kikuu</SelectItem>
                          <SelectItem value="Kanisa Katoliki Makongo">Kanisa Katoliki Makongo</SelectItem>
                          <SelectItem value="Kanisa Katoliki Mbezi Louis">Kanisa Katoliki Mbezi Louis</SelectItem>
                          <SelectItem value="Kanisa Katoliki Chanika">Kanisa Katoliki Chanika</SelectItem>
                          <SelectItem value="Kanisa Katoliki Mt. Gaspar">Kanisa Katoliki Mt. Gaspar</SelectItem>
                          <SelectItem value="Kibaha Pwani">Kibaha Pwani</SelectItem>
                          <SelectItem value="Ubungo">Ubungo</SelectItem>
                          <SelectItem value="Msongora">Msongora</SelectItem>
                          <SelectItem value="Woiso Original Products (WOP)">Woiso Original Products (WOP)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </>
                  )}

                  {/* Amount */}
                  <div>
                <label className="block font-medium text-gray-700 mb-2">
  {registrationType === "mshiriki"
    ? t("registrationFee") || "Kiasi cha Usajili"
    : t("contributionAmount") || "Kiasi cha Mchango"}{" "}
  <span className="text-red-500">*</span>
</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold pointer-events-none select-none">
                        TZS
                      </span>
                      <input
                        type="number"
                        min={registrationType === "mshiriki" ? 30000 : 500}
                        value={donationAmount || ""}
                        placeholder={t("enterAmount") || "Ingiza kiasi"}
                        onChange={(e) => setDonationAmount(Number(e.target.value))}
                        className="w-full pl-14 pr-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none text-lg font-semibold"
                        required
                      />
                    </div>
                   <p className="text-xs text-gray-400 mt-1.5 ml-1">
  {registrationType === "mshiriki"
    ? t("minRegistrationAmount") || "Kiasi cha chini: TZS 30,000"
    : t("minContributionAmount") || "Kiasi cha chini: TZS 1,000"}
</p>
                  </div>

        <Button
  type="submit"
  disabled={loading}
  className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white py-7 text-lg font-bold rounded-xl shadow-lg disabled:opacity-60 mt-8"
>
  {loading ? (
    <span className="flex items-center justify-center gap-3">
      <Loader2 className="h-5 w-5 animate-spin" />
      {t("registering") || "Inasajili..."}
    </span>
  ) : registrationType === "mshiriki" ? (
    t("registerNow") || "Jisajili Sasa"
  ) : (
    t("proceedPayment") || "Endelea na Malipo"
  )}
</Button>
                </form>
              </div>
            )}

            {/* PAYMENT STEP */}
            {step === "payment" && (
              <div className="p-8 md:p-12">


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

                <div className="mb-8">
                  <h5 className="font-semibold mb-3 text-lg">
                    {/* {registrationType === "mchangiaji" ? "Mchangiaji" : "Mshiriki"} */}
                  </h5>
                 <p className="text-gray-700">
  <strong>{t("full_name")}:</strong> {getFullName()} <br />
  <strong>{t("age")}:</strong> {formData.age} <br />
  <strong>{t("gender")}:</strong>{" "}
  {formData.sex === "male" ? t("male") : t("female")} <br />
  <strong>{t("phone")}:</strong> {formData.phone_number} <br />

  {registrationType === "mshiriki" && (
    <>
      <strong>{t("race_type")}:</strong> {formData.race_category.toUpperCase()}
    </>
  )}
</p>
                </div>

                <div className="bg-purple-50 border-2 border-dashed border-purple-600 rounded-2xl p-8 text-center mb-10">
                  <h6 className="text-xl text-purple-800 mb-2">
                    {/* {registrationType === "mchangiaji" ? "Kiasi cha Mchango" : "Kiasi cha Usajili"} */}
                  </h6>
                  <h2 className="text-5xl font-bold text-purple-900">
                    {formatAmount(confirmedAmount)}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                     {t("paymentType") || "Chagua Aina ya Malipo"} <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={paymentData.payment_type}
                      onValueChange={(v) => handlePaymentTypeChange(v as "mobile" | "card")}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder={t("selectPayment") || "Chagua aina ya malipo"} />
                      </SelectTrigger>
                      <SelectContent>
                           <SelectItem value="mobile">{t("mobilePayment") || "Mtandao wa simu"}</SelectItem>
        <SelectItem value="card">{t("cardPayment") || "Kadi (Visa / MasterCard)"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
 <div>
                        <label className="block font-medium text-gray-700 mb-2">
                          {t("network") || "Mtandao"} <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={paymentData.mobile_method}
                          onValueChange={handleMobileMethodChange}
                        >
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder={t("selectNetwork") || "Chagua mtandao"}  />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="TigoPesa">Mixx by Yas</SelectItem>
                            <SelectItem value="Mpesa">M-Pesa</SelectItem>
                            <SelectItem value="AirtelMoney">Airtel Money</SelectItem>
                            <SelectItem value="HaloPesa">HaloPesa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                  {showMobileFields && (
                    <>
                      <div>
                        <label className="block font-medium text-gray-700 mb-2">
                         {t("mobilePaymentNumber") || "Namba ya Simu ya Malipo"}{" "} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone_number"
                          value={paymentData.phone_number}
                          onChange={handlePaymentChange}
                          placeholder="07XXXXXXXX"
                          className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                        />
                      </div>

                     
                    </>
                  )}

                  {showCardFields && (
                    <>
                      <div>
                        <label className="block font-medium text-gray-700 mb-2">
                          {t("email") || "Barua Pepe"} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={paymentData.email}
                          onChange={handlePaymentChange}
                          placeholder="mfano@barua.pepe"
                          className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-gray-700 mb-2">
                          {t("phoneNumber") || "Namba ya Simu"} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone_number"
                          value={paymentData.phone_number}
                          onChange={handlePaymentChange}
                          placeholder="07XXXXXXXX"
                          className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-gray-700 mb-2">
                           {t("address") || "Anwani"}
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={paymentData.address}
                          onChange={handlePaymentChange}
                          className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                        />
                      </div>
                    </>
                  )}

                  {(showMobileFields || showCardFields) && (
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="terms"
                        id="terms"
                        checked={paymentData.terms}
                        onChange={handlePaymentChange}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        required
                      />
   <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
      {t("agreeTerms") || "Nimeyasoma na kukubali"}{" "}
      <a href="#" className="text-purple-700 underline hover:text-purple-900">
        {t("termsAndConditions") || "Sheria na Masharti"}
      </a>
    </label>
                    </div>
                  )}

                  {(showMobileFields || showCardFields) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                      <Button
                        onClick={() => handlePaymentAction("pay_now")}
                        disabled={loading}
                        className="bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white py-7 text-lg font-bold rounded-xl shadow-lg disabled:opacity-60"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-3">
                            <Loader2 className="h-5 w-5 animate-spin" />
                             {t("processing") || "Inashughulikia..."}
                          </span>
                        ) : (
                           t("payNow") || "Lipa Sasa"
                        )}
                      </Button>

                      {showMobileFields && (
                        <Button
                          variant="outline"
                          onClick={() => handlePaymentAction("pay_later")}
                          disabled={loading}
                          className="py-7 text-lg font-bold border-2 border-gray-400 hover:bg-gray-50 rounded-xl"
                        >
                           {t("payLater") || "Lipa Baadaye"}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <CheckCircle2 className="mx-auto h-16 w-16 text-green-600 mb-6" />
                  <h2 className="text-3xl font-bold text-purple-900 mb-4">
                    {t("success.thank_you") || "Thank You!"}
                  </h2>

                  {paymentData.payment_type === "card" ? (
                    <p className="text-xl text-gray-700 mb-8">
                      Redirecting to secure card payment page...
                    </p>
                  ) : paymentAction === "pay_later" ? (
                    <p className="text-xl text-gray-700 mb-8">
                       {t("payViaMobile") || "Tafadhali Lipa kwenye Simu"}
                    </p>
                  ) : (
                    <p className="text-xl text-gray-700 mb-8">
                      {t("paymentSentInstructions") || 
      "Ombi la malipo limetumwa kwenye simu yako. Tafadhali maliza malipo ili kukamilisha usajili, au tumia kumbukumbu namba iliyotumwa kwenye simu yako kwa kutumia namba ya kampuni 686686 kwa mitandao ya Halotel, Mixx by yas na Airtel. Tumia 944344 kwa Vodacom"}
  </p>
                  )}
                </div>

                {paymentData.payment_type !== "card" && paymentAction === "pay_later" && (
                  <>
                    <div className="bg-purple-50 border-2 border-dashed border-purple-600 rounded-2xl p-6 md:p-8 text-center mb-10">
                      {/* <p className="text-sm text-purple-800 uppercase tracking-wider font-medium mb-3">
                        {t("payment.your_bill_number") || "Your Bill Number"}
                      </p> */}
                      <h2 className="text-5xl md:text-6xl font-black text-purple-900 tracking-widest">
                        686686
                      </h2>
                    </div>

                    <div className="space-y-6 mb-10 max-w-3xl mx-auto">
                      <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                        <div className="inline-block bg-cyan-600 text-white px-3 py-1 rounded-md text-xs font-bold mb-3">
                          Mixx by Yas 
                        </div>
                        <ol className="mb-0 pl-3 text-sm text-gray-700 leading-8">
                          <li>1. {t("step_dial", { code: "*150*01#", network: "Tigo" })}</li>
                          <li>2. {t("step_select_pay_bill")}</li>
                          <li>3. {t("step_enter_bill_number", { number: "686686" })}</li>
                          <li>4. {t("step_enter_reference")}</li>
                          <li>5. {t("step_enter_amount", { amount: "TZS 30,000" })}</li>
                          <li>6. {t("step_enter_pin")}</li>
                        </ol>
                      </div>

                      <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                        <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold mb-3">
                          Airtel Money
                        </div>
                        <ol className="mb-0 pl-3 text-sm text-gray-700 leading-8">
                          <li>1. {t("step_dial", { code: "*150*60#", network: "Airtel" })}</li>
                          <li>2. Namba 5 {t("step_select_pay_bill")}</li>
                          <li>3. Chagua # : More</li>
                          <li>4. Chagua Namba 12: Fintech</li>
                          <li>5. Chagua Namba 1: EvMak</li>
                          <li>6. Ingiza Reference Number</li>
                          <li>7. {t("step_enter_amount", { amount: "TZS 30,000" })}</li>
                          <li>8. {t("step_enter_pin")}</li>
                          <li>9. Bonyeza 1 Kuthibitisha</li>
                        </ol>
                      </div>

                      <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                        <div className="inline-block bg-orange-600 text-white px-3 py-1 rounded-md text-xs font-bold mb-3">
                          Halopesa
                        </div>
                        <ol className="mb-0 pl-3 text-sm text-gray-700 leading-8">
                          <li>1. {t("step_dial", { code: "*150*88#", network: "Halotel" })}</li>
                          <li>2. {t("step_select_pay_bill")}</li>
                          <li>3. {t("step_enter_bill_number", { number: "686686" })}</li>
                          <li>4. {t("step_enter_reference")}</li>
                          <li>5. {t("step_enter_amount", { amount: "TZS 30,000" })}</li>
                          <li>6. {t("step_enter_pin")}</li>
                        </ol>
                      </div>
                       {/* M Pesa */}
              <div className="border border-red-200 rounded-xl p-6 bg-white shadow-sm">
                <div className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-bold mb-4">
                  Mpesa
                </div>
                <ol className="list-decimal pl-6 space-y-3 text-gray-800 leading-relaxed">
                  <li>Piga <strong>*150*00#</strong></li>
                  <li>Lipa kwa Mpesa</li>
                  <li>Weka namba ya Kampuni : <strong>944344</strong></li>
                  <li>Ingiza kumbukumbu namba inahitajika</li>
                  <li>Ingiza kiasi: <strong>30000</strong></li>
                  <li>Ingiza PIN yako ya Halo Pesa kuthibitisha</li>
                  <li>Kubali malipo</li>
                </ol>
              </div>
                    </div>
                  </>
                )}

                <div className="text-center mt-10">
                
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MarathonRegistrationPage;