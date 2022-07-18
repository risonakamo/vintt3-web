import React from "react";

import {toFormattedTime} from "lib/timeformat";

import "./category-status.less";

interface CategoryStatusProps
{
  category:string
  time:number
}

export default function CategoryStatus(props:CategoryStatusProps):JSX.Element
{
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

  return <p className="category-status unselected">
    <span className="selection-arrow">&gt;</span>
    &nbsp;{props.category}{colontext}&nbsp;
    {renderCategoryTime()}
  </p>;
}