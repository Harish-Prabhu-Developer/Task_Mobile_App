import { useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { MdNotifications } from "react-icons/md";

const data = [
  {
    _id: "65c5bbf3787832cf99f28e6d",
    text: "New task has been assigned to you and 2 others. The task priority is set a normal priority, so check and act accordingly. The task date is Thu Feb 29 2024. Thank you!!!",
    notiType: "alert",
    createdAt: "2024-02-09T05:45:23.353Z",
  },
  {
    _id: "65c5f12ab5204a81bde866ab",
    text: "New task has been assigned to you and 2 others. The task priority is set a high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
    notiType: "alert",
    createdAt: "2024-02-09T09:32:26.810Z",
  },
];

const ICONS = {
  alert: (
    <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
  message: (
    <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
};

const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.round((now - past) / 1000 / 60); // Difference in minutes

  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
  return `${Math.floor(diff / 1440)} days ago`;
};

const NotificationPanel = ({styles}) => {
  const [open, setOpen] = useState(false);

  const togglePanel = () => setOpen(!open);

  return (
    <div className='relative'>
      <button
        onClick={togglePanel}
        className='inline-flex items-center outline-none'
      >
        <div className='w-8 h-8 flex items-center justify-center text-gray-800 relative'>
        <MdNotifications className={`${styles} text-white`} />
          {data?.length > 0 && (
            <span className='absolute text-center top-0 right-1 text-xs text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
              {data?.length}
            </span>
          )}
        </div>
      </button>

      {open && (
        <div className='absolute -right-16 md:-right-2 z-10 mt-5 w-80 bg-white rounded-xl shadow-lg ring-1 ring-gray-900/5'>
          <div className='p-4'>
            {data.slice(0, 5).map((item, index) => (
              <div
                key={item._id + index}
                className='group flex gap-x-4 rounded-lg p-4 hover:bg-gray-50'
              >
                <div className='h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                  {ICONS[item.notiType]}
                </div>
                <div className='cursor-pointer'>
                  <div className='flex items-center gap-3 font-semibold text-gray-900 capitalize'>
                    <p>{item.notiType}</p>
                    <span className='text-xs font-normal lowercase'>
                      {timeAgo(item.createdAt)}
                    </span>
                  </div>
                  <p className='line-clamp-1 mt-1 text-gray-600'>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='grid grid-cols-2 divide-x bg-gray-50'>
            <button
              onClick={togglePanel}
              className='p-3 font-semibold text-blue-600 hover:bg-gray-100'
            >
              Cancel
            </button>
            <button
              onClick={() => console.log("Marking all as read")}
              className='p-3 font-semibold text-blue-600 hover:bg-gray-100'
            >
              Mark All Read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
