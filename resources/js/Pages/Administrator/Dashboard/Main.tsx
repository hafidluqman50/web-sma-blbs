import {
  Card,
  CardContent
} from "@/components/ui/card"
import AdministratorLayout from "@/Layouts/Administrator/Layout"
import { Head } from "@inertiajs/react"
import { menus } from "@/Pages/Administrator/sidebar"

export default function Page() {
  return (
    <>
    <Head title="Dashboard" />
    <AdministratorLayout data={menus('dashboard')}>
      <Card className="h-20">
        <CardContent className="p-3 text-center">
          <p className="text-center">Selamat Datang Di Dashboard Administrator!</p>
        </CardContent>
      </Card>
    </AdministratorLayout>
    </>
  )
}
