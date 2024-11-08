import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import Sidebar from "../components/Sidebar";
import { ClipboardList, GraduationCap, Hourglass, Users } from "lucide-react";
import Card, { CardContent } from "@/components/Card";
import StudentCard from "@/components/StudentCard";
import FacultyListPage from "./FacultyList";
import ExamControllerListPage from "./ExamControllerList";
import StudentListPage from "./StudentList";
import EmailCreation from "./EmailCreation";
import GeneratedCertificate from "./GeneratedCertificate";
import GradeHistoryPage from "./GradeRecords";
import PendingApprovals from "./PendingApprovals";
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
import { magic } from "./../utils/Magic.js";
import { useNavigate } from "react-router-dom";
import useAuth from "./../hooks/useAuth.js";
import AddCourse from "./AddCourse.js";
import AssignCourse from "./AssignCourse.js";

const cardData = [
  {
    label: "Faculty List",
    amount: "120 Faculties",
    description: "5 new additions this month",
    icon: Users,
  },
  {
    label: "Exam Controller List",
    amount: "8 Exam Controllers",
    description: "1 new controller added",
    icon: ClipboardList,
  },
  {
    label: "Student List",
    amount: "2,350 Students",
    description: "+150 new enrollments",
    icon: GraduationCap,
  },
  {
    label: "Pending Approvals",
    amount: "27 Requests",
    description: "15 new approvals needed",
    icon: Hourglass,
  },
];

const studentData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    address: "123 Maple Ave, Springfield",
    enrollmentHistory: ["Math 101", "Physics 201", "Chemistry 301"],
    earnedCredits: 36,
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    address: "456 Oak St, Lakeside",
    enrollmentHistory: ["Biology 101", "History 202", "Math 301"],
    earnedCredits: 42,
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    address: "789 Pine Rd, Hilltown",
    enrollmentHistory: ["Art 101", "Literature 202"],
    earnedCredits: 24,
  },
  {
    name: "William Kim",
    email: "will.kim@email.com",
    address: "101 Birch Ln, River City",
    enrollmentHistory: ["Computer Science 101", "Math 202"],
    earnedCredits: 30,
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    address: "202 Cedar Blvd, Bayview",
    enrollmentHistory: ["Physics 101", "Chemistry 102", "Math 301"],
    earnedCredits: 48,
  },
];

const UniversityDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Dashboard");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const nagvigate = useNavigate();
  const { user, profile } = useAuth();

  const handleLogOut = async () => {
    await magic.user.logout();
    console.log(await magic.user.isLoggedIn());
    nagvigate("/");
  };

  useEffect(() => {
    async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      console.log(isLoggedIn);
      if (!isLoggedIn) {
        nagvigate("/");
      }
    };
  }, []);

  console.log(profile);

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col">
      <header className="flex justify-between items-center py-4">
        <PageTitle title="University Dashboard" className="text-2xl" />
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
                    {profile?.name
                      ?.split(" ")
                      .map((n: any) => n[0])
                      .join("")
                      .toUpperCase() || ""}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 hidden sm:inline-block">
                  {profile?.name}
                </span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {profile?.name}
                  </p>
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
              <DropdownMenuItem onClick={handleLogOut}>
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
            <>
              <section className="pl-12 grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 h-auto">
                {cardData.map((d, i) => (
                  <Card
                    key={i}
                    amount={d.amount}
                    description={d.description}
                    icon={d.icon}
                    label={d.label}
                    onClick={() => setSelectedSection(d.label)}
                  />
                ))}
              </section>
              <section className="grid grid-cols-1 gap-4 transition-all pl-12">
                <CardContent className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                  <section className="mb-4">
                    <p className="text-lg font-semibold text-blue-600 ">
                      Recent Student List
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Displaying recently enrolled students and their credit
                      information.
                    </p>
                  </section>
                  {studentData.map((d, i) => (
                    <StudentCard
                      key={i}
                      name={d.name}
                      email={d.email}
                      address={d.address}
                      enrollmentHistory={d.enrollmentHistory}
                      earnedCredits={d.earnedCredits}
                    />
                  ))}
                </CardContent>
              </section>
            </>
          )}
          {selectedSection === "Faculty List" && (
            <div className="pl-12">
              <FacultyListPage />
            </div>
          )}
          {selectedSection === "Exam Controller List" && (
            <div className="pl-12">
              <ExamControllerListPage />
            </div>
          )}
          {selectedSection === "Student List" && (
            <div className="pl-12">
              <StudentListPage />
            </div>
          )}
          {selectedSection === "Pending Approvals" && (
            <div className="pl-12">
              <PendingApprovals />
            </div>
          )}
          {selectedSection === "Email Creation" && (
            <div className="pl-12 mt-12">
              <EmailCreation />
            </div>
          )}
          {selectedSection === "Generated Certificate" && (
            <div className="pl-12 mt-12">
              <GeneratedCertificate />
            </div>
          )}
          {selectedSection === "Grade Records" && (
            <div className="pl-12 mt-12">
              <GradeHistoryPage />
            </div>
          )}
          {selectedSection === "Add Course" && (
            <div className="pl-12 mt-12">
              <AddCourse />
            </div>
          )}
          {selectedSection === "Assign Course" && (
            <div className="pl-12 mt-12">
              <AssignCourse />
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

export default UniversityDashboard;
