"use client";
import { useQuery } from "@tanstack/react-query";
import TabComponent from "./tabs";
import { useState } from "react";
import Tab2Dts from "../kt-components/tab2dts";
import Tab3Dts from "../kt-components/tab3dts";
import Tab5Dts from "../kt-components/tab5dts";
import Tab6Dts from "../kt-components/tab6dts";
import Tab7Dts from "../kt-components/tab7dts";
import Tab8Dts from "../kt-components/tab8dts";


const fetchTabs = async (codedts) => {
  console.log("Received codedts in fetchTabs:", codedts);
  const response = await fetch(`/api/dts-tabs?codedtsvalue=${codedts}`);
  console.log("Raw Response:", await response.clone().text());

  if (!response.ok) throw new Error("Failed fetching tabs!");
  return response.json();
};


export default function QueryDts({ id, docDetail, docView }) {

  const tableRowsDocView = docView.map((item, index) => ({
    TitleStr: item.TitleStr,
    valueStr: item.valueStr,
  }));
  console.log("nanato:", tableRowsDocView);

  const content = {
    Tab2DTS: <Tab2Dts datatable={tableRowsDocView} />,
    Tab3DTS: <Tab3Dts datatable={tableRowsDocView}/>,
    Tab5DTS: <Tab5Dts datatable={tableRowsDocView}/>,
    Tab6DTS: <Tab6Dts datatable={tableRowsDocView}/>,
    Tab7DTS: <Tab7Dts datatable={tableRowsDocView}/>,
    Tab8DTS: <Tab8Dts datatable={tableRowsDocView}/>
  };
  const [activeTab, setActiveTab] = useState(1);
  const storedData =
    typeof window !== "undefined" && localStorage.getItem("spData");
  const cachedData = storedData ? JSON.parse(storedData) : [];

  const currentData =
    cachedData.find((item) => Number(item.DFS) === Number(id)) || null;
  const codeDts = currentData?.CodeDTS || "";

  const { data, error, isLoading } = useQuery({
    queryKey: ["tabs", codeDts],
    queryFn: () => fetchTabs(codeDts),
    enabled: !!codeDts // Only execute if codeDts is valid
  });

  const tabsArray = data
    ? Object.entries(data).map(([id, name]) => ({ id, name }))
    : [];
  console.log("Tabs Array:", tabsArray);

  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <TabComponent tabs={tabsArray} tabContent={content} />;
    </div>
  );
}
