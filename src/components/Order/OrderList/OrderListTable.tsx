"use client";

import { Button, Space, Table, TableColumnsType } from "antd";
import { toast } from "sonner";
import Link from "next/link";
import { useAgreedOrderMutation, useDeleteOrderMutation } from "@/hook/orderHook";
import { IOrderResponse } from "@/interface/order";
import { IStatus } from "@/interface/status";
import { IEmployeeResponse } from "@/interface/employee";

interface OrderListProps {
  OrderData: IOrderResponse[] | undefined;
  onEdit: (id: number) => void;
}

const OrderListTable: React.FC<OrderListProps> = ({ OrderData, onEdit }) => {
  const { mutate: deleteOrderMutation } = useDeleteOrderMutation();
  const {mutate: agreedOrderMutation} = useAgreedOrderMutation()

  const columns: TableColumnsType<IOrderResponse> = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) =>
        a.id - b.id,
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
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
      },
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      sorter: (a: any, b: any) =>
        a.status.status_name.localeCompare(
          b.status.status_name,
          "ru"
        ),
      render: (status: IStatus) => status?.status_name,
    },
    {
      title: "Сотрудник",
      dataIndex: "employee",
      key: "employee",
      sorter: (a: any, b: any) =>
        a.employee?.employee_name.localeCompare(b.employee?.employee_name, "ru"),
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
          <Link href={`/order/${record.id}`}>Изменить</Link>
          <Button
            type="primary"
            danger
            onClick={() =>
              toast.error("Вы точно хотите удалить заявку ?", {
                style: {
                  color: "red",
                },
                action: {
                  label: "Удалить",
                  onClick: () => deleteOrderMutation({employee_id:record.employee.id,current_route_step_id:record.current_route_step_id,order_description:record.order_description,order_note:record.order_note as string,order_summ:record.order_summ,id:record.id}),
                },
              })
            }
          >
            Удалить
          </Button>
          {record.current_route_step_id === null && (
            <Button onClick={() => agreedOrderMutation({
              id:record.id,
              current_route_step_id:record.current_route_step_id,
              employee_id:record.employee.id,
              order_description:record.order_description,
              order_note:record.order_note as string,
              order_summ:record.order_summ,
              route_id:record.route.id,
              status_id:record.status.id,
              user_id:record.user.id,
            })}>Повтор</Button>
          )}
        </Space>
      ),
    },
  ];

  const dataSource = OrderData?.map((order) => ({
    ...order,
    key: order.id, // Ensure each item has a unique key
  }));

  return (
    <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }} />
  );
};

export default OrderListTable;
