import {create} from 'zustand'
import { useLoginModalProps } from './types'


const useLoginModal = create<useLoginModalProps>((set)=>({
    isOpen: false, onOpen : ()=> set({isOpen :true}), onClose:()=>set({isOpen:false})
}))

export default useLoginModal