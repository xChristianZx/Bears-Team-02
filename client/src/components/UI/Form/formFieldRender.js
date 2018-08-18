import React from "react";

const formFieldRender = ({ input, label, type, placeholder, meta: { touched, error } }) => {
  // TODO - Handle Technical/ Non-technical
  // * Redux form currently does not recognize the boolean fields for isTechnical; may have to turn into string
  const inputType = type => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            className="textarea"
            type={type}
            {...input}
            placeholder={placeholder || "Message Here"}
          />
        );
      default:
        return <input className="input" type={type} {...input} placeholder={placeholder || null} />;
    }
  };
  return (
    <div className="field">
      {!label ? null : <label className="label">{label}</label>}
      <div className="control">{inputType(type)}</div>
      <p className="help is-danger">{touched && (error && <span>{error}</span>)}</p>
    </div>
  );
};

export default formFieldRender;

// console.log("INPUT", input);
// console.log("type", type);
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
