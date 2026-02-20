import api from "@/lib/axios";
import { BaseResponse, ListResponse } from "@/lib/services/api.types";

export interface ShortlistedCourse {
    id: string;
    rank: number;
    admission_percentage: number;
    course: {
        id: string;
        name: string;
        start_semesters: string[];
        cost_of_living: string;
        university: {
            id: string;
            name: string;
            address: string;
        };
    };
}

export const getShortlistedCourses = async (): Promise<ListResponse<ShortlistedCourse>> => {
    const response = await api.get<BaseResponse<ListResponse<ShortlistedCourse>>>(
        "shortlisted-courses/"
    );
    return response.data.data;
};

export const getShortlistedCourseById = async (id: string): Promise<ShortlistedCourse> => {
    const response = await api.get<BaseResponse<ShortlistedCourse>>(
        `shortlisted-courses/${id}/`
    );
    return response.data.data;
};