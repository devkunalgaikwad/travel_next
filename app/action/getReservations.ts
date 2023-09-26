interface IParams {
    listingId :string;
    userId : string;
    authorId : string;
}

export default async function getReservation(
    params : IParams
) {
    try{
        const {listingId, userId, authorId} = params
        const qurey : any = {}
        if (listingId){
            qurey.listingId = listingId
        }
        if (userId){
            qurey.userId = userId
        }
        if (authorId){
            qurey.authorId = authorId
        }
        const reservation = await prisma?.reservation.findMany({
            where : qurey,
            include :{
                listing : true
            }, orderBy :{
                createdAt: 'desc'
            },
        })
        const safeReservation = reservation?.map((resever)=>({
            ...resever,
            createdAt : resever.createdAt.toISOString(),
            startDate : resever.startDate.toISOString(),
            endDate : resever.endDate.toISOString(),
            listing :{
                ...resever.listing,
                createdAt : resever.listing.createdAt.toISOString()
            }
        }))
        return safeReservation
    } catch (error: any) {
        throw new Error(error)
    }
}