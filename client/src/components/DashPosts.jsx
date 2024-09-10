import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `/api/post/getposts?userId=${currentUser._id}`
        );
        const data = await response.json();
        if (response.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {}
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  return <div>Dashposts</div>;
};

export default DashPosts;
