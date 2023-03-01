import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

interface IAppProps {}

const Display: React.FunctionComponent<IAppProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      display
      <Link to="app">app</Link>
    </div>
  );
};

export default Display;
