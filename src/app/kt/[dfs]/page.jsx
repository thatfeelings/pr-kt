import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Key } from "@phosphor-icons/react";

const fetchTabs = async (codedts) => {
    const response = await fetch(`/api/dts-tabs?codedtsValue=${codedts}`)
    if (!response.ok) throw new Error("Faild fetching tabs!")
        return response.json()
}

export default function DynamicTabsPage(){
    const router = useRouter()
    const {codedts} = router.query

    const {data, error, isLoading} = useQuery({
        queryKey: ['tabs', codedts],
        queryFn: ()=> fetchTabs(codedts),
        enabled: !!codedts,
    })

    if (isLoading) return <p>Loading ...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <ul>
                {Object.entries(data).map(([Key, value])=> (
                    <li key={key}>{value}</li>
                ))}
            </ul>
        </div>
    )
}

