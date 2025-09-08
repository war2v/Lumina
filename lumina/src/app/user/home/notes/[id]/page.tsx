import NoteEditor from "@/components/custom/general/NoteEditor"



export default async function NotePage ({params}:{params: Promise<{ id: string }>}) {

    const {id} = await params;
    return (
        <div className="h-full">
            <NoteEditor noteId={id}  className="h-full" editorClassName="h-full"/>
        </div>
    )
}