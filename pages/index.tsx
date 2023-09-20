import Container from '../components/Layout/container'
import Intro from '../components/HomePage/intro'
import Layout from '../components/Layout/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import MoreStories from '../components/HomePage/MoreStories'
import { useMemo, useState } from 'react'

export default function Index({ allPosts }: {allPosts:{title: string,categories:string[], date: string, slug: string,shortContent:string }[]}) {
const [filter,setFilter]=useState(null)

const categuries=useMemo(()=>{
 return allPosts.reduce((prev,cur)=>{

    cur.categories?.forEach?.(i=>{
      prev[i]=(prev?.[i]||0) +1
    })
    if(!cur.categories|| cur.categories.length==0){
      prev['noCategori']=(prev['noCategori']||0) +1
    }
    return prev
  }
   ,{})
},[allPosts])
  
  return (
    <>
      <Layout>
        <Head>
          <title>straxico blog</title>
        </Head>
        <Container>
          <Intro />

          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {Object.keys(categuries).map(i=>
            <li className="mr-2">
                  <button onClick={()=>setFilter(prev=>prev==i?null:i)} aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">{`${i} (${categuries[i]})`}</button>
              </li>)}
          </ul>

          {allPosts.length > 0 && <>
            <MoreStories posts={allPosts.filter(i=>{
              if(filter=="noCategori"){           
                return !i.categories || i.categories.length==0
              }
              if(filter){
                return i.categories?.includes?.(filter)
              }
              return i
            })} />
          </>}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    "shortContent",
    "categories"
  ])  

  return {
    props: { allPosts },
  }
}
