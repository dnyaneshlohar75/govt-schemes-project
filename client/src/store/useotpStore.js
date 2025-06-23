import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useOtpStore = create(
  persist(
    (set) => ({
      countryCode: '+91',
      aadharCardNumber: '',
       otp: '',
       timeLeft: 300,
      isOTPSent: false,
      showOtp: false,
      resendEnabled: false,
      loading: false,
      alert: '',

      setCountryCode: (val) => set({ countryCode: val }),
      setAadharCardNumber: (val) => set({ aadharCardNumber: val }),
      setOtp: (val) => set({ otp: val }),
      setIsOTPSent: (val) => set({ isOTPSent: val }),
      setTimeLeft: (val) =>
    set((state) => ({
      timeLeft: typeof val === "function" ? val(state.timeLeft) : Number(val),
    })),
      setShowOtp: (val) => set({ showOtp: val }),
      setResendEnabled: (val) => set({ resendEnabled: val }),
      setLoading: (val) => set({ loading: val }),
      setAlert: (val) => set({ alert: val }),

      resetOtpState: () =>
        set({
          otp: '',
          showOtp: false,
          resendEnabled: false,
          loading: false,
          alert: '',
        }),
    }),
    {
      name: 'otp-store',
    }
  )
);

export default useOtpStore;
