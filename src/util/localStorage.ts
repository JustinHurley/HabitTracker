import { Preferences } from '@capacitor/preferences';
import { GlobalState } from '../components/State/State';

export const setObject = async (id: string, data: any) => {
    console.log(`setting: ${id}`, data);
    await Preferences.set({
        key: id,
        value: JSON.stringify(data)
    });
}

export const getObject = async (id: string) => {
    const ret: any = await Preferences.get({ key: id });
    console.log(`getting ${id}`, ret.value)
    return JSON.parse(ret.value);
}

export const setStorage = async (input: GlobalState) => {
    const promises: Promise<void>[] = []
    Object.keys(input).forEach((key) => {
        promises.push(Preferences.set({key: key, value: input[key]}))
    })
    await Promise.all(promises)
}

export const saveState = async (state: GlobalState) => {
    console.log(`saving state`, state)
    try {
        await Preferences.set({
            key: 'globalState',
            value: JSON.stringify(state)
        });
    } catch (error) {
        console.error('Error saving state:', error);
    }
}