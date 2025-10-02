import siteMetadata from "@/app/siteMetaData";
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

import Link from "next/link";
import Logo from "../../Logo";
import { NavUser } from "../../ui/nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navItems = [
    {
      title: "Blogs Management",
      items: [
        { title: "All Blogs", url: "/dashboard/blogs" },
        { title: "Add Blog", url: "/dashboard/blogs/add-blog" },
      ],
    },
    {
      title: "Projects Management",
      items: [
        { title: "All Projects", url: "/dashboard/projects" },
        { title: "Add Project", url: "/dashboard/projects/add-project" },
      ],
    },
    {
      title: "About Me",
      items: [{ title: "About", url: "/dashboard/about" }],
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
                      <Link href={item.url}>{item.title}</Link>
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
