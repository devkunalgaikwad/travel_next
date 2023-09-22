import getCurrentUser from './action/getCurrentUser'
import getListing from './action/getListing'
import { EmptyState, Container, ListingCard } from './components'

export default async function Home() {
  const listing = await getListing()
  const currentUser = await getCurrentUser()
  if(listing.length === 0){
    return(
      <EmptyState title='No matches found' subtitle='Try to change the filters' showReset/>
    )
  }
  return (
    <Container>
      <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listing.map((item)=>{
          return (
            <ListingCard key={item.id} data={item} currentUser={currentUser}/>
          )
        })}
      </div>
    </Container>
  )
}
