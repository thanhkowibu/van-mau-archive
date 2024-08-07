import { useEffect, useState } from "react";
import usePostApi from "../../../api/modules/post.api";
import { PostProps } from "../../../types/posts.type";
import SingleCard from "./SingleCard";

type Props = {};

const CardList: React.FC<Props> = ({}) => {
  const { getPosts } = usePostApi();
  const [posts, setPosts] = useState<PostProps[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getPosts();
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
          {grid.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-8">
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
