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
import useWallet from "./../hooks/useWallet"
import api from "@/api"

export default function Component() {
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [credit, setCredit] = useState("");
  const { certiTrust } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const tx = await certiTrust.addCourse(courseId, courseName, credit, {
        gasPrice: 0, gasLimit: 300000
      })

      const response = await tx.wait();
      console.log(response)
      
      const dbResponse = await api.post("/addCourse/courses", {
        courseName, courseId, credit
      })

      setCourseId('')
      setCourseName('')
      setCredit('')

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Course Information</CardTitle>
        <CardDescription>
          Enter the details of the course to be added to the blockchain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="courseName">Course Name</Label>
            <Input
              id="courseName"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseId">Course ID</Label>
            <Input
              id="courseId"
              placeholder="Enter course ID"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="credit">Credit</Label>
            <Input
              id="credit"
              type="number"
              placeholder="Enter credit hours"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? "Adding Course" : "Submit Course"}
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
