import React from "react";
import useAxios from 'axios-hooks';
import Post from "@/components/Post";

export interface IPropPost {
    _id:any
    title:string
    comments:[{content:string,post:string}]
}

const Home = () => {
    const [{ data:postList,loading:postListLoading,error:postListError },refetch]=useAxios('http://localhost:4001/api/post/list');

    const [
        // eslint-disable-next-line no-unused-vars
        { data: postCreate, loading: postCreateLoading, error: postCreateError },
        executePostCreate
    ] = useAxios(
        {
            url:'http://localhost:4001/api/post/create',
            method: 'post'
        },
        { manual: true }
    );

    const [
        // eslint-disable-next-line no-unused-vars
        { data: commentCreate, loading: commentCreateLoading, error: commentCreateError },
        executeCommentCreate
    ] = useAxios(
        {
            url:'http://localhost:4001/api/comment/create',
            method: 'post'
        },
        { manual: true }
    );

    const createPost = async(event:React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key==='Enter'){
            await executePostCreate({ data:{ title:event.currentTarget.value } });
            refetch();
            event.currentTarget.value='';
        }
    };
    const createComment = async(postId:string,comment:string)=>{
        // eslint-disable-next-line camelcase
        await executeCommentCreate({ data:{ post_id:postId,comment } });
        refetch();
    };

    if (postListLoading || postCreateLoading || commentCreateLoading ) return <p>Loading...</p>;
    if (postListError || postCreateError || commentCreateError ) return <p>Error!</p>;

    return (
        <div className="flex flex-col h-screen w-full ">
            <div className="border border-b-slate-300  flex flex-col items-center py-10">
                <div>
                    <h1 className="text-3xl">Create POST</h1>
                    <div className="my-3 flex flex-col">
                        <label htmlFor="title">Title</label>
                        <input className="border p-1 px-3 rounded" type="text"placeholder="input post" onKeyDown={createPost}/>
                    </div>
                </div>
            </div>
            <div className="container px-4 sm:mx-auto ">
                <p className="mt-4">POST lists</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-x-9 gap-y-5 my-4">
                    {
                        postList.data.map(((data:IPropPost,index:number)=>(
                            <div key={index}>
                                <Post
                                    title={data.title}
                                    comments={data.comments}
                                    createComment={createComment}
                                    _id={data._id}/>
                            </div>
                        )))
                    }
                </div>
            </div>
        </div>
    );
};
export default Home;



