"use client";

import { Button } from "@/components/ui/button";

export default function TransferSelectorBarSkeleton() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between">
      <div className="flex-1 flex flex-col gap-6 bg-white p-4 pr-6 rounded-lg animate-pulse">
        <div className="h-5 w-1/3 bg-blue-500 rounded-full" />
        <div className="w-full flex justify-between gap-2">
          <div className="flex-1 flex flex-col gap-3 mb-3">
            <div className="h-4 w-full bg-blue-500 rounded-full" />
            <div className="h-4 w-full bg-blue-200 rounded-full" />
          </div>
          <div className="flex-1 flex flex-col gap-3 mb-3">
            <div className="h-4 w-full bg-blue-500 rounded-full" />
            <div className="h-4 w-full bg-blue-200 rounded-full" />
          </div>
          <div className="flex-1 flex flex-col gap-3 mb-3">
            <div className="h-4 w-full bg-blue-500 rounded-full" />
            <div className="h-4 w-full bg-blue-200 rounded-full" />
          </div>
        </div>
      </div>

      <Button className="scale-150  aspect-square z-50"></Button>

      <div className="flex-1 flex flex-col gap-6 bg-white p-4 pr-6 rounded-lg animate-pulse">
        <div className="h-5 w-1/3 bg-blue-500 rounded-full" />
        <div className="w-full flex justify-between gap-2">
          <div className="flex-1 flex flex-col gap-3 mb-3">
            <div className="h-4 w-full bg-blue-500 rounded-full" />
            <div className="h-4 w-full bg-blue-200 rounded-full" />
          </div>
          <div className="flex-1 flex flex-col gap-3 mb-3">
            <div className="h-4 w-full bg-blue-500 rounded-full" />
            <div className="h-4 w-full bg-blue-200 rounded-full" />
          </div>
          <div className="flex-1 flex flex-col gap-3 mb-3">
            <div className="h-4 w-full bg-blue-500 rounded-full" />
            <div className="h-4 w-full bg-blue-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
