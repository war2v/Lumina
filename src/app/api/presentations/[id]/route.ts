import { ApiResponse, Presentation } from "@/app/types";
import { createClient } from "@/lib/supabase/serverClient";
import { NextRequest } from "next/server";

interface Params {
    params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, props: Params): Promise<Response> {
    const params = await props.params;

    const supabase = await createClient();
    const { id } = params;
    const { data, error } = await supabase
        .from('presentations')
        .select('*')
        .eq('id', id)
        .single()

    const response: ApiResponse<Presentation> = error
        ? { success: false, error: error.message }
        : { success: true, data: data as Presentation}

    return Response.json(response, { status: error ? 404 : 200 })
}

export async function PUT(request: Request, props: Params): Promise<Response> {
    const params = await props.params;

    const supabase = await createClient();
    const { id } = params;
    const body = await request.json();

    //console.log(body)

    const { data, error } = await supabase
        .from('presentations')
        .update(body)
        .eq('id', id)
        .select()


    const response: ApiResponse<Presentation[]> = error
        ? { success: false, error: error.message }
        : { success: true, data: data ?? [] }


    return Response.json(response)
}

export async function DELETE(
    request: Request,
    { params }: Params
    ): Promise<Response>
{
    //console.log("here")
    const supabase = await createClient()
    const { id } =  await params;

    const {error} = await supabase
        .from('presentations')
        .delete()
        .eq('id', id)
    


    const response: ApiResponse<null> = error
        ? { success: false, error: error.message }
        : { success: true, message: "Presentation Deleted"}
    
    return Response.json(response, {status: error ? 500 : 200 })


}
