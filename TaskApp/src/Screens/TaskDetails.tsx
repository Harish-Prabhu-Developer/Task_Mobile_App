// TaskDetails.tsx
import { View, Text } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import TaskActivitiesTab from '../Components/Task/TaskActivitiesTab';
import Tabs from '../Components/Tab/Tabs';
import TaskDetailsTab from '../Components/Task/TaskDetailsTab';


const TaskDetails = () => {
  const route = useRoute<RouteProp<any>>();
  const task = route.params?.task ?? null;

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">{task?.title}</Text>
      {/*Our Tabs Component into automatically split the component into inside of the tabs */}
      <Tabs tabs={["Task Details", "Activities/Timelines"]}>
        {/*Task Details Tab */}
        <View>
          <TaskDetailsTab task={task}/>
        </View>
        
        {/* Activities Tab */}
        <View>
          <TaskActivitiesTab task={task}/>
        </View>
      </Tabs>
    </View>
  );
};

export default TaskDetails;
