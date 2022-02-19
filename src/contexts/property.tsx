import { createContext, useState } from "react";

interface PropertyContextProps {
    property: any
    setProperty: any
}
const PropertyContext = createContext<PropertyContextProps>({} as PropertyContextProps)

function PropertyProvider({ children }: any) {
    const [property, setProperty] = useState<any>()

    return (
        <PropertyContext.Provider value={{
            property,
            setProperty
        }}>
            {children}
        </PropertyContext.Provider>
    )
}


export { PropertyContext, PropertyProvider }