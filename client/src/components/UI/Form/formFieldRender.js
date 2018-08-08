import React from "react";

const formFieldRender = ({ input, label, type, meta: { touched, error } }) => {
// TODO - Handle Technical/ Non-technical
// * Redux form currently does not recognize the boolean fields for isTechnical; may have to turn into string
	//   console.log("INPUT", input)
// 	if (type === "radio") {
//     return (
//       <div className="field">
// 	  <label className="label" >{label}</label>
//         <div className="control">
//           <label className="radio">
//             <input type={type} name="isTechnical" defaultChecked={input.value}/> Yes
//           </label>
//           <label className="radio">
//             <input type={type} name="isTechnical" defaultChecked={input.value}/> No
//           </label>
//         </div>
//       </div>
//     );
//   }
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" type={type} {...input} />
      </div>
      <p className="help is-danger">
        {touched && (error && <span>{error}</span>)}
      </p>
    </div>
  );
};

export default formFieldRender;
