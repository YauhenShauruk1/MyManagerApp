import DropdownMenu from '@/components/DropdownMenu';
import { storeData } from '@/constants/functionss';
import { Task } from '@/constants/interfaces';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//@react-native-community/datetimepicker


const newTask = () => {
  const [chosenState, setChosenState] = useState(" "); //global variable to save
  const [chosenTitle, setChosenTitle] = useState(""); // global title
  /* const [chosenDate, setChosenDate] = useState(""); //global Date */
  const [chosenDate, setChosenDate] = useState<Date>(new Date());
  const [chosenLocation, setChosenLocation] = useState("")
  const [chosenDetails, setChosenDetails] = useState("");
  const [showPicker, togglePicker] = useState(false)
  const createdTask: Task = {
      id: Date.now(),
      title: chosenTitle,
      comentary: chosenDetails,
      date: chosenDate,
      location: chosenLocation, // placeholder
      status: chosenState,
    };
  
  const HandleTaskMigration = () => {
    if(chosenTitle == "" || chosenState == " " || chosenTitle == "" && chosenState == " "){ 
    alert("Please, write your tasks' title and status")} 
    else{
    storeData(createdTask)
    alert("Task sucsessfully saved")
    clearInput();
    }}

    const clearInput = () => {
      setChosenTitle("");
      setChosenDetails("");
      setChosenDate(new Date(""));
      setChosenLocation("");
      setChosenState(" ");
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    togglePicker(false);
      if (event.type === 'set' && selectedDate) {
      setChosenDate(selectedDate);
    }};

    const handleTogglePicker = () =>{
      togglePicker(!showPicker);
    }




  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
    <View className="w-full h-full bg-myWhite">
      <SafeAreaView>
      <Text className="text-lg text-center font-bold mt-5 mb-3">Create New Task</Text>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className='w-full h-full overflow-hidden mb-24'>
          <Text className="text-lg text-left font-bold mt-5 mb-3 ml-2">The name of the task:</Text>
          <TextInput 
            value={chosenTitle}
            onChangeText={setChosenTitle} 
            className='bw-1 mb-4 w-full font-Georgia'
            placeholder='Title'
            maxLength={20}
          ></TextInput>
        <Text className="text-lg text-left font-bold mt-5 mb-3 ml-2">The state:</Text>
        <DropdownMenu selected="State ▼" onSelect={setChosenState} />
      {/* <TextInput
      value={chosenDate} 
      onChangeText={setChosenDate}
      placeholder='Date'></TextInput> */}
        <View className='flex-column w-full flex justify-left bg-myWhite'>
                <View className='h-auto flex-row w-full flex justify-left bg-myWhite'>
                  <View className='flex-row w-5/12 mt-5 mx-4 h-15  mb-4 rounded-[4vw] px-0 py-4 items-center'>
            <Text className="text-lg text-left font-bold mt-5 mb-3">The date:</Text>
          </View>
          <TouchableHighlight
            onPress={handleTogglePicker}
            className='flex-row w-4/12 mx-4 mt-5 h-15 bg-myPink mb-4 rounded-[4vw] p items-center ml-2'>
                  <Text className='ml-3'>{chosenDate ? new Date(chosenDate).toLocaleDateString() : 'no date'}</Text>
                  
          </TouchableHighlight>
          </View>
            {showPicker && (<RNDateTimePicker
                  value={chosenDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange} />)}
        </View>
          <Text className="text-lg text-left font-bold mt-5 mb-3 ml-2">The location:</Text>
          <TextInput
            value={chosenLocation} 
            onChangeText={setChosenLocation}
            placeholder='Location'
            maxLength={50}
            >
          </TextInput>
          <Text className="text-lg text-left font-bold mt-5 mb-3 ml-2">Details:</Text>
          <TextInput 
            value={chosenDetails}
            onChangeText={setChosenDetails}
            placeholder='Details'
            multiline={true}
            scrollEnabled = {false}
            className='h-auto w-full'>
          </TextInput>
          <View
          className='h-auto flex-row w-full flex justify-center'
          >
            <TouchableHighlight
            onPress={clearInput}
            className='flex-row w-4/12 mx-4 mt-5 h-15 bg-myPink mb-4 rounded-[4vw] p-4 items-center'
          >
            <Text>Clear</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={HandleTaskMigration}
            className='flex-row w-4/12 mx-4 mt-5 h-15 bg-myPink mb-4 rounded-[4vw] p-4 items-center'
          >
            <Text>Submit</Text>
          </TouchableHighlight>
          
          </View>
          
        </View>
        </ScrollView>

    </SafeAreaView>       
    </View>
    </KeyboardAvoidingView>
  )
}

export default newTask