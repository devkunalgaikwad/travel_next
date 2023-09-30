import prisma from '@/app/libs/prismadb'

export interface IListingProps {
    userId ?: string;
    guestCount ?:number;
    roomCount ?:number;
    bathRoomCount ?: number;
    startDate ? : string;
    endDate ?: string;
    locationValue ?: string;
    category ?: string;
}

export default async function getListing(params : IListingProps) {
    try{
        const {
            userId,
            roomCount,
            guestCount,
            bathRoomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params
        let qurey : any ={}
        if (userId){
            qurey.userId = userId
        }
        if (category){
            qurey.category = category
        }
        if (roomCount){
            qurey.roomCount ={
                gte : +roomCount
            }
        }
        if (guestCount){
            qurey.guestCount ={
                gte : +guestCount
            }
        }
        if (bathRoomCount){
            qurey.roomCount ={
                gte : +bathRoomCount
            }
        }
        if (locationValue){
            qurey.locationValue = locationValue
        }

        if (startDate && endDate){
            qurey.NOT ={
                reservations :{
                    some :{
                        OR :[
                            {
                                endDate :{ gte : startDate},
                                startDate : {lte : startDate},
                            },{
                                startDate : {lte : endDate},
                                endDate : {gte : endDate},
                            }
                        ]
                    }
                }
            }
        }
        const listing = await prisma.listing.findMany({
            where : qurey,
            orderBy : {
                createdAt: 'desc',
            }
        })
        const safeListing = listing.map((item)=>({
            ...item,
            createdAt : item.createdAt.toISOString()
        }))
        return safeListing
    } catch(error :any){
        throw new Error(error)
    }
}