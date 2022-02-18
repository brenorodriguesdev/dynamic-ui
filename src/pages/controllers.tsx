import SideBar from "../components/sidebar"
import TableControllers from "../components/tableControllers"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../services/api"

export default function Controllers() {
  const [controllers, setControllers] = useState<any>([])

  useEffect(() => {
    async function getAllControllers() {
      api.get('getAllControllers')
        .then(({ data }) => {
          setControllers(data)
        })
    }
    getAllControllers()
  }, [])

  return (
    <>

      <div>

        <SideBar />

        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

                <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                  <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Controladores</h3>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                      <Link to="/createController">
                        <button
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Criar novo controlador
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-8">
                  <TableControllers controllers={controllers} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}