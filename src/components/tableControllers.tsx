import { useState } from "react";
import ModalDeleteComponent from "./modal-delete";

export interface TableControllersProps {
  controllers: Array<any>
}

export default function TableControllers({ controllers }: TableControllersProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [id, setId] = useState<string>('')

  return (
    <>
      <ModalDeleteComponent open={open} setOpen={setOpen} idItem={id} method="deleteController" />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rota
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Método
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Editar</span>
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Excluir</span>
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {controllers.map((controller, controllerId) => (
                    <tr key={controllerId} className={controllerId % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{controller.route}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{controller.method}</td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Editar
                        </a>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#"

                          onClick={() => {
                            setOpen(true)
                            setId(controller._id)
                          }}

                          className="text-indigo-600 hover:text-indigo-900">
                          Excluir
                        </a>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}