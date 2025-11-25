import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { customFetch } from '../../api/base';
import { baseURL, CLOUDFLARE_SITE_KEY } from '../../api/urls';
import { toast } from 'react-toastify';


const ForgotPasswordPage = () => {
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);

    useEffect(() => {
        // Load Cloudflare Turnstile script
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        // Setup callback for captcha
        window.onTurnstileSuccess = function(token) {
            setCaptchaToken(token);
        };

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
            delete window.onTurnstileSuccess;
        };
    }, []);

    const onSubmit = async (data) => {
        if (!captchaToken) {
            toast.error('Please complete the captcha verification');
            return;
        }

        setLoading(true);
        const response = await customFetch(baseURL+"/forgot-password", "POST", {
            ...data,
            captcha_token: captchaToken
        });
        setLoading(false);

        if (response && response.success) {
            toast.success(response.message || 'Password reset link sent successfully!');
            setMessage(response.message);
        } else if (response && response.error) {
            toast.error(response.error || 'Failed to send reset link');
        }

        // Reset captcha
        if (window.turnstile) {
            window.turnstile.reset();
        }
        setCaptchaToken(null);
    };

    return (
        <div
        className="tw-bg-cover tw-bg-center tw-h-screen tw-flex tw-items-center tw-justify-center"
        style={{ backgroundImage: "url('/image-1@2x.png')" }}
      >
            <form onSubmit={handleSubmit(onSubmit)} className="tw-bg-white tw-p-8 tw-rounded tw-shadow-md tw-w-full tw-max-w-sm">
                <img
                    src="/images/tiet_logo.png"
                    alt="TIETLogo"
                    className="tw-mx-auto tw-mb-4 tw-w-24 sm:tw-w-20 xs:tw-w-16"
                />
                <h2 className="tw-text-xl tw-font-semibold tw-mb-4 tw-text-center">Forgot Password</h2>
                <div className="tw-mb-4">
                    <label htmlFor="email" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                        Email
                    </label>
                    <input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded"
                    />
                </div>
                
                <div className="tw-flex tw-justify-center tw-my-4">
                    <div 
                        className="cf-turnstile" 
                        data-sitekey={CLOUDFLARE_SITE_KEY}
                        data-callback="onTurnstileSuccess"
                        data-theme="light"
                    ></div>
                </div>

                <button
                    type="submit"
                    className="tw-w-full tw-bg-[#932f2f] tw-text-white tw-py-2 tw-rounded hover:tw-bg-[#7a2626]"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                {message && (
                    <div className="tw-mt-4 tw-p-3 tw-bg-green-50 tw-border tw-border-green-200 tw-rounded">
                        <p className="tw-text-sm tw-text-green-800 tw-text-center">{message}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
