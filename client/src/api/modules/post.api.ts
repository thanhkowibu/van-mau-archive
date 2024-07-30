import usePublicClient from "../hook/usePublicClient";
import usePrivateClient from "../hook/usePrivateClient";

const usePostApi = () => {
  const publicClient = usePublicClient();
  const privateClient = usePrivateClient();

  const getPosts = async () => {
    return publicClient.get("posts");
  };

  const getProtectedPosts = async () => {
    return privateClient.get("posts/protected");
  };

  const addPost = async (content: string, tags: string[]) => {
    return privateClient.post("posts", {
      content,
      tags,
    });
  };

  const deletePost = async (id: number) => {
    return privateClient.delete(`posts/${id}`);
  };

  const updatePost = async (id: number, content: string, tags: string[]) => {
    return privateClient.put(`posts/${id}`, {
      content,
      tags,
    });
  };

  return { getPosts, addPost, deletePost, updatePost, getProtectedPosts };
};

export default usePostApi;
