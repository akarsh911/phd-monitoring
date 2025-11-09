import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginAPI } from "../../api/login";
import Loader from "../../components/loader/loader";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  // Define the onSubmit function
  const onSubmit = async (data) => {
    console.log(data); // Log the submitted data to the console
    setLoading(true); // Set loading state to true

    let success = await loginAPI(data.email, data.password); // Call the API
    if (success) {
      const onLogin = new URLSearchParams(window.location.search).get(
        "onLogin"
      );
      if (onLogin) {
        window.location.href = onLogin; // Redirect if onLogin query param is present
      } else {
        window.location.href = "/home"; // Redirect to homepage
      }
    } else {
      setLoading(false); // Reset loading state if login fails
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div
        className="tw-bg-cover tw-bg-center tw-h-screen tw-flex tw-items-center tw-justify-center"
        style={{ backgroundImage: "url('/image-1@2x.png')" }}
      >
        <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-w-full tw-max-w-md sm:tw-p-6 sm:tw-max-w-sm xs:tw-p-4 xs:tw-max-w-xs">
          <img
            src="/images/tiet_logo.png"
            alt="TIETLogo"
            className="tw-mx-auto tw-mb-4 tw-w-24 sm:tw-w-20 xs:tw-w-16"
          />
          <div className="tw-flex tw-items-center tw-justify-center tw-mt-4">
            <span className="tw-border-t tw-border-gray-600 tw-flex-grow"></span>
            <span className="tw-px-4 tw-text-gray-700">{` Sign in with Email `}</span>
            <span className="tw-border-t tw-border-gray-600 tw-flex-grow"></span>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)} // Directly call the onSubmit
            className="tw-space-y-4 tw-mt-5"
          >
            <div className="tw-relative">
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder=""
                className="tw-peer tw-bg-opacity-50 tw-px-4 tw-pt-6 tw-pb-2.5 tw-w-full tw-rounded tw-border tw-border-slate-600 tw-text-black focus:tw-ring-2 focus:tw-ring-white tw-outline-none invalid:tw-border-red-500"
              />
              <label
                htmlFor="email"
                className="tw-absolute tw-text-slate-500 tw-left-3 tw-duration-300 tw-scale-75 tw-top-1 peer-placeholder-shown:tw-scale-100 peer-placeholder-shown:tw-top-4 peer-focus:tw-left-3 peer-focus:tw-scale-75 peer-focus:tw-top-1"
              >
                Email
              </label>
            </div>
            <div className="tw-relative">
              <input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder=""
                className="tw-peer tw-bg-opacity-50 tw-px-4 tw-pt-6 tw-pb-2.5 tw-pr-12 tw-w-full tw-rounded tw-border tw-border-slate-600 tw-text-black focus:tw-ring-2 focus:tw-ring-white tw-outline-none invalid:tw-border-red-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="tw-absolute tw-right-3 tw-top-1/2 tw-text-gray-600 hover:tw-text-gray-800 focus:tw-outline-none"
                style={{ transform: 'translateY(-50%)' }}
              >
                {showPassword ? (
                  // eye-off icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-7 1.05-2.1 2.6-3.92 4.45-5.18" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 1l22 22" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  // eye icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              <label
                htmlFor="password"
                className="tw-absolute tw-text-slate-500 tw-left-3 tw-duration-300 tw-scale-75 tw-top-1 peer-placeholder-shown:tw-scale-100 peer-placeholder-shown:tw-top-4 peer-focus:tw-left-3 peer-focus:tw-scale-75 peer-focus:tw-top-1"
              >
                Password
              </label>
            </div>
            <div className="tw-flex tw-items-center tw-justify-between">
              <Link
                to="/forgot-password"
                className="tw-text-[#932f2f] hover:tw-underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit" // Make sure the button submits the form
              className="tw-bg-[#932f2f] tw-w-4/5 tw-mx-auto tw-block tw-text-center tw-text-white tw-py-2 tw-rounded-md tw-font-bold hover:tw-bg-[#7a2626] tw-duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
