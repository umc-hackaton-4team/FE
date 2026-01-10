import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import Slot from "../../assets/icons/slot.svg";

type User = {
  id: number;
  name: string;
};

export default function PickLoadingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.get("/users/me").then((res) => {
      setUser(res.data.data);
    });

    // TODO: 결과 페이지 구현 후 활성화
    // const timer = setTimeout(() => {
    //   navigate("/pick/result");
    // }, 2500);
    // return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FFFDF6] px-5">
      <img src={Slot} alt="slot" className="h-[260px] w-[260px]" />

      <p className="mt-6 text-center text-[24px] font-semibold">
        오늘의 행복을 <br />
        가져다 줄 사탕을 뽑는 중…
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {user?.name ?? "User"}님을 위한 소확행을 준비하고 있어요
      </p>
    </div>
  );
}
