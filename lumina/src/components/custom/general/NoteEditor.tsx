"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { TipTap } from "../editor/tiptap";


interface NoteEditorProps {
  initialValue?: string;
  onSave?: (note: string) => Promise<void> | void;
  onChange?: (note: string) => void;
  autosave?: boolean;
  className?: string;
  disabled?: boolean;
}

const NoteEditor = ({
  initialValue = "",
  onSave,
  onChange,
  autosave = false,
  className,
  disabled = false,
}: NoteEditorProps) => {
  const [note, setNote] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (autosave && onSave) {
      const timeout = setTimeout(() => {
        setIsSaving(true);
        Promise.resolve(onSave(note)).finally(() => setIsSaving(false));
      }, 1000); // Auto-save after 1s pause
      return () => clearTimeout(timeout);
    }
  }, [note]);

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    await onSave(note);
    setIsSaving(false);
  };

  const handleChange = (val: string) => {
    setNote(val);
    onChange?.(val);
  };

  return (
    
      <TipTap />
  );
};

export default NoteEditor;
