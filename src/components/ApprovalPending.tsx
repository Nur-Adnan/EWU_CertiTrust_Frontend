import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ApprovalPending() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Account Approval Pending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="default">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Waiting for Approval</AlertTitle>
            <AlertDescription>
              Your university has not yet approved your account to access the
              dashboard.
            </AlertDescription>
          </Alert>
          <p className="text-center text-gray-600">
            Please be patient while we process your account. This usually takes
            1-2 business days.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Check Status
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
