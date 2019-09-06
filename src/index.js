import React from "react";
import { render } from "react-dom";

import "./index.scss";

import "cors";

import Application from "./components/Application";

render(<Application />, document.getElementById("root"));
