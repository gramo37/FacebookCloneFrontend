import React, {useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import AddPost from "./AddPost";
import Posts from "./Posts";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/userAction";
import { getPost } from "../../redux/actions/postAction";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state)=>state.user)
  const posts = useSelector((state) => state.posts)
  const comments = useSelector((state) => state.comments)

  useEffect(async ()=>{
    await dispatch(loadUser());
    await dispatch(getPost());
  }, [comments])

  useEffect(() => {
    console.log(user)
    if(!user.loading) {
      if(user.error) {
        navigate("/login", {replace: true})
      }
    }
    console.log(posts.post?.posts)
    console.log(posts)
  }, [user.loading, posts.loading])
  

  return (
    <>
      <Navbar show="home"/>
      <div className=' overflow-hidden flex justify-around w-full pt-20'>
        <div className='md:block h-[90.7vh] hidden'>
          
        </div>
        <div className='w-[600px]'>
          <AddPost />
          {!posts.loading && posts.post?.posts?.map((item)=>{
            return <Posts key={item._id} post={item}/>
          })}
        </div>
        <div className='md:block h-[90.7vh] hidden'>
          
        </div>
    </div>
    </>
  );
};

export default Home;
