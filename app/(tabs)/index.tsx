import TaskList from "@/components/TaskList";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    
    <View className="flex-1 bg-myWhite">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator = {false} contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
          <Text className="w-30 h-10 mt-20 mb-0 mx-auto">MyManager</Text>
          <View className="flex-1 mt-5">
            <Text className="text-lg text-center font-bold mt-5 mb-3">Your Tasks</Text>
            <View className="flex flex-col w-full h-auto bg-myOrange rounded-[4vw]">
            <TaskList/>
            </View>
          </View>
          <View className="mt-10 mb-5 w-full bg-myPink"></View>
      </ScrollView>
    </View>
  );
}
