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
import { CheckCircle, XCircle, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/api";
import useWallet from "./../hooks/useWallet"

type Role = "faculty" | "student" | "examController";
type Status = "pending" | "approved" | "rejected";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  isApproved: boolean;
  publicAddress: string;
  studentId?: string;
  enrolledProgram?: string;
  maxCredit?: number;
}

function ApprovalSheet({ user }: { user: User }) {
  const [studentId, setStudentId] = useState(user.studentId || "");
  const [enrolledProgram, setEnrolledProgram] = useState(
    user.enrolledProgram || ""
  );
  const [maxCredit, setMaxCredit] = useState(user.maxCredit || 0);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="publicAddress" className="block font-semibold mb-1">
          Public Address
        </label>
        <Input
          id="publicAddress"
          defaultValue={user.publicAddress}
          className="w-full"
        />
      </div>
      {user.role === "student" && (
        <>
          <div>
            <label htmlFor="studentId" className="block font-semibold mb-1">
              Student ID
            </label>
            <Input
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="studentId" className="block font-semibold mb-1">
              Student Name
            </label>
            <Input
              id="studentName"
              defaultValue={user.name}
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="enrolledProgram"
              className="block font-semibold mb-1"
            >
              Enrolled Program
            </label>
            <Input
              id="enrolledProgram"
              value={enrolledProgram}
              onChange={(e) => setEnrolledProgram(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="maxCredit" className="block font-semibold mb-1">
              Max Credit
            </label>
            <Input
              id="maxCredit"
              type="number"
              value={maxCredit}
              onChange={(e) => setMaxCredit(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function PendingApprovals() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<Role | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [studentId, setStudentId] = useState("");
  const [enrolledProgram, setEnrolledProgram] = useState("");
  const [maxCredit, setMaxCredit] = useState(0);

  // blockchain call
  const { certiTrust } = useWallet();

  useEffect(() => {
    const fetchPendingApprovals = async () => {
      try {
        const response = await api.get("/users/pending-approvals");
        const usersWithStatus = response.data.map((user: User) => ({
          ...user,
          status: user.isApproved ? "approved" : "pending",
        }));
        setUsers(usersWithStatus);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchPendingApprovals();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    try {
      if (action === "approve") {
        const response = await api.patch(`/users/${id}/approve`);
        if (response.status === 200) {
          setUsers(
            users.map((user) =>
              user.id === id ? { ...user, status: "approved" } : user
            )
          );
        }
      } else if (action === "reject") {
        const response = await api.delete(`/users/${id}`);
        if (response.status === 200) {
          setUsers(users.filter((user) => user.id !== id));
        }
      }
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
    }
  };

  const handleApproval = async () => {
    if (!selectedUser || selectedUser.role !== "student") return;

    try {
      const tx = await certiTrust.addStudent(
        selectedUser.publicAddress,
        studentId,
        selectedUser.name,
        enrolledProgram,
        maxCredit,
        { gasLimit: 3000000, gasPrice: 0 }
      );
      await tx.wait();
      handleAction(selectedUser.id, "approve");
      setSelectedUser(null);
    } catch (error) {
      console.error("Error approving student:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === "all" || user.role === filter;
    const matchesStatus = user.status === "pending"; // Show only pending users
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-left">
            Pending Approvals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Select
                value={filter}
                onValueChange={(value: Role | "all") => setFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="examController">
                    Exam Controller
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>Public Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => setSelectedUser(user)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Approval Sheet</DialogTitle>
                            </DialogHeader>
                            {selectedUser && (
                              <ApprovalSheet
                                user={selectedUser}
                                setStudentId={setStudentId}
                                setEnrolledProgram={setEnrolledProgram}
                                setMaxCredit={setMaxCredit}
                              />
                            )}
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedUser(null)}
                              >
                                Cancel
                              </Button>
                              <Button size="sm" onClick={handleApproval}>
                                Confirm Approval
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleAction(user.id, "reject")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{user.publicAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
