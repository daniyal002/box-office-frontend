"use client";

import { useMenuData } from "@/hook/menuHook";
import { IMenu } from "@/interface/menu";
import { getAccessToken } from "@/services/auth-token.service";
import { Layout, Menu, Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Header } = Layout;

interface IMenuItem {
  key: string; // Обновлено на строку для уникальности ключа
  label: string;
  onClick: () => void;
}

export default function Head() {
  const path = usePathname();
  const { push } = useRouter();
  const token = getAccessToken()
  const {  menuData, error, isLoading, isSuccess,status } = useMenuData(token as string);
  const [menu, setMenu] = useState<IMenuItem[]>();

  useEffect(() => {
    if (token) {
      console.log(path)
      console.log(isSuccess)
      console.log(menuData)
      const menuItems = menuData?.map((menu) => ({
        key: menu.id.toString(), // Преобразование в строку для уникальности ключа
        label: menu.label,
        onClick: () => {
          push(`${menu.path}`);
        },
      }));
      setMenu(menuItems);
    }
    console.log(token)
    console.log(menuData)

  }, [token,isSuccess]);


  if (isLoading) {
    return (
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "64px",
        }}
      >
        <Spin size="large" />
      </Header>
    );
  }

  if (error) {
    return (
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "64px",
        }}
      >
        <p style={{ color: "#fff" }}>Ошибка загрузки меню</p>
      </Header>
    );
  }

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <p style={{ fontSize: "24px", color: "#fff", marginBottom: "0" }}>
        Документооборот
      </p>
      {menu && (
        <Menu
        mode="horizontal"
        items={menuData?.map(item => ({
          key: item.id,
          label: item.label,
          onClick: () => {
            push(`${item.path}`);
          },
        }))}
        theme="dark"
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      />
      )}
      
    </Header>
  );
}
