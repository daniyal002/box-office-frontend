'use client';

import { Button } from "antd";
import { Toaster } from "sonner";
import { useState } from "react";
import { useRouteData } from "@/hook/routeHook";
import RouteTable from "./RouteTable";
import RouteModal from "./RouteModal";

export default function AdminRoute() {
  const { routeData } = useRouteData();
  const [type, setType] = useState<"Добавить" | "Изменить">("Добавить");
  const [routeId, setRouteId] = useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onAdd = () => {
    setRouteId(undefined);
    setType("Добавить");
    setIsModalOpen(true);
  };

  const onEdit = (id: number) => {
    setRouteId(id);
    setType("Изменить");
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <Toaster />
      <RouteModal
        type={type}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        routeId={routeId}
      />
      <Button onClick={onAdd}>Добавить маршрут</Button>
      <RouteTable routeData={routeData} onEdit={onEdit} />
    </div>
  );
}
