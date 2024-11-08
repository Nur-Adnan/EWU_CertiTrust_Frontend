"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { CheckCircle, XCircle, Search, Filter } from "lucide-react";
import api from "@/api"; // Your axios instance

type Grade =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-"
  | "F";
type Semester = "fall2023" | "spring2024" | "summer2024";

interface GradeEntry {
  id: string;
  studentId: string;
  courseCode: string;
  grade: Grade;
  semester: Semester;
  year: number;
  approved: boolean;
}

export default function GradeApproval() {
  const [grades, setGrades] = useState<GradeEntry[]>([]);
  const [semesterFilter, setSemesterFilter] = useState<Semester | "all">("all");
  const [search, setSearch] = useState("");

  const fetchPendingGrades = async () => {
    try {
      const response = await api.get("/grades/pending-approvals");
      setGrades(response.data);
    } catch (error) {
      console.error("Failed to fetch pending grades", error);
    }
  };

  useEffect(() => {
    fetchPendingGrades();
  }, []);

  const approveGrade = async (id: string) => {
    try {
      await api.patch(`/grades/${id}/approve`);
      setGrades(grades.filter((grade) => grade.id !== id));
    } catch (error) {
      console.error("Failed to approve grade", error);
    }
  };

  const rejectGrade = async (id: string) => {
    try {
      await api.delete(`/grades/${id}`);
      setGrades(grades.filter((grade) => grade.id !== id));
    } catch (error) {
      console.error("Failed to reject grade", error);
    }
  };

  const filteredGrades = grades.filter(
    (grade) =>
      (semesterFilter === "all" || grade.semester === semesterFilter) &&
      !grade.approved &&
      (grade.studentId.toLowerCase().includes(search.toLowerCase()) ||
        grade.courseCode.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-left">
            Grade Approval
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Select
                value={semesterFilter}
                onValueChange={(value: Semester | "all") =>
                  setSemesterFilter(value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  <SelectItem value="fall2023">Fall 2023</SelectItem>
                  <SelectItem value="spring2024">Spring 2024</SelectItem>
                  <SelectItem value="summer2024">Summer 2024</SelectItem>
                </SelectContent>
              </Select>
              <Filter className="text-gray-400" />
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by Student ID or Course"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 w-full sm:w-[300px]"
              />
            </div>
          </div>
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/6">Student ID</TableHead>
                  <TableHead className="w-1/6">Course Code</TableHead>
                  <TableHead className="w-1/6">Grade</TableHead>
                  <TableHead className="w-1/6">Semester</TableHead>
                  <TableHead className="w-1/6">Year</TableHead>
                  <TableHead className="w-1/6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell>{grade.studentId}</TableCell>
                    <TableCell>{grade.courseCode}</TableCell>
                    <TableCell>{grade.grade}</TableCell>
                    <TableCell>{grade.semester}</TableCell>
                    <TableCell>{grade.year}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => approveGrade(grade.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => rejectGrade(grade.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredGrades.length === 0 && (
            <div className="text-center text-gray-500 mt-6">
              No pending grades match your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
