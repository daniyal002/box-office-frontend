'use client';

import { Button, Space, Table } from "antd";
import { toast } from "sonner";
import { IDepartment } from "@/interface/department";
import { useDeleteDepartmentMutation } from "@/hook/departmentHook";

interface DepartmentTableProps {
  departmentData: IDepartment[] | undefined;
  onEdit: (id: number) => void;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ departmentData, onEdit }) => {
  const { mutate: deleteDepartmentMutation } = useDeleteDepartmentMutation();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Подразделение",
      dataIndex: "department_name",
      key: "department_name",
    },
  
    {
      title: "Действия",
      key: "action",
      render: (_: any, record: IDepartment) => (
        <Space size="middle">
          <Button type="dashed" onClick={() => onEdit(record.id as number)}>
            Изменить
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              toast.error("Вы точно хотите удалить подразделение ?", {
                style: {
                  color: "red",
                },
                action: {
                  label: "Удалить",
                  onClick: () => deleteDepartmentMutation(record),
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

  const dataSource = departmentData?.map((department) => ({
    ...department,
    key: department.id, // Ensure each item has a unique key
  }));

  return <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }} pagination={{pageSize:10}}/>;
};

export default DepartmentTable;
