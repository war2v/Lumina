"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import {
  BackgroundColor,
  Color,
  FontFamily,
  FontSize,
  TextStyle,
} from "@tiptap/extension-text-style";
import { Underline as UL } from "@tiptap/extension-underline";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Selection, UndoRedo } from "@tiptap/extensions";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  ArrowRight,
  BoldIcon,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Highlighter,
  ItalicIcon,
  Strikethrough,
  Underline,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorState } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import Code from "@tiptap/extension-code";
import { createClient } from "@/lib/supabase/browserClient";
import { toast } from "sonner";

interface TipTapProps {
  className?: string;
  editorClassName?: string;
  noteId? : string;
}

const fonts = [
  "Inter",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Impact",
  "Comic Sans MS",
];

const fontSizes = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "60px",
];

const textAlign = ["left", "center", "right", "justify"];

const bgColor = [
  "#B9F18D",
  "#94FADB",
  "#70CFF8",
  "#FAF594",
  "#FBBC88",
  "#F98181",
  "#958DF1",
];

export const TipTap = ({ className, editorClassName, noteId }: TipTapProps) => {
  const [bold, toggleBold] = useState(false);
  const [italic, toggleItalic] = useState(false);
  const [underline, toggleUnderline] = useState(false);
  const [strike, toggleStrike] = useState(false);
  const [menuCollasped, setMenuCollapsed] = useState<boolean>(false);


  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      UndoRedo,
      Italic,
      UL,
      Color,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Strike,
      FontFamily,
      FontSize,
      BackgroundColor,
      Code,
      Selection.configure({
        className: "selection",
      }),
    ],
    content: "<p>Your Notes Go Here!</p>",
    immediatelyRender: false,
  })

  const onSave = async () => {
    const json = editor?.getJSON()
    
    const supabase = createClient();

    const {data, error} = await supabase
      .from('notes')
      .update({'content': json})
      .eq('id', noteId)
      .select()

    if(error){
      toast(error.message)
    } else {
      toast("Note Saved")
    }
  }


  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        color: ctx.editor?.getAttributes("textStyle").color,
        isPurple: ctx.editor?.isActive("textStyle", { color: "#958DF1" }),
        isRed: ctx.editor?.isActive("textStyle", { color: "#F98181" }),
        isOrange: ctx.editor?.isActive("textStyle", { color: "#FBBC88" }),
        isYellow: ctx.editor?.isActive("textStyle", { color: "#FAF594" }),
        isBlue: ctx.editor?.isActive("textStyle", { color: "#70CFF8" }),
        isTeal: ctx.editor?.isActive("textStyle", { color: "#94FADB" }),
        isGreen: ctx.editor?.isActive("textStyle", { color: "#B9F18D" }),
      };
    },
  });



  if (!editor) {
    return <div>No Editor</div>;
  }

  return (
    <div
      className={cn(
        "flex flex-col w-full h-full shadow-md rounded-lg",
        className
      )}
    >
      <div
        id="controls"
        className="flex overflow-scroll items-center gap-x-1 p-2 border-b shadow-sm rounded-t-lg border "
      >
        <Button size="sm" variant="editor" onClick={onSave}>
          Save
        </Button>
        {
          
            <div className="flex gap-1">
              <Button
                variant="editor"
                size="sm"
                onClick={() => {
                  editor.chain().focus().toggleBold().run();
                  toggleBold(!bold);
                }}
                className={`${!editor.isActive("bold") ? "opacity-50" : ""}`}
              >
                <BoldIcon />
              </Button>

              <Button
                variant="editor"
                size="sm"
                onClick={() => {
                  editor.chain().focus().toggleItalic().run();
                  toggleItalic(!italic);
                }}
                className={`${!editor.isActive("italic") ? "opacity-50" : ""}`}
              >
                <ItalicIcon />
              </Button>
              <Button
                size="sm"
                variant="editor"
                onClick={() => {
                  editor.commands.toggleUnderline();
                  toggleUnderline(!underline);
                }}
                className={`${
                  !editor.isActive("underline") ? "opacity-50" : ""
                }`}
              >
                <Underline />
              </Button>
              <Button
                size="sm"
                variant="editor"
                onClick={() => {
                  editor.commands.toggleStrike();
                  toggleStrike(!strike);
                }}
                className={`${!editor.isActive("strike") ? "opacity-50" : ""}`}
              >
                <Strikethrough />
              </Button>
              <Button
                variant="editor"
                onClick={() => editor.commands.toggleCode()}
                size={"sm"}
                className={`${!editor.isActive("code") ? "opacity-50" : ""}`}
              >
                <Code2 />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="editor">
                    <Highlighter />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col max-h-[100px] gap-2">
                  <Button
                    size="sm"
                    variant="editor"
                    onClick={() => editor.commands.toggleHighlight()}
                    className={`bg-yellow-500 ${
                      !editor.isActive("highlight") ? "opacity-50" : ""
                    }`}
                  >
                    Yellow
                  </Button>

                  <Button
                    size="sm"
                    variant="editor"
                    onClick={() =>
                      editor.commands.toggleHighlight({ color: "#ffc078" })
                    }
                    className={`bg-orange-500 ${
                      !editor.isActive("highlight", { color: "#ffc078" })
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    Orange
                  </Button>
                  <Button
                    size="sm"
                    variant="editor"
                    onClick={() =>
                      editor.commands.toggleHighlight({ color: "#8ce99a" })
                    }
                    className={`bg-green-500 ${
                      !editor.isActive("highlight", { color: "#8ce99a" })
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    Green
                  </Button>
                  <Button
                    size="sm"
                    variant="editor"
                    onClick={() =>
                      editor.commands.toggleHighlight({ color: "#74c0fc" })
                    }
                    className={`bg-blue-500 ${
                      !editor.isActive("highlight", { color: "#74c0fc" })
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    Blue
                  </Button>
                  <Button
                    size="sm"
                    variant="editor"
                    onClick={() =>
                      editor.commands.toggleHighlight({ color: "#b197fc" })
                    }
                    className={`bg-purple-500 ${
                      !editor.isActive("highlight", { color: "#b197fc" })
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    Purple
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="editor" className="text-lg text-blue-500">
                    A
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col max-h-[100px] items-center gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="color"
                      onInput={(event) =>
                        editor
                          .chain()
                          .focus()
                          .setColor(event.currentTarget.value)
                          .run()
                      }
                      value={editorState?.color}
                      data-testid="setColor"
                    />
                    <Button
                      size="sm"
                      variant="editor"
                      onClick={() => editor.commands.setColor("#958DF1")}
                      className={editorState?.isPurple ? "opacity-50" : ""}
                      data-testid="setPurple"
                    >
                      Purple
                    </Button>
                    <Button
                      size="sm"
                      variant="editor"
                      onClick={() => editor.commands.setColor("#F98181")}
                      className={editorState?.isRed ? "opacity-50" : ""}
                      data-testid="setRed"
                    >
                      Red
                    </Button>
                    <Button
                      size="sm"
                      variant="editor"
                      onClick={() => editor.commands.setColor("#FBBC88")}
                      className={editorState?.isOrange ? "opacity-50" : ""}
                      data-testid="setOrange"
                    >
                      Orange
                    </Button>
                    <Button
                      size="sm"
                      variant="editor"
                      onClick={() => editor.commands.setColor("#FAF594")}
                      className={editorState?.isYellow ? "opacity-50" : ""}
                      data-testid="setYellow"
                    >
                      Yellow
                    </Button>
                    <Button
                      size="sm"
                      variant="editor"
                      onClick={() => editor.commands.setColor("#70CFF8")}
                      className={editorState?.isBlue ? "opacity-50" : ""}
                      data-testid="setBlue"
                    >
                      Blue
                    </Button>
                    <Button
                      size="sm"
                      variant="editor"
                      onClick={() => editor.commands.setColor("#94FADB")}
                      className={editorState?.isTeal ? "opacity-50" : ""}
                      data-testid="setTeal"
                    >
                      Teal
                    </Button>
                    <Button
                      size="sm"
                      variant="editor"
                      onClick={() => editor.commands.setColor("#B9F18D")}
                      className={editorState?.isGreen ? "opacity-50" : ""}
                      data-testid="setGreen"
                    >
                      Green
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="editor" className="text-lg">
                    <Heading1 />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col max-h-[100px] items-center gap-2">
                  <Button
                    size="sm"
                    variant="editor"
                    onClick={() => {
                      editor.commands.toggleHeading({ level: 1 });
                    }}
                  >
                    <Heading1 />
                  </Button>
                  <Button
                    size="sm"
                    variant="editor"
                    onClick={() => {
                      editor.commands.toggleHeading({ level: 2 });
                    }}
                  >
                    <Heading2 />
                  </Button>
                  <Button
                    size="sm"
                    variant="editor"
                    onClick={() => {
                      editor.commands.toggleHeading({ level: 3 });
                    }}
                  >
                    <Heading3 />
                  </Button>
                  <Button
                    size="sm"
                    variant="editor"
                    onClick={() => {
                      editor.commands.toggleHeading({ level: 4 });
                    }}
                  >
                    <Heading4 />
                  </Button>
                  <Button
                    size="sm"
                    variant="editor"
                    onClick={() => {
                      editor.commands.toggleHeading({ level: 5 });
                    }}
                  >
                    <Heading5 />
                  </Button>
                  <Button
                    size="sm"
                    variant="editor"
                    onClick={() => {
                      editor.commands.toggleHeading({ level: 6 });
                    }}
                  >
                    <Heading6 />
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="editor" size="sm" className="text-sm">
                    Font
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col max-h-[100px] items-center gap-2">
                  {fonts.map((font) => (
                    <Button
                      key={font}
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        editor.chain().focus().setFontFamily(font).run()
                      }
                      className="font-sans w-full"
                    >
                      {font}
                    </Button>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="editor" className="text-sm">
                    <span className="text-sm">A</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col max-h-[100px] items-center gap-2">
                  {fontSizes.map((size) => (
                    <Button
                      key={size}
                      size="sm"
                      variant="outline"
                      onClick={() => editor.commands.setFontSize(size)}
                      className="font-sans"
                      style={{ fontSize: size }}
                    >
                      {size}
                    </Button>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="editor" className="text-sm">
                    <AlignJustify />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex items-center gap-2">
                  {textAlign.map((align) => (
                    <Button
                      key={align}
                      size="sm"
                      variant="outline"
                      onClick={() => editor.commands.toggleTextAlign(align)}
                      className="font-sans"
                    >
                      {align === "left" ? (
                        <AlignLeft />
                      ) : align === "right" ? (
                        <AlignRight />
                      ) : align === "center" ? (
                        <AlignCenter />
                      ) : (
                        <AlignJustify />
                      )}
                    </Button>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          
        }
        <Button
          variant="outline"
          onClick={() => editor.commands.undo()}
          size={"sm"}
        >
          <ArrowLeft />
        </Button>

        <Button
          variant="outline"
          onClick={() => editor.commands.redo()}
          size={"sm"}
        >
          <ArrowRight />
        </Button>
      </div>
      <div
        className={cn(
          "h-full overflow-scroll bg-white dark:bg-black rounded-b-lg",
          editorClassName
        )}
      >
        <EditorContent className={cn("w-full h-full p-3")} editor={editor} />
      </div>
    </div>
  );
};
