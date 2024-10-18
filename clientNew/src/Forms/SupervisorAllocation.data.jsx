export default [
    {
      label: "Date of Submission",
      name: "dateOfSubmission",
      placeholder: "Date of Submission",
      type: "date",
      className: "tw-col-span-full",
    },
    {
      label: "Role Number",
      name: "roleNumber",
      placeholder: "Enter your role number",
      type: "text",
    },
    {
      label: "Name",
      name: "name",
      placeholder: "Enter your full name",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter your email address",
      type: "email",
    },
    {
      label: "Mobile Number",
      name: "mobileNumber",
      placeholder: "Enter your mobile number",
      type: "tel",
    },
    {
      select: (register) => (
        <div className="tw-flex tw-flex-col tw-gap-y-0.5 tw-col-span-full">
          <label className="tw-font-bold" htmlFor="researchArea1">
            Broad Areas of Research
          </label>
          
          {[1, 2, 3].map((num) => (
            <select
              key={`researchArea${num}`}
              id={`researchArea${num}`}
              className="tw-rounded-md tw-p-2 tw-border-2 tw-border-gray-400 tw-w-full tw-max-w-lg tw-mt-2"
              {...register(`researchArea${num}`)}
            >
              <option value="">Select Research Area {num}</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
            </select>
          ))}
        </div>
      ),
    },
    {
      select: (register) => (
        <div className="tw-flex tw-flex-col tw-gap-y-0.5 tw-col-span-full">
          <label className="tw-font-bold" htmlFor="supervisor1">
            Tentative Name of Supervisor
          </label>
          {/* {[1, 2, 3, 4, 5, 6].map((num) => (
            <select
              key={`supervisor${num}`}
              id={`supervisor${num}`}
              className="tw-rounded-md tw-p-2 tw-border-2 tw-border-gray-400 tw-w-full tw-max-w-lg tw-mt-2"
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
          ))}*/}
        </div>
      ),
    },
  ];