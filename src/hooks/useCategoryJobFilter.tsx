import { fetcher, parsingCategoriesOptions } from "@/lib/utils"
import { filterFormType } from "@/types"
import { log } from "console"
import { useMemo } from "react"
import useSWR from "swr"

const useCategoryJobFilter = () => {
    const {data, error, isLoading} = useSWR('/api/jobs/categories', fetcher)

    const categories = useMemo(() => parsingCategoriesOptions(data, isLoading, error), [data, isLoading, error])
    
    const filters = useMemo(() => {
        return [
            {
                name: 'categories',
                label: 'Categories',
                items: categories
            }
        ] as filterFormType[]
    }, [categories])

    return {filters}
}

export default useCategoryJobFilter