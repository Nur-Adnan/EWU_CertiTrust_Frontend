import { useState, FC } from "react";
import { Nav } from "./ui/nav";
import { ChevronRight, Home, BarChart, Award } from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";

interface SidebarProps {
  onSelectSection: (section: string) => void;
}

const SideNavbar: FC<SidebarProps> = ({ onSelectSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

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
            href: "/student-dashboard",
            icon: Home,
            variant: "default",
            onClick: () => onSelectSection("Dashboard"),
          },
          {
            title: "Grade History",
            href: "/student-dashboard/grade-history",
            icon: BarChart,
            variant: "ghost",
            onClick: () => onSelectSection("Grade History"),
          },
          {
            title: "Generate Certificate",
            href: "/student-dashboard/generate-certificate",
            icon: Award,
            variant: "ghost",
            onClick: () => onSelectSection("Generate Certificate"),
          },
        ]}
      />
    </div>
  );
};

export default SideNavbar;