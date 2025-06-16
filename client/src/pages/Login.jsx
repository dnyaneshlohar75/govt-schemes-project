// Login.jsx
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../components/ui/input-otp";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";

// ✅ Zustand Store (in same file)
const useOtpStore = create((set) => ({
  countryCode: "+91",
  mobile: "",
  otp: "",
  timeLeft: 300,
  showOtp: false,
  resendEnabled: false,
  loading: false,
  alert: "",
  setCountryCode: (val) => set({ countryCode: val }),
  setMobile: (val) => set({ mobile: val }),
  setOtp: (val) => set({ otp: val }),
  setTimeLeft: (val) => set({ timeLeft: Number(val) }),
  setShowOtp: (val) => set({ showOtp: val }),
  setResendEnabled: (val) => set({ resendEnabled: val }),
  setLoading: (val) => set({ loading: val }),
  setAlert: (val) => set({ alert: val }),
  resetOtpState: () =>
    set({
      otp: "",
      showOtp: false,
      timeLeft: Number(300),
      resendEnabled: false,
      loading: false,
      alert: "",
    }),
}));

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300);
  const {
    countryCode,
    mobile,
    otp,

    resendEnabled,
    showOtp,
    loading,
    alert,
    setCountryCode,
    setMobile,
    setOtp,
    setShowOtp,
    setResendEnabled,
    setLoading,
    setAlert,
    resetOtpState,
  } = useOtpStore();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    if (showOtp) {
      setTimeLeft(300);
      setResendEnabled(false);
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setResendEnabled(true);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showOtp]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const isPhone = /^\d{10}$/.test(mobile);
    if (!isPhone) {
      setAlert("Enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowOtp(true);
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setAlert("Enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
      navigate('/user');
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-4">
      <div className="flex flex-col md:flex-row lg:flex-row bg-white rounded-3xl w-full max-w-[1000px] h-[700px] md:h-[600px] lg:h-[500px] justify-center text-center shadow-lg overflow-hidden">

        <div className="flex w-full lg:w-1/2 justify-center items-center p-6 border-b-4 md:border-r-2 md:border-b-0 lg:border-b-0 lg:border-r-2 border-gray-400">
          <img src="/Images/image.png" className="w-fit" alt="login illustration" />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center gap-6">
          {alert && (
            <div className="text-red-800 border border-red-400 px-4 py-2 rounded text-sm bg-red-100">
              {alert}
            </div>
          )}

          <h2 className="text-xl sm:text-2xl font-bold text-center lg:text-left">
            Apply for Schemes or Check Eligibility
          </h2>

          <p className="text-gray-600 text-sm sm:text-base text-center lg:text-left">
            Use your Aadhar-linked mobile number to proceed.
          </p>

          <form onSubmit={showOtp ? handleVerifyOtp : handleSendOtp} className="flex flex-col gap-5">
            {/* Mobile Field */}
            <div className="flex gap-4">
              <div className="flex flex-col w-[18%] md:w-[16%] lg:w-[15%] justify-center items-center text-center">
                <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-2">Country</Label>
                <select
                  id="country"
                  className="w-full px-[0.1px] py-3 text-center border rounded text-xs"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  disabled={showOtp || loading}
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
              </div>

              <div className="flex flex-col w-full sm:w-[65%]">
                <Label htmlFor="mobile" className="text-sm font-medium text-gray-700 mb-3">Mobile Number</Label>
                <Input
                  className="h-10"
                  id="mobile"
                  type="text"
                  placeholder="Enter Aadhar linked mobile number"
                  maxLength={10}
                  value={mobile}
                  disabled={showOtp || loading}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>

            {/* OTP Input */}
            {showOtp && (
              <div className="flex flex-col items-center gap-2">
                <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <div className="text-sm text-gray-600 text-center">
                  {resendEnabled ? (
                    <button
                      onClick={() => {
                        resetOtpState();
                        setMobile("");
                      }}
                      className="text-blue-600 underline"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <p>Time left: {formatTime(timeLeft)}</p>
                  )}
                </div>
              </div>
            )}

            {/* Loader */}
            {loading && (
              <div className="text-blue-600 text-sm text-center">
                {showOtp ? "Verifying OTP..." : "Sending OTP..."}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600"
              disabled={loading || (showOtp ? otp.length !== 6 : mobile.length !== 10)}
            >
              {showOtp ? "Login" : "Send OTP"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
