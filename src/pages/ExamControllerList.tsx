"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import api from "@/api";
import { Button } from "@/components/ui/button";
import { Trash2, Pause, Play } from "lucide-react";

type Props = {};

type ExamController = {
  name: string;
  email: string;
  address: string;
  isApproved: boolean;
};

export default function ExamControllerListPage({}: Props) {
  const [data, setData] = useState<ExamController[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamControllerData = async () => {
      try {
        const response = await api.get("/examController/examcontrollerlist");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching exam controller data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamControllerData();
  }, []);

  const handleDelete = async (examController: ExamController) => {
    try {
      // Send a DELETE request to the backend
      const res = await api.delete(
        `/examController/examxamcontroller/${examController.email}`
      );
      console.log("Request to delete email:", res);

      // Update the frontend state to remove the deleted controller
      setData((prevData) =>
        prevData.filter(
          (controller) => controller.email !== examController.email
        )
      );

      console.log("Exam controller deleted successfully:", examController);
    } catch (error) {
      console.error("Error deleting exam controller:", error);
      alert("Failed to delete the exam controller. Please try again.");
    }
  };

  const handleToggleApproval = async (examController: ExamController) => {
    try {
      const updatedStatus = !examController.isApproved;
      await api.patch(
        `/examController/examcontroller/${examController.email}`,
        {
          isApproved: updatedStatus,
        }
      );

      setData((prevData) =>
        prevData.map((controller) =>
          controller.email === examController.email
            ? { ...controller, isApproved: updatedStatus }
            : controller
        )
      );
    } catch (error) {
      console.error("Error toggling approval status:", error);
    }
  };

  const columns: ColumnDef<ExamController>[] = [
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
              alt="controller avatar"
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
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const examController = row.original;
        const isApproved = examController.isApproved;

        return (
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(examController)}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Delete</span>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleToggleApproval(examController)} // Correctly invoking the function
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
      <PageTitle title="Exam Controller List" className="text-left" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
