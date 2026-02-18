import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Heart,
  Users,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const JoinUsPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [apiResponse, setApiResponse] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "otp" | "success">("form");

  // OTP states
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState<string>("");
  const [verifying, setVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required";
    } else if (!/^\+?[\d\s-]{9,15}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiResponse({ type: null, message: "" });

    try {
      const payload = {
        firstName: formData.firstName,
        middleName: formData.middleName || undefined,
        lastName: formData.lastName,
        phoneNo: formData.phoneNo,
        email: formData.email,
        role: "USER",
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const response = await fetch("https://development.sadakaplus.co.tz/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      setApiResponse({
        type: "success",
        message: data.message || "Registration successful! Please enter the OTP sent to your phone.",
      });
      setStep("otp");
    } catch (error: any) {
      setApiResponse({
        type: "error",
        message: error.message || "An error occurred during registration.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");

    if (value && index < OTP_LENGTH - 1) {
      otpInputsRef.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }

    if (newOtp.every(Boolean) && newOtp.length === OTP_LENGTH) {
      handleVerifyOtp(newOtp.join(""));
    }
  };

  const handleVerifyOtp = async (code: string) => {
    if (code.length !== OTP_LENGTH) return;

    setVerifying(true);
    setOtpError("");

    try {
      const response = await fetch("https://development.sadakaplus.co.tz/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNo: formData.phoneNo,
          token: code,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Invalid or expired OTP.");
      }

      setApiResponse({
        type: "success",
        message: result.message || "Phone number verified successfully!",
      });
      setStep("success");
    } catch (err: any) {
      setOtpError(err.message || "Verification failed. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setResendTimer(60);

    try {
      const res = await fetch("https://development.sadakaplus.co.tz/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNo: formData.phoneNo }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to resend OTP");

      setApiResponse({
        type: "success",
        message: data.message || "New OTP sent successfully!",
      });
    } catch (err: any) {
      setApiResponse({
        type: "error",
        message: err.message || "Could not resend OTP. Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (step === "otp") {
      otpInputsRef.current[0]?.focus();
    }
  }, [step]);

  const benefits = [
    {
      title: "Easy Giving",
      description: "Give securely from anywhere",
      icon: <Heart className="h-6 w-6 text-church-purple" />,
    },
    {
      title: "Track Impact",
      description: "See how your contributions support ministries and communities",
      icon: <Users className="h-6 w-6 text-church-purple" />,
    },
    {
      title: "Spiritual Growth",
      description: "Access live events, daily inspiration and more",
      icon: <CheckCircle className="h-6 w-6 text-church-purple" />,
    },
  ];

  return (
    <>
      {/* Hero - reduced padding */}
      <section className="hero-section py-12 md:py-16">
        <div className="hero-bg" style={{ backgroundImage: 'url("/images/join.JPEG")' }} />
        <div className="hero-gradient" />
        <div className="hero-content px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Join Sadaka Plus
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Create your personal account to give securely, support faith communities and experience transparent digital generosity.
          </p>
        </div>
      </section>

      {/* Benefits - tighter spacing */}
      <section className="bg-white py-10 md:py-12">
        <div className="page-container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
              Why Join Sadaka Plus?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Empower your giving journey with secure tools, real impact tracking and connection to trusted causes across Tanzania.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <GlassCard key={index} className="text-center p-6">
                <div className="flex justify-center mb-3">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Main content - reduced padding */}
      <section className="bg-church-light py-10 md:py-12">
        <div className="page-container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Response message */}
            {apiResponse.message && (
              <div
                className={`mb-6 p-5 rounded-xl border shadow-sm flex items-start gap-4 ${
                  apiResponse.type === "success"
                    ? "bg-green-50 border-green-200 text-green-900"
                    : "bg-red-50 border-red-200 text-red-900"
                }`}
              >
                {apiResponse.type === "success" ? (
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{apiResponse.message}</p>
                  {apiResponse.type === "error" && (
                    <p className="text-sm mt-1 opacity-90">
                      Please check your details and try again.
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === "form" && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
                    Create Your Account
                  </h2>
                  <p className="text-gray-600">
                    Sign up to start giving, tracking your contributions, and supporting faith initiatives securely.
                  </p>
                </div>

                <GlassCard className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-church-purple focus:border-church-purple ${
                              errors.firstName ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="e.g. John"
                          />
                        </div>
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Middle Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-church-purple focus:border-church-purple ${
                              errors.middleName ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="e.g. Michael (optional)"
                          />
                        </div>
                        {errors.middleName && <p className="text-red-500 text-sm mt-1">{errors.middleName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-church-purple focus:border-church-purple ${
                              errors.lastName ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="e.g. Mushi"
                          />
                        </div>
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phoneNo"
                            value={formData.phoneNo}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-church-purple focus:border-church-purple ${
                              errors.phoneNo ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="+255 712 345 678"
                          />
                        </div>
                        {errors.phoneNo && <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-church-purple focus:border-church-purple ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="you@example.com"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <input type="hidden" name="role" value="USER" />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-church-purple focus:border-church-purple ${
                            errors.password ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Create a secure password"
                        />
                      </div>
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-church-purple focus:border-church-purple ${
                            errors.confirmPassword ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Confirm your password"
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-church-purple hover:bg-church-purple/90 text-white py-3 text-base font-medium rounded-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Creating Account..." : (
                        <>
                          Create Account <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </GlassCard>

              
              </>
            )}

            {step === "otp" && (
              <GlassCard className="max-w-md mx-auto p-6 md:p-8 relative">
                <button
                  onClick={() => setStep("form")}
                  className="absolute left-5 top-5 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={24} />
                </button>

                <div className="text-center mb-8 pt-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
                    Verify Your Phone
                  </h2>
                  <p className="text-gray-600">
                    Enter the 6-digit code sent to{" "}
                    <span className="font-semibold text-church-purple">
                      {formData.phoneNo || "your phone number"}
                    </span>
                  </p>
                </div>

                <div className="flex justify-center gap-3 md:gap-4 mb-8">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputsRef.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      className={`w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-purple ${
                        otpError ? "border-red-500" : "border-gray-300 focus:border-church-purple"
                      }`}
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="text-red-600 text-center font-medium mb-6">{otpError}</p>
                )}

                <Button
                  onClick={() => handleVerifyOtp(otp.join(""))}
                  disabled={verifying || !otp.every(Boolean)}
                  className="w-full bg-church-purple hover:bg-church-purple/90 text-white py-3 text-base font-medium rounded-lg mb-4"
                >
                  {verifying ? "Verifying..." : "Verify OTP"}
                </Button>

                <div className="text-center">
                  <button
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                    className={`text-church-purple text-sm font-medium ${
                      resendTimer > 0 ? "opacity-60 cursor-not-allowed" : "hover:underline"
                    }`}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>
              </GlassCard>
            )}

            {step === "success" && (
              <GlassCard className="max-w-lg mx-auto text-center p-8 md:p-10">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Thank You!
                </h2>

                <p className="text-xl text-gray-700 mb-6">
                  Your account has been successfully created and verified.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                  <p className="text-gray-800 text-lg font-medium mb-4">
                    Please download the <span className="text-church-purple">Sadaka Plus</span> mobile app to continue.
                  </p>

                  <p className="text-gray-600 mb-6">
                    Log in using your phone number / email and the password you just set.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-900 text-base font-medium"
                    >
                      Google Play
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-900 text-base font-medium"
                    >
                      App Store
                    </a>
                  </div>
                </div>

                <Button
                  asChild
                  className="bg-church-purple hover:bg-church-purple/90 text-white px-10 py-4 text-base rounded-lg"
                >
                  <Link to="/login">Go to Login</Link>
                </Button>
              </GlassCard>
            )}
          </div>
        </div>
      </section>

      {/* CTA - reduced padding */}
      <section className="bg-gradient-church text-white py-10 md:py-12">
        <div className="page-container px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Ready to Give with Joy?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-5 max-w-2xl mx-auto">
            Join thousands of believers using Sadaka Plus to support churches and causes transparently and securely.
          </p>
          <Button asChild className="glass-button-dark text-base font-medium px-8 py-3">
            <a href="/about">Learn More About Sadaka Plus</a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default JoinUsPage;