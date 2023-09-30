import {create} from 'zustand'
import { useSearchModalProps } from './types'


const useSearchModal = create<useSearchModalProps>((set)=>({
    isOpen: false, onOpen : ()=> set({isOpen :true}), onClose:()=>set({isOpen:false})
}))

export default useSearchModal