import { icons } from '@/constants/icons';
import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

const TabIcon = ({focused, icon, title}: any) => {
    if(focused)
    {return (<ImageBackground
        source={icons.highlight}
        className="flex flex-row w-full flex-1 min-w-[225px] min-h-14 mt-6 justify-center items-center rounded-full overflow-hidden">
            <Image
                source={icon}
                style={{ width: 40, height: 40 }}
                tintColor="#7A3B69"
            />
                        
            <Text className='m-2'>{title}</Text>
    </ImageBackground>)}
    else{
    return(
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image
                source={icon}
                style={{ width: 40, height: 40 }}
                tintColor="#7A3B69"
            />
        </View>
        )}
}

const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarItemStyle:{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle:{
                backgroundColor: "#E7CFBC",
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#E7CFBC',
                
            }
        }}>
        <Tabs.Screen
        name="index"
        options={{
            title: '',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                    <TabIcon
                        focused={focused}
                        icon={icons.home}
                        title ="Home"
                    />  
            )
            }}
        />
        <Tabs.Screen
        name="newTask"
        options={{
            title: '',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                    <TabIcon
                        focused={focused}
                        icon={icons.plus}
                        title ="New Task"
                    />  
            )
            }}
        />
    </Tabs>
  )
}

export default _layout