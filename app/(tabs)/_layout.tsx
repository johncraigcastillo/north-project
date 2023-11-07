import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, TextStyle, ViewStyle } from "react-native";

import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
  );
}

function getTabBarIcon(name: keyof typeof MaterialCommunityIcons.glyphMap) {
  return ({ color }: { color: string }) => (
    <TabBarIcon name={name} color={color} />
  );
}

const headerTitleStyle: TextStyle = {
  color: Colors.common.lightText,
};

const headerStyle: ViewStyle = {
  backgroundColor: Colors.common.headerBackgroundColor,
  borderBottomWidth: 0,
};

function screenOptions() {
  return {
    headerTitleStyle,
    headerStyle,
    tabBarIcon: (props: {
      name: keyof typeof MaterialCommunityIcons.glyphMap;
      color: string;
    }) => <TabBarIcon {...props} />,
  };
}

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarActiveBackgroundColor: Colors.common.tabBarActiveBackgroundColor,
        tabBarInactiveBackgroundColor:
          Colors[colorScheme].tabBarInactiveBackgroundColor,
        tabBarStyle: {
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="food"
        options={{
          ...screenOptions(),
          title: "Food",
          tabBarIcon: getTabBarIcon("silverware-fork-knife"),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialCommunityIcons
                    name="information"
                    size={25}
                    color={Colors.common.lightText}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="drinks"
        options={{
          ...screenOptions(),
          title: "Drinks",
          tabBarIcon: getTabBarIcon("glass-cocktail"),
        }}
      />
    </Tabs>
  );
}
