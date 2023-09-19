import Container from '../components/Layout/container'
import Intro from '../components/HomePage/intro'
import Layout from '../components/Layout/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import MoreStories from '../components/HomePage/MoreStories'

export default function Index({ allPosts }: {allPosts:{title: string, date: string, slug: string,shortContent:string }[]}) {
  return (
    <>
      <Layout>
        <Head>
          <title>straxico blog</title>
        </Head>
        <Container>
          <Intro />
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
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
    "shortContent"
  ])  

  return {
    props: { allPosts },
  }
}
