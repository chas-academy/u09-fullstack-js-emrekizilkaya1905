import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallAction from "../components/CallAction";
import PostCard from "../components/PostCard";
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts?limit=4");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome To Turkey Blog
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you can find lovely places in Turkey.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="flex justify-center items-center h-auto">
        <div className="p-3 bg-amber-100 dark:bg-slate-700 max-w-md max-h-96">
          <CallAction />
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 mt-5">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {" "}
              {/* Kartları ortalamak için justify-center */}
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
