import { useState } from "react"
import { Link } from "react-router-dom"
import SideBar from "../components/sidebar"
import { api } from "../services/api"
import { toast } from 'react-toastify';
import ModalAddServiceComponent from "../components/modal-add-service";

export default function CreateService() {
  const [name, setName] = useState<string>()
  const [entity, setEntity] = useState<string>()
  const [type, setType] = useState<string>()
  const [returnWhat, setReturnWhat] = useState<string>()
  const [returnWhere, setReturnWhere] = useState<string>()
  const [returnAlways, setReturnAlways] = useState<boolean>(false)
  const [returnIfNull, setReturnIfNull] = useState<boolean>(false)
  const [returnIfNotNull, setReturnIfNotNull] = useState<boolean>(false)
  const [hasPagination, setHasPagination] = useState<boolean>(false)
  const [hasSort, setHasSort] = useState<boolean>(false)
  const [typeSort, setTypeSort] = useState<string>()
  const [sortBy, setSortBy] = useState<string>()
  const [isError, setIsError] = useState<boolean>(false)
  const [descriptionError, setDescriptionError] = useState<string>()
  const [callBefore, setCallBefore] = useState<boolean>(false)
  const [callOrder, setCallOrder] = useState<string>()
  const [openAddServiceModal, setOpenAddServiceModal] = useState<boolean>(false)
  const [services, setServices] = useState<Array<any>>([])
  const [serviceSelected, setServiceSelected] = useState<string>()

  async function onCreate(event: any) {
    try {
      event.preventDefault()

      const service = {
        name,
        entity,
        type,
        returnWhat,
        returnWhere,
        returnAlways,
        returnIfNull,
        returnIfNotNull,
        hasPagination,
        hasSort,
        typeSort,
        sortBy,
        isError,
        descriptionError,
        callBefore,
        callOrder
      }

      await api.post('createService', service)

      return toast.success('Serviço criado', {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
    catch (error: any) {
      return toast.warn(error?.response?.data?.message, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function onDeleteService() {
    setServices(services.filter(service => service._id !== serviceSelected))
  }


  return (
    <>
      <div>

        <SideBar />
        <ModalAddServiceComponent open={openAddServiceModal} setOpen={setOpenAddServiceModal} setServices={setServices} services={services} />


        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

                <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                  <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Criar Serviço</h3>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                      <Link to="/services">
                        <button
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Voltar
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-8">
                  <form className="space-y-8 divide-y divide-gray-200" method="POST" onSubmit={event => onCreate(event)}>
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">


                      <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                        <div className="space-y-6 sm:space-y-5">
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Nome
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setName(e.target.value) }}
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>


                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                            <label htmlFor="entity" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Entidade
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setEntity(e.target.value) }}
                                type="text"
                                name="entity"
                                id="entity"
                                value={entity}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>


                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Tipo
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <select
                                onChange={(e) => { setType(e.target.value) }}
                                value={type}
                                id="type"
                                name="type"
                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              >
                                <option>Selecione o tipo de serviço</option>
                                <option>insert</option>
                                <option>find</option>
                                <option>findById</option>
                                <option>updateById</option>
                                <option>deleteById</option>
                              </select>
                            </div>
                          </div>


                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="returnWhat" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Retornar como
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setReturnWhat(e.target.value) }}
                                type="text"
                                name="returnWhat"
                                id="returnWhat"
                                value={returnWhat}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="returnWhere" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Retornar quando
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setReturnWhere(e.target.value) }}
                                type="text"
                                name="returnWhere"
                                id="returnWhere"
                                value={returnWhere}
                                autoComplete="given-name"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>


                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="returnAlways" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Retornar sempre
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setReturnAlways(!returnAlways) }}
                                id="returnAlways"
                                name="returnAlways"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="returnIfNull" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Retornar se for nullo
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setReturnIfNull(!returnIfNull) }}
                                id="returnIfNull"
                                name="returnIfNull"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="returnIfNotNull" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Retornar se não for nullo
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setReturnIfNotNull(!returnIfNotNull) }}
                                id="returnIfNotNull"
                                name="returnIfNotNull"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>


                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="hasPagination" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Paginação
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setHasPagination(!hasPagination) }}
                                id="hasPagination"
                                name="hasPagination"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="hasSort" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Ordenação
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setHasSort(!hasSort) }}
                                id="hasSort"
                                name="hasSort"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="typeSort" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Tipo de Ordenação
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <select
                                onChange={(e) => { setTypeSort(e.target.value) }}
                                id="typeSort"
                                name="typeSort"
                                value={typeSort}
                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              >
                                <option>Selecione o tipo de ordenação</option>
                                <option value="asc">Crescente</option>
                                <option value="desc">Decrescente</option>
                              </select>
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Ordenar por
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setSortBy(e.target.value) }}
                                type="text"
                                name="sortBy"
                                id="sortBy"
                                value={sortBy}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>



                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="isError" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Retorno é um erro?
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setIsError(!isError) }}
                                id="isError"
                                name="isError"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>


                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="descriptionError" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Retorno erro descrição
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setDescriptionError(e.target.value) }}
                                type="text"
                                name="descriptionError"
                                id="descriptionError"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="callBefore" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Ser chamado antes do serviço principal?
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setCallBefore(!callBefore) }}
                                id="callBefore"
                                name="callBefore"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="callOrder" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Ordem de chamado
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => { setCallOrder(e.target.value) }}
                                type="text"
                                name="callOrder"
                                id="callOrder"
                                value={callOrder}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>


                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Serviços chamados
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-1">
                              <select
                                onChange={(e) => setServiceSelected(e.target.value)}
                                id="services"
                                name="services"
                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              >
                                <option value={0}>Selecione o serviço</option>)
                                {services.map(service => <option value={service._id}>{service.name}</option>)}
                              </select>
                            </div>

                            <div className="mt-1 sm:mt-0 sm:col-span-1">

                              <td className="px-6 whitespace-nowrap text-right text-sm font-medium">

                                <button
                                  onClick={() => setOpenAddServiceModal(true)}
                                  type="button"
                                  className="bg-white py-2 px-4 mx-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Adicionar
                                </button>
                                <button
                                  onClick={() => onDeleteService()}
                                  type="button"
                                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Remover
                                </button>

                              </td>
                            </div>
                          </div>

                        </div>
                      </div>


                    </div>

                    <div className="pt-5">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Limpar dados
                        </button>
                        <button
                          type="submit"
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Criar Serviço
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}