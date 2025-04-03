"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useDrawerStore from "@/hooks/useDrawerStore";

const NotificationDrawer = () => {
  const { notifDrawer, close } = useDrawerStore();
  const notifications = [
    {
      id: 1,
      title: "Yangi xabar",
      description: "Salom",
      enabled: true,
      receivedDate: new Date(),
    },
    {
      id: 2,
      title: "Yangi xabar",
      description: "Salom",
      enabled: true,
      receivedDate: new Date(),
    },
    {
      id: 3,
      title: "Yangi xabar",
      description: "Salom",
      enabled: true,
      receivedDate: new Date(),
    },
  ];
  return (
    <Sheet
      open={notifDrawer}
      onOpenChange={(open) => (open ? open : close("notifDrawer"))}
    >
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-2xl">Notifications</SheetTitle>
          <SheetDescription>
            You have {notifications.length} notifications
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-8 p-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-300" />
                <div className="flex flex-col">
                  <span className="font-semibold">{notification.title}</span>
                  <span className="text-sm text-slate-400">
                    {notification.description}
                  </span>
                </div>
              </div>
              <span className="text-sm text-slate-400">
                {notification.receivedDate.toDateString()}
              </span>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationDrawer;
