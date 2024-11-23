import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export interface DashboardHeaderPath {
    title: string;
    link: string;
}
type HeaderDashboardProps = {
    headerPath?: DashboardHeaderPath[];
};
export default function HeaderDashboard({ headerPath }: HeaderDashboardProps) {
    const breadcrumbsItems = () =>
        headerPath?.map((breadcrumb, index) => (
            <>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={breadcrumb.link}>
                        {breadcrumb.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {index < headerPath.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                )}
            </>
        ));
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className=" h-4" />
                <Breadcrumb>
                    <BreadcrumbList>{breadcrumbsItems()}</BreadcrumbList>
                </Breadcrumb>
            </header>
        </>
    );
}
