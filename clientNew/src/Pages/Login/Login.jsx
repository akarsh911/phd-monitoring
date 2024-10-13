import thaparBg from "./Assets/thaparPhotoBlurred.webp";
import TIETLogo from "./Assets/TIET-Logo.webp";
import googleIcon from "./Assets/googleFavicon.svg";
import { useForm } from "react-hook-form";

function Login() {
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => console.log(data);
	const handleGoogleSignIn = () => {};

	return (
		<>
			<img
				src={thaparBg}
				alt="thaparPhotoBlurred"
				draggable="false"
				onContextMenu={(e) => e.preventDefault()}
				className="tw-w-full tw-h-screen tw-object-cover tw-object-center tw-relative"
			/>
			<div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-screen tw-flex tw-items-center tw-justify-center">
				<div className="tw-bg-white tw-w-full tw-max-w-md tw-h-[75%] tw-flex tw-flex-col tw-justify-evenly tw-items-center max-lg:tw-rounded-lg lg:tw-rounded-tl-lg lg:tw-rounded-bl-lg">
					<img
						src={TIETLogo}
						alt="TIETLogo"
						draggable="false"
						onContextMenu={(e) => e.preventDefault()}
						className="tw-min-w-[125px] tw-max-w-[175px] tw-aspect-auto tw-pt-5"
					/>
					<div className="tw-max-w-2xl tw-min-w-[70%] tw-min-h-[60%] tw-max-h-[80%] tw-flex tw-flex-col tw-justify-between tw-items-center tw-pb-5">
						<div className="tw-text-[#525252] tw-font-[inter, sans-serif] tw-font-semibold tw-text-lg">
							Login to your Account
						</div>
						<button
							onClick={handleGoogleSignIn}
							className="tw-flex tw-justify-around tw-items-center tw-max-w-lg tw-border-2 tw-border-[#525252b0] tw-rounded-lg tw-gap-2 hover:tw-bg-gray-100 tw-duration-300"
						>
							<img
								src={googleIcon}
								alt="googleIcon"
								draggable="false"
								onContextMenu={(e) => e.preventDefault()}
								className="tw-w-6 tw-aspect-square tw-ml-3"
							/>
							<div className="tw-font-semibold tw-mr-2 tw-p-2">
								Continue with google
							</div>
						</button>
						<div className="tw-text-[#525252]">or Sign in with Email</div>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="tw-w-full tw-h-[63%] tw-flex tw-flex-col tw-justify-between tw-items-center"
						>
							<div className="tw-flex tw-flex-col tw-w-full tw-gap-y-1">
								<label htmlFor="email">Email</label>
								<input
									id="email"
									type="email"
									className="tw-w-full tw-p-2 tw-rounded-md tw-outline-none tw-border-2 tw-border-gray-400"
									{...register("email")}
								/>
							</div>
							<div className="tw-flex tw-flex-col tw-w-full tw-gap-y-1">
								<label htmlFor="password">Password</label>
								<input
									id="password"
									type="password"
									className="tw-w-full tw-p-2 tw-rounded-md tw-outline-none tw-border-2 tw-border-gray-400"
									{...register("password")}
								/>
							</div>
							<div className="tw-flex tw-justify-between tw-items-center tw-w-full">
								<div className="tw-flex tw-justify-between tw-items-center tw-gap-x-2">
									<input
										type="checkbox"
										id="rememberMe"
										className="tw-accent-[#932F2F] tw-cursor-pointer"
										{...register("rememberMe")}
									/>
									<label
										htmlFor="rememberMe"
										className="tw-text-xs"
									>
										Remember me
									</label>
								</div>
								<a
									href="/login"
									className="tw-text-xs tw-text-[#932F2F] hover:tw-underline"
								>
									Forgot Password?
								</a>
							</div>
							<button
								type="submit"
								className="tw-bg-[#932F2F] hover:tw-bg-[#812929] tw-duration-300 tw-w-10/12 tw-p-2 tw-rounded-md tw-text-white tw-font-semibold"
							>
								Login
							</button>
						</form>
					</div>
				</div>
				<div className="tw-hidden tw-bg-[#932F2F] lg:tw-flex tw-flex-col tw-justify-evenly tw-items-center tw-w-[92%] tw-max-w-md tw-h-[75%] tw-rounded-br-lg tw-rounded-tr-lg">
					<div className="tw-text-white tw-text-center ">
						<h1 className="tw-text-3xl tw-leading-loose">Welcome to</h1>
						<h2 className="tw-text-5xl tw-font-semibold">THAPAR</h2>
						<h2 className="tw-text-5xl tw-font-semibold">University</h2>
					</div>
					<div className="tw-w-4/5 tw-text-white">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
						dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex{" "}
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
