"use client";

import { useMenuData } from "@/hook/menuHook";
import { IMenu } from "@/interface/menu";
import {
  getAccessToken,
  getPathFromStorage,
  removeAccessTokenFromStorage,
  removePathFromStorage,
  removeRefreshTokenFromStorage,
} from "@/services/auth-token.service";
import { useQueryClient } from "@tanstack/react-query";
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
  const { push, replace, refresh } = useRouter();
  const token = getAccessToken();
  const [menu, setMenu] = useState<IMenuItem[]>();
  const { menuData, error, isLoading } = useMenuData(token as string);
  const paths = getPathFromStorage();

  useEffect(() => {
    // @ts-ignore
    const pathsData: IMenu[] = JSON.parse(paths);
    let menuItems = pathsData?.map((menu) => ({
      key: menu.id.toString(), // Преобразование в строку для уникальности ключа
      label: menu.label,
      onClick: () => {
        push(`${menu.path}`);
      },
    }));
    const quit = {
      key: (menuItems?.length * 3).toString(),
      label: "Выход",
      onClick: () => {
        removeAccessTokenFromStorage();
        removeRefreshTokenFromStorage();
        removePathFromStorage();
        setMenu([]);
        refresh();
        replace("/login");
      },
    };
    if (menuItems) {
      menuItems = [...menuItems, quit];
    }
    setMenu(menuItems);
  }, [token, menuData, paths]);

  if (path === "/login") return null;

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
        <p style={{ fontSize: "24px", color: "#fff", marginBottom: "0" }}>
          Документооборот
        </p>
      </Header>
    );
  }

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
      }}
    >
      <p style={{ fontSize: "24px", color: "#fff", marginBottom: "0" }}>
        Документооборот
      </p>
      <Menu
        mode="horizontal"
        items={menu}
        theme="dark"
        style={{ width: "40%", display: "flex", justifyContent: "flex-end" }}
      />
    </Header>
  );
}
