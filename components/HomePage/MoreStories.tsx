import PostPreview from './postPreview'
import type Post from '../../interfaces/post'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <div className="grid gap-y-5 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post?.slug}
            title={post?.title}
            shortContent={post?.shortContent}
            date={post?.date}
            slug={post?.slug}
            categories={post?.categories}
          />
        ))}
      </div>
    </section>
  )
}

export default MoreStories
