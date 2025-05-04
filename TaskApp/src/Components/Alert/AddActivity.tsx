import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CheckBox from '../CoreComponents/CheckBox';
import { act_types } from '../../Utils/ProjectStyles';
import DropDownList from '../CoreComponents/DropDownList';
import { Task } from '../../Utils/OurInterFace';

interface AddActivityProps {
  visible: boolean;
  onclose: () => void;
  handleActivitySubmit: (selected: string,text: string) => void;
  tasks:Task;
}


const AddActivity: React.FC<AddActivityProps> = ({
  visible,
  tasks,
  onclose,
  handleActivitySubmit,
}) => {

const [selected, setSelected] = useState<string>(act_types[0]);
    const [text, setText] = useState("");
    const [selectedActivity, setSelectedActivity] = useState("");
    const handleFilterChange = (value: string) => {
      setSelectedActivity(value);
          
      if (value === "Others") {
        setText(""); // Clear text input when Others is selected
      } else {
        setText(value); // Set text value to selected dropdown option
      }
      
      
    };
  
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/45 justify-center items-center px-4">
        <View className="bg-white w-full rounded-xl p-6 space-y-4">
          <Text className="text-xl font-semibold text-black">Add New Activity</Text>

          <View className="flex-row flex-wrap gap-2 my-4 justify-between">
            {act_types.map((item, index) => (
                <View key={index} className="w-[48%]">
                <CheckBox
                    isChecked={selected === item}
                    onPress={() => setSelected(item)}
                    title={item}
                />
                </View>
            ))}
            </View>

            <View className='mb-2'>
                <Text className="text-gray-700 font-bold text-lg">Activity</Text>
                {/* DropDown list */}
                <DropDownList
                  options={tasks?.subTasks.map((subTask) => subTask?.title)}
                  selected={selectedActivity}
                  onSelect={handleFilterChange}
                  placeholder="Select an Activity"
                />
                <View>
                {selectedActivity === "Others" && (
                  <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Describe your activity..."
                    className="border border-gray-300 rounded-md placeholder:text-black px-6 py-4 my-3  "
                    multiline
                  />
                )}
                </View>
            </View>


          {/* Action Buttons */}
          <View className="flex-row justify-end gap-4">
            <TouchableOpacity onPress={onclose} className="px-4 py-2 bg-gray-300 rounded-md">
              <Text className="text-black font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleActivitySubmit(selected, text)} className="px-4 py-2 bg-blue-600 rounded-md">
              <Text className="text-white font-medium">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddActivity;

const styles = StyleSheet.create({});
