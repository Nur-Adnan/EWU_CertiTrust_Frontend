import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";

type Props = {};
type Student = {
  studentId: string; // e.g., "2020-3-60-007"
  name: string;
  fatherName: string;
  initialGeneratedOn: string; // Date as a string
};

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "studentId",
    header: "Student ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "fatherName",
    header: "Father's Name",
  },
  {
    accessorKey: "initialGeneratedOn",
    header: "Initial Generated On",
  },
  {
    accessorKey: "view",
    header: "Actions",
    cell: ({ row }) => <Button className="text-sm px-3 py-1">View</Button>,
  },
];

const data: Student[] = [
  {
    studentId: "2020-3-60-007",
    name: "John Doe",
    fatherName: "Richard Doe",
    initialGeneratedOn: "2023-01-15",
  },
  {
    studentId: "2020-3-60-008",
    name: "Alice Smith",
    fatherName: "Thomas Smith",
    initialGeneratedOn: "2023-02-20",
  },
  {
    studentId: "2020-3-60-009",
    name: "Bob Johnson",
    fatherName: "Michael Johnson",
    initialGeneratedOn: "2023-03-10",
  },
  {
    studentId: "2020-3-60-010",
    name: "Emma Brown",
    fatherName: "David Brown",
    initialGeneratedOn: "2023-04-05",
  },
  {
    studentId: "2020-3-60-011",
    name: "Michael Davis",
    fatherName: "James Davis",
    initialGeneratedOn: "2023-05-22",
  },
  // Add more students as needed
];

export default function FacultyListPage({}: Props) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Generated Certificate List" className="text-left" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
