import '../assets/global.css'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Providers } from '@renderer/components/providers'

// import { SidebarTrigger } from '@renderer/components/ui/sidebar'
import { SidebarInset } from '@renderer/components/ui/sidebar'
// import { AppSidebar } from '@renderer/components/app-asidebar'

import Appbar from '@renderer/components/myui/appbar'
import  Authprovider from '@renderer/components/authprovider'




export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Authprovider>
        <div className='flex w-screen h-screen overflow-hidden'>
          {/* Appbar */}
          <Appbar/>
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </div>
      </Authprovider>
    </Providers>
  )
})
