import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Sprint } from "./common/types";
import GanttChart from "./components/gantt-chart/GanttChart";

const App: React.FC = () => {
  const [sprintData, setSprintData] = useState<Sprint[]>([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://gcp-mock.apiwiz.io/v1/sprints",
        {
          headers: {
            "x-tenant": "b4349714-47c7-4605-a81c-df509fc7e653",
          },
        }
      );
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
      {/* <h1>Sprint planner</h1> */}
      <GanttChart sprintData={sprintData} />
    </>
  );
};

export default App;
