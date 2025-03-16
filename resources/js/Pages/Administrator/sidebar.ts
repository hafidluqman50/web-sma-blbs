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
        url: route('administrator.dashboard'),
        icon: LayoutDashboard,
        isActive: value == 'dashboard'
      },
      {
        title: "Berita",
        url: route('administrator.articles'),
        icon: Clipboard,
        isActive: itemMenus.some((val: string) => value == val),
        items: [
          {
            title: "Data Berita",
            url: route('administrator.articles'),
            isActive: value == 'articles',
          },
          {
            title: "Kategori Berita",
            url: route('administrator.category-articles'),
            isActive: value == 'category-articles'
          }
        ],
      },
      {
        title: "Galeri",
        url: route('administrator.galleries'),
        isActive: value == 'galleries',
        icon: GalleryHorizontalEnd,
      },
      {
        title: "Data Guru",
        url: route('administrator.teachers'),
        isActive: value == 'teachers',
        icon: GraduationCap,
      },
      {
        title: "Kalender Akademik",
        url: route('administrator.academic-calendars'),
        isActive: value == 'academic-calendars',
        icon: Calendar,
      },
      {
        title: "User Management",
        url: "#",
        isActive: value == 'user-management',
        icon: Users,
      },
    ],
  }
}
