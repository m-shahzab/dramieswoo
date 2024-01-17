import React from "react";

import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

function CusCard({
  children,
  cardTitle,
  cardDes,
}: {
  children: React.ReactNode;
  cardTitle: string;
  cardDes: string;
}) {
  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-0">
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDes}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
export default CusCard;
