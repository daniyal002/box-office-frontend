'use client';

import { Button, Space, Table } from "antd";
import { toast } from "sonner";
import { IStatus } from "@/interface/status";
import { useDeleteStatusMutation } from "@/hook/statusHook";

interface StatusTableProps {
  statusData: IStatus[] | undefined;
  onEdit: (id: number) => void;
}

const StatusTable: React.FC<StatusTableProps> = ({ statusData, onEdit }) => {
  const { mutate: deleteStatusMutation } = useDeleteStatusMutation();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Статус",
      dataIndex: "status_name",
      key: "status_name",
    },
    {
      title: "Действия",
      key: "action",
      render: (_: any, record: IStatus) => (
        <Space size="middle">
          <Button type="dashed" onClick={() => onEdit(record.id as number)}>
            Изменить
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              toast.error("Вы точно хотите удалить должность ?", {
                style: {
                  color: "red",
                },
                action: {
                  label: "Удалить",
                  onClick: () => deleteStatusMutation(record),
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

  const dataSource = statusData?.map((status) => ({
    ...status,
    key: status.id, // Ensure each item has a unique key
  }));

  return <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }} pagination={{pageSize:10}}/>;
};

export default StatusTable;
