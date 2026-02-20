import {
    getShortlistedCourses,
    getShortlistedCourseById, ShortlistedCourse,
} from "@/lib/services/course.service";
import {ListResponse} from "@/lib/services/api.types";

export const handleGetShortlistedCourses = async (): Promise<{
    success: boolean;
    data?: ListResponse<ShortlistedCourse>;
    error?: string;
}> => {
    try {
        const data = await getShortlistedCourses();
        return { success: true, data };
    } catch (error: unknown) {
        const message =
            (error as any)?.response?.data?.message || "Failed to fetch shortlisted courses.";
        return { success: false, error: message };
    }
};

export const handleGetShortlistedCourseById = async (
    id: string
): Promise<{
    success: boolean;
    data?: ShortlistedCourse;
    error?: string;
}> => {
    try {
        const data = await getShortlistedCourseById(id);
        return { success: true, data };
    } catch (error: unknown) {
        const message =
            (error as any)?.response?.data?.message || "Failed to fetch course.";
        return { success: false, error: message };
    }
};