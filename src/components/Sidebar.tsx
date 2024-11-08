import { useState, FC } from "react";
import { Nav } from "./ui/nav";
import {
  LayoutDashboard,
  UsersRound,
  ChevronRight,
  BookOpen,
  Award,
  Mail,
  Hourglass,
  GraduationCap,
  ClipboardList,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import useAuth from "../hooks/useAuth.js"; // Import useAuth

interface SidebarProps {
  onSelectSection: (section: string) => void;
}

const SideNavbar: FC<SidebarProps> = ({ onSelectSection }) => {
  const { role } = useAuth(); // Get isAdmin status
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  if (role !== 'admin') return null;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-20 h-full">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="w-10 h-10 rounded-full p-0 flex items-center justify-center"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/university-dashboard",
            icon: LayoutDashboard,
            variant: "default",
            onClick: () => onSelectSection("Dashboard"),
          },
          {
            title: "Faculty List",
            href: "/university-dashboard/faculty-list",
            icon: UsersRound,
            variant: "ghost",
            onClick: () => onSelectSection("Faculty List"),
          },
          {
            title: "Exam Controller List",
            href: "/university-dashboard/exam-controller-list",
            icon: ClipboardList,
            variant: "ghost",
            onClick: () => onSelectSection("Exam Controller List"),
          },
          {
            title: "Student List",
            href: "/university-dashboard/student-list",
            icon: GraduationCap,
            variant: "ghost",
            onClick: () => onSelectSection("Student List"),
          },
          {
            title: "Pending Approvals",
            href: "/university-dashboard/pending-approvals",
            icon: Hourglass,
            variant: "ghost",
            onClick: () => onSelectSection("Pending Approvals"),
          },
          {
            title: "Email Creation",
            href: "/university-dashboard/email-creation",
            icon: Mail,
            variant: "ghost",
            onClick: () => onSelectSection("Email Creation"),
          },
          {
            title: "Generated Certificate",
            href: "/university-dashboard/generated-certificate",
            icon: Award,
            variant: "ghost",
            onClick: () => onSelectSection("Generated Certificate"),
          },
          {
            title: "Grade Records",
            href: "/university-dashboard/grade-records",
            icon: BookOpen,
            variant: "ghost",
            onClick: () => onSelectSection("Grade Records"),
          },
        ]}
      />
    </div>
  );
};

export default SideNavbar;
