import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { customFetch } from '../../api/base';
import { baseURL } from '../../api/urls';
import { toast } from 'react-toastify';


const ForgotPasswordPage = () => {
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        const response = await customFetch(baseURL+"/forgot-password", "POST", data);
       setLoading(false);

    };

    return (
        <div
        className="tw-bg-cover tw-bg-center tw-h-screen tw-flex tw-items-center tw-justify-center"
        style={{ backgroundImage: "url('/image-1@2x.png')" }}
      >
        <div className="tw-h-screen tw-flex tw-items-center tw-justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="tw-bg-white tw-p-8 tw-rounded tw-shadow-md tw-w-full tw-max-w-sm">
                <h2 className="tw-text-xl tw-font-semibold tw-mb-4">Forgot Password</h2>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="tw-w-full tw-px-4 tw-py-2 tw-mb-4 tw-border tw-rounded"
                />
                <button
                    type="submit"
                    className="tw-w-full tw-bg-[#932f2f] tw-text-white tw-py-2 tw-rounded hover:tw-bg-[#7a2626]"
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                {message && <p className="tw-mt-4 tw-text-sm tw-text-center">{message}</p>}
            </form>
        </div>
        </div>
    );
};

export default ForgotPasswordPage;
