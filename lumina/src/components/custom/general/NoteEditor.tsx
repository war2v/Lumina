"use client";

import { TipTap } from "../editor/tiptap";


interface NoteEditorProps {
  initialValue?: string;
  onSave?: (note: string) => Promise<void> | void;
  onChange?: (note: string) => void;
  autosave?: boolean;
  className?: string;
  editorClassName?: string;
  disabled?: boolean;
  noteId?: string;
}

const NoteEditor = ({
  className,
  editorClassName,
  noteId
}: NoteEditorProps) => {
  return (
    
      <TipTap noteId={noteId} className={className} editorClassName={editorClassName}/>
  );
};

export default NoteEditor;
