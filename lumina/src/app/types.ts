export type PresentationType = {
    active: boolean;
    created_at: string;
    created_by: string;
    created_by_username: string;
    description: string;
    id: string;
    is_public: boolean;
    title: string;
    current_resource_id: string;
    invite_code: string;
    tags: string;
    start_datetime: Date;
    end_datetime: Date;
}

export type PresentationResourceType = {
    id: Number,
    created_at: string,
    presentation_id: Number,
    file_name: string,
    file_path: string,
    file_type: string,
    file_size: string | null,
    uploaded_by: string
}

export type Account = {
    id: string;
    created_at: string;
    username: string;
    first_name: string;
    last_name: string;
    role: "attendee" | "presenter";
    updated_at: string;
    profile_image_url: string;
    bio: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface note{
    id: string;
}


