'use client';

import { Toaster } from "sonner";
import { useRouteData } from "@/hook/routeHook";
import RouteTable from "./RouteTable";
import Link from "next/link";

export default function AdminRoute() {
  const { routeData } = useRouteData();

  return (
    <div className="container">
      <Toaster />
      <Link href='/i/route/newRoute'>Добавить маршрут</Link>
      <RouteTable routeData={routeData} />
    </div>
  );
}
