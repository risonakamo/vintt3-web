import React from "react";
import cx,{Mapping} from "classnames";

import {toFormattedTime} from "lib/timeformat";

import "./category-status.less";

interface CategoryStatusProps
{
  category:string
  time:number
  selected:boolean

  onClick(category:string):void
}

export default function CategoryStatus(props:CategoryStatusProps):JSX.Element
{
  // --- handlers ---
  /** handle element click. return the category */
  function h_click():void
  {
    props.onClick(props.category);
  }

  // --- render ---
  /** render category time span */
  function renderCategoryTime():JSX.Element|null
  {
    if (!props.time)
    {
      return null;
    }

    const formattedTime:FormattedTime=toFormattedTime(props.time);

    return <span>
      <span className="highlighted">{formattedTime.value}</span>&nbsp;
      {formattedTime.units}
    </span>
  }

  var colontext:string="";
  if (props.time>0)
  {
    colontext=":";
  }

  const topCx:Mapping={
    unselected:!props.selected,
    selected:props.selected
  };

  return <p className={cx("category-status",topCx)} onClick={h_click}>
    <span className="selection-arrow">&gt;</span>
    &nbsp;{props.category}{colontext}&nbsp;
    {renderCategoryTime()}
  </p>;
}