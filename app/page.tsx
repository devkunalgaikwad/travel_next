import getCurrentUser from './action/getCurrentUser'
import getListing, { IListingProps } from './action/getListing'
import { EmptyState, Container, ListingCard } from './components'

interface HomeProps {
  searchParams : IListingProps;
}
export default async function Home({searchParams}:HomeProps) {
  const listing = await getListing(searchParams)
  const currentUser = await getCurrentUser()
  if(listing.length === 0){
    return(
      <div className='pt-24'>
        <EmptyState title='No matches found' subtitle='Try to change the filters' showReset/>
      </div>
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
