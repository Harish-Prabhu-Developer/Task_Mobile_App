import { StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import React from 'react';

type PriorityStylesType = {
  high: string;
  medium: string;
  low: string;
  normal: string;
};

export const PRIORITY_STYLES: PriorityStylesType = {
  high: 'red',
  medium: 'yellow',
  low: 'blue',
  normal: 'gray',
};


  
export const TASK_TYPE = {
  todo: 'blue',
  'in progress': 'yellow',
  completed: 'green',
};

export const PROJECT_TYPE = {
  'Not Started': 'blue',
  'In Progress': 'yellow',
  Completed: 'green',
};

export const BGS = [
  'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'teal', 'gray', 'orange'
];

/*
// Priority Icons as Functional Components
export const HighPriorityIcon = <MaterialIcons name="keyboard-double-arrow-up" size={22} color="red" />;
export const MediumPriorityIcon = <MaterialIcons name="keyboard-arrow-up" size={22} color="yellow" />;
export const LowPriorityIcon =  <MaterialIcons name="keyboard-arrow-down" size={22} color="blue" />;

// Task Type Icons as Functional Components
export const CommentedIcon = () => (
  <View style={styles.iconBackgroundGray}>
    <Entypo name="message" size={22} color="white" />
  </View>
);
export const StartedIcon = () => (
  <View style={styles.iconBackgroundBlue}>
    <FontAwesome name="thumbs-up" size={20} color="white" />
  </View>
);
export const AssignedIcon = () => (
  <View style={styles.iconBackgroundGray}>
    <FontAwesome name="user" size={18} color="white" />
  </View>
);
export const BugIcon = () => <FontAwesome5 name="bug" size={24} color="red" />;
export const CompletedIcon = () => (
  <View style={styles.iconBackgroundGreen}>
    <MaterialIcons name="done-all" size={24} color="white" />
  </View>
);
export const InProgressIcon = () => (
  <View style={styles.iconBackgroundViolet}>
    <AntDesign name="sync" size={18} color="white" />
  </View>
);

// Usage Example
export const ICONS = {
  high: HighPriorityIcon,
  medium: MediumPriorityIcon,
  low: LowPriorityIcon,
};

export const TASKTYPEICON = {
  Commented: CommentedIcon,
  Started: StartedIcon,
  Assigned: AssignedIcon,
  Bug: BugIcon,
  Completed: CompletedIcon,
  'In Progress': InProgressIcon,
};
*/

export const act_types = [
  'Started',
  'Completed',
  'In Progress',
  'Commented',
  'Bug',
  'Assigned',
];

export const Enum = [
  'Completed',
  'In Progress',
  'Not Started',
  'Total',
  'completed',
  'in progress',
  'todo',
  'total',
];

const styles = StyleSheet.create({
    iconBackgroundGray: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconBackgroundBlue: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconBackgroundGreen: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconBackgroundViolet: {
        backgroundColor: 'violet',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
});
