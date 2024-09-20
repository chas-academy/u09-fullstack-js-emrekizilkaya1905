import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="relative w-full border border-gray-300 hover:shadow-lg rounded-lg overflow-hidden sm:w-[430px] transition-shadow duration-300">
      <Link to={`/post/${post.slug}`} className="block">
        <img
          src={post.image}
          alt="post cover"
          className="h-[250px] w-full object-cover"
        />
      </Link>
      <div className="p-4">
        <p className="text-lg font-bold mb-2">{post.title}</p>
        <span className="text-sm text-gray-500">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="block mt-4 text-center bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition-colors duration-200"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
