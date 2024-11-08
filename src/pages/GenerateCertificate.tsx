"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, Download } from "lucide-react";

const REQUIRED_CREDITS = 140;

export default function GradeCertificate() {
  const [earnedCredits, setEarnedCredits] = useState(135);
  const [isGenerating, setIsGenerating] = useState(false);

  const progress = (earnedCredits / REQUIRED_CREDITS) * 100;
  const remainingCredits = Math.max(0, REQUIRED_CREDITS - earnedCredits);
  const isEligible = earnedCredits >= REQUIRED_CREDITS;

  const handleGenerateCertificate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      alert("Certificate generated and ready for download!");
    }, 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
          <Award className="mr-2 h-6 w-6 text-yellow-500" />
          Grade Certificate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Credit Progress</h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-5 w-5 text-blue-500" />
            <span className="text-2xl font-bold">{earnedCredits}</span>
            <span className="text-gray-500">/ {REQUIRED_CREDITS} credits</span>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </div>

        {!isEligible && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-700">
              You need {remainingCredits} more credit
              {remainingCredits !== 1 ? "s" : ""} to be eligible for the Grade
              Certificate. Keep up the good work!
            </p>
          </div>
        )}

        {isEligible && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700">
              Congratulations! You have earned enough credits to generate your
              Grade Certificate.
            </p>
          </div>
        )}

        <Button
          onClick={handleGenerateCertificate}
          disabled={!isEligible || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>Generating...</>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Generate Certificate
            </>
          )}
        </Button>

        <p className="text-sm text-gray-500 text-center">
          The Grade Certificate is an official document certifying your academic
          achievements. It will be available for download once generated.
        </p>
      </CardContent>
    </Card>
  );
}
