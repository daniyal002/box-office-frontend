'use client'
import { Layout, Menu, Drawer, Button } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { MenuOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

interface MenuItem {
  key: string;
  label: string;
  onClick: () => void;
}

export default function AdminSider() {
  const { push } = useRouter();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const SiderItems: MenuItem[] = [
    {
      key: "1",
      label: "Сотрудники",
      onClick: () => {
        push("/i/employee");
        setVisible(false)
      },
    },
    {
      key: "2",
      label: "Пользователи",
      onClick: () => {
        push("/i/user");
        setVisible(false)

      },
    },
    {
      key: "3",
      label: "Кассы",
      onClick: () => {
        push("/i/cash");
        setVisible(false)

      },
    },
    {
      key: "4",
      label: "Должности",
      onClick: () => {
        push("/i/post");
        setVisible(false)

      },
    },
    {
      key: "5",
      label: "Подразделения",
      onClick: () => {
        push("/i/department");
        setVisible(false)

      },
    },
    {
      key: "6",
      label: "Роли",
      onClick: () => {
        push("/i/role");
        setVisible(false)

      },
    },
    {
      key: "7",
      label: "Статусы",
      onClick: () => {
        push("/i/status");
        setVisible(false)

      },
    },
    {
      key: "8",
      label: "Маршруты",
      onClick: () => {
        push("/i/route");
        setVisible(false)

      },
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Ширина экрана <= 768px считается мобильной
    };

    handleResize(); // Инициализация
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderMenu = () => (
    <Menu
      mode="vertical"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0 }}
      items={SiderItems}
    />
  );

  return (
    <>
      {isMobile ? (
        <>
          <Button
            icon={<MenuOutlined width={1}   />}
            onClick={() => setVisible(true)}
            type='primary'
            style={{ marginBottom: 16, padding: "20px" }}
          />
          <Drawer
            title="Меню"
            placement="left"
            onClose={() => setVisible(false)}
            visible={visible}
            bodyStyle={{ padding: 0 }}
          >
            {renderMenu()}
          </Drawer>
        </>
      ) : (
        <Sider width={200} style={{ background: "#fff" }}>
          {renderMenu()}
        </Sider>
      )}
    </>
  );
}
