// "use client";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { Key } from "@phosphor-icons/react";

import QueryDts from "@/app/components/common/ktdynamicpagUsequery"



export default async function DynamicTabsPage({params}){
    
    const {codedts} = await params
    
    // const router = useRouter()
    // const {codedts} = router.query

    // const {data, error, isLoading} = useQuery({
    //     queryKey: ['tabs', codedts],
    //     queryFn: ()=> fetchTabs(codedts),
    //     enabled: !!codedts,
    // })

    // if (isLoading) return <p>Loading ...</p>
    // if (error) return <p>Error: {error.message}</p>


    return (

        <div>
        <QueryDts codedts={codedts} />
           <p>{codedts}</p>
        </div>
    )
}

