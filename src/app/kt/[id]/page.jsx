"use client";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { Key } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import QueryDts from "@/app/components/common/ktdynamicpagUsequery"



export default function DynamicTabsPage(){

    const params = useParams(); // ✅ Get params safely
    const id = params?.id; //
    // const router = useRouter()
    // const {codedts} = router.query

    // const {data, error, isLoading} = useQuery({
    //     queryKey: ['tabs', codedts],
    //     queryFn: ()=> fetchTabs(codedts),
    //     enabled: !!codedts,
    // })

    // if (isLoading) return <p>Loading ...</p>
    // if (error) return <p>Error: {error.message}</p>
    console.log("Received codedts from params:", params.id); // ✅ Debug

    return (

        <div>
        {/* <QueryDts id={id} /> */}
            <p>hi</p>
        </div>
    )
}

