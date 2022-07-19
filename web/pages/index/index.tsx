import React from "react";
import ReactDOM from "react-dom";
import humanizeDuration from "humanize-duration";

import {openConfig,openTimefile} from "apis/vintt3-api";

import useCurrentWatch from "hooks/useCurrentWatch";

import WatchStatus from "components/watch-status/watch-status";

import "./index.less";

function IndexMain():JSX.Element
{
  const currentWatch:CurrentWatch|null=useCurrentWatch();

  // --- handlers ---
  /** handle pressed open config file link. request to open config file */
  function h_openConfigFile(e:React.MouseEvent):void
  {
    e.preventDefault();
    openConfig();
  }

  /** handle click open timefile link. request to open timefile */
  function h_openTimefile(e:React.MouseEvent):void
  {
    e.preventDefault();
    openTimefile();
  }


  // --- render ---
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
    <div className="watch-zone">
      {renderWatchStatus()}
    </div>
    <footer>
      <p className="link-text" onClick={h_openConfigFile}>open config file</p>
      <p className="link-text" onClick={h_openTimefile}>open timefile</p>
    </footer>
  </>;
}

function main()
{
  ReactDOM.render(<IndexMain/>,document.querySelector(".main"));
}

window.onload=main;