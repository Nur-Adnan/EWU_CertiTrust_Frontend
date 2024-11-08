import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, Blocks, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import useAuth from "./../hooks/useAuth.js";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [dashboardRoute, setDashboardRoute] = useState("/");

  const { isConnected, account, role } = useAuth();
  console.log(isConnected);
  console.log(account);

  // const handleLoginClick = () => {
  //   navigate("/login");
  // };

  const handleDashboardRoute = () => {
    console.log(role)
    switch (role) {
      case "admin":
        setDashboardRoute("/university-dashboard");
        break;
      case "student":
        setDashboardRoute("/student-dashboard");
        break;
      case "faculty":
        setDashboardRoute("/faculty-dashboard");
        break;
      case "examController":
        setDashboardRoute("/exam-controller-dashboard");
        break;
      default:
        setDashboardRoute("/");
    }
  }
  
  useEffect(() => {
    if(role){
      handleDashboardRoute();
    }
  }, [role])

  console.log(dashboardRoute)

  return (
    <nav className="flex items-center justify-between py-4 bg-background">
      <Link className="flex items-center justify-center gap-2 mt-1" to="/">
        <Blocks className="h-6 w-6" />
        <span className="text-2xl font-semibold italic tracking-wider flex items-center">
          CertiTrust
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-4">
        {!isConnected ? (
          <>
            <Button variant="outline" onClick={() => navigate("/login")}>
              <User className="mr-2 h-4 w-4" /> Login
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => navigate(dashboardRoute)}
            >
              <User className="mr-2 h-4 w-4" />{" "}
              {account?.slice(0, 6) + "..." + account?.slice(37, 42)}
            </Button>
          </>
        )}
        <Button>
          <Search className="mr-2 h-4 w-4" /> Verify Search
        </Button>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col space-y-4 mt-4">
            {!isConnected ? (
              <>
                <Button variant="outline" onClick={() => navigate("/login")}>
                  <User className="mr-2 h-4 w-4" /> Login
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate(dashboardRoute)}
                >
                  <User className="mr-2 h-4 w-4" /> {account}
                </Button>
              </>
            )}
            <Button onClick={() => setIsOpen(false)}>
              <Search className="mr-2 h-4 w-4" /> Verify Search
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}