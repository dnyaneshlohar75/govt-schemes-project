import { create } from "zustand";

const useOtpStore = create((set) => ({
  countryCode: "+91",
  mobile: "",
  otp: "",
  showOtp: false,
  resendEnabled: false,
  loading: false,
  alert: "",
  setCountryCode: (val) => set({ countryCode: val }),
  setMobile: (val) => set({ mobile: val }),
  setOtp: (val) => set({ otp: val }),
 
  setShowOtp: (val) => set({ showOtp: val }),
  setResendEnabled: (val) => set({ resendEnabled: val }),
  setLoading: (val) => set({ loading: val }),
  setAlert: (val) => set({ alert: val }),
  resetOtpState: () =>
    set({
      otp: "",
      showOtp: false,
      resendEnabled: false,
      loading: false,
      alert: "",
    }),
}));

export default useOtpStore;
