'use client';

import { Button } from "antd";
import { Toaster } from "sonner";
import {  useState } from "react";
import { useStatusData } from "@/hook/statusHook";
import StatusTable from "./StatusTable";
import StatusModal from "./StatusModal";

export default function AdminRole() {
  const { statusData } = useStatusData();
  const [type, setType] = useState<"Добавить" | "Изменить">("Добавить");
  const [statusId, setStatusId] = useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onAdd = () => {
    setStatusId(undefined);
    setType("Добавить");
    setIsModalOpen(true);
  };

  const onEdit = (id: number) => {
    setStatusId(id);
    setType("Изменить");
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <Toaster />
      <StatusModal
        type={type}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        statusId={statusId}
      />
      <Button onClick={onAdd}>Добавить статус</Button>
      <StatusTable statusData={statusData} onEdit={onEdit} />
    </div>
  );
}
