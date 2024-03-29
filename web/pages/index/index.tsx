import React from "react";
import ReactDOM from "react-dom";
import cx,{Mapping} from "classnames";
import {QueryClientProvider,QueryClient} from "@tanstack/react-query";

import {openConfig,openTimefile} from "apis/vintt3-api";

import useCurrentWatch from "hooks/useCurrentWatch";

import WatchStatus from "components/watch-status/watch-status";

import "./index.less";

function IndexMain():JSX.Element
{
  const currentWatch=useCurrentWatch();

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

  /** on new category complete, force refresh the watch */
  function h_gotNewCategory():void
  {
    currentWatch.refreshWatch();
  }


  // --- render ---
  /** possibly render watch status if it is available */
  function renderWatchStatus()
  {
    if (currentWatch.currentWatch)
    {
      return <WatchStatus watchStatus={currentWatch.currentWatch} onGotNewCategory={h_gotNewCategory}/>;
    }

    return <p className="watching">watching...</p>;
  }

  const headerCx:Mapping={
    hide:!currentWatch.noConnection
  };

  return <>
    <header className={cx(headerCx)}>
      NO CONNECTION
    </header>
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
  ReactDOM.render(
    <QueryClientProvider client={new QueryClient()}>
      <IndexMain/>
    </QueryClientProvider>,
    document.querySelector(".main")
  );
}

window.onload=main;