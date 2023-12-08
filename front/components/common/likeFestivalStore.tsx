import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { create } from 'zustand';

interface FestivalState {
    likeFestivalList: Festival[];
    setLikeFestivalList: (festivals: Festival[]) => void;
}

export interface Festival {
    begin_date: string;
    call: string;
    category: string;
    description: string;
    end_date: string;
    fee: string;
    id: string;
    image: string;
    latitude: number;
    like: number;
    likestate: number;
    longitude: number;
    name: string;
    place: string;
    url: string;
}

const useLikeFestivalStore = create<FestivalState>((set) => ({
    likeFestivalList: [],
    setLikeFestivalList: (festivals: Festival[]) => set({ likeFestivalList: festivals }),
}));


export default useLikeFestivalStore;