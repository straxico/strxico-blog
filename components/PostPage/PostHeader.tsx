import DateFormatter from '../date-formatter'
import PostTitle from './PostTitle'


const PostHeader = ({ title, date }: {
  title: string
  date: string
}) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
