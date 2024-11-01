import sharedStyles from "./shared.module.css";

const ErrorMessage = ({ errors, name }) => {
  if (!errors[name]) return null; 
  return <span className={sharedStyles.error}>{errors[name].message}</span>;
};

export default ErrorMessage;
