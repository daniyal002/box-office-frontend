"use client";

import { Button, Space, Table, TableColumnsType } from "antd";
import { toast } from "sonner";
import { IEmployeeResponse } from "@/interface/employee";
import { IUserResponse } from "@/interface/user";
import { IRole } from "@/interface/role";
import { useDeleteUserMutation } from "@/hook/userHook";

interface UserTableProps {
  userData: IUserResponse[] | undefined;
  onEdit: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  userData,
  onEdit,
}) => {
  const { mutate: deleteUserMutation } = useDeleteUserMutation();

  const columns: TableColumnsType<IUserResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) => a.id - b.id,
    },

    {
      title: "Логин",
      dataIndex: "user_name",
      key: "user_name",
      sorter: (a: any, b: any) =>
        a?.user_name?.localeCompare(b?.user_name, "ru"),
    },
    {
      title: "ФИО",
      dataIndex: "employee",
      key: "employee",
      sorter: (a: any, b: any) =>
        a?.employee?.employee_name?.localeCompare(
          b?.employee?.employee_name,
          "ru"
        ),
      render: (employee: IEmployeeResponse) => employee?.employee_name, // Or any other suitable React element
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      sorter: (a: any, b: any) =>
        a?.role?.role_name?.localeCompare(b?.role?.role_name, "ru"),
      render: (role: IRole) => role?.role_name, // Or any other suitable React element
    },
    {
      title: "Действия",
      key: "action",
      render: (_: any, record: IUserResponse) => (
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
                  onClick: () =>
                    deleteUserMutation({
                      id: record.id,
                      password: record.password,
                      employee_id: record.employee.id,
                      user_name: record.user_name,
                      role_id: record.role.id as number,
                    }),
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

  const dataSource = userData?.map((user) => ({
    ...user,
    key: user.id, // Ensure each item has a unique key
  }));

  return <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }} pagination={{pageSize:10}}/>;
};

export default UserTable;
