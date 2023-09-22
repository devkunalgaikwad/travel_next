import {create} from 'zustand'
import { useResgisterModalProps } from './types'


const useResgisterModal = create<useResgisterModalProps>((set)=>({
    isOpen: false, onOpen : ()=> set({isOpen :true}), onClose:()=>set({isOpen:false})
}))

export default useResgisterModal