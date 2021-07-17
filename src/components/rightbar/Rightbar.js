import './Rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@material-ui/icons'

export default function Rightbar({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [followings, setFollowings] = useState([])
    const { user:currentUser, dispatch } = useContext(AuthContext)
    const [followed, setFollowed] = useState(false)

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id))
    },[currentUser.followings, user?._id])

    useEffect(() => {
        const BE = process.env.REACT_APP_BACKEND
        const getFollowings = async () => {
            try {
                const friendList = await axios.get(BE + "/users/friends/" + user?._id)
                setFollowings(friendList.data)
            } catch (err) {
            }
        }
        user?._id && getFollowings()
    },[user?._id])

    const followHandler = async () => {
        const BE = process.env.REACT_APP_BACKEND
        try {
            if (followed) {
                await axios.put(BE + "/users/" + user._id + "/unfollow", {userId:currentUser._id})
                dispatch({type:"UNFOLLOW", payload: user._id})
            } else {
                await axios.put(BE + "/users/" + user._id + "/follow", {userId:currentUser._id})
                dispatch({type:"FOLLOW", payload: user._id})
            }
        } catch (err) {
            console.log(err)
        }
        setFollowed(!followed)
    }

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
                    <span className="birthdayText">
                        <b>Natasha Romanoff</b> and <b>3 other friends</b> have a birthday today.
                    </span>
                </div>
                <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {
                        Users.map(user => (
                            <Online key={user.id} user={user}/>
                        ))
                    }
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={followHandler}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove /> : <Add />}
                </button>
            )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "In a Relationship" : "Complicated"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    {followings.map(following => (
                        <Link to={"/profile/" + following.username} style={{textDecoration: "none"}} key={following._id}>
                            <div className="rightbarFollowing">
                                <img src={PF+following.profilePicture || PF+"person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{following.username}</span>
                            </div>
                        </Link>
                    ))
                    }
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar/>}
            </div>
        </div>
    )
}
