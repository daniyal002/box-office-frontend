"use client";

import { Button, Space, Table, TableColumnsType } from "antd";
import { toast } from "sonner";
import { IRouteResponse } from "@/interface/route";
import { useDeleteRouteMutation } from "@/hook/routeHook";
import Link from "next/link";

interface RouteTableProps {
  routeData: IRouteResponse[] | undefined;
}

const RouteTable: React.FC<RouteTableProps> = ({
  routeData,
}) => {
  const { mutate: deleteRouteMutation } = useDeleteRouteMutation();

  const columns: TableColumnsType<IRouteResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) => a.id - b.id,
    },

    {
      title: "Маршрут",
      dataIndex: "route_name",
      key: "route_name",
      sorter: (a: any, b: any) =>
        a?.route_name?.localeCompare(b?.route_name, "ru"),
    },
    {
      title: "Действия",
      key: "action",
      render: (_: any, record: IRouteResponse) => (
        <Space size="middle">
          <Link href={`/i/route/${record.id}`}>
            Изменить
          </Link>
          <Button
            type="primary"
            danger
            onClick={() =>
              toast.error("Вы точно хотите удалить маршрут ?", {
                style: {
                  color: "red",
                },
                action: {
                  label: "Удалить",
                  onClick: () =>
                    deleteRouteMutation({
                      id: record.id,
                      route_name: record.route_name,
                    }),
                },
              })
            }
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = routeData?.map((route) => ({
    ...route,
    key: route.id, // Ensure each item has a unique key
  }));

  return <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }} pagination={{pageSize:10}}/>;
};

export default RouteTable;
