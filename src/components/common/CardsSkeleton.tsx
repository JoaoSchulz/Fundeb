import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CardsSkeleton = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <Card
          key={index}
          className="rounded-xl border border-[#e9e9eb] bg-white overflow-hidden"
        >
          <CardContent className="flex flex-col p-6 gap-4">
            {/* Header */}
            <div className="flex flex-col gap-1.5 pb-3 border-b border-[#f0f0f0]">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>

            {/* Valores */}
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between py-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center justify-between py-2 border-t border-[#f0f0f0]">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center justify-between py-2 border-t border-[#f0f0f0]">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Ganho */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#e9e9eb]">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

