import { useForm } from "react-hook-form";
import InputLabel from "./Components/InputLabel.jsx";
import inputFields from "./InputField.data.jsx";

const ConstituteOfInstitutionalResearchBoard = () => {
	const { register, handleSubmit } = useForm();

	const handleViewStatus = () => {};
	const handleSendToSupevisor = () => {};
	const onSubmit = (data) => {};

	return (
		<>
			<h1 className="tw-text-center tw-font-bold tw-text-2xl tw-p-3">
				Constitute of Institutional Research Board
			</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="tw-grid tw-grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] tw-gap-5 tw-m-5 tw-p-5 tw-border tw-border-gray-300 tw-rounded-md tw-bg-gray-100 tw-items-end"
			>
				{inputFields.map((inputField, index) => {
					if (inputField?.select) {
						return inputField.select(register);
					} else {
						return (
							<InputLabel
								key={index * 23}
								{...inputField}
								register={register}
							/>
						);
					}
				})}
			</form>
			<section className="tw-m-5 tw-flex tw-justify-between">
				<button
					className="tw-p-3 tw-bg-[#B22626] tw-text-white tw-rounded-md tw-shadow-md hover:tw-bg-gray-800 tw-duration-300"
					onClick={handleSendToSupevisor}
				>
					Send to Supervisor
				</button>
				<button
					className="tw-p-2 tw-bg-white tw-text-black tw-rounded-md tw-shadow-md tw-border-2 tw-border-gray-400 hover:tw-bg-gray-500 hover:tw-text-white tw-duration-300"
					onClick={handleViewStatus}
				>
					View Status
				</button>
			</section>
		</>
	);
};

export default ConstituteOfInstitutionalResearchBoard;
