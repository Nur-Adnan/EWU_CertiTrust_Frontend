import { useState } from "react";
import PageTitle from "@/components/PageTitle";
import Sidebar from "../components/SidebarExamController";
import Profile from "./profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, User, LogOut } from "lucide-react";
import Welcome from "./Welcome";
import StudentListPage from "./StudentList";
import FacultyListPage from "./FacultyList";
import GradeApproval from "./GradeApproval";
import useAuth from "./../hooks/useAuth.js";

const ExamControllerDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Dashboard");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { profile, user } = useAuth();

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 ">
        <PageTitle title="Exam Controller Dashboard" className="text-2xl" />
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="John Doe"
                  />
                  <AvatarFallback>
                    {profile?.name?.split(" ").map((n: any) => n[0]).join("").toUpperCase() || ""}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 hidden sm:inline-block">{profile?.name}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{profile?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setIsProfileOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1 mt-6">
        <div className="">
          <Sidebar onSelectSection={setSelectedSection} />
        </div>
        <div className="flex flex-col gap-5 w-full text-left">
          {selectedSection === "Dashboard" && (
            <div className="pl-12 mt-12">
              <Welcome
                title="Welcome to the Dashboard"
                description="Manage exam schedules, oversee student assessments, and ensure academic integrity."
              />
            </div>
          )}
          {selectedSection === "Student List" && (
            <div className="pl-12 mt-12">
              <StudentListPage />
            </div>
          )}
          {selectedSection === "Faculty List" && (
            <div className="pl-12 mt-12">
              <FacultyListPage />
            </div>
          )}
          {selectedSection === "Grade Approval" && (
            <div className="pl-12 mt-12">
              <GradeApproval />
            </div>
          )}
        </div>
      </div>
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="w-full sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[1000px] h-[90vh] sm:h-auto overflow-auto">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-2xl font-semibold">
                User Profile
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                View and edit your profile information
              </DialogDescription>
            </div>
          </div>
          <div className="px-2 sm:px-4 md:px-6">
            <Profile />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamControllerDashboard;
