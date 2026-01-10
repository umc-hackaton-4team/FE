import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { API_ENDPOINTS } from "../api/endpoints";
import type { User } from "../types/user";
import type { ApiResponse } from "../types/api";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<ApiResponse<User>>(API_ENDPOINTS.USERS.ME);
        setUser(res.data.data);
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
        setError("유저 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading, error };
};
