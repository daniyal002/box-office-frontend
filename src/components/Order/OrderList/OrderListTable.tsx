"use client";

import { Button, DatePicker, Space, Table, TableColumnsType } from "antd";
import { toast } from "sonner";
import Link from "next/link";
import { useAgreedOrderMutation, useDeleteOrderMutation } from "@/hook/orderHook";
import { IOrderResponse } from "@/interface/order";
import { IStatus } from "@/interface/status";
import { IEmployeeResponse } from "@/interface/employee";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import locale from "antd/es/date-picker/locale/ru_RU";
import 'dayjs/locale/ru'

dayjs.extend(isBetween); // Extend dayjs with the isBetween plugin
dayjs.extend(isSameOrAfter); // Extend dayjs with the isBetween plugin
dayjs.extend(isSameOrBefore); // Extend dayjs with the isBetween plugin
dayjs.locale('ru')
import { useState } from "react";
import { OrderStatus } from "@/helper/orderStatusEnum";

interface OrderListProps {
  OrderData: IOrderResponse[] | undefined;
}

const OrderListTable: React.FC<OrderListProps> = ({ OrderData }) => {
  const { mutate: deleteOrderMutation } = useDeleteOrderMutation();
  const {mutate: agreedOrderMutation} = useAgreedOrderMutation()

  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

  const handleDateChange = (dates: [dayjs.Dayjs, dayjs.Dayjs] | null, dateStrings: [string, string]) => {
    setDateRange(dates);
  };

  const filteredData = OrderData?.filter(order => {
    if (!dateRange) return true;

    const orderDate = dayjs(order.created_at);
    return orderDate.isSameOrAfter(dateRange[0], 'day') && orderDate.isSameOrBefore(dateRange[1], 'day');
  });

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
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <DatePicker.RangePicker
            // @ts-ignore
            onChange={handleDateChange}
            style={{ width: 188, marginBottom: 8 }}
            format="DD-MM-YYYY"
            locale={locale}
          />
        </div>
      ),
      filterIcon: () => <span>📅</span>,
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
          {record.status.orderStatus !== OrderStatus.WITHDRAW && (
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
          )}
           {(record.current_route_step_id === null && record.status.orderStatus !== OrderStatus.WITHDRAW) && (
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
           )
          }

        </Space>
      ),
    },
  ];

  const dataSource = filteredData?.map((order) => ({
    ...order,
    key: order.id, // Ensure each item has a unique key
  }));

  return (
    <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }} pagination={{pageSize:10}}/>
  );
};

export default OrderListTable;
