import { Task } from '@/constants/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FilterDropdown from './FilterDropdown';



const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]); //empty array to be filled
  const [tasksSorted, settasksSorted] = useState<Task[]>([]); //dynamic empty array for filters
  const [statusFilter, setStatusFilter] = useState<String>('No Filter') 

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
  if (statusFilter === 'No Filter') {
    settasksSorted(tasks); // Show all
  } else {
    const filtered = tasks.filter(task => task.status === statusFilter);
    settasksSorted(filtered);
  }
}, [statusFilter, tasks]);

  const loadTasks = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys(); //get keys
      const taskArray = await AsyncStorage.multiGet(keys); //get array of objects

      const parsedTasks: Task[] = taskArray
        .map(([key, value]) => {
          if (value) return JSON.parse(value);//translate objects
          return null;
        })
        .filter((task): task is Task => task !== null); //validation

      setTasks(parsedTasks);
      settasksSorted(tasks);
    } catch (err) {
      alert(err); 
    }
  }; //okay-function

/*  const filterByStatus = async (status:string) =>{
  const sortedbyStatusTasks = tasks.filter(task => task.status === status);
  settasksSorted(sortedbyStatusTasks);
} */

  const Item = ({id, title, comentary, location, date, status}: Task) => (
  <Link href={`/tasks/${id}`} asChild>
    <TouchableOpacity>
      <View className='flex-row w-11/12 mx-4 h-15 bg-myWhite mb-4 rounded-[4vw] p-4 items-center'>
      <View className='w-1/2 justify-center '><Text>{title}</Text></View>
      <View className='w-1/2 flex-col items-end justify-center '>
        <View className='text-gray-800'>
          <Text>{date ? new Date(date).toLocaleDateString() : 'no date'}</Text>
        </View>
        <View>
          <Text>{status}</Text>
        </View>
      </View>
      </View>
    </TouchableOpacity>
  </Link>
);

  return (
    <View>
      <TouchableOpacity onPress={loadTasks}>
        <View className='w-auto h-35 pl-10 pt-1'>
          <Text>Update ↺</Text>
        </View></TouchableOpacity>
      <FilterDropdown selectedFilter={"No Filter"} onSelect={setStatusFilter} />
      <FlatList //maybe error here
        data={tasksSorted}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Item id = {item.id} title={item.title} comentary={item.comentary} location={item.location} date = {item.date} status = {item.status} /> 
        )}
      />
    </View>
  );
};

export default TaskList;