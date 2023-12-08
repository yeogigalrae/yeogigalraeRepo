import { create } from 'zustand';

interface User {
    idToken: string;
    user: {
        email: string;
        user_id: string;
        name: string;
        nickname: string;
        photo: string;
        address: string;
        gender: string;
        birth: string;
        notice: boolean
    };
    setUser: (user: any) => void;
    setIdToken: (idToken: string) => void;
    deleteUser: () => void;
}

const useUser = create<User>((set) => ({
    idToken: "",
    user: {
        user_id: "",
        email: "",
        name: "",
        nickname: "",
        photo: require("../../assets/home.png"),
        address: "",
        gender: "",
        birth: "",
        notice: true
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
            user_id: "",
            name: "",
            nickname: "",
            photo: require("../../assets/home.png"),
            address: "",
            gender: "",
            birth: "",
            notice: true
        },
    })),
}));

export default useUser;