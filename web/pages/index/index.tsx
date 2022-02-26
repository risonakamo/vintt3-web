import React from "react";
import ReactDOM from "react-dom";
import humanizeDuration from "humanize-duration";

import useCurrentWatch from "hooks/useCurrentWatch";

import WatchStatus from "components/watch-status/watch-status";

import "./index.less";

function IndexMain():JSX.Element
{
  const currentWatch:CurrentWatch|null=useCurrentWatch();

  console.log("watch",currentWatch);

  /** possibly render watch status if it is available */
  function renderWatchStatus()
  {
    if (currentWatch)
    {
      return <WatchStatus watchStatus={currentWatch}/>;
    }

    return <p className="watching">watching...</p>;
  }

  return <>
    {renderWatchStatus()}
  </>;
}

function main()
{
  ReactDOM.render(<IndexMain/>,document.querySelector(".main"));
}

window.onload=main;