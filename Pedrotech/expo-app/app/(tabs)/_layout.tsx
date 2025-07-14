import { Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor:"pink"}}>
      

      <Tabs.Screen name="index" options={{
        title:"Home",
        tabBarIcon: ({color,focused}) => {
          return focused ?<MaterialIcons name="home" size={24} color={color} />:
                <MaterialCommunityIcons name="home-outline" size={24} color={color} /> },
      }}/>

      <Tabs.Screen name="login" options={{
        title:"Login-Page",
        tabBarIcon: ({color,focused}) => {return <MaterialCommunityIcons name="login-variant" size={24} color={color} />},
      }}/>
      
    </Tabs>
  );
}
