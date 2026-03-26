import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
// import GlassCard from "@/components/ui/GlassCard"; // uncomment if still using
import { useTranslation } from "react-i18next";

const C2BPaymentPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section - Repurposed for Payment Confirmation */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.75]"
          style={{ backgroundImage: 'url("/images/running.png")' }}
        />
      </section>

      {/* Main Payment Instructions */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-purple-50/40">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden bg-white border border-purple-200 shadow-xl shadow-purple-100/40 p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-purple-900 mb-4">
                {t("payViaMobile") || "Lipa kwa Simu Yako"}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {t(
                  "useBillNumberToPay",
                  "Tumia namba ya bili ifuatayo kulipa haraka na salama kupitia simu yako."
                )}
              </p>

              <div className="bg-purple-50 border-2 border-dashed border-purple-600 rounded-2xl p-6 md:p-10 text-center mb-10 mx-auto max-w-md">
                <p className="text-sm text-purple-800 uppercase tracking-wider font-medium mb-3">
                  {t("billNumber") || "Namba ya Bili (Bill Number)"}
                </p>
                <h2 className="text-6xl md:text-7xl font-black text-purple-900 tracking-widest">
                  686686
                </h2>
              </div>
            </div>

            {/* Step-by-step Instructions */}
            <div className="space-y-8 max-w-3xl mx-auto">
              {/* Tigo Pesa */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <div className="inline-block bg-cyan-600 text-white px-4 py-1.5 rounded-md text-sm font-bold mb-4">
                  {t("tigoPesa") || "Mixx by Yas"}
                </div>
                <ol className="list-decimal pl-6 space-y-3 text-gray-800 leading-relaxed">
                  <li>{t("tigoStep1", "Piga *150*01#")}</li>
                  <li>{t("tigoStep2", "Chagua namba ya Lipa Bili / Pay Bill")}</li>
                  <li>{t("tigoStep3", "Ingiza namba ya Bili: 686686")}</li>
                  <li>{t("tigoStep4", "Ingiza namba ya marejeleo (Reference) ikiwa inahitajika")}</li>
                  <li>{t("tigoStep5", "Ingiza kiasi: 30000")}</li>
                  <li>{t("tigoStep6", "Ingiza PIN yako ya Tigo Pesa kuthibitisha")}</li>
                </ol>
              </div>

              {/* Airtel Money */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <div className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-bold mb-4">
                  {t("airtelMoney") || "Airtel Money"}
                </div>
                <ol className="list-decimal pl-6 space-y-3 text-gray-800 leading-relaxed">
                  <li>{t("airtelStep1", "Piga *150*60#")}</li>
                  <li>{t("airtelStep2", "Chagua 5 – Lipa Bili / Malipo")}</li>
                  <li>{t("airtelStep3", "Chagua More (zaidi) ikiwa inahitajika")}</li>
                  <li>{t("airtelStep4", "Chagua Fintech au Merchant Payments")}</li>
                  <li>{t("airtelStep5", "Chagua EvMak au chaguo linalofanana")}</li>
                  <li>{t("airtelStep6", "Ingiza namba ya Bili/Reference: 686686")}</li>
                  <li>{t("airtelStep7", "Ingiza kiasi: 30000")}</li>
                  <li>{t("airtelStep8", "Ingiza PIN yako kuthibitisha")}</li>
                </ol>
              </div>

              {/* Halopesa */}
              <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                <div className="inline-block bg-orange-600 text-white px-3 py-1 rounded-md text-xs font-bold mb-3">
                  {t("haloPesa") || "Halopesa"}
                </div>
                <ol className="mb-0 pl-3 text-sm text-gray-700 leading-8">
                  <li>{t("haloStep1", "1.Piga *150*88#")}</li>
                  <li>{t("haloStep2", "2.Chagua Lipa Bili")}</li>
                  <li>{t("haloStep3", "3.Weka namba ya Kampuni: 686686")}</li>
                  <li>{t("haloStep4", "4.Ingiza kumbukumbu namba ikiwa inahitajika")}</li>
                  <li>{t("haloStep5", "5.Ingiza kiasi: 30000")}</li>
                  <li>{t("haloStep6", "6.Ingiza PIN yako kuthibitisha")}</li>
                </ol>
              </div>

              {/* M Pesa */}
              <div className="border border-red-200 rounded-xl p-6 bg-white shadow-sm">
                <div className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-bold mb-4">
                  {t("mpesa") || "Mpesa"}
                </div>
                <ol className="list-decimal pl-6 space-y-3 text-gray-800 leading-relaxed">
                  <li>{t("mpesaStep1", "Piga *150*00#")}</li>
                  <li>{t("mpesaStep2", "Lipa kwa Mpesa")}</li>
                  <li>{t("mpesaStep3", "Weka namba ya Kampuni : 944344")}</li>
                  <li>{t("mpesaStep4", "Ingiza kumbukumbu namba inahitajika")}</li>
                  <li>{t("mpesaStep5", "Ingiza kiasi: 30000")}</li>
                  <li>{t("mpesaStep6", "Ingiza PIN yako ya Halo Pesa kuthibitisha")}</li>
                  <li>{t("mpesaStep7", "Kubali malipo")}</li>
                </ol>
              </div>
            </div>

            {/* Home Button */}
            {/* 
            <div className="text-center mt-12">
              <p className="text-lg text-gray-700 mb-6">
                {t("afterPaymentMessage", "Baada ya malipo, utapokea ujumbe wa uthibitisho. Usajili wako utakamilika moja kwa moja.")}
              </p>
              <Button className="bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white py-7 px-10 text-lg font-bold rounded-xl shadow-lg">
                {t("goHome") || "Rudi Nyumbani"}
              </Button>
            </div>
            */}
          </div>
        </div>
      </section>
    </>
  );
};

export default C2BPaymentPage;