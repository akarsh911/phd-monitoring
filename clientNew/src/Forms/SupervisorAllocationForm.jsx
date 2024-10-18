import { useForm } from "react-hook-form";
import inputFields from "./SupervisorAllocation.data.jsx";

// Simple InputLabel component
const InputLabel = ({ label, name, placeholder, type, className, register }) => (
  <div className={`tw-flex tw-flex-col tw-gap-y-0.5 ${className}`}>
    <label className="tw-font-bold" htmlFor={name}>
      {label}
    </label>
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      className="tw-rounded-md tw-p-2 tw-border-2 tw-border-gray-400 tw-w-full tw-max-w-xs"
      {...register(name)}
    />
  </div>
);

const SupervisorAllocationForm = () => {
  const { register, handleSubmit } = useForm();

  const handleViewStatus = () => {
    // Implement view status functionality
    console.log("View status clicked");
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Implement form submission logic here
  };

  return (
    <>
      <section className="tw-m-5 tw-flex tw-justify-between">
        <h1 className="tw-text-center tw-font-bold tw-text-2xl tw-p-3">
          Supervisor Allocation Form
        </h1>
        <button
          className="tw-p-2 tw-bg-white tw-text-black tw-rounded-md tw-shadow-md tw-border-2 tw-border-gray-400 hover:tw-bg-gray-500 hover:tw-text-white tw-duration-300"
          onClick={handleViewStatus}
        >
          View Status
        </button>
      </section>

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

        {/* Modify the 6 Select inputs for tentative names of supervisors */}
        <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-col-span-full">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="tw-flex tw-flex-col">
              {/* <label className="tw-font-bold" htmlFor={`supervisor${num}`}>
                Tentative Supervisor {num}
              </label> */}
              <select
                id={`supervisor${num}`}
                className="tw-rounded-md tw-p-2 tw-border-2 tw-border-gray-400 tw-w-full"
                {...register(`supervisor${num}`)}
              >
                <option value="">Select Supervisor {num}</option>
                <option value="Dr. Smith">Dr. Smith</option>
                <option value="Prof. Johnson">Prof. Johnson</option>
                <option value="Dr. Williams">Dr. Williams</option>
                <option value="Prof. Brown">Prof. Brown</option>
                <option value="Dr. Jones">Dr. Jones</option>
                <option value="Prof. Davis">Prof. Davis</option>
              </select>
            </div>
          ))}
        </div>
      </form>

      <button
        className="tw-p-3 tw-bg-[#B22626] tw-text-white tw-rounded-md tw-shadow-md hover:tw-bg-gray-800 tw-duration-300"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </>
  );
};

export default SupervisorAllocationForm;
