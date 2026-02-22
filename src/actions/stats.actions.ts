import {fetchStats, StatsData} from "@/lib/services/stats.service";


export const handleFetchStats = async (): Promise<{
    success: boolean;
    data?: StatsData;
    error?: string;
}> => {
    try {
        const data = await fetchStats();
        return { success: true, data };
    } catch (error: unknown) {
        const message =
            (error as any)?.response?.data?.error ||
        (error as any)?.response?.data?.message ||
        "Failed to fetch stats.";
        return { success: false, error: message };
    }
};