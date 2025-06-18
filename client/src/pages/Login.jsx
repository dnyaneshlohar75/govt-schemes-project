import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../components/ui/input-otp";
import { useNavigate } from "react-router-dom";
import useOtpStore from '../store/useotpStore';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
const Login = () => {
  const navigate = useNavigate();
  const {
  //  countryCode,
    aadharCardNumber,
    setAadharCardNumber,
    isOTPSent,
    showOtp,
    setShowOtp,
    otp,
    setOtp,
    // setCountryCode,
    resendEnabled,
    setResendEnabled,
    timeLeft,
    setTimeLeft,  
    setIsOTPSent,
    loading,
    setLoading,
    alert,
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
 const handleSendOtp = async () => {
  if (!aadharCardNumber) {
    setAlert('Please enter your Aadhar card number');
    return;
  }

  setLoading(true);
  try {
    const response = await fetch('http://localhost:5000/api/auth/otp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        aadharCardNumber,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      setIsOTPSent(true);
      setShowOtp(true);
      setAlert(data.message || 'OTP sent successfully');
    } else {
      setAlert(data.message || 'Failed to send OTP');
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    setAlert('An error occurred while sending OTP');
  }
  setLoading(false);
};


  const handleVerifyOtp = async () => {
  if (!otp) {
    setAlert('Please enter the OTP');
    return;
  }

  setLoading(true);
  try {
    const response = await fetch('http://localhost:5000/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aadharCardNumber, otp }),
    });

    const data = await response.json();
console.log({data});

if (data.token) {
      setAlert('Login successful');
      document.cookie = `token=${data.token}`;
      navigate('/dashboard');
    } else {
      setAlert(data.message || 'Invalid OTP');
    }
  } catch (err) {
    console.error(err);
    setAlert('Error verifying OTP');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-4">
      <div className="flex flex-col md:flex-row lg:flex-row bg-white rounded-3xl w-full max-w-7xl h-[700px] md:h-[600px] lg:h-[700px] justify-center text-center shadow-lg overflow-hidden">

        <div className="flex w-full lg:w-[80%] justify-center items-center p-6   border-gray-400">
          <img src="/Images/image.png" className="w-[100%] h-full md:h-[50%] lg:h-[50%]" alt="Scheme.png"/>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[80%] mb-20 lg:p-8 p-6 flex flex-col justify-center  gap-6">
          {alert && (
            <div className="text-red-800 border  border-red-400 px-4 py-2 rounded text-sm bg-red-100">
              {alert}
            </div>
          )}

          <h2 className="text-xl lg:text-3xl  font-bold text-center lg:text-left">
            Apply for Schemes or Check Eligibility
          </h2>

          <p className="text-gray-600 lg:text-xl text-sm sm:text-base text-center lg:text-left">
            Use your Aadhar-linked mobile number to proceed.
          </p>

          <form onSubmit={showOtp ? handleVerifyOtp : handleSendOtp} className="flex flex-col gap-5">
            {/* Mobile Field */}
            <div className="flex flex-row gap-6">
              {/* <div className="flex flex-col w-[18%] md:w-[16%] lg:w-[15%] justify-center items-center text-center ">
                <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-4">Country</Label>
                <Select  className="w-[60px]"
  value={countryCode}
  onValueChange={(val) => setCountryCode(val)}
  disabled={showOtp || loading}
>
  <SelectTrigger className=" text-xs">
    <SelectValue placeholder="Select Country" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="+91">🇮🇳 +91</SelectItem>
    <SelectItem value="+1">🇺🇸 +1</SelectItem>
    <SelectItem value="+44">🇬🇧 +44</SelectItem>
  </SelectContent>
</Select>

              </div> */}

              <div className="flex flex-col  w-full ">
                <Label htmlFor="Aadhar" className="text-sm font-medium text-gray-700 mb-3 flex lg:text-xl">Aadhar Number</Label>
                <Input
                  className="h-10"
                  id="Aadhar"
                  type="text"
                  placeholder="Enter Aadhar Card Number"
                  maxLength={12}
                  value={aadharCardNumber}
                  disabled={showOtp || loading}
                  onChange={(e) => setAadharCardNumber(e.target.value)}
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
                        setMobile(mobile);
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
                {showOtp ? "Verifying OTP..." : isOTPSent}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600"
            disabled={loading}
            >
            {loading ?'Please wait...':showOtp?'Verify OTP':'Send OTP'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
