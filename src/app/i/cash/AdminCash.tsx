'use client';

import { Button } from "antd";
import { Toaster } from "sonner";
import {useState } from "react";
import { useCashData } from "@/hook/cashHook";
import CashTable from "./CashTable";
import CashModal from "./CashModal";

export default function AdminCash() {
  const { cashData } = useCashData();
  const [type, setType] = useState<"Добавить" | "Изменить">("Добавить");
  const [cashId, setcashId] = useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onAdd = () => {
    setcashId(undefined);
    setType("Добавить");
    setIsModalOpen(true);
  };

  const onEdit = (id: number) => {
    setcashId(id);
    setType("Изменить");
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <Toaster />
      <CashModal
        type={type}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        cashId={cashId}
      />
      <Button onClick={onAdd}>Добавить кассу</Button>
      <CashTable cashData={cashData} onEdit={onEdit} />
    </div>
  );
}
