import React, { FC } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Define CardProps with onClick support
export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  description: string;
  onClick?: () => void;
};

// Main Card Component
const Card: FC<CardProps> = ({
  label,
  amount,
  description,
  icon: Icon,
  onClick,
}) => {
  return (
    <CardContent onClick={onClick} className="cursor-pointer">
      {" "}
      {/* Make card clickable */}
      <section className="flex justify-between gap-2">
        <p className="text-sm">{label}</p>
        <Icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{amount}</h2>
        <p className="text-xs text-gray-500">{description}</p>
      </section>
    </CardContent>
  );
};

// CardContent Component
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}

export default Card;
