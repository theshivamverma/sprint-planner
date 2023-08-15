import React, { useState } from "react";
import { Sprint } from "./common/types";
import GanttChart from "./components/gantt-chart/GanttChart";

import "./App.css";
import { Flex, Heading } from "@radix-ui/themes";

const App: React.FC = () => {
  const [sprintData, setSprintData] = useState<Sprint[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "/data.json",
      );
      const data = await res.json()
      setSprintData([...data]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Flex p="2" justify="center" align="center">
        <Heading>Sprint Planner Gantt Chart</Heading>
      </Flex>
      <GanttChart sprintData={sprintData} />
    </>
  );
};

export default App;
