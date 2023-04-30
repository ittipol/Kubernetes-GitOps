// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import ItemList from '../components/ItemList';
import { CategoryType } from '../models/entity'

// const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(context: any) {
  
  const { req, res } = context

  const categories = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PROXY}/categories`, {
      method: 'GET'
  })
  .then((response) => {
      return response.json().then(value => value)
  }).catch((error) => {
    return []
  })

  return {
    props: { 
      categories: categories
    },
  }
}


function Home({ categories }:{ categories: CategoryType[]}) {

  return (
    <>
      <div className="container mx-auto">        
        <ItemList categories={categories}/>      
      </div>      
    </>
  )
  
}

// Home.getInitialProps = async (context) => {

//   // console.log(context.res)

//   // const res = await fetch("https://api.com");
//   const data = await {};
  
//  return {data} // this will be passed to the page component as props
// }

export default Home