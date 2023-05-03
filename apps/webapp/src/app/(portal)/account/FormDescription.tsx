import React from "react";

const FormDesription = ({ title, desc, ...rest }: any) => {
  return (
    <div {...rest}>
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  );
};

export default FormDesription;
