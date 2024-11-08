import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, GraduationCap, Calculator } from "lucide-react";

type Grade = "A" | "B" | "C" | "D" | "F";
type Semester = "Fall 2023" | "Spring 2024" | "Summer 2024" | "All";

interface CourseGrade {
  id: string;
  semester: Semester;
  courseName: string;
  courseCode: string;
  grade: Grade;
}

const initialGrades: CourseGrade[] = [
  {
    id: "1",
    semester: "Fall 2023",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    grade: "A",
  },
  {
    id: "2",
    semester: "Fall 2023",
    courseName: "Calculus I",
    courseCode: "MATH101",
    grade: "B",
  },
  {
    id: "3",
    semester: "Spring 2024",
    courseName: "Data Structures",
    courseCode: "CS201",
    grade: "A",
  },
  {
    id: "4",
    semester: "Spring 2024",
    courseName: "Linear Algebra",
    courseCode: "MATH201",
    grade: "B",
  },
  {
    id: "5",
    semester: "Summer 2024",
    courseName: "Algorithms",
    courseCode: "CS301",
    grade: "A",
  },
  {
    id: "6",
    semester: "Summer 2024",
    courseName: "Physics I",
    courseCode: "PHY101",
    grade: "C",
  },
];

const gradePoints: Record<Grade, number> = {
  A: 4.0,
  B: 3.0,
  C: 2.0,
  D: 1.0,
  F: 0.0,
};

export default function GradeHistory() {
  const [semesterFilter, setSemesterFilter] = useState<Semester>("All");

  const filteredGrades = useMemo(() => {
    return semesterFilter === "All"
      ? initialGrades
      : initialGrades.filter((grade) => grade.semester === semesterFilter);
  }, [semesterFilter]);

  const calculateGPA = (grades: CourseGrade[]): number => {
    const totalPoints = grades.reduce(
      (sum, grade) => sum + gradePoints[grade.grade],
      0
    );
    return totalPoints / grades.length;
  };

  const overallGPA = useMemo(() => calculateGPA(initialGrades), []);
  const filteredGPA = useMemo(
    () => calculateGPA(filteredGrades),
    [filteredGrades]
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-left">
          Grade History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="font-semibold">Overall GPA:</span>
              <span className="text-lg font-bold">{overallGPA.toFixed(2)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Select
                value={semesterFilter}
                onValueChange={(value: Semester) => setSemesterFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Semesters</SelectItem>
                  <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                  <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                  <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {semesterFilter !== "All" && (
            <div className="flex items-center space-x-2 justify-end">
              <Calculator className="h-5 w-5 text-primary" />
              <span className="font-semibold">Semester GPA:</span>
              <span className="text-lg font-bold">
                {filteredGPA.toFixed(2)}
              </span>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Semester</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell>{grade.semester}</TableCell>
                    <TableCell>{grade.courseName}</TableCell>
                    <TableCell>{grade.courseCode}</TableCell>
                    <TableCell className="font-semibold">
                      {grade.grade}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredGrades.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No grades available for the selected semester.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
