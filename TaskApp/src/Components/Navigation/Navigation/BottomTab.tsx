import React, { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Text, ViewStyle, TextStyle } from "react-native";
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import { animate1, circle1, COLORS, animate2, circle2 } from "../../../Constants/Theme";
import DashboardScreen from "../../../Screens/DashboardScreen";
import TaskScreen from "../../../Screens/TaskScreen";
import ProfileScreen from "../../../Screens/ProfileScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type TabItem = {
  route: string;
  label: string;
  icon: string;
  component: React.ComponentType<any>;
};

const TabArr: TabItem[] = [
  { route: "DashboardScreen", label: "Dashboard", icon: "home", component: DashboardScreen },
  { route: "TaskScreen", label: "Tasks", icon: "tasks", component: TaskScreen },
  { route: "ProfileScreen", label: "Profile", icon: "user", component: ProfileScreen },
];

type TabButtonProps = {
  item: TabItem;
  onPress: () => void;
  accessibilityState?: { selected?: boolean };
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
            { borderColor: focused ? COLORS.white : COLORS.ourBlue[0] }, // Use first gradient color as border
          ]}
        >
          <LinearGradient colors={COLORS.ourBlue} style={styles.circle}>
            <FontAwesome name={item.icon} size={20} color={COLORS.white} />
          </LinearGradient>
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
          position: "absolute",
          height: 67,
          bottom: 0,
          right: 0,
          left: 0,
        } as ViewStyle, // Explicitly typing tabBarStyle
      }}
      tabBar={(props: BottomTabBarProps) => (
        <LinearGradient colors={COLORS.ourBlue} style={styles.tabBar}>
          <View style={styles.innerTabBar}>
            {props.state.routes.map((route, index) => {
              const { options } = props.descriptors[route.key];
              const isFocused = props.state.index === index;

              return (
                <TabButton
                  key={index}
                  item={TabArr[index]}
                  onPress={() => props.navigation.navigate(route.name)}
                  accessibilityState={{ selected: isFocused }}
                />
              );
            })}
          </View>
        </LinearGradient>
      )}
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
    alignItems: "center",
  },
  btn: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  text: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.white,
  } as TextStyle,
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 67,
  } as ViewStyle,
  innerTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  } as ViewStyle,
});
