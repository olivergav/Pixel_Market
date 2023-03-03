import {createContext, useEffect, useState} from "react";

const TitleChangeContext = createContext({});

export const TitleChangeProvider = ({children}) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        document.title = `Pixel Market${title ? ' - ' : ''}${title}`
    }, [title])


    return (
        <TitleChangeContext.Provider value={{title, setTitle}}>
            {children}
        </TitleChangeContext.Provider>
    )
}

export default TitleChangeContext;