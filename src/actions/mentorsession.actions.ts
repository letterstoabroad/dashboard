import {
    getUpcomingBookedSlot,
    UpcomingBookedSlot,
} from "@/lib/services/mentorsession.service";

interface ActionResult<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export const handleGetUpcomingBookedSlot = async (): Promise<
    ActionResult<UpcomingBookedSlot | null>
> => {
    try {
        const data = await getUpcomingBookedSlot();
        return { success: true, data };
    } catch (error) {
        console.error("handleGetUpcomingBookedSlot error:", error);
        return { success: false, error: "Failed to fetch upcoming session."+error };
    }
};