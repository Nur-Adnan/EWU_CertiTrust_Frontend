export type StudentProps = {
  name: string;
  email: string;
  address: string;
  enrollmentHistory: string[];
  earnedCredits: number;
};

export default function StudentCard(props: StudentProps) {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <section className="flex justify-between gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-100 p-1">
          <img
            width={200}
            height={200}
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${props.name}`}
            alt="avatar"
          />
        </div>
        <div className="text-sm">
          <p className="font-bold">{props.name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400">
            {props.email}
          </div>
          <p className="text-gray-400">{props.address}</p>
        </div>
      </section>
      <section className="flex flex-col text-right">
        <p className="text-sm text-gray-500">
          Credits Earned: {props.earnedCredits}
        </p>
        <div className="text-gray-400 text-xs">
          Enrollment History: {props.enrollmentHistory.join(", ")}
        </div>
      </section>
    </div>
  );
}
