"use client";

import { Button, Space, Table, TableColumnsType } from "antd";
import {
  useAgreedOrderMutation,
  useRejectedOrderMutation,
} from "@/hook/orderHook";
import { IOrderResponse } from "@/interface/order";
import { IStatus } from "@/interface/status";
import { IEmployeeResponse } from "@/interface/employee";
import { useEffect } from "react";
import Link from "next/link";

interface OrderRoutesProps {
  orderRouteData: IOrderResponse[] | undefined;
  showModal: (id:number) => void;
}

const OrderRoutesTable: React.FC<OrderRoutesProps> = ({
  orderRouteData,
  showModal,
}) => {
  const { mutate: agreedOrderMutation } = useAgreedOrderMutation();
  const { mutate: rejectedOrderMutation } = useRejectedOrderMutation();

  useEffect(()=>{

  },[])

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
          {record.routeStep?.isWithdraw ? (
             <Button onClick={() => showModal(record.id)} style={{color:"green"}}>
             Выдать
           </Button>
          ) : (
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
           })} style={{color:"green"}}>
             Согласовать
           </Button>
          )}
         
          <Button onClick={() => rejectedOrderMutation(record.id)} danger>
            Отклонить
          </Button>
          <Link href={`/approval/${record.id}`}>Подробно</Link>
        </Space>
      ),
    },
  ];

  const dataSource = orderRouteData?.map((order) => ({
    ...order,
    key: order.id, // Ensure each item has a unique key
  }));

  return (
    <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }} pagination={{pageSize:10}}/>
  );
};

export default OrderRoutesTable;
