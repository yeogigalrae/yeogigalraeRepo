import { create } from 'zustand';

interface User {
    idToken: string;
    user: {
        email: string;
        id: number;
        name: string;
        nickname: string;
        photo: string;
        address: string;
        gender: string;
        birth: string;
    };
    setUser: (user: any) => void;
    setIdToken: (idToken: string) => void;
    deleteUser: () => void;
}

const useUser = create<User>((set) => ({
    idToken: "",
    user: {
        email: "",
        id: 0,
        name: "",
        nickname: "",
        photo: "",
        address: "",
        gender: "",
        birth: "",
    },
    setUser: (user: any) => set((state) => ({
        user: user,
    })),
    setIdToken: (idToken: string) => set((state) => ({
        idToken: idToken
    })),
    deleteUser: () => set((state) => ({
        idToken: "",
        user: {
            email: "",
            id: 0,
            name: "",
            nickname: "",
            photo: "",
            address: "",
            gender: "",
            birth: "",
        },
    })),
}));

export default useUser;