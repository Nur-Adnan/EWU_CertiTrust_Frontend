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
import { UserPlus, GraduationCap, ClipboardList, Users } from "lucide-react";
import api from "@/api"; 
import useWallet from "./../hooks/useWallet.js"

export default function EmailCreation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState(""); // New state for department
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getRoleIcon = () => {
    switch (role) {
      case "student":
        return <GraduationCap className="h-6 w-6 text-blue-500" />;
      case "examController":
        return <ClipboardList className="h-6 w-6 text-green-500" />;
      case "faculty":
        return <Users className="h-6 w-6 text-purple-500" />;
      default:
        return <UserPlus className="h-6 w-6 text-gray-400" />;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/users/create", {
        name,
        email,
        role,
        ...(role === "faculty" && { department }), // Include department only if role is faculty
      });
      setMessage(response.data.message);
      setName("");
      setEmail("");
      setRole("");
      setDepartment("");
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-left ">
            Create New User
          </CardTitle>
          <CardDescription>
            Select a role to add a new student, faculty member, or exam
            controller to the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(value) => setRole(value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="examController">
                    Exam Controller
                  </SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conditionally render the department select field if role is faculty */}
            {role === "faculty" && (
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={setDepartment}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="BBA">BBA</SelectItem>
                    <SelectItem value="EEE">EEE</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Economics">Economics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Psychology">Psychology</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Political Science">
                      Political Science
                    </SelectItem>
                    <SelectItem value="Sociology">Sociology</SelectItem>
                    <SelectItem value="Philosophy">Philosophy</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                    <SelectItem value="Architecture">Architecture</SelectItem>
                    <SelectItem value="Mechanical Engineering">
                      Mechanical Engineering
                    </SelectItem>
                    <SelectItem value="Civil Engineering">
                      Civil Engineering
                    </SelectItem>
                    <SelectItem value="Business Administration">
                      Business Administration
                    </SelectItem>
                    <SelectItem value="Graphic Design">
                      Graphic Design
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {getRoleIcon()}
              <span className="ml-2">
                {loading
                  ? "Creating..."
                  : `Create ${role
                    ? role.charAt(0).toUpperCase() + role.slice(1)
                    : "User"
                  }`}
              </span>
            </Button>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${message.includes("Failed") ? "text-red-500" : "text-green-500"
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
