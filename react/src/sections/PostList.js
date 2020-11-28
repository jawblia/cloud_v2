import React from 'react';
import Post from '../components/Post';

export default function PostList(props) {
  //  console.log(props);
    return(
        <div className="roomPosts"> 
        {props.posts.length > 0 
           ? props.posts.map((post, index )=> {
                return ( <Post 
                    post={post} key={index} view={props.tagView}
                /> )
            })
            :   <div className="roomPosts--empty">
                    <h3 className="light">Empty room</h3>
                </div>
            }
        </div>
    )
}