import { useLocation } from 'react-router-dom';

export default function SideBar() {
    const location = useLocation();

    const navigation = [
        { name: 'Controladores', href: '/controllers', current: location.pathname === '/controllers' || location.pathname === '/createControllers'  },
        { name: 'Serviços', href: '/services', current: location.pathname === '/services' || location.pathname === '/createService' },
    ]

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (


        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                    <h1 className="text-lg font-bold text-white">Dynamic API</h1>
                </div>
                <div className="mt-5 flex-1 flex flex-col">
                    <nav className="flex-1 px-2 pb-4 space-y-1">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                )}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}