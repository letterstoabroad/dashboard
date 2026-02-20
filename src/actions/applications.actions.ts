import {
    fetchApplications,
    ApplicationsPayload,
    ApplicationsResponse,
} from "@/lib/services/applications.service";

export const handleFetchApplications = async (
    payload: ApplicationsPayload
): Promise<{ success: boolean; data?: ApplicationsResponse; error?: string }> => {
    try {
        const data = await fetchApplications(payload);
        return { success: true, data };
    } catch (error: unknown) {
        const message =
            (error as any)?.response?.data?.error ||
            (error as any)?.response?.data?.message ||
            "Failed to fetch applications.";
        return { success: false, error: message };
    }
};