import React, {  useState } from 'react';
import { IPropPost } from '@pages/Home/Home';

interface IPropPostComment extends IPropPost {
    createComment:any;
  }

const Post = ({ title,comments,_id,createComment }:IPropPostComment) => {
    const countComment = comments.length;
    const [inputComment,setInputComment]=useState("");

    const submitComment = ()=>{
        createComment(_id,inputComment);
    };
    return (
        <div className="border bg-gray-50 rounded ">
            <div className="bg-gray-300 p-4 ">
                <p>{title}</p>
            </div>
            <div className="p-4 space-y-2">
                <p>{countComment} Comment</p>
                {
                    countComment>0?(
                        <>
                            {
                                comments.map((data:any,index)=>{
                                    return  <p className='bg-gray-300 px-3 py-1 rounded' key={index}>{data.content}</p>;
                                })
                            }
                        </>
                    ):(
                        <p className='bg-gray-300 px-3 py-1 rounded'>asfds</p>
                    )
                }
            </div>
            <div className="p-4 space-y-2">
                <p >Comment</p>
                <div className='flex flex-row space-x-2'>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full focus:border-blue-500"
                        placeholder="input component"
                        onChange={(e:any)=>setInputComment(e.target.value)}
                    />
                    <button className=" bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded text-white text-[12px]"  onClick={submitComment}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
};

export default Post;