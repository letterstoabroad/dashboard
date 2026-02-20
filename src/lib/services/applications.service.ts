import axiosInstance from "@/lib/axios";

export interface Application {
    id: number;
    university_name: string;
    university_logo: string;
    course_name: string;
    application_status: string;
    admission_status: string;
    documents: string;
    application_letter: string;
    progress: number;
    update_viewed: boolean;

}

export interface ApplicationsPayload {
    id: string | number;
    search?: string;
}

export interface ApplicationsResponse {
    results: Application[];
}

export const fetchApplications = async (
    payload: ApplicationsPayload
): Promise<ApplicationsResponse> => {
    const response = await axiosInstance.get<{
        status: boolean;
        data: ApplicationsResponse;
    }>("applications/", {
        params: {
            id: payload.id,
            search: payload.search || "",
        },
    });
    return response.data.data;
};