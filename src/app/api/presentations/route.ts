import { PresentationType } from "@/app/types";
import { createClient } from "@/lib/supabase/serverClient";



export async function GET(request: Request) {

    const supabase = await createClient();

    const {data, error} = await supabase
        .from("presentations")
        .select("*");

    if (error) return Response.json({success: false, error: error.message}, {status: 500})

    return Response.json({ success: true, data})
}

export async function POST(request: Request) {
    const supabase = await createClient();

    const body = await request.json();

    const {title, is_public, active, description} = body;

    const {data, error} = await supabase
        .from("presentations")
        .insert([{title, is_public, active, description}])
        .select();
    
    if (error) return Response.json({ success: false, error: error.message }, { status: 500 });

    return Response.json({ success: true, data }, { status: 201 });

}

export async function PUT(request: Request) {
    
}

export async function PATCH(request: Request) {
    
}

export async function DELETE(request: Request) {
    
}