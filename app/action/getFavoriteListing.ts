import getCurrentUser from "./getCurrentUser";
import prisma from '@/app/libs/prismadb'

export default async function getFavoriteListing(){
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser){
            return []
        }
        const favorite = await prisma.listing.findMany({
            where :{
                id :{
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        })
        const safeFavorite = favorite.map((fav)=>({
            ...fav,
            createdAt : fav.createdAt.toISOString()
        }))
        return safeFavorite
    } catch(error :any) {
        throw new Error(error)
    } 

}