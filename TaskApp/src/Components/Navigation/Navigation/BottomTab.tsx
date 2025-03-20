import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
import { animate1, circle1, COLORS, animate2, circle2 } from '../../../Constants/Theme';
import DashboardScreen from '../../../Screens/DashboardScreen';
import TaskScreen from '../../../Screens/TaskScreen';
import ProfileScreen from '../../../Screens/ProfileScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Define the type for Tab items
type TabItem = {
  route: string;
  label: string;
  icon: string;
  component: React.ComponentType<any>;
};

// Define the tab array with icons from react-native-vector-icons
const TabArr: TabItem[] = [
  { route: 'DashboardScreen', label: 'Dashboard', icon: 'home', component: DashboardScreen },
  { route: 'TaskScreen', label: 'Tasks', icon: 'tasks', component: TaskScreen },
  { route: 'ProfileScreen', label: 'Profile', icon: 'user', component: ProfileScreen },
];

type TabButtonProps = {
  item: TabItem;
  onPress: () => void;
  accessibilityState: { selected?: boolean };
};

const TabButton: React.FC<TabButtonProps> = ({ item, onPress, accessibilityState }) => {
  const focused = accessibilityState?.selected || false;
  const viewRef = useRef<Animatable.View & View>(null);
  const circleRef = useRef<Animatable.View & View>(null);
  const textRef = useRef<Animatable.Text & Text>(null);

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate(animate1);
      circleRef.current?.animate(circle1);
      textRef.current?.transitionTo(circle2[0]);
    } else {
      viewRef.current?.animate(animate2);
      circleRef.current?.animate(circle2);
      textRef.current?.transitionTo(circle2[1]);
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={1}>
      <Animatable.View ref={viewRef} duration={900} style={styles.container}>
        <View
          style={[
            styles.btn,
            {
              borderBottomColor: focused ? COLORS.white : COLORS.primarycolor,
              borderStartColor: focused ? COLORS.white : COLORS.primarycolor,
              borderEndColor: focused ? COLORS.white : COLORS.primarycolor,
              borderTopColor: focused ? COLORS.white : COLORS.primarycolor,
            },
          ]}
        >
          <Animatable.View ref={circleRef} style={styles.circle} />
          <FontAwesome name={item.icon} size={20} color={COLORS.white} />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const Tab = createBottomTabNavigator();

const BottomTab: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: 67,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: COLORS.blue,
        },
      }}
    >
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderRadius: 50,
    backgroundColor: COLORS.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight:'bold',
    color: COLORS.white,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    borderRadius: 25,
  },
});
