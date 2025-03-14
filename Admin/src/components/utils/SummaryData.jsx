const SummaryData={
 ProjectProgressData : [
  { month: "Jan", completed: 10, inProgress: 5 },
  { month: "Feb", completed: 20, inProgress: 10 },
  { month: "Mar", completed: 30, inProgress: 15 },
  { month: "Apr", completed: 50, inProgress: 20 },
],
TaskStatusData : [
  { name: "To Do", value: 10 },
  { name: "In Progress", value: 15 },
  { name: "Completed", value: 8 },
],
TaskCompletionByTeamData : [
  { team: "Developers", completed: 50 },
  { team: "Designers", completed: 30 },
  { team: "Testers", completed: 20 },
],
TaskDueCompletedData : [
  { month: "Jan", due: 20, completed: 10 },
  { month: "Feb", due: 30, completed: 20 },
  { month: "Mar", due: 40, completed: 25 },
  { month: "Apr", due: 50, completed: 35 },
],
PrioritychartData : [
  {
    name: "High",
    total: 2400,
  },
  {
    name: "Medium",
    total: 2210,
  },
  {
    name: "Normal",
    total: 3210,
  },
  {
    name: "Low",
    total: 2290,
  },
],
"TaskStatusTotal": {
  "completed": 2,
  "in progress": 1,
  "todo": 1,
  "total": 4
},
"ProjectStatusTotal": {
  "Completed": 0,
  "In Progress": 0,
  "Not Started": 1,
  "Total": 1
}
};



export default SummaryData;