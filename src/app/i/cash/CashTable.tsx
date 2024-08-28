'use client';

import { Button, Space, Table } from "antd";
import { toast } from "sonner";
import { ICash } from "@/interface/cash";
import { useDeleteCashMutation } from "@/hook/cashHook";

interface CashTableProps {
  cashData: ICash[] | undefined;
  onEdit: (id: number) => void;
}

const CashTable: React.FC<CashTableProps> = ({ cashData, onEdit }) => {
  const { mutate: deleteCashMutation } = useDeleteCashMutation();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Касса",
      dataIndex: "cash_name",
      key: "cash_name",
    },
    {
      title: "Сумма в кассе",
      dataIndex: "cash_summ",
      key: "cash_summ",
    },
    {
      title: "Действия",
      key: "action",
      render: (_: any, record: ICash) => (
        <Space size="middle">
          <Button type="dashed" onClick={() => onEdit(record.id as number)}>
            Изменить
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              toast.error("Вы точно хотите удалить кассу ?", {
                style: {
                  color: "red",
                },
                action: {
                  label: "Удалить",
                  onClick: () => deleteCashMutation(record),
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

  const dataSource = cashData?.map((cash) => ({
    ...cash,
    key: cash.id, // Ensure each item has a unique key
  }));

  return <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }} pagination={{pageSize:10}}/>;
};

export default CashTable;
