import UserPost from "../UserPost/UserPost";

export default function UserPosts({ userPosts, setUserPosts }) {
  return (
    <>
      {userPosts.map((post) => (
        <UserPost key={post.id} post={post} setPosts={setUserPosts} />
      ))}
    </>
  );
}
