import { atom } from "recoil";


export const isLoggedInAtom = atom({
    key: "isLoggedInAtom",
    default: !!localStorage.getItem('token'),
})