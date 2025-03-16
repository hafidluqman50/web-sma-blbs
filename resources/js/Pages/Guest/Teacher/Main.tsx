import { ListTeacher } from "@/components/pages/list-teacher";
import GuestLayout from "@/Layouts/Guest/Layout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ReactNode } from "react";
import { Teacher } from "../type";
import { Slash } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type TeacherProps = {
    teachers:Array<Teacher>
}

export default function Page({teachers}: PageProps<TeacherProps>): ReactNode
{
    return(
        <>
            <Head title="Data Guru" />
            <GuestLayout>
                <section id="about-us" className="relative isolate py-40 px-5 pb-5 lg:pb-2 md:pb-3 lg:px-10 min-h-screen sm:py-40 font-outfit">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <Link href="/">
                              Beranda
                          </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                          <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <Link href={route('guest.teachers')}>
                                Data Guru
                            </Link>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                    <div className="w-full mb-5">
                        <p className="text-3xl font-outfit text-center">
                            DATA GURU
                        </p>
                        <p className="text-lg font-outfit text-zinc-500 text-center mt-2">
                            Data para guru di sekolah kami.
                        </p>
                        <hr className="mt-2 border-1 border-sky-500 mb-5" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center gap-5 mb-5">
                        {
                            teachers.map((teacher) => (
                                <ListTeacher
                                    imgSrc={teacher.image}
                                    name={teacher.name}
                                    position={teacher.position}
                                />
                            ))
                        }
                    </div>
                </section>
            </GuestLayout>
        </>
    )
}
