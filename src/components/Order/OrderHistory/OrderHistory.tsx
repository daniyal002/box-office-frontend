import { IHistory } from '@/interface/history'
import { Table, TableColumnsType } from 'antd';
import React from 'react'

interface Props{
    historyData: IHistory[]
}

export default function OrderHistory({historyData}:Props) {

    const columns: TableColumnsType<IHistory> = [
        {
          title: "Сообщение",
          dataIndex: "message",
          key: "message",
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
      ];
    
      const dataSource = historyData?.map((history) => ({
        ...history,
        key: history.id, // Ensure each item has a unique key
      }));

  return (

    <Table dataSource={dataSource} columns={columns} />
  )
}
