import api from "@/lib/axios";
import {BaseResponse, ListResponse} from "@/lib/services/api.types";

export interface UpcomingBookedSlotMentorWorkExperience {
    id: string;
    company: string;
    designation: string;
    start_date: string;
    end_date: string | null;
    experience_duration: string;
    currently_working: boolean;
    work_experience_type: string;
    logo: string | null;
}

export interface UpcomingBookedSlotMentorProfile {
    id: string;
    full_name: string;
    profile_picture: string | null;
    latest_work_experience: UpcomingBookedSlotMentorWorkExperience | null;
}

export interface UpcomingBookedSlot {
    id: string;
    availability_slot: {
        id: string;
        start_time: string; // ISO datetime string
        end_time: string;   // ISO datetime string
        duration: number;   // minutes
    };
    mentor_profile: UpcomingBookedSlotMentorProfile;
    order_status: string;
    amount: {
        amount: string;
        currency: string;
    } | null;
}

/**
 * Fetches the next upcoming booked slot for the logged-in student.
 * Endpoint: GET /booked-slot/upcoming/
 * Returns a single object (not a list).
 */
export const getUpcomingBookedSlot = async (): Promise<UpcomingBookedSlot | null> => {
    const response = await api.get<BaseResponse<UpcomingBookedSlot[]>>(
        "booked-slot/upcoming/"
    );
    const results = response.data.data ?? [];
    return results.length > 0 ? results[0] : null;
};