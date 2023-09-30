// NavBar

import { IconType } from "react-icons";
import {FieldValues, FieldErrors, UseFormRegister} from 'react-hook-form'
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { RangeKeyDict , Range} from "react-date-range";

export interface NavbarProps {
    currentUser?: SafeUser | null;
}
export interface ContainerProps { 
    children: React.ReactNode;
}

export interface MenuItemProps {
    onClick : ()=>void;
    label : string;
}

export interface UserMenuProps {
    currentUser ?:SafeUser | null;
}

export interface CategoriesBoxProps {
    label : string;
    description : string;
    icon : IconType;
    selected ?: boolean;
}

export interface AvatarProps {
    src?:string|null|undefined ;
}
// Modal
export interface ModalProps{
    isOpen : boolean;
    onClose : ()=>void;
    onSubmit : ()=> void;
    title : string;
    body ?: React.ReactElement;
    footer ?: React.ReactElement;
    actionLabel : string;
    disable ?: boolean;
    secondaryAction ?: ()=> void ;
    secondaryLabel ?: string;
}

export interface CategoryInputProps {
    onClick : (value:string)=>void;
    selected : boolean;
    label : string;
    icon : IconType;
}

export type CountrySelectValue ={
    flag : string,
    label : string,
    latLng : number[],
    region : string,
    value : string,
}

export interface CountrySelectProps {
    value ?: CountrySelectValue ;
    onChange :(value:CountrySelectValue)=>void;
}

export interface CounterProps {
    title : string;
    subtitle : string;
    value : number;
    onChange : (value:number)=>void;
}
// support components
export interface ButtonProps {
    label : string;
    onClick : (e:React.MouseEvent<HTMLButtonElement>)=>void;
    disabled ?: boolean;
    outline ?: boolean;
    small ?: boolean;
    icon ?: IconType;
}

export interface HeadingProps {
    title : string;
    subtitle ?: string; 
    center ?: boolean;
}

export interface InputProps{
    id :string;
    label : string;
    type ?:string;
    disabled ?: boolean;
    formatPrice ?: boolean;
    required?: boolean;
    register ?: UseFormRegister<FieldValues>,
    errors : FieldErrors;
}

export interface MapProps{
    center?:number[]
}

export interface HeartButtonProps{
    listingId : string;
    currentUser ?: SafeUser | null;
}

export interface ImageUploadProps {
    onChange : (value:any)=>void;
    value : string;
}

export interface CalendarProps {
    value : Range;
    onChange : (value : RangeKeyDict) => void;
    disableDates?:Date[];
}
// main section

export interface EmptyStateProps {
    title ?:string;
    subtitle ?:string ;
    showReset ?: boolean;
}

// listing 

export interface ListingCardProps {
    data : SafeListing;
    reservation ?: SafeReservation;
    onAction ?:(id:string)=>void;
    disabled?: boolean;
    actionLabel ?: string;
    actionId ?: string;
    currentUser?: SafeUser | null;
}

export interface ListingHeadProps {
    title : string;
    locationValue  :string;
    imageSrc : string;
    id : string;
    currentUser ?: SafeUser | null;
}

export interface ListingInfoProps {
    user ?: SafeUser | null;
    category : {
        icon : IconType;
        label : string;
        description : string;
    } | undefined;
    description : string;
    roomCount : number;
    guestCount : number;
    bathroomCount : number;
    locationValue : string;
}

export interface ListingCategoryProps {
    icon : IconType;
    label : string;
    description : string;
}

export interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];

}