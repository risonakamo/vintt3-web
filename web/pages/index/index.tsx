import React from "react";
import ReactDOM from "react-dom";

import useCurrentWatch from "hooks/useCurrentWatch";

import WatchStatus from "components/watch-status/watch-status";

import "./index.less";

function IndexMain():JSX.Element
{
  const currentWatch:CurrentWatch|null=useCurrentWatch();

  console.log("watch",currentWatch);
  return <>
    {/* <p className="watching">watching...</p> */}
    <WatchStatus/>
  </>;
}

function main()
{
  ReactDOM.render(<IndexMain/>,document.querySelector(".main"));
}

window.onload=main;