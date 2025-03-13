import { useEffect, useState } from "react";
import CustomLoading from "../CustomComponent/CustomLoading";
import { act_types, TASKTYPEICON } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchtaskById, fetchtasks, updateTask } from "../../redux/slice/AssignTask/AssignTaskSlice";
import { toast } from "react-toastify";

const Activities = ({  task }) => {
    const [selected, setSelected] = useState(act_types[0]);
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const taskdata = useSelector((state)=>state.assigntasks.task);
    
    const dispatch = useDispatch();
    const handelActivity = async () => {
      setIsLoading(true);
    try {
      dispatch(fetchtaskById(task._id));
      
    } catch (error) {
      console.error("Updated Task.jsx Error:", error.message); 
    }
    setIsLoading(false);
    };
    useEffect(() => {

      handelActivity();
    
    }, [task,dispatch]);
    console.log("Task Data:", taskdata);
    const handleSubmit = async () => {
      console.log("type", selected);
      console.log("activity", text);
    
      if (!text.trim()) {
        toast.error("Activity cannot be empty");
        return;
      }
      setIsLoading(true);
      const newActivity =  await {
        activities: {
          type: selected,
          activity: text,
        },
      };
    
      console.log("Task Data push :", newActivity);
      try {
        const res = await dispatch(updateTask({ taskId: task._id, taskData: newActivity }));
        console.log("Task Update Response:", res);
    
        if (res?.payload?.status === "success" && res?.payload?.msg === "Task updated successfully") {
          toast.success("Activity Added Successfully");
          
  
        
        setText("");
        setSelected(act_types[0]);
        handelActivity();
        } else {
          toast.error(res?.payload?.msg || "Failed to update task");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
        console.error("Updated Task.jsx Error:", error.message);
      }finally {
        setIsLoading(false);
      }
    };
    const getTimeAgo = (date) => {
      const now = new Date();
      const past = new Date(date);
      const diffInSeconds = Math.floor((now - past) / 1000);
  
      if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
      if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
      if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
      return `${Math.floor(diffInSeconds / 31536000)} years ago`;
    };
      
      const Card = ({ item, isConnected }) => {
        return (
          <div className="flex space-x-4">
            {/* Icon & Vertical Line */}
            <div className="flex flex-col items-center flex-shrink-0">
              {/* Task Type Icon */}
              <div className="w-10 h-10 flex items-center justify-center">
                {TASKTYPEICON[item?.type]}
              </div>
      
              {/* Vertical Line (Hidden for Last Item) */}
              {isConnected && <div className="w-0.5 bg-gray-300 flex-1"></div>}
            </div>
      
            {/* Task Info */}
            <div className="flex flex-col gap-y-1 mb-4">
              <p className="font-normal">{item?.by?.name || "Unknown User"}</p>
              <div className="text-gray-500 space-y-1">
                <span className="capitalize">{item?.type}</span>
                <span className="text-sm">{" "}{item?.date ? getTimeAgo(item.date) : "Just now"}</span>
              </div>
              <div className="text-gray-700">{item?.activity}</div>
            </div>
          </div>
        );
      };
        
    return (
      <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
        <div className='w-full md:w-1/2'>
          <h4 className='text-gray-600 font-semibold text-lg mb-5'>Activities</h4>
  
          <div className='w-full'>
            {taskdata?.activities?.map((el, index) => (
              <Card
                key={index}
                item={el}
                isConnected={index < taskdata?.activities?.length - 1}
              />
            ))}
          </div>
        </div>
  
        <div className='w-full md:w-1/3'>
          <h4 className='text-gray-600 font-semibold text-lg mb-5'>
            Add Activity
          </h4>
          <div className='w-full flex flex-wrap gap-5'>
            {act_types.map((item, index) => (
              <div key={item} className='flex gap-2 items-center'>
                <input
                  type='checkbox'
                  className='w-4 h-4'
                  checked={selected === item ? true : false}
                  onChange={(e) => setSelected(item)}
                />
                <p>{item}</p>
              </div>
            ))}
            <textarea
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Type ......'
              className='bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
            ></textarea>
            {isLoading ? (
              <CustomLoading />
            ) : (
              <button
                type='button'
                onClick={handleSubmit}
                className='bg-blue-600 text-white rounded-lg p-2 w-full mt-3'
              >Submit</button>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default Activities;