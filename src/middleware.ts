import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { IMenu } from './interface/menu';

// Функция для получения разрешенных путей
async function getAllowedPaths() {
  const path = cookies().get("path");
  if (!path) return null;

  try {
    const paths:IMenu[] = JSON.parse(path.value);
    const allowedPaths = paths.map(menu => menu.path)
    return allowedPaths;
  } catch (error) {
    console.error('Ошибка при получении меню:', error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const allowedPaths = await getAllowedPaths();
  const currentPath = req.nextUrl.pathname;
  if(allowedPaths === null) return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  if (!allowedPaths || !allowedPaths.includes(currentPath)) {
    // Серверное перенаправление на страницу 403
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  // Если все проверки пройдены, продолжаем выполнение запроса
  return NextResponse.next();
}

// Указываем, что middleware должен работать на всех маршрутах
export const config = {
  matcher: ['/((?!login|403|_next|static|order/*|i/*).*)'], // Исключаем страницы логина, ошибки 403 и статические файлы
};
