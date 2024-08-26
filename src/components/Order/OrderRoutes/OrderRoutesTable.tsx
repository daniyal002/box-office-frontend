"use client";

import { Button, Space, Table, TableColumnsType } from "antd";
import {
  useAgreedOrderMutation,
  useRejectedOrderMutation,
} from "@/hook/orderHook";
import { IOrderResponse } from "@/interface/order";
import { IStatus } from "@/interface/status";
import { IEmployeeResponse } from "@/interface/employee";

interface OrderRoutesProps {
  orderRouteData: IOrderResponse[] | undefined;
  onEdit: (id: number) => void;
}

const OrderRoutesTable: React.FC<OrderRoutesProps> = ({
  orderRouteData,
  onEdit,
}) => {
  const { mutate: agreedOrderMutation } = useAgreedOrderMutation();
  const { mutate: rejectedOrderMutation } = useRejectedOrderMutation();

  const columns: TableColumnsType<IOrderResponse> = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Дата",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a: any, b: any) =>
        a.created_at.localeCompare(b.created_at, "ru"),
      render: (text: string) => {
        const date = new Date(text);
        return date.toLocaleString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      },
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      sorter: (a: any, b: any) =>
        a.status.status_name.localeCompare(b.status.status_name, "ru"),
      render: (status: IStatus) => status?.status_name,
    },
    {
      title: "Сотрудник",
      dataIndex: "employee",
      key: "employee",
      sorter: (a: any, b: any) =>
        a.employee?.employee_name.localeCompare(
          b.employee?.employee_name,
          "ru"
        ),
      render: (employee: IEmployeeResponse) => employee?.employee_name,
      responsive: ["lg"],
    },
    {
      title: "Сумма",
      dataIndex: "order_summ",
      key: "order_summ",
      sorter: (a: any, b: any) => a.order_summ - b.order_summ,
    },
    {
      title: "Действия",
      key: "action",
      render: (_: any, record: IOrderResponse) => (
        <Space size="middle">
          <Button onClick={() => agreedOrderMutation(record.id)} style={{color:"green"}}>
            Согласовать
          </Button>
          <Button onClick={() => rejectedOrderMutation(record.id)} danger>
            Отклонить
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = orderRouteData?.map((order) => ({
    ...order,
    key: order.id, // Ensure each item has a unique key
  }));

  return (
    <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }} />
  );
};

export default OrderRoutesTable;
