// 'use client'
import {useQuery,useQueryClient} from "@tanstack/react-query";
import TabComponent from "./tabs";

const fetchTabs = async (codedts) => {
    console.log("Received codedts in fetchTabs:", codedts); // ✅ Debugging
    const response = await fetch(`/api/dts-tabs?codedtsvalue=${codedts}`);
    console.log("Raw Response:", await response.clone().text()); // ✅ Log raw response
    
    if (!response.ok) throw new Error("Failed fetching tabs!");
    return response.json();
};


export default function QueryDts( {id} ){
    const queryClient = useQueryClient();
    const cachedData = queryClient.getQueryData(["spData"]) || []; // ✅ Get cached data safely
    const currentData = cachedData.find((item) => Number(item.DFS) === Number(id)) || null; // ✅ Find matching object
    const codedts = currentData?.CodeDTS || null; // ✅ Get codedts from currentData

    console.log("here is currentData", currentData)
    console.log('here is prop', id);
    console.log("here is data", cachedData);
    console.log("here is codedts", codedts);



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




    return (
        <div>
            {/* <h1>Fetched Tabs</h1>
            {data && Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    <strong>{key}:</strong> {value}
                </div>
            ))} */}

            {/* <TabComponent /> */}
        </div>
    );
}