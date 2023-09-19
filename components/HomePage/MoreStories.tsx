import PostPreview from './postPreview'
import type Post from '../../interfaces/post'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-y-20 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post?.slug}
            title={post?.title}
            shortContent={post?.shortContent}
            date={post?.date}
            slug={post?.slug}
          />
        ))}
      </div>
    </section>
  )
}

export default MoreStories
