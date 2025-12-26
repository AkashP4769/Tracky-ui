import { App } from '@renderer/models/app'
import React, { useEffect, useState } from 'react'
import Btn from '../btn'

interface AppEditorProps {
  editingApp: App
  handleEditCancel: () => void
  handleSave: (updatedApp: any) => void
}

const AppEditor = ({ editingApp, handleEditCancel, handleSave }: AppEditorProps) => {

  const [draft, setDraft] = useState<App>(editingApp)

  useEffect(() => {
    setDraft(editingApp)
  }, [editingApp])

  async function pickApp() {
    const result = await window.electron.ipcRenderer.invoke('select-exe')
    if (!result) return

    console.log('Picked app:', result)

    setDraft((prev) => ({
      ...prev,
      name: result.name.replace('.exe', ''),
      process_name: result.name,
      path: result.path,
      icon: result.icon,
    }))
  }

  function handleSaveClick() {
    handleSave(draft)
  }

  return (
    <div className="fixed inset-0 z-20 bg-transparent bg-opacity-50 flex items-center justify-center ">
      <div className="bg-neutral-800 p-6 rounded-lg w-192">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-bold mb-4">Edit App</h2>
          <Btn text="Select .exe" onClick={pickApp} />
        </div>
        {/* Form fields for editing app would go here */}
        {/* Table with two columns without head */}
        <table className="w-full mb-4">
          <tbody>
            <tr className="">
              <td className="py-2 text-neutral-200">Name:</td>
              <td className="py-2 text-neutral-200 border-b border-neutral-600">
                <input className='w-full' type="text" value={draft.name} onChange={(e) => setDraft({...draft, name: e.target.value})} />
              </td>
            </tr>
            <tr className="">
              <td className="py-2 text-neutral-200">Process Name:</td>
              <td className="py-2 text-neutral-200 border-b border-neutral-600">
                <input className='w-full' type="text" value={draft.process_name} onChange={(e) => setDraft({...draft, process_name: e.target.value})} />
              </td>
            </tr>
            <tr className="">
              <td className="py-2 text-neutral-200">Path:</td>
              <td className="py-2 text-neutral-200 border-b border-neutral-600">
                <input className='w-full' type="text" value={draft.path} onChange={(e) => setDraft({...draft, path: e.target.value})} />
              </td>
            </tr>

            {/* icon */}
            <tr className="">
              <td className="py-2 text-neutral-200">Icon:</td>
              <td className="py-2 text-neutral-200 border-b border-neutral-600">
                <img src={`data:image/png;base64,${draft.icon}`} />
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
          <Btn text="Save" onClick={handleSaveClick} />
            
        </div>
      </div>
    </div>
  )
}

export default AppEditor