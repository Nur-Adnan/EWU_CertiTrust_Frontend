import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import axios from "@/api";
import { Button } from "@/components/ui/button";
import { Trash2, Pause, Play } from "lucide-react";

type Props = {};
type Student = {
  name: string;
  email: string;
  address: string;
  enrollmentHistory: string;
  earnedCredits: number;
  isApproved: boolean;
};

export default function StudentListPage({}: Props) {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/students/studentlist");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch student data.");
        console.error("Error fetching student data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleDelete = (student: Student) => {
    // Implement delete logic here
    console.log("Delete student:", student);
  };

  const handlePause = async (student: Student) => {
    try {
      const updatedStatus = !student.isApproved;
      // Send a PATCH request to update the 'isApproved' status on the backend
      await axios.patch(`/students/student/${student.email}`, {
        isApproved: updatedStatus,
      });

      // Update the local state with the new approval status
      setData((prevData) =>
        prevData.map((item) =>
          item.email === student.email
            ? { ...item, isApproved: updatedStatus }
            : item
        )
      );
    } catch (error) {
      console.error("Error toggling approval status:", error);
    }
  };

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <img
              className="h-10 w-10 rounded-full"
              src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
                "name"
              )}`}
              alt="student avatar"
            />
            <p>{row.getValue("name")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "enrollmentHistory",
      header: "Enrollment History",
    },
    {
      accessorKey: "earnedCredits",
      header: "Earned Credits",
    },

    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const student = row.original;
        const isApproved = student.isApproved;

        return (
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(student)}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Delete</span>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePause(student)}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">{isApproved ? "Pause" : "Play"}</span>
              {isApproved ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "isApproved",
      header: "Status",
      cell: ({ row }) => {
        const isApproved = row.getValue("isApproved") as boolean;
        return (
          <Button
            variant="outline"
            size="sm"
            className={`font-semibold capitalize ${
              isApproved
                ? "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800"
                : "bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
            }`}
          >
            {isApproved ? "Approved" : "Not Approved"}
          </Button>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Student List" className="text-left" />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
