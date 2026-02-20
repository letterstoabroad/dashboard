import api from "@/lib/axios";
import { BaseResponse, ListResponse } from "@/lib/services/api.types";

export interface BookedSlot {
    id: string;
    name: string; // Student name for the title
    availability_slot: {
        id: string;
        start_time: string; // Used for calendar positioning
        end_time: string;
    };
    // Razorpay status used for 'is_complete' logic
    order_status: string;
}

/**
 * Service to fetch the booked slots for the calendar
 */
export const getBookedSlots = async (): Promise<ListResponse<BookedSlot>> => {
    const response = await api.get<BaseResponse<ListResponse<BookedSlot>>>(
        "booked-slot/"
    );
    return response.data.data;
};