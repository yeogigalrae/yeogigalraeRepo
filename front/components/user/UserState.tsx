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
        photo: "https://firebasestorage.googleapis.com/v0/b/fir-firsttest-39342.appspot.com/o/yeogigalrae%2Flogo.png?alt=media&token=734e7557-30ac-4150-b41f-35601076681a",
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
            photo: "https://firebasestorage.googleapis.com/v0/b/fir-firsttest-39342.appspot.com/o/yeogigalrae%2Flogo.png?alt=media&token=734e7557-30ac-4150-b41f-35601076681a",
            address: "",
            gender: "",
            birth: "",
            notice: true
        },
    })),
}));

export default useUser;