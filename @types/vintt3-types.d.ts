type CategoriesTimes=Record<string,number>

/** from rust */
interface CurrentWatch
{
    name: string

    currentTime: number
    currentCategory: string

    totalTime: number

    categoryTime: CategoriesTimes
}