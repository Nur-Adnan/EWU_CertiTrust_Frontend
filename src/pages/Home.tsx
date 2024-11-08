import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, CheckCircle } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="bg-white py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 items-center space-x-10">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-left">
              Verify Certifications with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-left">
                Blockchain
              </span>
            </h1>
            <p className="text-xl text-gray-600 sm:text-2xl text-left">
              Secure, immutable, and instantly verifiable certifications powered
              by cutting-edge blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl blur-xl" />
            <div className="relative rounded-3xl border bg-white/50 p-6 shadow-lg backdrop-blur-sm">
              <div className="grid gap-6 sm:grid-cols-2">
                {mounted && (
                  <>
                    <CertificateCard
                      icon={Shield}
                      title="Secure"
                      description="Tamper-proof records"
                    />
                    <CertificateCard
                      icon={Award}
                      title="Verifiable"
                      description="Instant validation"
                    />
                    <CertificateCard
                      icon={CheckCircle}
                      title="Trusted"
                      description="Decentralized system"
                    />
                    <BlockchainAnimation />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CertificateCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function CertificateCard({
  icon: Icon,
  title,
  description,
}: CertificateCardProps) {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-xl bg-white p-4 text-center shadow transition-all hover:shadow-md">
      <Icon className="h-10 w-10 text-blue-600" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function BlockchainAnimation() {
  return (
    <div className="relative h-full w-full min-h-[200px] flex items-center justify-center">
      <div className="h-20 w-20 rounded-full bg-blue-100 animate-pulse" />
      <div className="absolute h-12 w-12 rounded-full bg-blue-300 animate-ping" />
      <div className="absolute h-6 w-6 rounded-full bg-blue-600" />
    </div>
  );
}
