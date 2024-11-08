"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

export default function VerifySearch() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [verificationResult, setVerificationResult] = useState({
    name: "",
    date: "",
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating verification process
    // In a real application, you would make an API call here
    setTimeout(() => {
      setVerificationResult({
        name: "Nur Adnan Chowdhury Anik", // This would come from your API
        date: "2023-08-11", // This would come from your API
      });
      setIsDialogOpen(true);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto py-12 items-center justify-center mt-16">
      <div className="container mx-auto mt-10 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Verify Certificate</h1>
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Certificate Verification Result</DialogTitle>
            <DialogDescription>
              The certificate has been verified and issued to{" "}
              <span className="font-semibold">{verificationResult.name}</span>{" "}
              on{" "}
              <span className="font-semibold">
                {new Date(verificationResult.date).toLocaleDateString()}
              </span>
              .
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <CheckCircle
              className="h-16 w-16 text-green-500"
              aria-label="Verification successful"
            />
          </DialogFooter>
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="w-full mt-4"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
