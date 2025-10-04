import { siteMetadata } from "@/app/siteMetaData";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { BookTextIcon } from "@/components/ui/book-text";
import { FoldersIcon } from "@/components/ui/folders";
import { PlusIcon } from "@/components/ui/plus";
import Link from "next/link";
import Logo from "../../Logo";
import { NavUser } from "../../ui/nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navItems = [
    {
      title: "Blogs Management",
      items: [
        { title: "All Blogs", url: "/dashboard/blogs", icon: BookTextIcon },
        { title: "Add Blog", url: "/dashboard/blogs/add-blog", icon: PlusIcon },
      ],
    },
    {
      title: "Projects Management",
      items: [
        {
          title: "All Projects",
          url: "/dashboard/projects",
          icon: FoldersIcon,
        },
        {
          title: "Add Project",
          url: "/dashboard/projects/add-project",
          icon: PlusIcon,
        },
      ],
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span>{siteMetadata.author}</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {navItems.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        {" "}
                        {item.icon && <item.icon size={18} />} {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
