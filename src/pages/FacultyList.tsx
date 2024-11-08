"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import api from "@/api";
import { Button } from "@/components/ui/button";
import { Trash2, Pause, Play } from "lucide-react";

type Props = {};
type Faculty = {
  name: string;
  email: string;
  faculty: string;
  address: string;
  isApproved: boolean;
};

export default function FacultyListPage({}: Props) {
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await api.get("/faculty/facultylist");
        setFacultyData(response.data);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFacultyData();
  }, []);

  const handleDelete = (faculty: Faculty) => {
    // Implement delete logic here
    console.log("Delete faculty:", faculty);
  };

  const handlePause = async (faculty: Faculty) => {
    try {
      const updatedStatus = !faculty.isApproved;
      // Send a PATCH request to update the 'isApproved' status on the backend
      await api.patch(`/faculty/facult/${faculty.email}`, {
        isApproved: updatedStatus,
      });

      // Update the local state with the new approval status
      setFacultyData((prevData) =>
        prevData.map((item) =>
          item.email === faculty.email
            ? { ...item, isApproved: updatedStatus }
            : item
        )
      );
    } catch (error) {
      console.error("Error toggling approval status:", error);
    }
  };

  const columns: ColumnDef<Faculty>[] = [
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
              alt="faculty avatar"
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
      accessorKey: "department",
      header: "Faculty",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const faculty = row.original;
        const isApproved = faculty.isApproved;

        return (
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(faculty)}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Delete</span>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePause(faculty)}
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
        const isApproved = row.getValue("isApproved");
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
      <PageTitle title="Faculty List" className="text-left" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={facultyData} />
      )}
    </div>
  );
}
