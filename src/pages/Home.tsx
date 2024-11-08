import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Code2, Palette } from "lucide-react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="min-h-screen">
        <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-blue-950 via-blue-900 to-teal-800">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  Blockchain Certificate
                  <span className="block text-teal-400">
                    Verification System
                  </span>
                </h1>
                <p className="text-gray-300 max-w-lg">
                  Secure, transparent, and immutable certificate verification
                  powered by blockchain technology. Ensure the authenticity of
                  academic credentials instantly.
                </p>
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
                  Start Verifying Today
                </Button>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Team collaboration illustration"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        {/* <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600 mb-8">
              Trusted by leading institutions
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {["University 1", "College 2", "Institute 3", "Academy 4"].map(
                (partner) => (
                  <div
                    key={partner}
                    className="flex items-center justify-center"
                  >
                    <span className="text-gray-500 font-semibold">
                      {partner}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </section> */}

        {/* What We Do Section */}
        {/* <section id="what-we-do" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Palette className="w-12 h-12 mx-auto text-primary" />
                    <h3 className="text-xl font-semibold">
                      Certificate Issuance
                    </h3>
                    <p className="text-gray-500">
                      Securely issue digital certificates on the blockchain with
                      unique identifiers
                    </p>
                    <Link to="#" className="text-primary hover:underline block">
                      Learn more
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Monitor className="w-12 h-12 mx-auto text-primary" />
                    <h3 className="text-xl font-semibold">
                      Instant Verification
                    </h3>
                    <p className="text-gray-500">
                      Verify certificates instantly with our blockchain-powered
                      system
                    </p>
                    <Link to="#" className="text-primary hover:underline block">
                      Learn more
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Code2 className="w-12 h-12 mx-auto text-primary" />
                    <h3 className="text-xl font-semibold">Fraud Prevention</h3>
                    <p className="text-gray-500">
                      Eliminate certificate fraud with immutable blockchain
                      records
                    </p>
                    <Link to="#" className="text-primary hover:underline block">
                      Learn more
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}

        {/* Pricing Section */}
        {/* <section id="pricing" className="py-16 bg-blue-950 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-center mb-12 text-gray-300">
              Choose the plan that's right for your institution
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Basic",
                  price: "2500",
                  features: [
                    "Up to 1000 certificates/year",
                    "Basic API access",
                    "Email support",
                    "Basic analytics",
                  ],
                },
                {
                  name: "Professional",
                  price: "5000",
                  features: [
                    "Up to 5000 certificates/year",
                    "Advanced API access",
                    "Priority support",
                    "Advanced analytics",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "15000",
                  features: [
                    "Unlimited certificates",
                    "Custom API solutions",
                    "24/7 dedicated support",
                    "Custom features",
                  ],
                },
              ].map((plan) => (
                <Card key={plan.name} className="bg-white text-gray-900">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <div className="text-4xl font-bold">
                        ${plan.price}
                        <span className="text-base font-normal text-gray-500">
                          /month
                        </span>
                      </div>
                      <ul className="space-y-2 text-left">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <span className="mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full">Contact Us</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* Team Section */}
        {/* <section id="team" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "John Doe",
                  role: "Blockchain Lead",
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  name: "Jane Smith",
                  role: "Security Expert",
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  name: "Mike Johnson",
                  role: "Development Lead",
                  image: "/placeholder.svg?height=200&width=200",
                },
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Footer */}
        {/* <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">CertiChain</h3>
                <p className="text-sm">
                  Secure blockchain-based certificate verification for the
                  modern world
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li>Certificate Issuance</li>
                  <li>Verification System</li>
                  <li>API Access</li>
                  <li>Analytics</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>About Us</li>
                  <li>Contact</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-sm">
                  <li>Twitter</li>
                  <li>LinkedIn</li>
                  <li>GitHub</li>
                  <li>Discord</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              <p>© 2024 CertiChain. All rights reserved.</p>
            </div>
          </div>
        </footer> */}
      </div>
    </>
  );
};

export default Home;
