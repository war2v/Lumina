"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { redirect } from "next/navigation";
import { PresentationSchema } from "@/schema/Schema";
import { Card } from "../ui/card";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "sonner";

type PresentationFormData = z.infer<typeof PresentationSchema>;

export default function CreatePresentationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PresentationFormData>({
    resolver: zodResolver(PresentationSchema),
    defaultValues: { isPublic: false },
  });

  const [startTime, setStartTime] = useState<string>("10:30:00");
  const [endTime, setEndTime] = useState<string>("10:30:00");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const supabase = createClient();
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (Formdata: PresentationFormData) => {
    setSubmitError("");
    const user = (await supabase.auth.getUser()).data.user;
    const metadata = user?.user_metadata;
    if (!user) {
      setSubmitError("User not authenticated.");
      return;
    }

    const [hours, minutes, seconds] = startTime.split(":").map(Number);
    const [endHours, endMinutes, endSeconds] = endTime.split(":").map(Number);
    let StartDateTime = new Date();
    let EndDateTime = new Date();

    if (startDate) {
      StartDateTime = new Date(startDate);
      StartDateTime.setHours(hours);
      StartDateTime.setMinutes(minutes);
      StartDateTime.setSeconds(seconds);

      EndDateTime = new Date(startDate);
      EndDateTime.setHours(endHours);
      EndDateTime.setMinutes(endMinutes);
      EndDateTime.setSeconds(endSeconds);
    }

    if (StartDateTime > EndDateTime) {
      toast("Invalid Presentation Times: Start time must be before end time.");

      return;
    }

    const { data, error } = await supabase
      .from("presentations")
      .insert({
        title: Formdata.title,
        description: Formdata.description,
        is_public: Formdata.isPublic,
        created_by: user.id,
        created_by_username: metadata?.username,
        active: false,
        subtitle: Formdata.subtitle,
        tags: Formdata.tags,
        start_datetime: StartDateTime,
        end_datetime: EndDateTime,
      })
      .select();

    if (error) {
      setSubmitError(error.message);
    } else {
      redirect(`/user/home/mypresentations/${data[0].id}`);
      //redirect(`user/home /presentation/${}`)
    }
  };

  return (
    <Card className="p-9 w-full dark:bg-gray-950">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label className="text-muted-foreground" htmlFor="title">
            Title
          </Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label className="text-muted-foreground" htmlFor="description">
            Description
          </Label>
          <Textarea id="description" {...register("description")} />
        </div>

        <div className="md:flex justify-start sm:flex-col">
          <div className="flex flex-col">
            <div>
              <Label className="text-muted-foreground" htmlFor="subtitle">
                subtitle
              </Label>
              <Input id="subtitle" {...register("subtitle")} />
            </div>

            <div>
              <Label className="text-muted-foreground" htmlFor="tags">
                Tags
              </Label>
              <Textarea id="tags" {...register("tags")} />
            </div>
          </div>

          <div className="md:flex w-full gap-x-4 justify-start">
            <div className="flex flex-col">
              <Label
                className="text-muted-foreground p-2 w-full"
                htmlFor="isPublic"
              >
                Presentation Date
              </Label>
              <div className="flex flex-col gap-y-4 px-4">
                <div className="flex">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!startDate}
                        className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal w-full"
                      >
                        <CalendarIcon />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>Set Date </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex ">
                  <Label
                    className="text-muted-foreground p-2"
                    htmlFor="isPublic"
                  >
                    Start
                  </Label>
                  <Input
                    type="time"
                    id="start-time-picker"
                    step="1"
                    defaultValue={startTime}
                    className="hover:bg-muted hover:cursor-text w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="flex">
                  <Label
                    className="text-muted-foreground p-2"
                    htmlFor="isPublic"
                  >
                    End{" "}
                  </Label>
                  <Input
                    type="time"
                    id="end-time-picker"
                    step="1"
                    defaultValue={endTime}
                    className="hover:bg-muted hover:cursor-text bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-full"
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full justify-start gap-y-2">
              <Label
                className="text-muted-foreground py-2 first-line:w-full"
                htmlFor="isPublic"
              >
                Features
              </Label>
              <div className="flex gap-x-4 items-center justify-left">
                <Label className="text-muted-foreground" htmlFor="isPublic">
                  Public
                </Label>
                <Switch
                  id="isPublic"
                  onCheckedChange={(val) => setValue("isPublic", val)}
                />
              </div>
            </div>
          </div>
        </div>

        {submitError && <p className="text-sm text-red-500">{submitError}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Presentation"}
        </Button>
      </form>
    </Card>
  );
}
