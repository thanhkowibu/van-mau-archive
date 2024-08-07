import { useEffect, useState } from "react";
import usePostApi from "../../../api/modules/post.api";
import { PostProps } from "../../../types/posts.type";
import SingleCard from "./SingleCard";
import { useAuth } from "../../../context/useAuth";

type Props = {};

const CardList: React.FC<Props> = ({}) => {
  const { getPosts } = usePostApi();
  const [posts, setPosts] = useState<PostProps[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { searchTerm, searchTags, searchTrigger } = useAuth();
  const { searchPosts } = usePostApi();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await getPosts();
  //       setPosts(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res;
        if (searchTrigger === 0) {
          res = await getPosts();
        } else {
          res = await searchPosts(searchTerm, searchTags);
        }
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTrigger]);

  // Split posts into columns for masonry layout
  const columns = 3;
  const grid: PostProps[][] = Array.from({ length: columns }, () => []);

  posts?.forEach((post, index) => {
    grid[index % columns].push(post);
  });

  return (
    <>
      {loading ? (
        <div className="text-gray-300">is loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 auto-rows-max">
          {grid.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex flex-col gap-12 items-center px-4 md:px-0"
            >
              {column.map((post) => (
                <SingleCard
                  key={post.id}
                  content={post.content}
                  tags={post.tags}
                  username={post.username}
                  uid={post.uid}
                  id={post.id}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CardList;
