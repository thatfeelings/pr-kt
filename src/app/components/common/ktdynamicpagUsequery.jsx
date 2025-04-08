// 'use client'
import {useQuery,useQueryClient} from "@tanstack/react-query";

const fetchTabs = async (codedts) => {
    console.log("Received codedts in fetchTabs:", codedts); // ✅ Debugging
    const response = await fetch(`/api/dts-tabs?codedtsvalue=${codedts}`);
    console.log("Raw Response:", await response.clone().text()); // ✅ Log raw response
    
    if (!response.ok) throw new Error("Failed fetching tabs!");
    return response.json();
};


export default function QueryDts( {id} ){
    const queryClient = useQueryClient();
    const cachedData = queryClient.getQueryData(["spData"]);
    const codedts = id
    console.log('here is prop', codedts);
    
    // const router = useRouter()
    // const {codedts} = router.query

    const {data, error, isLoading} = useQuery({
        
        queryKey: ['tabs', codedts],
        queryFn: () => {
            console.log("Codedts before fetchTabs:", codedts); // ✅ Debugging
            return fetchTabs(codedts);
        },
        enabled: !!codedts,
    })


    if (isLoading) return <p>Loading ...</p>
    if (error) return <p>Error: {error.message}</p>

    console.log("data is", data);
    console.log(id);


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