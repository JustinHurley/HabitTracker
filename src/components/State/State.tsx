import { createContext, useEffect, useState } from "react"
import { getObject, saveState } from "../../util"

export interface GlobalState {
    timestamps: string[],
    developerMode: boolean,
    numDays: number,
    [key: string]: any
}

export const emptyGlobalState: GlobalState = {
    timestamps: [],
    developerMode: false,
    numDays: 30
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
    const currentState = state || emptyGlobalState
    return currentState.timestamps ? {
        ...currentState,
        timestamps: [...currentState.timestamps, timestamp]
    } : {
        ...currentState,
        timestamps: [timestamp]
    }
}

export const removeLastTimestamp = (state: GlobalState | null): GlobalState => {
    const currentState = state || emptyGlobalState
    console.log('before', currentState)
    if (currentState.timestamps) {
        currentState.timestamps.pop()
        return {
            ...currentState,
            timestamps: [...currentState.timestamps]
        }
    }
    console.log('after', currentState)
    return currentState
}

export const updateNumDays = (numDays: number, state: GlobalState | null): GlobalState => {
    const currentState = state || emptyGlobalState;
    return {
        ...currentState,
        numDays: numDays
    }
}

export const GlobalProvider = ({ children }: any) => {
    const [globalState, setGlobalState] = useState<GlobalState | null>(null);
    const [loading, setLoading] = useState(true)

    const loadInitialData = async () => {
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
        console.log('updating globalState...')
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