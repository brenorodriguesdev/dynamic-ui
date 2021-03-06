import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ModalAddPropertyComponent from "../components/modal-add-property"
import ModalAddServiceComponent from "../components/modal-add-service"
import ModalAddValidatorComponent from "../components/modal-add-validator"
import ModalUpdatePropertyComponent from "../components/modal-update-property"
import ModalUpdateValidatorComponent from "../components/modal-update-validator"
import SideBar from "../components/sidebar"
import { api } from "../services/api"

export default function CreateController() {
  const [route, setRoute] = useState<string>()
  const [method, setMethod] = useState<string>()
  const [tag, setTag] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [descriptionResult, setDescriptionResult] = useState<string>()
  const [validators, setValidators] = useState<Array<any>>([])
  const [properties, setProperties] = useState<Array<any>>([])
  const [services, setServices] = useState<Array<any>>([])



  const [openAddServiceModal, setOpenAddServiceModal] = useState<boolean>(false)

  const [openAddPropertyModal, setOpenAddPropertyModal] = useState<boolean>(false)
  const [openUpdatePropertyModal, setOpenUpdatePropertyModal] = useState<boolean>(false)

  const [openAddValidatorModal, setOpenAddValidatorModal] = useState<boolean>(false)
  const [openUpdateValidatorModal, setOpenUpdateValidatorModal] = useState<boolean>(false)

  const [propertySelected, setPropertySelected] = useState<string>()
  const [property, setProperty] = useState<any>()
  const [validatorSelected, setValidatorSelected] = useState<string>()
  const [validator, setValidator] = useState<any>()
  const [serviceSelected, setServiceSelected] = useState<string>()

  async function onCreate(event: any) {
    try {
      event.preventDefault()

      const controller = {
        route,
        method,
        tag,
        description,
        descriptionResult,
        validators,
        properties,
        services
      }

      await api.post('createController', controller)

      return toast.success('Controlador criado', {
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

  async function onDeleteProperty() {
    setProperties(properties.filter(property => property.id !== Number(propertySelected)))
  }

  async function onDeleteValidator() {
    setValidators(validators.filter(validator => validator.id !== Number(validatorSelected)))
  }

  async function onDeleteService() {
    setServices(services.filter(service => service._id !== serviceSelected))
  }


  useEffect(() => {
    setProperty(properties.find(property => property.id === Number(propertySelected)))
  }, [properties, propertySelected])

  useEffect(() => {
    setValidator(validators.find(validator => validator.id === Number(validatorSelected)))
  }, [validatorSelected, validators])

  return (
    <>
      <div>

        <SideBar />

        <ModalAddServiceComponent open={openAddServiceModal} setOpen={setOpenAddServiceModal} setServices={setServices} services={services} />
        <ModalAddPropertyComponent open={openAddPropertyModal} setOpen={setOpenAddPropertyModal} setProperties={setProperties} properties={properties} />
        <ModalUpdatePropertyComponent open={openUpdatePropertyModal} setOpen={setOpenUpdatePropertyModal} setProperties={setProperties} properties={properties} property={property} />
        <ModalAddValidatorComponent open={openAddValidatorModal} setOpen={setOpenAddValidatorModal} setValidators={setValidators} validators={validators} />
        <ModalUpdateValidatorComponent open={openUpdateValidatorModal} setOpen={setOpenUpdateValidatorModal} setValidators={setValidators} validators={validators} validator={validator} />

        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

                <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                  <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Criar Controlador</h3>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                      <Link to="/controllers">
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
                            <label htmlFor="route" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Rota
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => setRoute(e.target.value)}
                                type="text"
                                name="route"
                                id="route"
                                value={route}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="method" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              M??todo
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <select
                                id="method"
                                name="method"
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              >
                                <option>Selecione o tipo de m??todo</option>
                                <option>post</option>
                                <option>put</option>
                                <option>get</option>
                                <option>delete</option>
                              </select>
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="validatorSelected" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Validatores
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-1">
                              <select
                                id="validatorSelected"
                                name="validatorSelected"
                                onChange={(e) => setValidatorSelected(e.target.value)}
                                value={validatorSelected}
                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              >
                                <option value={0}>Selecione o validator</option>
                                {validators.map(validator => <option key={validator.id} value={validator.id}>{validator.name + ' - ' + validator.param}</option>)}

                              </select>
                            </div>

                            <div className="mt-1 sm:mt-0 sm:col-span-1">

                              <td className="px-6 whitespace-nowrap text-right text-sm font-medium">

                                <button
                                  onClick={() => setOpenAddValidatorModal(true)}
                                  type="button"
                                  className="bg-white py-2 px-4 mx-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Adicionar
                                </button>

                                <button
                                  onClick={() => {
                                    if (validatorSelected && validatorSelected !== '0') {
                                      setOpenUpdateValidatorModal(true)
                                    } else {
                                      return toast.warn('Selecione o validator', {
                                        position: "bottom-left",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                      });
                                    }
                                  }}
                                  type="button"
                                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Editar
                                </button>

                                <button
                                  type="button"
                                  onClick={() => onDeleteValidator()}
                                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Remover
                                </button>

                              </td>
                            </div>


                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="property" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Propriedades
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-1">
                              <select
                                id="property"
                                name="property"
                                onChange={(e) => setPropertySelected(e.target.value)}
                                value={propertySelected}
                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              >
                                <option value={0}>Selecione a propriedade</option>
                                {properties.map(property => <option key={property.id} value={property.id}>{property.name}</option>)}
                              </select>
                            </div>

                            <div className="mt-1 sm:mt-0 sm:col-span-1">

                              <td className="px-6 whitespace-nowrap text-right text-sm font-medium">

                                <button
                                  onClick={() => setOpenAddPropertyModal(true)}
                                  type="button"
                                  className="bg-white py-2 px-4 mx-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Adicionar
                                </button>

                                <button
                                  onClick={() => {
                                    if (propertySelected && propertySelected !== '0') {
                                      setOpenUpdatePropertyModal(true)
                                    } else {
                                      return toast.warn('Selecione a propriedade', {
                                        position: "bottom-left",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                      });
                                    }
                                  }}
                                  type="button"
                                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Editar
                                </button>

                                <button
                                  onClick={() => onDeleteProperty()}
                                  type="button"
                                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Remover
                                </button>

                              </td>
                            </div>
                          </div>


                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="tag" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Tag
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                onChange={(e) => setTag(e.target.value)}
                                type="text"
                                name="tag"
                                id="tag"
                                value={tag}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>


                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Descri????o
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="text"
                                name="description"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>



                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="descriptionResult" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Descri????o do efeito ou resultado
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="text"
                                name="descriptionResult"
                                id="descriptionResult"
                                value={descriptionResult}
                                onChange={(e) => setDescriptionResult(e.target.value)}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="services" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                              Servi??os chamados
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-1">
                              <select
                                onChange={(e) => setServiceSelected(e.target.value)}
                                id="services"
                                name="services"
                                autoComplete="services"
                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              >
                                <option value={0}>Selecione o servi??o</option>)
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
                          Criar Controlador
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