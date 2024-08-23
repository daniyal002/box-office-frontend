import type { Metadata } from "next";
import AdminSider from "./AdminSider";
import style from './layout.module.scss'

export const metadata: Metadata = {
  title: "Админ-панель",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={style.i}>
      <AdminSider/>
      <div className={style.iChild}>
      {children}

      </div>
    </div>
  );
}
