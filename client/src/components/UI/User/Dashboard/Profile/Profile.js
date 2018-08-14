import React from "react";
import ProfileForm from "./ProfileForm";
// import Capitalize from "../../../Enhancements/Capitalize";
// import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  // console.log('USER', user);
  // const { firstName, lastName, username, email, userPhotoURL } = user;
  const { profileInfo } = user;
  return (
    <ProfileForm profileInfo={profileInfo} />
    // <div className="container connect-container is-centered">
    // 	<div className="card">
    // 		<h1>Profile</h1>
    // 		<div className="card-content">
    // 			<div className="media">
    // 				<div className="media-left">
    // 					<figure className="image is-48x48">
    // 						<img src={userPhotoURL || "https://bulma.io/images/placeholders/96x96.png"} alt="Placeholder" />
    // 					</figure>
    // 				</div>
    // 				<div className="media-content">
    // 					<p className="title is-4">
    // 						{Capitalize(firstName)} {Capitalize(lastName)}
    // 					</p>
    // 					<p className="subtitle is-6">@{username}</p>
    // 				</div>
    // 			</div>

    // 			<div className="content">Write your bio here someday.</div>
    // 			<Link to='/delete' className='button is-danger'>Delete Account</Link>
    // 		</div>
    // 	</div>
    // </div>
  );
};

export default Profile;
