import { createClient } from '@/lib/supabase/serverClient';
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    return NextResponse.json({
        hello: "world",
    });
}

export async function PUT(request: Request) {
    
}

export async function PATCH(request: Request) {
    
}

export async function DELETE(request: Request) {
    
}