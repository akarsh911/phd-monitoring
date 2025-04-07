import React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { customFetch } from "../../api/base";
import { baseURL } from "../../api/urls";
import { toast } from "react-toastify";
// import { resetPasswordAPI } from "../../api/resetPassword"; // You need to implement this

const ResetPasswordPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { register, handleSubmit, watch } = useForm();

 
  const onSubmit = async (data) => {
    setLoading(true);
    const response = await customFetch(baseURL + "/reset-password", "POST", {
        token,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
    
    if (!response) {
      toast.error("Something went wrong. Please try again later.");
    } else {
      toast.success("Password reset successful!");
      window.location.href = "/login";
    }
  
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="tw-bg-cover tw-bg-center tw-h-screen tw-flex tw-items-center tw-justify-center"
           style={{ backgroundImage: "url('/image-1@2x.png')" }}>
        <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-w-full tw-max-w-md">
          <img src="/images/tiet_logo.png" alt="TIETLogo"
               className="tw-mx-auto tw-mb-4 tw-w-24"/>
          <h2 className="tw-text-xl tw-font-bold tw-text-center tw-mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="tw-space-y-4">
            <input {...register("email")} type="email" placeholder="Email" className="tw-w-full tw-p-2 tw-border tw-rounded" />
            <input {...register("password")} type="password" placeholder="New Password" className="tw-w-full tw-p-2 tw-border tw-rounded" />
            <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="tw-w-full tw-p-2 tw-border tw-rounded" />
            <button type="submit" className="tw-bg-[#932f2f] tw-text-white tw-py-2 tw-rounded tw-w-full hover:tw-bg-[#7a2626]">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
