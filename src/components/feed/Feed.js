import Post from '../post/Post'
import Share from '../share/Share'
import './Feed.css'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Feed({username}) {

    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect( () => {
        const BE = process.env.REACT_APP_BACKEND
        const fetchPosts = async () => {
            const res = username
                ? await axios.get(BE + '/posts/profile/' + username)
                : await axios.get(BE + '/posts/timeline/' + user._id);
            setPosts(res.data.sort((post1,post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt)
            }));
        };
        fetchPosts();
    },[username, user._id])

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {
                    posts && posts.map((post,i) => (
                        <Post key={i} post={post}/>
                    ))
                }
            </div>
        </div>
    )
}
