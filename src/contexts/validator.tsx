import { createContext, useState } from "react";

interface ValidatorContextProps {
    validator: any
    setValidator: any
}
const ValidatorContext = createContext<ValidatorContextProps>({} as ValidatorContextProps)

function ValidatorProvider({ children }: any) {
    const [validator, setValidator] = useState<any>()

    return (
        <ValidatorContext.Provider value={{
            validator,
            setValidator
        }}>
            {children}
        </ValidatorContext.Provider>
    )
}


export { ValidatorContext, ValidatorProvider }