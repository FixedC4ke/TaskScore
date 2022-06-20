import { useEffect, useState } from "react";
import API from "../axios";
import Alert from "react-bootstrap/Alert";

export default function TasklistPage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    API.fetchSecuredData({
      url: "task/list",
    }).then((res) => setTasks(res.data));
  }, []);
  if (tasks.length === 0) {
    return <Alert variant="info">Нет задач</Alert>;
  } else {
    return { tasks };
  }
}
