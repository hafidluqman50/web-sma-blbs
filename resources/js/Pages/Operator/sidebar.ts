import { LayoutDashboard, Clipboard, Users, GalleryHorizontalEnd, GraduationCap, Calendar } from "lucide-react";

const itemMenus: string[] = ['articles', 'category-articles']

export const menus = (value?: string): object => {
  return {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: route('operator.dashboard'),
        icon: LayoutDashboard,
        isActive: value == 'dashboard'
      },
      {
        title: "Berita",
        url: route('operator.articles'),
        icon: Clipboard,
        isActive: itemMenus.some((val: string) => value == val),
        items: [
          {
            title: "Data Berita",
            url: route('operator.articles'),
            isActive: value == 'articles',
          },
          {
            title: "Kategori Berita",
            url: route('operator.category-articles'),
            isActive: value == 'category-articles'
          }
        ],
      },
      {
        title: "Galeri",
        url: route('operator.galleries'),
        isActive: value == 'galleries',
        icon: GalleryHorizontalEnd,
      },
      {
        title: "Kalender Akademik",
        url: route('operator.academic-calendars'),
        isActive: value == 'academic-calendars',
        icon: Calendar,
      },
    ],
  }
}
