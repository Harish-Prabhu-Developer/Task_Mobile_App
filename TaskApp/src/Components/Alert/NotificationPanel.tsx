import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppDispatch, RootState } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../Redux/Slice/AssignTask/AssignTaskSlice";

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);

  const togglePanel = () => setOpen(!open);

  const data = [
    {
      _id: "65c5bbf3787832cf99f28e6d",
      text: "New task has been assigned ...",
      notiType: "message",
      createdAt: "2024-02-09T05:45:23.353Z",
    },
    {
      _id: "65c5f12ab5204a81bde866ab",
      text: "New task has been assigned ...",
      notiType: "message",
      createdAt: "2024-02-09T09:32:26.810Z",
    },
    {
        _id: "65c5bbf3787832cf99f29e6d",
        text: "New task has been assigned ...",
        notiType: "message",
        createdAt: "2024-02-09T05:45:23.353Z",
      },
      {
        _id: "65c5f12ab5204a81bde896ab",
        text: "New task has been assigned ...",
        notiType: "message",
        createdAt: "2024-02-09T09:32:26.810Z",
      },{
        _id: "66c5bbf3787832cf99f28e6d",
        text: "New task has been assigned ...",
        notiType: "alert",
        createdAt: "2024-02-09T05:45:23.353Z",
      },
      {
        _id: "67c5f12ab5204a81bde866ab",
        text: "New task has been assigned ...",
        notiType: "alert",
        createdAt: "2024-02-09T09:32:26.810Z",
      },
      {
        _id: "65c5bbb3787832cf99f28e6d",
        text: "New task has been assigned ...",
        notiType: "alert",
        createdAt: "2024-02-09T05:45:23.353Z",
      },
      {
        _id: "65c5f1rab5204a81bde866ab",
        text: "New task has been assigned ...",
        notiType: "alert",
        createdAt: "2024-02-09T09:32:26.810Z",
      },
      {
        _id: "65c5bbf3787hj2cf99f28e6d",
        text: "New task has been assigned ...",
        notiType: "message",
        createdAt: "2024-02-09T05:45:23.353Z",
      },
      {
        _id: "65c5f12ab5204ui1bde866ab",
        text: "New task has been assigned ...",
        notiType: "message",
        createdAt: "2024-02-09T09:32:26.810Z",
      },
  ];

   const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      const getNotifications = async () => {
        await dispatch(fetchNotifications());
      };
      getNotifications();
    }, [dispatch])
    const notificationsData=useSelector((state:RootState) => state.assignTask.notifications);
  const ICONS: Record<string, JSX.Element> = {
    alert: <FontAwesome5 name="bell" size={20} className="text-gray-600" />,
    message: <FontAwesome5 name="comment" size={20} className="text-gray-600" />,
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.round((now.getTime() - past.getTime()) / 1000 / 60);
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  const NotificationItemRenderer = ({ item }: { item: any }) => {
    return (
      <View className="flex flex-col my-3 px-2">
        <View className="flex flex-row items-center gap-3">
          {ICONS[item.notiType]}
          <Text className="text-black font-semibold uppercase">{item.notiType}</Text>
          <Text className="text-gray-400 text-xs">{timeAgo(item.createdAt)}</Text>
        </View>
        <View className="ml-8 mt-1">
          <Text className="text-gray-600 text-sm">{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="relative">
      <TouchableOpacity onPress={togglePanel} className="relative">
        <View className="w-8 h-8 flex items-center justify-center relative">
          <MaterialIcons name="notifications" size={28} color="white" />
          {notificationsData.length > 0 && (
            <View className="absolute top-0 right-0 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
              <Text className="text-xs text-white font-bold">{notificationsData.length}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={open} onRequestClose={togglePanel}>
        <View className="absolute right-5 top-16 w-96 bg-white shadow-lg rounded-lg p-4">
          <Text className="text-center text-lg font-bold mb-3">Notifications</Text>

          {/* Scrollable Notification List */}
          <View className="h-72 overflow-hidden flex-grow">
          <FlatList
              data={notificationsData}
              keyExtractor={(item) => item._id}
              renderItem={NotificationItemRenderer}
              showsVerticalScrollIndicator={true}
              ListEmptyComponent={
                <View className="flex items-center justify-center h-72">
                  <Text className="text-gray-400 text-base font-medium">No Notifications available</Text>
                </View>
              }
            />

          </View>

          <View className="flex flex-row justify-between mt-4 w-full gap-2">
            <TouchableOpacity onPress={togglePanel} className="bg-gray-300 w-6/12 h-12 rounded-lg flex items-center justify-center">
              <Text className="text-black font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePanel} className="bg-blue-600 w-6/12 h-12 rounded-lg flex items-center justify-center">
              <Text className="text-white font-semibold">Mark All Read</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NotificationPanel;
