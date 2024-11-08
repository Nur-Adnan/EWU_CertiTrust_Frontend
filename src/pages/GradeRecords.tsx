import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";

type Props = {};
type GradeHistory = {
  studentName: string;
  email: string;
  course: string;
  grade: string;
};

const columns: ColumnDef<GradeHistory>[] = [
  {
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "studentName"
            )}`}
            alt="student-image"
          />
          <p>{row.getValue("studentName")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
];

const data: GradeHistory[] = [
  {
    studentName: "John Doe",
    email: "john@example.com",
    course: "Mathematics",
    grade: "A",
  },
  {
    studentName: "Alice Smith",
    email: "alice@example.com",
    course: "Physics",
    grade: "B+",
  },
  {
    studentName: "Bob Johnson",
    email: "bob@example.com",
    course: "Chemistry",
    grade: "A-",
  },
  {
    studentName: "Emma Brown",
    email: "emma@example.com",
    course: "Biology",
    grade: "B",
  },
  {
    studentName: "Michael Davis",
    email: "michael@example.com",
    course: "English",
    grade: "C+",
  },
  {
    studentName: "Sophia Wilson",
    email: "sophia@example.com",
    course: "History",
    grade: "B-",
  },
  {
    studentName: "Liam Garcia",
    email: "liam@example.com",
    course: "Political Science",
    grade: "A",
  },
  {
    studentName: "Olivia Martinez",
    email: "olivia@example.com",
    course: "Economics",
    grade: "C",
  },
  {
    studentName: "Noah Rodriguez",
    email: "noah@example.com",
    course: "Engineering",
    grade: "A+",
  },
  {
    studentName: "Ava Lopez",
    email: "ava@example.com",
    course: "Art",
    grade: "B",
  },
  {
    studentName: "Elijah Hernandez",
    email: "elijah@example.com",
    course: "Music",
    grade: "B+",
  },
  {
    studentName: "Mia Gonzalez",
    email: "mia@example.com",
    course: "Law",
    grade: "A-",
  },
  {
    studentName: "James Perez",
    email: "james@example.com",
    course: "Psychology",
    grade: "C+",
  },
  {
    studentName: "Charlotte Carter",
    email: "charlotte@example.com",
    course: "Philosophy",
    grade: "B",
  },
  {
    studentName: "Benjamin Taylor",
    email: "benjamin@example.com",
    course: "Mathematics",
    grade: "A",
  },
];

export default function GradeHistoryPage({}: Props) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Grade Records" className="text-left" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
