import { useState } from "react";
import CustomLoading from "../CustomComponent/CustomLoading";
import { act_types, TASKTYPEICON } from "../utils";

const Activities = ({ activity, id }) => {
    const [selected, setSelected] = useState(act_types[0]);
    const [text, setText] = useState("");
    const isLoading = false;
  
    const handleSubmit = async () => {};
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
      
    const Card = ({ item }) => {
      return (
        <div className='flex space-x-4'>
          <div className='flex flex-col items-center flex-shrink-0'>
            <div className='w-10 h-10 flex items-center justify-center'>
              {TASKTYPEICON[item?.type]}
            </div>
            <div className='w-full flex items-center'>
              <div className='w-0.5 bg-gray-300 h-full'></div>
            </div>
          </div>
  
          <div className='flex flex-col gap-y-1 mb-8'>
            <p className='font-semibold'>{item?.by?.name}</p>
            <div className='text-gray-500 space-y-2'>
              <span className='capitalize'>{item?.type}</span>
              <span className='text-sm'> {"  "}{getTimeAgo(item?.date)}</span>

            </div>
            <div className='text-gray-700'>{item?.activity}</div>
          </div>
        </div>
      );
    };
  console.log("activity",activity);
  
    return (
      <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
        <div className='w-full md:w-1/2'>
          <h4 className='text-gray-600 font-semibold text-lg mb-5'>Activities</h4>
  
          <div className='w-full'>
            {activity?.map((el, index) => (
              <Card
                key={index}
                item={el}
                isConnected={index < activity.length - 1}
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