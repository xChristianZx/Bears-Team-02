import React from "react";
// import ProfileForm from "./ProfileForm";
// import Capitalize from "../../../Enhancements/Capitalize";
// import { Link } from "react-router-dom";
// eslint-disable-next-line
import { reduxForm, Form, Field } from "redux-form";

const Profile = props => {
  // const { onSubmitProfile } = props;
  const { currentRole, headline, sectorExperience, lookingFor } = props.user.profileInfo;
  // console.log("PROFILEINFO", props.user.profileInfo);

  return (
    <div className="columns">
      <div className="container column is-three-quarters">
        <div className="box">
          <h4 className="subtitle is-4 has-text-centered">Your Profile</h4>
          <hr />
          <div className="box">
            <h6 className="title is-6">Current Role</h6>
            <p>{currentRole}</p>
          </div>
          <div className="box">
            <h6 className="title is-6">Headline</h6>
            <p>{headline}</p>
          </div>
          <div className="box">
            <h6 className="title is-6">Sector Experience</h6>
            <p>{sectorExperience}</p>
          </div>
          <div className="box">
            <h6 className="title is-6">Looking For...</h6>
            <p>{lookingFor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({ form: "profile" })(Profile);

// <ProfileForm
//   profileInfo={profileInfo}
//   initialValues={initialValues}
//   onSubmitProfile={onSubmitProfile}
// />;

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

// <div className="container">
//       <Form onSubmit={onSubmitProfile}>
//         <h1 className="title">Update Profile</h1>
//         {/* Headline */}
//         <div className="field">
//           <label className="label">Headline</label>
//           <div className="control">
//             <Field
//               className="textarea"
//               name="profileInfo.headline"
//               type="textarea"
//               component="textarea"
//             />
//           </div>
//         </div>
//         <div className="field">
//           {/* Current Role */}
//           <label className="label">Current Role</label>
//           <div className="control">
//             <Field
//               className="input"
//               name="profileInfo.currentRole"
//               type="input"
//               component="input"
//             />
//           </div>
//         </div>
//         <div className="field">
//           {/* Sector Experience */}
//           <label className="label">Sector Experience</label>
//           <div className="control">
//             <Field
//               className="input"
//               name="profileInfo.sectorExperience"
//               type="input"
//               component="input"
//             />
//           </div>
//         </div>
//         <div className="field">
//           {/* Looking For */}
//           <label className="label">Looking For...</label>
//           <div className="control">
//             <Field className="input" name="profileInfo.lookingFor" type="input" component="input" />
//           </div>
//         </div>
//         <div className="field is-grouped">
//           <div className="control">
//             <button className="button is-link" type="submit">
//               Submit
//             </button>
//           </div>
//           <div className="control">
//             <button className="button is-text">Cancel</button>
//           </div>
//         </div>
//       </Form>
//     </div>
