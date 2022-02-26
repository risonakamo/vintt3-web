import humanizeDuration from "humanize-duration";

/** convert minutes duration into formatted time split into parts */
export function toFormattedTime(minutes:number):FormattedTime
{
    const splitTime:string[]=toDurationString(minutes).split(" ");

    if (splitTime.length!=2)
    {
        console.error("toFormattedTime split error",splitTime);
        return {
            value:"-1",
            units:"ERROR"
        };
    }

    return {
        value:splitTime[0],
        units:splitTime[1]
    };
}

/** convert minutes duration into duration string with custom logic
 *  60 minutes and above become hours, anything below stays as minutes */
function toDurationString(minutes:number):string
{
    const ms:number=minutes*60*1000;

    if (minutes>=60)
    {
        return humanizeDuration(ms,{
            units:["h"],
            maxDecimalPoints:2
        });
    }

    return humanizeDuration(ms,{
        units:["m"],
        maxDecimalPoints:2
    });
}