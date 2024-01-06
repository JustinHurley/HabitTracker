import { createContext, useEffect, useState } from "react"
import { getObject, saveState } from "../../util"

export interface GlobalState {
    timestamps: string[],
    developerMode: boolean,
    [key: string]: any
}

export const emptyGlobalState: GlobalState = {
    timestamps: [],
    developerMode: false
}

export const GlobalContext = createContext<{
    globalState: GlobalState | null,
    setGlobalState: React.Dispatch<React.SetStateAction<GlobalState | null>>,
    loading: boolean,
}>({
    globalState: emptyGlobalState,
    setGlobalState: () => {},
    loading: true
});

export const updateGlobalState = (key: string, value: any) => {
    return ((prevState: GlobalState) => ({
        ...prevState,
        [key]: value
    }));
};

export const addTimestamp = (timestamp: string, state: GlobalState | null): GlobalState => {
    if (state) {
        return state.timestamps ? {
            ...state,
            timestamps: [...state.timestamps, timestamp]
        } : {
            ...state,
            timestamps: [timestamp]
        }
    } else {
        return {
            ...emptyGlobalState,
            timestamps: [timestamp]
        }
    }
}

export const GlobalProvider = ({ children }: any) => {
    const [globalState, setGlobalState] = useState<GlobalState | null>(null);
    const [loading, setLoading] = useState(true)

    const loadInitialData = async () => {
        setLoading(true)
        const globalState = await getObject('globalState')
        console.log(`Loading initial data`, globalState)
        setGlobalState(globalState)
        setLoading(false)
    }

    useEffect(() => {
        loadInitialData()
            .catch(console.error)
    }, []);

    useEffect(() => {
        if (globalState !== null) {
            saveState(globalState)
                .catch(console.error)
        }
    }, [globalState]);

    return (
        <GlobalContext.Provider value={{ globalState, setGlobalState, loading }}>
            {children}
        </GlobalContext.Provider>
    );
};