'use client';

import { Button } from "antd";
import { Toaster } from "sonner";
import { useState } from "react";
import { useUserData } from "@/hook/userHook";
import UserTable from "./UserTable";
import UserModal from "./UserModal";

export default function AdminUser() {
  const { userData } = useUserData();
  const [type, setType] = useState<"Добавить" | "Изменить">("Добавить");
  const [userId, setUserId] = useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onAdd = () => {
    setUserId(undefined);
    setType("Добавить");
    setIsModalOpen(true);
  };

  const onEdit = (id: number) => {
    setUserId(id);
    setType("Изменить");
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <Toaster />
      <UserModal
        type={type}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userId={userId}
      />
      <Button onClick={onAdd}>Добавить пользователя</Button>
      <UserTable userData={userData} onEdit={onEdit} />
    </div>
  );
}
