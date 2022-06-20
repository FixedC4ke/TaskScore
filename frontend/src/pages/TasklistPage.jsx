import { useEffect, useState } from "react";
import API from "../axios";

export default function TasklistPage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    API.fetchSecuredData({
      url: "task/list",
    }).then((res) => console.log(res.data));
  }, []);
  return <p>Tasklist</p>;
}
