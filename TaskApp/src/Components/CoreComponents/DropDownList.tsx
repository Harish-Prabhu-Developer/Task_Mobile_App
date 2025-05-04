import React, { useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

interface DropDownListProps {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
}

const DropDownList: React.FC<DropDownListProps> = ({
  options,
  selected,
  onSelect,
  placeholder = 'Select an Activity',
}) => {
  const [open, setOpen] = useState(false);

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => {
        onSelect(item);
        setOpen(false);
      }}
      className="px-4 py-2 bg-gray-100 rounded-md"
    >
      <Text className="text-gray-800">{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="bg-white w-full rounded-xl space-y-4 my-3">
      {/* Dropdown Button */}
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        className="flex-row justify-between items-center border border-gray-300 px-4 py-3 rounded-lg shadow-sm bg-white"
      >
        <Text className={`text-gray-700 ${!selected && 'text-gray-400'}`}>
          {selected || placeholder}
        </Text>
        <SimpleLineIcons name={open ? 'arrow-up' : 'arrow-down'} size={16} color="#6B7280" />
      </TouchableOpacity>

      {/* Options List */}
      {open && (
        <FlatList
          data={[...options, 'Others']}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderItem}
          className="space-y-2"
        />
      )}
    </View>
  );
};

export default DropDownList;
