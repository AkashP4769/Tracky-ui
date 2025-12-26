import { App } from '@renderer/models/app'
import React from 'react'
import Btn from '../btn'

interface AppEditorProps {
  editingApp: App
  handleEditCancel: () => void
  handleSave: (updatedApp: any) => void
}

const AppEditor = ({ editingApp, handleEditCancel, handleSave }: AppEditorProps) => {



  return (
    <div className="fixed inset-0 z-20 bg-transparent bg-opacity-50 flex items-center justify-center ">
      <div className="bg-neutral-800 p-6 rounded-lg w-192">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-bold mb-4">Edit App</h2>
          <Btn text="Select .exe" onClick={() => {}} />
        </div>
        {/* Form fields for editing app would go here */}
        {/* Table with two columns without head */}
        <table className="w-full mb-4">
          <tbody>
            <tr className="">
              <td className="py-2 text-neutral-200">Name:</td>
              <td className="py-2 text-neutral-200 border-b border-neutral-600">
                <input className='w-full' type="text" value={editingApp.name}/>
              </td>
            </tr>
            <tr className="">
              <td className="py-2 text-neutral-200">Process Name:</td>
              <td className="py-2 text-neutral-200 border-b border-neutral-600">
                <input className='w-full' type="text" value={editingApp.process_name}/>
              </td>
            </tr>
            <tr className="">
              <td className="py-2 text-neutral-200">Path:</td>
              <td className="py-2 text-neutral-200 border-b border-neutral-600">
                <input className='w-full' type="text" value={editingApp.path}/>
              </td>
            </tr>

            {/* icon */}
            <tr className="">
              <td className="py-2 text-neutral-200">Icon:</td>
              <td className="py-2 text-neutral-200 border-b border-neutral-600">
                <img src={`data:image/png;base64,${editingApp.icon}`} />
              </td>
            </tr>
          </tbody>
        </table>


        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 bg-neutral-600 hover:bg-neutral-500 rounded-lg"
            onClick={handleEditCancel}
          >
            Cancel
          </button>
          <Btn text="Save" onClick={() => {}} />
            
        </div>
      </div>
    </div>
  )
}

export default AppEditor