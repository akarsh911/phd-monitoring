import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const stageOptions = [
  "Guide Allotment",
  "IRB",
  "Coursework",
  "DC",
  "Synopsis",
  "Thesis",
];

export default function StudentFormList() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await axios.get("/student-form/index");
      setForms(res.data.forms || []);
    } catch (err) {
      toast.error("Failed to fetch forms");
    } finally {
      setLoading(false);
    }
  };

  const updateStage = async (formId, newStage) => {
    try {
      await axios.post("/student-form/updateFormLevel", {
        form_id: formId,
        new_stage: newStage,
      });

      setForms((prev) =>
        prev.map((form) =>
          form.id === formId ? { ...form, current_stage: newStage } : form
        )
      );

      toast.success("Stage updated successfully");
    } catch (err) {
      toast.error("Failed to update stage");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading forms...</p>;

  if (forms.length === 0) return <p className="text-center mt-4">No forms found.</p>;

  return (
    <div className="grid gap-4 p-4">
      {forms.map((form) => (
        <Card key={form.id} className="shadow-md rounded-2xl">
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{form.student_name}</p>
                <p className="text-sm text-gray-600">Roll No: {form.roll_number}</p>
                <p className="text-sm text-gray-600">Status: {form.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Stage:</label>
                <Select
                  value={form.current_stage}
                  onValueChange={(value) => updateStage(form.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stageOptions.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
