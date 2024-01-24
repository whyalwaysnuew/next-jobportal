import {fetcher, parsingCategoriesOptions} from "@/lib/utils";
import {filterFormType} from "@/types";
import {log} from "console";
import {useMemo} from "react";
import useSWR from "swr";

const useCategoryCompanyFilter = () => {
  const {data, error, isLoading} = useSWR("/api/company/categories", fetcher);

  const categories = useMemo(
    () => parsingCategoriesOptions(data, isLoading, error, true),
    [data, isLoading, error]
  );

  const filters = useMemo(() => {
    return [
      {
        name: "industry",
        label: "Industry",
        items: categories,
      },
    ] as filterFormType[];
  }, [categories]);

  return {filters};
};

export default useCategoryCompanyFilter;
