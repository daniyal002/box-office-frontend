'use client';

import { Button } from "antd";
import { Toaster } from "sonner";
import RoleTable from "./RoleTable";
import RoleModal from "./RoleModal";
import { useEffect, useState } from "react";
import { useRoleData } from "@/hook/roleHook";

export default function AdminRole() {
  const { roleData } = useRoleData();
  const [type, setType] = useState<"Добавить" | "Изменить">("Добавить");
  const [roleId, setRoleId] = useState<number>();
useEffect(()=>{
console.log(roleData)

},[roleData])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onAdd = () => {
    setRoleId(undefined);
    setType("Добавить");
    setIsModalOpen(true);
  };

  const onEdit = (id: number) => {
    setRoleId(id);
    setType("Изменить");
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <Toaster />
      <RoleModal
        type={type}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        roleId={roleId}
      />
      <Button onClick={onAdd}>Добавить роль</Button>
      <RoleTable roleData={roleData} onEdit={onEdit} />
    </div>
  );
}
