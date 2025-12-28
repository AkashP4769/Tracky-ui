import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

// tracker status enum
enum TrackerStatus {
  Unknown = 'Unknown',
  Online = 'Online',
  Offline = 'Offline'
}

function RouteComponent() {
  
  return (
    <div className='relative h-screen mx-6 my-6'>
      <div className={`absolute inset-0 z-10 flex flex-col`}>
        <h1 className='text-4xl font-bold'>Dashboard</h1>


        {/* Table to show apps */}
        <div className="flex flex-col my-12">
          <div className='flex justify-between my-2'>
            <div className="font-medium text-2xl mb-4">Online apps</div>
            {/* Show the online apps */}
            
          </div>
        </div>
      </div>
      
      
    </div>
  ) 
}
