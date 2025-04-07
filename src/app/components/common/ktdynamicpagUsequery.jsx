'use client'

import {useQuery} from "@tanstack/react-query";

const fetchTabs = async (codedts) => {
    const response = await fetch(`/api/dts-tabs?codedtsvalue=${codedts}`)
    console.log("Raw Response:", await response.clone().text()); // Log raw response
    if (!response.ok) throw new Error("Faild fetching tabs!")
        return response.json()
        
}

export default function QueryDts( props ){
    const codedts = props.codedts

    console.log(props);
    
    // const router = useRouter()
    // const {codedts} = router.query

    const {data, error, isLoading} = useQuery({
        queryKey: ['tabs', codedts],
        queryFn: ()=> fetchTabs(codedts),
        enabled: !!codedts,
    })

    if (isLoading) return <p>Loading ...</p>
    if (error) return <p>Error: {error.message}</p>

    console.log(data);
    console.log(codedts);


    return (
        <div>
            <h1>Fetched Tabs</h1>
            {data && Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    <strong>{key}:</strong> {value}
                </div>
            ))}
        </div>
    );
}