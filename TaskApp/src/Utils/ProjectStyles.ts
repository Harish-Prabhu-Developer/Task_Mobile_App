import { StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import React, { Component } from 'react';

type PriorityStylesType = {
  high: string;
  medium: string;
  low: string;
  normal: string;
};



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

// Removed duplicate declaration of act_types

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
  export const PRIOTITYSTYELS: PriorityStylesType = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-blue-600",
    normal:"text-gray-600"
  };

  type IconsStylesType = {
    high: () => JSX.Element;
    medium: () => JSX.Element;
    low: () => JSX.Element;
  };
  
  export const ICONS: IconsStylesType = {
    high: () => React.createElement(MaterialIcons, { name: "keyboard-double-arrow-up", size: 22 }),
    medium: () => React.createElement(MaterialIcons, { name: "keyboard-arrow-up", size: 22}),
    low: () => React.createElement(MaterialIcons, { name: "keyboard-arrow-down", size: 22}),
  };
  type TASKStylesType = {
    todo: string,
    "in progress":string,
    completed: string,
  };
  export const TASK_TYPE:TASKStylesType = {
    todo: "bg-blue-600 rounded-full w-4 h-4",
    "in progress": "bg-yellow-600 rounded-full w-4 h-4",
    completed: "bg-green-600 rounded-full w-4 h-4",
  };
  type PROJECTStylesType = {
    "Not Started": string,
    "In Progress":string,
    "Completed": string,
  };
  export const PROJECT_TYPE:PROJECTStylesType = {
    "Not Started": "bg-blue-600",
    "In Progress": "bg-yellow-600",
    "Completed": "bg-green-600",
  }
  export const BGS = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-gray-500",
    "bg-orange-500",

  ];



// Define task types explicitly
export type TaskType = "Commented" | "Started" | "Assigned" | "Bug" | "Completed" | "In Progress";

// Define type for TASKTYPEICON
export const TASKTYPEICON: Record<TaskType, () => JSX.Element> = {
  Commented: () =>
    React.createElement(
      View,
      { className: "w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center" },
      React.createElement(Entypo, { name: "message", size: 22, color: "white" })
    ),

  Started: () =>
    React.createElement(
      View,
      { className: "w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center" },
      React.createElement(FontAwesome, { name: "thumbs-up", size: 20, color: "white" })
    ),

  Assigned: () =>
    React.createElement(
      View,
      { className: "w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center" },
      React.createElement(FontAwesome, { name: "user", size: 18, color: "white" })
    ),

  Bug: () =>
    React.createElement(
      View,
      { className: "text-red-600" },
      React.createElement(FontAwesome5, { name: "bug", size: 24, color: "red" })
    ),

  Completed: () =>
    React.createElement(
      View,
      { className: "w-10 h-10 rounded-full bg-green-600 flex items-center justify-center" },
      React.createElement(MaterialIcons, { name: "done-all", size: 24, color: "white" })
    ),

  "In Progress": () =>
    React.createElement(
      View,
      { className: "w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center" },
      React.createElement(AntDesign, { name: "sync", size: 18, color: "white" })
    ),
};
/*export const act_types: string[] = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

export const Enum: string[] = [
  "Completed",
  "In Progress",
  "Not Started",
  "Total",
  "completed",
  "in progress",
  "todo",
  "total",
];

*/
/**export const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
] as const; // `as const` ensures that the array values are treated as a readonly tuple

export type ActType = (typeof act_types)[number]; // Extracts the types from the array

export const Enum = [
  "Completed",
  "In Progress",
  "Not Started",
  "Total",
  "completed",
  "in progress",
  "todo",
  "total",
] as const; // `as const` makes it a tuple with exact string literals

export type EnumType = (typeof Enum)[number]; // Extracts the types from the Enum array
 */
export const act_types: Array<"Started" | "Completed" | "In Progress" | "Commented" | "Bug" | "Assigned"> = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

export const statusEnum: Array<"Completed" | "In Progress" | "Not Started" | "Total" | "completed" | "in progress" | "todo" | "total"> = [
  "Completed",
  "In Progress",
  "Not Started",
  "Total",
  "completed",
  "in progress",
  "todo",
  "total",
];

// Utility function to generate a unique color for a user's logo
export const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-gray-500",
  "bg-orange-500",
];

export const getUniqueColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
};