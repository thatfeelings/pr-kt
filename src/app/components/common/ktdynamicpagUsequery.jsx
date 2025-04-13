"use client";
import { useQuery } from "@tanstack/react-query";
import TabComponent from "./tabs";
import { useState } from "react";

const fetchTabs = async (codedts) => {
  console.log("Received codedts in fetchTabs:", codedts);
  const response = await fetch(`/api/dts-tabs?codedtsvalue=${codedts}`);
  console.log("Raw Response:", await response.clone().text());

  if (!response.ok) throw new Error("Failed fetching tabs!");
  return response.json();
};

export default function QueryDts({ id }) {
  const [activeTab, setActiveTab] = useState(1);
  const storedData = typeof window !== "undefined" && localStorage.getItem("spData");
  const cachedData = storedData ? JSON.parse(storedData) : [];
  console.log("Cached Data from localStorage:", cachedData);

  const currentData = cachedData.find((item) => Number(item.DFS) === Number(id)) || null;
  const codeDts = currentData?.CodeDTS || "";

  console.log("Current Data:", currentData);
  console.log("CodeDTS:", codeDts);

  const { data, error, isLoading } = useQuery({
    queryKey: ["tabs", codeDts],
    queryFn: () => fetchTabs(codeDts),
    enabled: !!codeDts, // Only execute if codeDts is valid
  });

  const tabsArray = data
    ? Object.entries(data).map(([id, name]) => ({ id, name }))
    : [];
  console.log("Tabs Array:", tabsArray);

  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <TabComponent tabs={tabsArray} setActiveTab={setActiveTab} activeTab={1} />
    </div>
  );
}
