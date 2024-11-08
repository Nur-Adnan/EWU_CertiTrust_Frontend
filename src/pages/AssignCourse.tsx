import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import api from "@/api";

export default function Component() {
  const [courseId, setCourseID] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [maxStudent, setMaxStudent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages
    const response = await api.post("/assignCourse/assign-courses", {
      courseId,
      sectionId,
      publicAddress,
      maxStudent,
    });
    setMessage(response.data.message);
    // Reset form after submission
    setCourseID("");
    setSectionId("");
    setPublicAddress("");
    setMaxStudent("");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Assign Course</CardTitle>
        <CardDescription>
          Enter the details of the course to be added to the blockchain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="courseID">Course ID</Label>
            <Input
              id="courseID"
              placeholder="Enter course name"
              value={courseId}
              onChange={(e) => setCourseID(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseId">Section ID</Label>
            <Input
              id="courseId"
              placeholder="Enter course ID"
              value={sectionId}
              onChange={(e) => setSectionId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="credit">Public Address</Label>
            <Input
              id="credit"
              type="number"
              placeholder="Enter credit hours"
              value={publicAddress}
              onChange={(e) => setPublicAddress(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="credit">Max Student</Label>
            <Input
              id="credit"
              type="number"
              placeholder="Enter credit hours"
              value={maxStudent}
              onChange={(e) => setMaxStudent(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Course
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          This information will be securely stored on the blockchain.
        </p>
      </CardFooter>
    </Card>
  );
}
