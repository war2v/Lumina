import PresentationList from "@/components/custom/general/PresentationList";
import SearchBar from "@/components/custom/general/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FindContent } from "./FindContent";
import { getAllPresentationsNotUsers } from "@/app/queries/server/getAllPresentationsNotUsers";

export default async function SearchPage() {
  const presentations = await getAllPresentationsNotUsers()
  //console.log(presentations)
  return <FindContent presentations={presentations} />;
}
