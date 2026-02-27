// MarathonRegistrationPage.tsx

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

const API_BASE = "http://127.0.0.1:8000/api"; // ← change to production URL later

const decaniaParokiaMap: Record<string, string[]> = {
  "Mt. Joseph": [
    "St. Joseph", "Chang'ombe", "Upanga", "Msimbazi", "Mburahati", "Keko",
    "Mafia", "Muhimbili", "Buguruni", "Kurasini", "Mtoni", "Mikoroshoni",
    "Gonge - Mafia", "Bareni - Mafia",
  ],
  "Ubungo": [
    "Ubungo Msewe", "Manzese", "Kimara", "Chuo Kikuu", "Tandale",
    "Michungwani", "Changanyikeni", "Korogwe",
  ],
  "Makuburi": [
    "Makuburi", "Kibangu", "Luhanga", "Tabata Kisiwani", "Makoka",
    "Kilungule", "Mabibo", "Nzasa", "Kimara Mtoni", "Baruti",
    "Maria Goreti", "Kimara Mavurunza", "Bonyokwa",
  ],
  "Kibaha": [
    "Kibaha", "Mkuza", "Mlandizi", "Kibamba", "Kiluvya", "Kibwegere",
    "Kwembe", "Misugusugu", "Kongowele", "Jamaika", "Chang'ombe",
    "Mpiji", "Makurunge", "Visiga", "Lulanzi", "Mabwepande",
    "Hondogo", "Miembesaba", "Garagaza", "Kidimu",
  ],
  "Mbezi Luis": [
    "Mbezi Luis", "Makabe", "Msakuzi", "Mshikamano", "Malamba Mawili",
    "Msumi", "Mpiji Magohe", "Tegeta A", "Pande",
    "Mageti - Mt. Simon Stock",
  ],
  "Mavurunza": [
    "Mavurunza", "Mbezi Mwisho", "Temboni", "Tagaste", "Temboni- Ritha",
    "Matosa", "Msingwa", "Goba", "Stop-Over",
  ],
  "Kigamboni": [
    "Kigamboni", "Kongowe", "Mji Mwema", "Kimbiji", "Toangoma",
    "Kibada", "Gezaulole", "Mikwambe", "Vijibweni", "Mwongozo",
    "Mkokozi", "Lugwadu", "Mlamleni", "Kisarawe II",
  ],
  "Mbagala": [
    "Mbagala Zakhem", "Kizuiani", "Kijichi", "Mbagala Kuu", "Kizinga",
    "Mbande", "Kilamba", "Chamazi", "Vigoa", "Majimatitu",
    "Kingugi", "Vigozi", "Msongola A", "Mgeninani",
  ],
  "Kilimahewa": [
    "Vikindu", "Mkuranga", "Kilimahewa", "Kibiti", "Kisiju Pwani",
    "Kisegese", "Bungu", "Ikwiriri", "Vianzi", "Marogoro", "Utete",
  ],
  "Mt. Thomas More": [
    "Mbezi Beach - Mt. Gasper", "Salasala", "Mbezi Juu",
    "Kunduchi Mtongani", "Mbezi Beach (BMMH)", "Mbezi Beach (Thomas More)",
    "Kilongawima", "Goba Kunguru", "Kinzudi", "Goba Mwisho",
    "IPTL - Mt. Ambrose", "Utatu Mtakatifu - Skanska",
    "Mbezi Manyema - Mt. Monica", "Kinzudi (Toleo la Bwana)",
    "Salasala Kilimahewa",
  ],
  "Mt. Petro ": [
    "Oysterbay", "Mwenge", "Sinza", "Mwananyamala", "Hananasifu",
    "Kawe", "Mikocheni", "Makongo Juu", "Magomeni", "Kijitonyama",
  ],
  "Ukonga": [
    "Ukonga", "Yombo Kiwalani", "Yombo Dovya", "Buza", "Kitunda",
    "Yombo Vituka", "Kivule", "Mwanagati", "Magole", "Gongolamboto",
    "Nyantira", "Minazini", "Kipunguni",
  ],
  "Pugu": [
    "Pugu", "Mji Mpya Relini", "Chanika", "Chakenge", "Buyuni",
    "Bombambili", "Mvuti", "Zingiziwa", "Kisarawe", "Masaki",
    "Viwege", "Kigenzi", "Yongwe", "Dominico", "Mzenga",
    "Nyebulu", "Rada", "Msongola B", "Vikongoro", "Homboza",
  ],
  "Segerea": [
    "Segerea", "Tabata", "Kimanga", "Kipawa", "Mongo la Ndege",
    "Vingunguti", "Kinyerezi", "Ulongoni", "Sitakishari", "King'azi",
    "Manabii", "Bangulo", "Kisukuru", "Kifuru",
  ],
  "Chanika": [
    "Chanika", "Dominiko", "Msongora B", "Chakenge", "Mvuti",
    "Nyeburu", "Homboza", "Zingiziwa", "Yongwe", "Vikongoro",
  ],
};

