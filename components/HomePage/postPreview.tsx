import DateFormatter from '../date-formatter'
import Link from 'next/link'

type Props = {
  title: string
  date: string
  shortContent: string
  slug: string
}

const PostPreview = ({
  title,
  shortContent,
  date,
  slug,
}: Props) => {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <p className='text-lg leading-relaxed mb-4'>{shortContent}</p>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}

export default PostPreview
