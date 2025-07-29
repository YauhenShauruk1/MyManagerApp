import DropdownMenu from '@/components/DropdownMenu';
import { removeValue, setObjectValue } from '@/constants/functionss';
import { Task } from '@/constants/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const TaskDetails = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [changedTask, setChangedTask] = useState<Task | null>(null) //for future updates
  const [chosenState, setChosenState] = useState(" ");
  const {id} = useLocalSearchParams();


  useEffect(() => {
      getData();
    }, [id]);

  const getData = async () => {
  try {
     const jsonValue = await AsyncStorage.getItem(id?.toString() || '');
      if (jsonValue) {
        const taskReturned: Task = JSON.parse(jsonValue);
        setTask(taskReturned);
        setChangedTask(taskReturned);
      } else {
        alert('Task not found.');
      }
  } catch (e) {
    // error reading value
  }};
  if (!task) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading task details...</Text>
      </View>
    );
  }
  const handleTaskSave = () => {
      if(changedTask){
        changedTask.status=chosenState;
        setObjectValue(changedTask);
        alert("Task sucsessfully saved");
        router.push('/(tabs)/newTask')
      }
  }
  const handleTaskRemoval = () =>{
    if(changedTask){
        removeValue(changedTask);
        alert("Task sucsessfully deleted");
        router.push('/(tabs)/newTask')
      }
  }
  

  return (
    <View className='bg-myWhite w-full h-full'>
      <SafeAreaView><ScrollView>
      <View> <Text className='text-lg text-center font-bold mt-5 mb-3'>{task.title}</Text></View> 
      <View> 
        <Text className='text-lg text-left font-bold mt-5'> Status: </Text>
        <DropdownMenu selected={task.status} onSelect={setChosenState} /></View>
      <View>
        <Text className='text-lg text-left font-bold mt-5'> Date: </Text>
        <Text className='ml-5'>{task.date ? new Date(task.date).toLocaleDateString() : 'no date'}</Text>
      </View> 
      <View>
         <Text className='text-lg text-left font-bold mt-5'> Location: </Text>
         <Text className='ml-5'>{task.location}</Text></View>
      <View className='w-full'>
        <Text className='text-lg text-left font-bold mt-5'> Commentary: </Text>
        <Text className='m-3 mt-0'>{task.comentary}</Text>
      </View> 
      <View className='flex-row justify-center'>
        <TouchableOpacity
            onPress={handleTaskRemoval}
            className='flex-row w-3/12 mx-4 h-15 bg-myPink mb-4 rounded-[4vw] p-4 items-center'
        >
            <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleTaskSave}
        className='flex-row w-3/12 mx-4 h-15 bg-myPink mb-4 rounded-[4vw] p-4 items-center'
        >
          <Text>Save Changes</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  )
};

export default TaskDetails