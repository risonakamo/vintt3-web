/** get current watch information. null if there is no current watch */
export async function getWatchStatus():Promise<CurrentWatch|null>
{
    const gotWatch:CurrentWatch=await (await fetch("/get-watch",{
        method:"GET"
    })).json();

    if (!gotWatch.name)
    {
        return null;
    }

    return gotWatch;
}