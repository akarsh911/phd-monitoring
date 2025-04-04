import React, { useState } from "react";
import { useLoading } from "../../../context/LoadingContext";
import { baseURL } from "../../../api/urls";
import { customFetch } from "../../../api/base";
import CustomButton from "../fields/CustomButton";
import { toast } from "react-toastify";
import { read, utils } from "xlsx";

const BulkSchedulePresentation = () => {
  const { setLoading } = useLoading();
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const headers = ["Student's Roll Number", "Period of Report", "Date", "Time", "Venue"];
      const expectedColumns = headers.length;
      const rawData = utils.sheet_to_json(sheet, { header: 1 });

      const parsedData = [];
      let invalidRows = 0;

      rawData.forEach((rowArr, index) => {
        if (!rowArr || rowArr.every(cell => !cell || cell.toString().trim() === "")) return;

        if (rowArr.length !== expectedColumns) {
          invalidRows++;
          console.warn(`Invalid column count in row ${index + 1}`, rowArr);
          return;
        }

        const rowObj = {};
        headers.forEach((header, i) => {
          rowObj[header] = rowArr[i] || "";
        });

        let rawDate = rowObj["Date"];
        if (typeof rawDate === "number") {
          const date = new Date((rawDate - 25569) * 86400 * 1000);
          rowObj["Date"] = formatDate(date);
        } else {
          const parsed = new Date(rawDate);
          rowObj["Date"] = !isNaN(parsed) ? formatDate(parsed) : "Invalid Date";
        }

        parsedData.push(rowObj);
      });

      if (invalidRows > 0) {
        toast.warn(`${invalidRows} row(s) ignored due to invalid number of columns`);
      }

      setCsvData(parsedData);
    };

    reader.readAsArrayBuffer(file);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const confirmBulkSchedule = () => {
    setLoading(true);
    customFetch(baseURL + "/bulk-schedule/", "POST", { schedules: csvData })
      .then((data) => {
        if (data && data.success) {
          toast.success("Bulk Presentations Scheduled");
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error in scheduling bulk presentations " + error);
        setLoading(false);
      });
  };

  return (
    <>
      <input type="file" accept=".csv" onChange={handleFileUpload} style={{ marginTop: "10px" }} />
      {csvData.length > 0 && (
        <>
          <div style={{ overflowX: "auto", marginTop: "16px" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              backgroundColor: "#fff",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}>
              <thead style={{ backgroundColor: "#f5f5f5", position: "sticky", top: 0, zIndex: 1 }}>
                <tr>
                  {Object.keys(csvData[0]).map((key) => (
                    <th key={key} style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      fontWeight: "600",
                      textAlign: "left",
                      color: "#333"
                    }}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, index) => (
                  <tr key={index}
                    style={{
                      borderBottom: "1px solid #eee",
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eaeaea")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fff" : "#f9f9f9")}
                  >
                    {Object.values(row).map((value, idx) => (
                      <td key={idx} style={{ padding: "10px", border: "1px solid #ddd", color: "#444" }}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <CustomButton text="Confirm Bulk Schedule" onClick={confirmBulkSchedule} />
          </div>
        </>
      )}
    </>
  );
};

export default BulkSchedulePresentation;
