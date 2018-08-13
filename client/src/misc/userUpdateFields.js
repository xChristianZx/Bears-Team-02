const userUpdateFields = [
  { label: "First Name", name: "firstName", type: "text", errorMsg: "First Name is required" },
  { label: "Last Name", name: "lastName", type: "text", errorMsg: "Last Name is required" },
  { label: "User Name", name: "username", type: "text", errorMsg: "User Name is required" },
  { label: "Email", name: "email", type: "email", errorMsg: "Email is required" },
  {
    label: "Link to Photo",
    name: "userPhotoURL",
    type: "url",
    errorMsg: "Please enter an valid URL"
  },
  { label: "City", name: "location.city", type: "text" },
  { label: "State", name: "location.state", type: "text" },
  { label: "Country", name: "location.countryCode", type: "text" }

  // { label: 'Are you a Technical Founder?', name: 'isTechnical', type: "radio" }
  // { label: 'Old Password', name: 'oldPassword', type: 'password', errorMsg: 'Old Password is required' },
  // { label: 'New Password', name: 'newPassword', type: 'password', errorMsg: 'New Password is required' },
  // { label: 'Confirm New Password', name: 'confirmNewPassword', type: 'password', errorMsg: 'Passwords do not match' }
];

export default userUpdateFields;
