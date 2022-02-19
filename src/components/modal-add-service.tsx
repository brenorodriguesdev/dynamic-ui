import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { toast } from 'react-toastify';
import { api } from '../services/api';

interface ModalAddServiceProps {
    open: boolean
    setOpen: any
    services: any
    setServices: any
}
export default function ModalAddServiceComponent({
    open,
    setOpen,
    services,
    setServices
}: ModalAddServiceProps) {
    const [servicesAdd, setServicesAdd] = useState<Array<any>>([])
    const [serviceId, setServiceId] = useState<string>()

    useEffect(() => {
        async function getAllServices() {
            api.get('getAllServices')
                .then(({ data }) => {
                    setServicesAdd(data)
                })
        }
        getAllServices()
    }, [])

    async function onCreate(event: any) {
        try {
            event.preventDefault()

            if (!serviceId && serviceId === '0') {
                return toast.warn('O campo serviço é um campo obrigatório!', {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            const serviceAdd = servicesAdd.find(serviceAdd => serviceAdd._id === serviceId)
            
            console.log(servicesAdd)
            
            setServices([...services, {
                _id: (services.length + 1).toString(),
                ...serviceAdd
            }])

            setOpen(false)

        }
        catch (error) {

        }
    }

    return (


        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <form className="space-y-8 divide-y divide-gray-200" onSubmit={event => onCreate(event)}>
                                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                    <div>
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Adicionar serviço</h3>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Para adicionar um serviço entre com os dados abaixo.
                                            </p>
                                        </div>

                                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                    Serviço
                                                </label>
                                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                    <select
                                                        id="type"
                                                        name="type"
                                                        onChange={(e) => setServiceId(e.target.value)}
                                                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    >
                                                        <option value={0}>Selecione o serviço</option>
                                                        {servicesAdd.map(serviceAdd => <option key={serviceAdd._id} value={serviceAdd._id}>{serviceAdd.name}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className="pt-5">
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setOpen(false)}
                                            type="button"
                                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Adicionar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>

    )
}