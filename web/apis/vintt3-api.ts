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

/** send request to change category */
export function changeWatchCategory(category:string):void
{
    const body:SetCategoryReq={
        category
    };

    fetch("/set-category",{
        method:"POST",
        body:JSON.stringify(body),
        headers:{
            "Content-type":"application/json"
        }
    });
}