import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/Layout/container'
import PostBody from '../../components/PostPage/PostBody'
import Header from '../../components/Layout/header'
import PostHeader from '../../components/PostPage/PostHeader'
import Layout from '../../components/Layout/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/PostPage/PostTitle'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter()
  const title = `${post.title} | Straxico blog`
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title}</title>
              </Head>
              <PostHeader
                title={post?.title}
                coverImage={post?.coverImage}
                date={post?.date}
                author={post?.author}
              />
              <PostBody content={post?.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
