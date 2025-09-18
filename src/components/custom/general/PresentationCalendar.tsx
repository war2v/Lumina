"use client";
import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Presentation } from "@/app/types";

interface CalendarEvent {
  id: string | number;
  title: string | undefined;
  start_datetime:  string | undefined;
  description?:  string | undefined;
}

interface CalendarProps {
  presentations?: Presentation[];
}

// Sample events data - replace with your actual events
const sampleEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Team Meeting",
    start_datetime: "2024-12-15T10:00:00",
    description: "Weekly team sync",
  },
  {
    id: 2,
    title: "Project Deadline",
    start_datetime: "2024-12-20T23:59:00",
    description: "Final submission",
  },
  {
    id: 3,
    title: "Client Call",
    start_datetime: "2024-12-18T14:30:00",
    description: "Quarterly review",
  },
  {
    id: 4,
    title: "Workshop",
    start_datetime: "2024-12-22T09:00:00",
    description: "React best practices",
  },
];

const PresentationCalendar: React.FC<CalendarProps> = ({
  presentations = sampleEvents,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());


  const events: CalendarEvent[] = presentations.map((item) => ({
    id: item.id,
    title: item.title,
    start_datetime: item.start_datetime?.toString(),
  }));

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get first day of current month and number of days
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Group events by date
  const eventsByDate = useMemo((): Record<string, CalendarEvent[]> => {
    const grouped: Record<string, CalendarEvent[]> = {};

    events.forEach((event: CalendarEvent) => {
      const eventDate = new Date(event.start_datetime ? event.start_datetime : "00:00:00");
      const dateKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });

    return grouped;
  }, [events]);

  const getEventsForDate = (day: number): CalendarEvent[] => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return eventsByDate[dateKey] || [];
  };

  const navigateMonth = (direction: number): void => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const formatEventTime = (datetime: string): string => {
    const date = new Date(datetime);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Generate calendar days including padding
  const calendarDays: (number | null)[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const currentMonthEvents = events?.filter((event: CalendarEvent) => {
    const eventDate = new Date(event.start_datetime ? event.start_datetime : "00:00:00");
    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  });

  return (
    <div className="w-full max-w-4xl h-full mx-auto p-6 bg-white dark:bg-black dark:text-white rounded-lg shadow-lg">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <CalendarDays className="h-6 w-6 text-red-400" />
          <h2 className="text-2xl font-bold text-gray-900  dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            type="button"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-white" />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            type="button"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-950 border-b border-gray-200">
          {dayNames.map((day: string) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-gray-700 dark:text-white"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day: number | null, index: number) => {
            const dayEvents = day ? getEventsForDate(day) : [];
            const isCurrentDay = day && isToday(day);

            return (
              <div
                key={index}
                className={`min-h-24 p-2 border-r border-b border-gray-100 ${
                  day ? "bg-white dark:bg-black hover:bg-gray-50" : "bg-gray-25"
                } transition-colors`}
              >
                {day && (
                  <>
                    {/* Day Number */}
                    <div
                      className={`text-sm font-medium mb-1 ${
                        isCurrentDay
                          ? "bg-red-400 text-white  rounded-full w-6 h-6 flex items-center justify-center"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {day}
                    </div>

                    {/* Events */}
                    <div className="space-y-1">
                      {dayEvents
                        .slice(0, 3)
                        .map((event: CalendarEvent, eventIndex: number) => (
                          <div
                            key={eventIndex}
                            className="text-xs p-1 bg-red-100 text-red-800 rounded truncate hover:bg-red-200 cursor-pointer transition-colors"
                            title={`${event.title} - ${formatEventTime(
                              event.start_datetime ? event.start_datetime : "00:00:00"
                            )}`}
                          >
                            <div className="font-medium truncate">
                              {event.title}
                            </div>
                            <div className="text-red-600">
                              {formatEventTime(event.start_datetime ? event.start_datetime : "2024-12-20T23:59:00")}
                            </div>
                          </div>
                        ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-500 dark:text-gray-100 text-center cursor-pointer hover:text-gray-700">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Events Summary */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white  mb-3">
          Up and Coming Presentations ({currentMonthEvents.length})
        </h3>
        <div className="flex overflow-scroll w-full">
          {currentMonthEvents
            .sort(
              (a: CalendarEvent, b: CalendarEvent) =>
                new Date(a.start_datetime ? a.start_datetime : "2024-12-20T23:59:00").getTime() -
                new Date(b.start_datetime ? b.start_datetime : "2024-12-20T23:59:00").getTime()
            )
            .map((event: CalendarEvent) => (
              <div
                key={event.id}
                className="p-3 bg-white dark:bg-gray-950 rounded border border-gray-200"
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {event.title}
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(event.start_datetime ? event.start_datetime : "2024-12-20T23:59:00").toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  at {formatEventTime(event.start_datetime ? event.start_datetime : "2024-12-20T23:59:00")}
                </div>
                {event.description && (
                  <div className="text-sm text-gray-500 mt-1">
                    {event.description}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PresentationCalendar;
