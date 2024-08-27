"use client";

import { Button, Space, Table, TableColumnsType } from "antd";
import { IOrderResponse } from "@/interface/order";
import { ICash } from "@/interface/cash";

interface CashProps {
    cashData: ICash[] | undefined;
  onDeposite: (id: number) => void;
  onWithdraw: (id: number) => void;
}

const CashTable: React.FC<CashProps> = ({ cashData, onDeposite, onWithdraw }) => {

  const columns: TableColumnsType<ICash> = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) =>
        a.id - b.id,
    },
    {
      title: "Касса",
      dataIndex: "cash_name",
      key: "cash_name",
      sorter: (a: any, b: any) =>
        a.cash_name.localeCompare(
          b.cash_name,
          "ru"
        ),
    },
    {
      title: "Сумма",
      dataIndex: "cash_summ",
      key: "cash_summ",
      sorter: (a: any, b: any) => a.cash_summ - b.cash_summ,
    },
    {
      title: "Действия",
      key: "action",
      render: (_: any, record: ICash) => (
        <Space size="middle">
          <Button onClick={() => onDeposite(record.id as number)}>Внесение ДС</Button>
          <Button onClick={() => onWithdraw(record.id as number)}>Выдача ДС</Button>
        </Space>
      ),
    },
  ];

  const dataSource = cashData?.map((cash) => ({
    ...cash,
    key: cash.id, // Ensure each item has a unique key
  }));

  return (
    <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }} />
  );
};

export default CashTable;
