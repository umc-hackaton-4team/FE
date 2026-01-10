import { useEffect, useState } from "react";
import { api } from "../api/axios";

interface User {
  id: number;
  email: string;
  name: string;
  profileImage: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        // 응답 구조: { success: true, data: { name: "홍길동", ... } }
        setUser(res.data.data);
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading };
};
