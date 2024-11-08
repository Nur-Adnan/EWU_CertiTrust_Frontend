import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";
import api from "@/api"; // Importing the configured axios instance

export default function GradeSubmissionForm() {
  const [studentId, setStudentId] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [grade, setGrade] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const gradeData = { studentId, semester, year, courseCode, grade };

    try {
      const response = await api.post("/grades/submission", gradeData);

      if (response.status === 201) {
        setMessage("Grade submitted successfully!");
      }
    } catch (error) {
      setMessage("Failed to submit grade. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-left">
            Grade Submission
          </CardTitle>
          <CardDescription>
            Select a student and enter their grades for record-keeping.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                placeholder="Enter Student ID"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select value={semester} onValueChange={setSemester} required>
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fall2023">Fall</SelectItem>
                  <SelectItem value="spring2024">Spring</SelectItem>
                  <SelectItem value="summer2024">Summer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select value={year} onValueChange={setYear} required>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseCode">Course Code</Label>
              <Input
                id="courseCode"
                placeholder="Enter Course Code"
                required
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select value={grade} onValueChange={setGrade} required>
                <SelectTrigger id="grade">
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="C+">C+</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="C-">C-</SelectItem>
                  <SelectItem value="D+">D+</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="D-">D-</SelectItem>
                  <SelectItem value="F">F</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Submit Grade
            </Button>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
