export default [
	{
		label: "Date",
		name: "date",
		placeholder: "Date of Creation of Form",
		type: "date",
		className: "tw-col-span-full",
	},
	{
		label: "Roll Number",
		name: "rollNumber",
		placeholder: "Eg 1024XXXXX",
		type: "number",
	},
	{
		label: "Name",
		name: "name",
		placeholder: "Full Name",
		type: "text",
	},
	{
		select: (register) => (
			<div className={`tw-flex tw-flex-col tw-gap-y-0.5`}>
				<label
					className="tw-font-bold"
					htmlFor={"gender"}
				>
					Gender
				</label>
				<select
					id={"gender"}
					className="tw-rounded-md tw-p-2 tw-border-2 tw-border-gray-400 tw-w-full tw-max-w-xs"
					{...register("gender")}
				>
					<option value="">Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
			</div>
		),
	},
	{
		label: "Date of Admission",
		name: "dateOfAdmission",
		placeholder: "Date of Admission",
		type: "date",
	},
	{
		select: (register) => (
			<div className={`tw-flex tw-flex-col tw-gap-y-0.5`}>
				<label
					className="tw-font-bold"
					htmlFor={"department"}
				>
					Department
				</label>
				<select
					id={"department"}
					className="tw-rounded-md tw-p-2 tw-border-2 tw-border-gray-400 tw-w-full tw-max-w-xs"
					{...register("department")}
				>
					<option value="">Select Department</option>
					<option value="CSE">CSE</option>
					<option value="ECE">ECE</option>
					<option value="EEE">EEE</option>
					<option value="ME">ME</option>
					<option value="CE">CE</option>
					<option value="IT">IT</option>
					<option value="AE">AE</option>
					<option value="BT">BT</option>
					<option value="CHE">CHE</option>
					<option value="CST">CST</option>
					<option value="EP">EP</option>
					<option value="MME">MME</option>
					<option value="PIE">PIE</option>
					<option value="MATH">MATH</option>
				</select>
			</div>
		),
	},
	{
		label: "CGPA",
		name: "cgpa",
		placeholder: "Current CGPA",
		type: "number",
	},
	{
		select: (register) => (
			<div className="tw-flex tw-flex-col tw-gap-y-0.5 tw-col-span-full">
				<label
					className="tw-font-bold"
					htmlFor="chairmanBoardOfStudies"
				>
					Chairman, Board of Studies of the Concerned Department
				</label>
				<input
					type="text"
					id="chairmanBoardOfStudies"
					placeholder="Name"
					className="tw-rounded-md tw-p-2 tw-border-2 tw-border-gray-400 tw-w-full tw-max-w-lg"
					{...register("chairmanBoardOfStudies")}
				/>
			</div>
		),
	},
	{
		label: "Supervisor(s)",
		name: "supervisor",
		placeholder: "Supervisor Name",
		type: "text",
	},
	{
		name: "supervisor",
		placeholder: "Supervisor Name",
		type: "text",
	},
	{
		name: "supervisor",
		placeholder: "Supervisor Name",
		type: "text",
	},
];
