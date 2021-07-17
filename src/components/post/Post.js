import "./Post.css"
import { useState, useEffect } from 'react'
import { MoreVert } from "@material-ui/icons"
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Post({post}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const {user:currentUser} = useContext(AuthContext)
    const [like, setLike] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    useEffect(() => {
        setLike(post.likes.length);
    },[post.likes])

    useEffect( () => {
        const BE = process.env.REACT_APP_BACKEND
        const fetchUser = async () => {
            const res = await axios.get(`${BE}/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    },[post.userId])

    const likeHandler = () => {
        const BE = process.env.REACT_APP_BACKEND
        try {
            axios.put(`${BE}/posts/${post._id}/like`, {userId: currentUser._id})
        } catch (err) {
            
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }
    
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    {
                        (post.img && post.img !== 'image.jpg') &&
                        (
                            <img src={PF+post.img} alt="" className="postImg" />
                        )
                    }
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                        {post.likes.length > 0 && <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />}
                        <span className="postLikeCounter">{like} people like your post</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
