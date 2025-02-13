import React from 'react'

const NotCollapsible = () => {
  return (
<SidebarMenuItem key={item.title} className="mb-1">
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={clsx("h-full rounded-xl transition-colors", {
                      "bg-[var(--sidebar-accent)]  text-slate-50 dark:bg-[var(--sidebar-accent)]":
                        pathname == item.url,
                    })}
                  >
                    <item.icon />
                    <div className={`font-medium ${inter.className}`}>
                      {item.title}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
  )
}

export default NotCollapsible
