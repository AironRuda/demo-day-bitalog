import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Presentation from "../components/Presentation";
import PresentatiosFirstSecction from "../components/PresentatiosFirstSecction";

interface IAppProps {}

const Display: React.FunctionComponent<IAppProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Presentation />
      <PresentatiosFirstSecction />
      display
      <Link to="app">app</Link>
    </div>
  );
};

export default Display;
