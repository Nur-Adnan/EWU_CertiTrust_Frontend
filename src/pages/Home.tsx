"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className=" py-16 md:py-24 px-4  flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
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
              <Button
                size="lg"
                className="group bg-blue-600 hover:bg-blue-700 text-white"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-xl animate-pulse" />
            <motion.div
              className="relative rounded-3xl border bg-white/70 p-8 shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
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
            </motion.div>
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
    <motion.div
      className="flex flex-col items-center space-y-3 rounded-xl bg-white p-6 text-center shadow transition-all hover:shadow-md"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon className="h-12 w-12 text-blue-600" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}

function BlockchainAnimation() {
  return (
    <div className="relative h-full w-full min-h-[200px] flex items-center justify-center overflow-hidden">
      <motion.div
        className="h-24 w-24 rounded-full bg-blue-100"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute h-16 w-16 rounded-full bg-blue-300"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 0.3, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute h-8 w-8 rounded-full bg-blue-600"
        animate={{
          scale: [1, 0.8, 1],
          opacity: [1, 0.6, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
