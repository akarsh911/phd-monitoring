import React, { useEffect, useState } from "react";
import GridContainer from "../fields/GridContainer";
import { useLoading } from "../../../context/LoadingContext";
import DropdownField from "../fields/DropdownField";
import { baseURL } from "../../../api/urls";
import { customFetch } from "../../../api/base";
import DateField from "../fields/DateField";
import TimeField from "../fields/TimeField";
import InputField from "../fields/InputField";
import { generateReportPeriods } from "../../../utils/semester";
import CustomButton from "../fields/CustomButton";
import { toast } from "react-toastify";

const SchedulePresentation = ({ close }) => {
  const { setLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false);
  const [students, setStudents] = useState([]);
  const [body, setBody] = useState({});
  const [reportPeriods, setReportPeriods] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const url = `${baseURL}/students`;
        const data = await customFetch(url, "GET");

        if (data && data.success && Array.isArray(data.response)) {
          const formattedStudents = data.response.map((student) => ({
            ...student,
            value: student.roll_no,
            title: student.name,
          }));
          setStudents(formattedStudents);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoaded(true);
        setLoading(false);
      }
    };

    const periods = generateReportPeriods(1, 1, true);
    const formattedPeriods = periods.map((period) => ({
      value: period,
      title: period,
    }));
    setReportPeriods(formattedPeriods);

    fetchStudents();
  }, [setLoading]);

  const schedule = () => {
    const raw = body.guest_emails_raw || "";

    if (raw) {
      const emails = raw.split(",").map((email) => email.trim());
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const invalidEmails = emails.filter((email) => !emailRegex.test(email));

      if (invalidEmails.length > 0) {
        toast.error("Invalid email(s): " + invalidEmails.join(", "));
        return;
      } else {
        body.guest_emails = emails;
      }
    }

    setLoading(true);
    customFetch(`${baseURL}/presentation/`, "POST", body)
      .then((data) => {
        if (data?.success) {
          toast.success("Presentation Scheduled");
          if (close) close();
        }
      })
      .catch((error) => {
        toast.error("Error in scheduling presentation: " + error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {isLoaded && (
        <>
          <GridContainer
            elements={[
              <DropdownField
                label="Student"
                options={students}
                onChange={(value) =>
                  setBody((prev) => ({ ...prev, student_id: value }))
                }
              />,
            ]}
            space={2}
          />
          <GridContainer
            elements={[
              <DropdownField
                label="Period of Report"
                options={reportPeriods}
                onChange={(value) =>
                  setBody((prev) => ({ ...prev, period_of_report: value }))
                }
              />,
            ]}
            space={2}
          />
          <GridContainer
            elements={[
              <DateField
                label="Date"
                onChange={(value) =>
                  setBody((prev) => ({ ...prev, date: value }))
                }
              />,
              <TimeField
                label="Time"
                onChange={(value) =>
                  setBody((prev) => ({ ...prev, time: value }))
                }
              />,
            ]}
          />
          <GridContainer
            elements={[
              <InputField
                label="Additional Guest Emails (comma separated)"
                onChange={(value) =>
                  setBody((prev) => ({ ...prev, guest_emails_raw: value }))
                }
              />,
            ]}
            space={3}
          />
          <GridContainer
            elements={[<></>, <></>, <CustomButton text="Schedule" onClick={schedule} />]}
          />
        </>
      )}
    </>
  );
};

export default SchedulePresentation;
