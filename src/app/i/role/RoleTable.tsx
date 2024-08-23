'use client';

import { Button, Space, Table } from "antd";
import { toast } from "sonner";
import { IRole } from "@/interface/role";
import { useDeleteRoleMutation } from "@/hook/roleHook";

interface RoleTableProps {
  roleData: IRole[] | undefined;
  onEdit: (id: number) => void;
}

const RoleTable: React.FC<RoleTableProps> = ({ roleData, onEdit }) => {
  const { mutate: deleteRoleMutation } = useDeleteRoleMutation();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Роль",
      dataIndex: "role_name",
      key: "role_name",
    },
    {
      title: "Действия",
      key: "action",
      render: (_: any, record: IRole) => (
        <Space size="middle">
          <Button type="dashed" onClick={() => onEdit(record.id as number)}>
            Изменить
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              toast.error("Вы точно хотите удалить роль ?", {
                style: {
                  color: "red",
                },
                action: {
                  label: "Удалить",
                  onClick: () => deleteRoleMutation(record),
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

  const dataSource = roleData?.map((role) => ({
    ...role,
    key: role.id, // Ensure each item has a unique key
  }));

  return <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }}/>;
};

export default RoleTable;
