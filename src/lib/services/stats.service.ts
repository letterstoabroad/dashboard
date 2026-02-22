import axiosInstance from "@/lib/axios";

export interface StatsData {
    total_universities: number;
    applied_courses: number;
    expected_intake: string;
    total_admits: number;
}

export const fetchStats = async (): Promise<StatsData> => {
    const response = await axiosInstance.get<{
        status: boolean;
        data: StatsData;
    }>("students/me/stats/");
    return response.data.data;
};