import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginAPI } from "../../api/login";
import Loader from "../../components/loader/loader";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    // Define the onSubmit function
    const onSubmit = async (data) => {
        console.log(data); // Log the submitted data to the console
        setLoading(true); // Set loading state to true

        let success = await loginAPI(data.email, data.password); // Call the API
        if (success) {
            const onLogin = new URLSearchParams(window.location.search).get('onLogin');
            if (onLogin) {
                window.location.href = onLogin; // Redirect if onLogin query param is present
            } else {
                window.location.href = '/home'; // Redirect to homepage
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
                            type="password"
                            placeholder=""
                            className="tw-peer tw-bg-opacity-50 tw-px-4 tw-pt-6 tw-pb-2.5 tw-w-full tw-rounded tw-border tw-border-slate-600 tw-text-black focus:tw-ring-2 focus:tw-ring-white tw-outline-none invalid:tw-border-red-500"
                        />
                        <label
                            htmlFor="password"
                            className="tw-absolute tw-text-slate-500 tw-left-3 tw-duration-300 tw-scale-75 tw-top-1 peer-placeholder-shown:tw-scale-100 peer-placeholder-shown:tw-top-4 peer-focus:tw-left-3 peer-focus:tw-scale-75 peer-focus:tw-top-1"
                        >
                            Password
                        </label>
                    </div>
                    <div className="tw-flex tw-items-center tw-justify-between">
                        <Link
                            to="/"
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