type Step = "participant" | "payment" | "success";

const MarathonRegistrationPage: React.FC = () => {
  const { t } = useTranslation();

  const [step, setStep] = useState<Step>("participant");
  const [paymentAction, setPaymentAction] = useState<"pay_now" | "pay_later" | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email_address: "",
    race_category: "",
    kit_size: "",
    membership: "",
    decania: "",
    parokia: "",
    pickup_point: "",
  });

  const [registrationId, setRegistrationId] = useState<number | null>(null);
  const [paymentData, setPaymentData] = useState({
    phone_number: "",
    payment_method: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Registration form handlers ─────────────────────────────────────────────
  const handleRegChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "membership") {
      setFormData((prev) => ({
        ...prev,
        decania: "",
        parokia: "",
        pickup_point: "",
      }));
    }
    if (name === "decania") {
      setFormData((prev) => ({ ...prev, parokia: "" }));
    }
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    if (!formData.full_name.trim()) {
      setError(t("validation.full_name_required"));
      setLoading(false);
      return;
    }
    if (!formData.phone_number.match(/^0[67][1-9]\d{7}$/)) {
      setError(t("validation.phone_invalid"));
      setLoading(false);
      return;
    }
    if (!formData.race_category || !formData.kit_size || !formData.membership) {
      setError(t("validation.required_fields"));
      setLoading(false);
      return;
    }
    if (formData.membership === "catholic" && (!formData.decania || !formData.parokia)) {
      setError(t("validation.catholic_decania_parokia_required"));
      setLoading(false);
      return;
    }
    if (formData.membership === "other" && !formData.pickup_point) {
      setError(t("validation.other_pickup_required"));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/marathon-registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          email_address: formData.email_address || null,
          religion: formData.membership,
          race_category: formData.race_category,
          kit_size: formData.kit_size,
          decania: formData.decania || null,
          parokia: formData.parokia || null,
          pickup_point: formData.pickup_point || null,
        }),
      });

      const data = await res.json();

      if (res.ok && data.registration_id) {
        setRegistrationId(data.registration_id);
        setPaymentData((p) => ({ ...p, phone_number: formData.phone_number }));
        setStep("payment");
        setMessage(t("registration.success_message"));
      } else {
        setError(data.message || t("registration.error_generic"));
      }
    } catch (err) {
      setError(t("error.network_issue"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── Payment handlers ───────────────────────────────────────────────────────
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setPaymentData((prev) => ({ ...prev, [target.name]: value }));
  };

  const handlePaymentAction = async (action: "pay_now" | "pay_later") => {
    if (!registrationId) return;

    setError(null);
    setLoading(true);

    if (!paymentData.phone_number.match(/^0[67][1-9]\d{7}$/)) {
      setError(t("validation.phone_required_for_payment"));
      setLoading(false);
      return;
    }
    if (action === "pay_now" && !paymentData.payment_method) {
      setError(t("validation.select_payment_method"));
      setLoading(false);
      return;
    }
    if (!paymentData.terms) {
      setError(t("validation.accept_terms"));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/marathon-registration/${registrationId}/process-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          phone_number: paymentData.phone_number,
          payment_method: paymentData.payment_method,
          action,
          terms: paymentData.terms,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPaymentAction(action);
        setMessage(
          action === "pay_now"
            ? data.message || t("payment.request_sent") || "Payment request sent! Please check your phone."
            : data.message || t("payment.registered_pay_later") || "Registration successful. Pay later using the details below."
        );
        setStep("success");
      } else {
        setError(data.message || t("payment.error_generic"));
      }
    } catch (err) {
      setError(t("error.network_during_payment"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  const isCatholic = formData.membership === "catholic";
  const showParokia = isCatholic && !!formData.decania;
  const isOther = formData.membership === "other";
  const availableParokia = formData.decania && decaniaParokiaMap[formData.decania]
    ? decaniaParokiaMap[formData.decania]
    : [];

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.85]"
          style={{ backgroundImage: 'url("/images/running.png")' }}
        />
        <div className="relative z-10 text-center text-white px-6">
          {/* You can add title/hero text here if needed */}
        </div>
      </section>

      {/* Main Content */}
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
          <div className="rounded-3xl overflow-hidden bg-white border border-purple-200 shadow-xl shadow-purple-100/40">
            {step === "participant" && (
              <div className="p-8 md:p-12">
                {error && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegSubmit} className="space-y-6">
                  {/* Full name + Phone */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        {t("form.full_name")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleRegChange}
                        placeholder={t("form.full_name_placeholder")}
                        className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        {t("form.phone_number")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleRegChange}
                        placeholder="07XXXXXXXX"
                        className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      name="email_address"
                      value={formData.email_address}
                      onChange={handleRegChange}
                      placeholder={t("form.email_placeholder")}
                      className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 outline-none"
                    />
                  </div>

                  {/* Race + T-shirt */}
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
                          <SelectValue placeholder={t("form.select_distance")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2km">{t("race.2km")}</SelectItem>
                          <SelectItem value="5km">{t("race.5km")}</SelectItem>
                          <SelectItem value="10km">{t("race.10km")}</SelectItem>
                          <SelectItem value="21km">{t("race.21km")}</SelectItem>
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
                          <SelectValue placeholder={t("form.select_size")} />
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

                  {/* Membership */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      {t("form.membership")} <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.membership}
                      onValueChange={(v) => setFormData((p) => ({ ...p, membership: v }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder={t("form.select_membership")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="catholic">{t("membership.catholic")}</SelectItem>
                        <SelectItem value="other">{t("membership.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Catholic fields */}
                  {isCatholic && (
                    <>
                      <div>
                        <label className="block font-medium text-gray-700 mb-2">
                          {t("form.decania")} <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={formData.decania}
                          onValueChange={(v) => setFormData((p) => ({ ...p, decania: v }))}
                        >
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder={t("form.select_decania")} />
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
                            {t("form.parokia")} <span className="text-red-500">*</span>
                          </label>
                          <Select
                            value={formData.parokia}
                            onValueChange={(v) => setFormData((p) => ({ ...p, parokia: v }))}
                            disabled={availableParokia.length === 0}
                          >
                            <SelectTrigger className="h-12 rounded-xl">
                              <SelectValue placeholder={t("form.select_parokia")} />
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

                  {/* Other membership pickup */}
                  {isOther && (
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        {t("form.pickup_point")} <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.pickup_point}
                        onValueChange={(v) => setFormData((p) => ({ ...p, pickup_point: v }))}
                      >
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder={t("form.select_pickup")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CRDB Mlimani City">CRDB Mlimani City</SelectItem>
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
                          <SelectItem value="Woiso Original Products (WOP) ">Woiso Original Products (WOP)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white py-7 text-lg font-bold rounded-xl shadow-lg disabled:opacity-60 mt-8"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {t("form.registering")}
                      </span>
                    ) : (
                      t("form.register_now")
                    )}
                  </Button>
                </form>
              </div>
            )}

            {step === "payment" && (
              <div className="p-8 md:p-12">
                <p className="text-center text-gray-600 mb-8">
                  {t("payment.pugu_marathon_registration")}
                </p>

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
                  <h5 className="font-semibold mb-3 text-lg">{t("payment.participant")}</h5>
                  <p className="text-gray-700">
                    <strong>{t("form.full_name")}:</strong> {formData.full_name} <br />
                    <strong>{t("form.phone_number")}:</strong> {formData.phone_number} <br />
                    <strong>{t("form.race_category")}:</strong> {formData.race_category.toUpperCase()}
                  </p>
                </div>

                <div className="bg-purple-50 border-2 border-dashed border-purple-600 rounded-2xl p-8 text-center mb-10">
                  <h6 className="text-xl text-purple-800 mb-2">{t("payment.registration_fee")}</h6>
                  <h2 className="text-5xl font-bold text-purple-900">TZS 30,000</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      {t("payment.phone_for_payment")} <span className="text-red-500">*</span>
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
                      {t("payment.payment_method")} <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={paymentData.payment_method}
                      onValueChange={(v) => setPaymentData((p) => ({ ...p, payment_method: v }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder={t("payment.select_method")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mpesa">M-Pesa</SelectItem>
                        <SelectItem value="TigoPesa">{t("payment.tigo_pesa")}</SelectItem>
                        <SelectItem value="AirtelMoney">{t("payment.airtel_money")}</SelectItem>
                        <SelectItem value="HaloPesa">{t("payment.halo_pesa")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
                      {t("payment.accept_terms_prefix")}{" "}
                      <a href="/terms" className="text-purple-700 underline hover:text-purple-900">
                        {t("payment.terms_and_conditions")}
                      </a>{" "}
                      {t("payment.accept_terms_suffix")}
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                    <Button
                      onClick={() => handlePaymentAction("pay_now")}
                      disabled={loading}
                      className="bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white py-7 text-lg font-bold rounded-xl shadow-lg disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-3">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          {t("payment.processing")}
                        </span>
                      ) : (
                        t("payment.pay_now")
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handlePaymentAction("pay_later")}
                      disabled={loading}
                      className="py-7 text-lg font-bold border-2 border-gray-400 hover:bg-gray-50 rounded-xl"
                    >
                      {t("payment.pay_later")}
                    </Button>
                  </div>
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
                  <p className="text-xl text-gray-700 mb-8">Tafadhali Lipa kwenye Simu</p>
                </div>

                {paymentAction === "pay_later" ? (
                  <>
                    <div className="bg-purple-50 border-2 border-dashed border-purple-600 rounded-2xl p-6 md:p-8 text-center mb-10">
                      <p className="text-sm text-purple-800 uppercase tracking-wider font-medium mb-3">
                        {t("payment.your_bill_number") || "Your Bill Number"}
                      </p>
                      <h2 className="text-5xl md:text-6xl font-black text-purple-900 tracking-widest">
                        686686
                      </h2>
                    </div>

                    <div className="space-y-6 mb-10 max-w-3xl mx-auto">
                      <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                        <div className="inline-block bg-cyan-600 text-white px-3 py-1 rounded-md text-xs font-bold mb-3">
                          Mixx by Yas (Tigo)
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
                    </div>
                  </>
                ) : (
                  <div className="max-w-xl mx-auto">
                    {/* <h3 className="text-2xl font-semibold text-green-800 mb-4">
                      {t("payment.payment_requested") || "Payment Requested"}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {t("payment.check_phone_prompt") || "We have sent a payment prompt to your phone. Please complete the payment now."}
                    </p>
                    <p className="text-gray-600 mt-6 text-center">
                      {t("payment.once_confirmed_you_will_receive_sms") || "You will receive a confirmation SMS once the payment is successful."}
                    </p> */}
                  </div>
                )}

                <div className="text-center mt-10">
                  {/* You can add "Register Another" button here if desired */}
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