import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import GuestLayout from "@/Layouts/Guest/Layout";
import { Head, Link } from "@inertiajs/react";
import { ReactNode } from "react";

export default function Page(): ReactNode
{
    const hostName = window.location.hostname == 'smp-blbs-smr.sch.id' ? 'smp-blbs-smr.sch.id' : 'sma-blbs-smr.sch.id'

    const emailHostName = [
        {
            host:'sma-blbs-smr.sch.id',
            email:'smaplusbudiluhur@gmail.com'
        },
        {
            host:'smp-blbs-smr.sch.id',
            email:'smpplusbudiluhur@gmail.com'
        }
    ]

    const findByHostName = emailHostName.find(({host}) => host == hostName)
    return (
        <>
            <Head title="Kontak Kami" />
            <GuestLayout>
                <section id="about-us" className="relative isolate py-40 px-5 pb-5 lg:pb-2 md:pb-3 lg:px-10 min-h-screen sm:py-40 font-outfit">
                    <div className="flex flex-col justify-items-center items-center w-full">
                        <div className="w-full lg:w-2/4 md:w-2/4 sm:w-3/4 mb-5">
                            <p className="text-xl font-outfit text-center">
                                Kontak Kami
                            </p>
                            <hr className="mt-2 border-1 border-sky-500 mb-5" />
                        </div>
                        <Card className="w-full lg:w-2/4 md:w-3/4 sm:w-3/4">
                            <CardHeader>
                                <h3 className="text-2xl font-bold text-center">Detail Kontak</h3>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="w-4 h-4" />
                                        <span>Alamat : Jl. Aziziyah I, Mugirejo, Kec. Sungai Pinang, Kota Samarinda, Kalimantan Timur 75243</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="w-4 h-4" />
                                        <a href="mailto:smaplusbudiluhur@gmail.com" target="_blank">
                                            Email : {findByHostName!.email}
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full lg:w-2/4 md:w-3/4 sm:w-3/4 mt-3 mb-3">
                            <CardHeader>
                                <h3 className="text-2xl font-bold">Leave a Message</h3>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Enter your name" />
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="Enter your email" type="email" />
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Enter your message" className="min-h-[100px]" />
                                    <Button>Send message</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </GuestLayout>
        </>
    )
}
