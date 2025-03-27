// Tabs.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type TabsProps = {
  tabs: string[];
  children: React.ReactNode[];
};

const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View className="flex-1">
      <View className="flex-row border-b border-gray-300">
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-1 p-3 bg-${activeTab === index ? 'blue-100' : 'gray-200'} rounded-t-lg`}
            onPress={() => setActiveTab(index)}
          >
            <Text className={`text-center ${activeTab === index ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="p-4">{children[activeTab]}</View>
    </View>
  );
};

export default Tabs;
