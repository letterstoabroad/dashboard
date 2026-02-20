import { getBookedSlots, BookedSlot } from "@/lib/services/calendar.service";
import { ListResponse } from "@/lib/services/api.types";

export const handleGetBookedSlots = async (): Promise<{
    success: boolean;
    data?: ListResponse<BookedSlot>;
    error?: string;
}> => {
    try {
        const data = await getBookedSlots();
        return { success: true, data };
    } catch (error: any) {
        const message = error?.response?.data?.message || "Failed to fetch calendar slots.";
        return { success: false, error: message };
    }
};