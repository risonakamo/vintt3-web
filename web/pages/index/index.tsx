import React from "react";
import ReactDOM from "react-dom";

import "./index.less";

function IndexMain():JSX.Element
{
  return <>
    hello
  </>;
}

function main()
{
  ReactDOM.render(<IndexMain/>,document.querySelector(".main"));
}

window.onload=main;