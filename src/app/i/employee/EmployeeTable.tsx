"use client";

import { Button, Space, Table, TableColumnsType } from "antd";
import { toast } from "sonner";
import { IEmployeeResponse } from "@/interface/employee";
import { IPost } from "@/interface/post";
import { useDeleteEmployeeMutation } from "@/hook/employeeHook";
import { IDepartment } from "@/interface/department";

interface EmployeeTableProps {
  employeeData: IEmployeeResponse[] | undefined;
  onEdit: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employeeData,
  onEdit,
}) => {
  const { mutate: deleteEmployeeMutation } = useDeleteEmployeeMutation();

  const columns: TableColumnsType<IEmployeeResponse> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) => a.id - b.id,
    },

    {
      title: "Наименование",
      dataIndex: "employee_name",
      key: "employee_name",
      sorter: (a: any, b: any) =>
        a?.employee_name?.localeCompare(b?.employee_name, "ru"),
    },
    {
      title: "Подразделение",
      dataIndex: "department",
      key: "department",
      sorter: (a: any, b: any) =>
        a?.department?.department_name?.localeCompare(
          b?.department?.department_name,
          "ru"
        ),
      render: (department: IDepartment) => department?.department_name, // Or any other suitable React element
    },
    {
      title: "Должность",
      dataIndex: "post",
      key: "post",
      sorter: (a: any, b: any) =>
        a?.post?.post_name?.localeCompare(b?.post?.post_name, "ru"),
      render: (post: IPost) => post?.post_name, // Or any other suitable React element
    },
    {
      title: "Действия",
      key: "action",
      render: (_: any, record: IEmployeeResponse) => (
        <Space size="middle">
          <Button type="dashed" onClick={() => onEdit(record.id as number)}>
            Изменить
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              toast.error("Вы точно хотите удалить сотрудника ?", {
                style: {
                  color: "red",
                },
                action: {
                  label: "Удалить",
                  onClick: () =>
                    deleteEmployeeMutation({
                      id: record.id,
                      department_id: record.department.id,
                      dismissed: record.dismissed,
                      employee_name: record.employee_name,
                      post_id: record.post.id,
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

  const dataSource = employeeData?.map((employee) => ({
    ...employee,
    key: employee.id, // Ensure each item has a unique key
  }));

  return <Table dataSource={dataSource} columns={columns} scroll={{ x: 200 }} pagination={{pageSize:10}}/>;
};

export default EmployeeTable;
