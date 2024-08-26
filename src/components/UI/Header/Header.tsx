"use client";

import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const { Header, Content, Footer } = Layout;

interface MenuItem {
  key: number;
  label: string;
  onClick: () => void;
}

export default function Head() {
  const { push } = useRouter();

  const menuItems: MenuItem[] = [
    {
      key: 1,
      label: "Заявки",
      onClick: () => {
        push("/");
      },
    },
    {
      key: 2,
      label: "Кассы",
      onClick: () => {
        push("/");
      },
    },
    {
      key: 3,
      label: "Админ",
      onClick: () => {
        push("/i");
      },
    },
  ];
  return (
    <Header style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
      <p style={{ fontSize: "24px", color:"#fff", marginBottom:"0" }}>Документооборот</p>
      <Menu  mode="horizontal" items={menuItems} theme="dark" style={{width:"100%", display:"flex", justifyContent:"flex-end"}} />;
    </Header>
  );
}
