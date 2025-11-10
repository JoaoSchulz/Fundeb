import React from "react";
import { Skeleton } from "../../components/ui/skeleton";

export const TableSkeleton = (): JSX.Element => {
  return (
    <div className="flex items-start w-full bg-white border border-solid border-[#e9e9eb]">
      <div className="inline-flex flex-col items-start">
        <div className="flex h-11 items-center gap-3 px-6 py-3 w-full bg-white border-b border-solid border-[#e9e9eb]">
          <Skeleton className="h-4 w-20" />
        </div>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex h-[72px] px-6 py-4 w-full border-b border-solid border-[#e9e9eb] items-center"
          >
            <div className="inline-flex flex-col items-start gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        ))}
        <div className="flex px-6 py-4 w-full bg-neutral-50 h-[72px] items-center border-b border-solid border-[#e9e9eb]">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <div className="inline-flex flex-col items-start">
        <div className="flex h-11 items-center gap-3 px-6 py-3 w-full bg-white border-b border-solid border-[#e9e9eb]">
          <Skeleton className="h-4 w-20" />
        </div>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex h-[72px] px-6 py-4 w-full border-b border-solid border-[#e9e9eb] items-center"
          >
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
        <div className="flex px-6 py-4 w-full bg-neutral-50 h-[72px] items-center border-b border-solid border-[#e9e9eb]" />
      </div>

      <div className="flex flex-col items-start flex-1">
        <div className="flex h-11 items-center gap-3 px-6 py-3 w-full bg-white border-b border-solid border-[#e9e9eb]">
          <Skeleton className="h-4 w-28" />
        </div>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex h-[72px] px-6 py-4 w-full border-b border-solid border-[#e9e9eb] items-center"
          >
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
        <div className="flex px-6 py-4 w-full bg-neutral-50 h-[72px] items-center border-b border-solid border-[#e9e9eb]" />
      </div>

      <div className="flex flex-col items-start flex-1">
        <div className="flex h-11 items-center gap-3 px-6 py-3 w-full bg-white border-b border-solid border-[#e9e9eb]">
          <Skeleton className="h-4 w-28" />
        </div>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex px-6 py-4 w-full bg-white h-[72px] items-center border-b border-solid border-[#e9e9eb]"
          >
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
        <div className="flex px-6 py-4 w-full bg-neutral-50 h-[72px] items-center border-b border-solid border-[#e9e9eb]" />
      </div>

      <div className="flex flex-col items-start flex-1">
        <div className="flex h-11 items-center gap-3 px-6 py-3 w-full bg-white border-b border-solid border-[#e9e9eb]">
          <Skeleton className="h-4 w-20" />
        </div>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex h-[72px] px-6 py-4 w-full border-b border-solid border-[#e9e9eb] items-center"
          >
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
        <div className="flex px-6 py-4 w-full bg-neutral-50 h-[72px] items-center border-b border-solid border-[#e9e9eb]">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="inline-flex flex-col items-start">
        <div className="w-16 h-11 bg-white border-b border-solid border-[#e9e9eb]" />
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="inline-flex gap-0.5 p-4 bg-white h-[72px] items-center border-b border-solid border-[#e9e9eb]"
          >
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};
