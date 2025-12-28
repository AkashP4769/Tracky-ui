import type { App } from '@renderer/models/app'
import { Edit } from 'lucide-react'


// interface AppsTableProps {
//   apps: App[]
// }

interface AppsTableProps {
  apps: {[key: string]: App}
  handleAppEdit: (app: App) => void
  handleTrackingToggle?: (app: App) => void
}


export default function AppsTable({ apps, handleAppEdit, handleTrackingToggle }: AppsTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-600">
      <table className="w-full border-collapse">
        <thead className="bg-neutral-800 text-neutral-200">
          <tr>
            <th className="px-4 py-3 text-left text-xl"></th>
            <th className="px-4 py-3 text-left text-xl">Name</th>
            <th className="px-4 py-3 text-left text-xl">Process</th>
            <th className="px-4 py-3 text-left text-xl">Last used</th>
            <th className="px-4 py-3 text-left text-xl">Date added</th>
            <th className="px-4 py-3 w-6 text-center text-xl">Tracking</th>
          </tr>
        </thead>

        <tbody className="bg-neutral-950 divide-y divide-neutral-600">
          {Object.values(apps).map((app) => (
            <tr
              key={app.id}
              className="hover:bg-neutral-900 transition-colors "
              onClick={() => handleAppEdit(app)}
            >
              {/* Icon */}
              <td className="px-4 py-5">
                {app.icon ? (
                  <img
                    src={`data:image/png;base64,${app.icon}`}
                    alt={app.name}
                    className="h-6 w-6 rounded"
                  />
                ) : (
                  <div className="h-6 w-6 rounded bg-neutral-200" />
                )}
              </td>

              {/* Name */}
              <td className="px-4 py-3 text-lg text-neutral-200">
                {app.name}
              </td>

              {/* Process Name */}
              <td className="px-4 py-3 text-neutral-400">
                {app.process_name}
              </td>

              {/* Last Used */}
              <td className="px-4 py-3 text-neutral-400">
                {app.last_used
                  ? new Date(app.last_used).toLocaleString().split(',')[0]
                  : '—'}
              </td>

              <td className="px-4 py-3 text-neutral-400">
                {app.added_on
                  ? new Date(app.added_on).toLocaleString().split(',')[0]
                  : '—'}
              </td>

              {/* Tracking Enabled */}
              <td className="px-4 py-2 text-center">
                <button
                  onClick={(e) => {e.stopPropagation(); handleTrackingToggle && handleTrackingToggle(app);}}
                  className={`inline-flex items-center rounded-lg px-5 py-2 text-xs font-medium
                    ${
                      app.tracking_enabled
                        ? 'bg-neutral-900 hover:bg-green-500 text-green-400 hover:text-white duration-300'
                        : 'bg-neutral-900 hover:bg-red-500 text-red-400 hover:text-white duration-300'
                    }`}
                >
                  {app.tracking_enabled ? 'Enabled' : 'Disabled'}
                </button>
              </td>

              {/* <td className="px-4 py-2 text-center">
                <button className="text-neutral-400 hover:text-neutral-200 transition-colors">
                  <Edit size={16} />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
