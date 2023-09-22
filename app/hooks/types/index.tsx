import { SafeUser } from "@/app/types";

export interface useResgisterModalProps {
    isOpen : boolean;
    onOpen : ()=> void;
    onClose : ()=> void;
}


export interface useLoginModalProps {
    isOpen : boolean;
    onOpen : ()=> void;
    onClose : ()=> void;
}