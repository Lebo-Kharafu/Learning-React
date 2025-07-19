import { client, DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit, RealtimeResponse } from "@/types/database.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {View, StyleSheet, ScrollView } from "react-native";
import { Query } from "react-native-appwrite";
import { Swipeable } from "react-native-gesture-handler";
import { Text, Button, useTheme, Surface } from "react-native-paper";


export default function Index() {

  const [habits, setHabits] = useState<Habit[]>();
  const swipeableRefs = useRef< {[key:string]: Swipeable | null}>({});
  
  const { signOut ,user} = useAuth();
  const theme = useTheme();

  useEffect(() =>{
    if(user){
      const channel =  `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`;
      const HabitSub = client.subscribe(
      channel,
      (response:RealtimeResponse ) => {
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          fetchHabits();
        }
        else if (response.events.includes("databases.*.collections.*.documents.*.update")) {
          fetchHabits();
        }
        else if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
          fetchHabits();
        }
      }
      );

      fetchHabits();
      return () =>  {
          HabitSub();
        };
    }
  },[user]);


  const renderRightActions = () => (
    <View style={styles.swipeActionRight}>
      <MaterialCommunityIcons name="check-circle-outline" size={32} color={"#fff"}/>
    </View>
  );

  const renderLeftActions = () => (
    <View style={styles.swipeActionLeft}>
      <MaterialCommunityIcons name="trash-can-outline" size={32} color={"#fff"} />
    </View>
  );

  const fetchHabits = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [
          Query.equal("user_id", user?.$id ?? "")
        ],
      );
      setHabits(response.documents as Habit[]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return;
      }
    }
  }

  const deleteHabit = async (id:string) => {
    try {
      const response = await databases.deleteDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        id,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return;
      }
    }
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          {"Today's Habits"}
        </Text>
        <Button mode="text" onPress={signOut} icon={"logout"} style={styles.button}>
          {"Sign Out"}
        </Button>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {
          habits?.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {"No Habit yet, Add Habits"}
              </Text>
            </View>
          ):
          (
            habits?.map((habit,key) => (
              <Swipeable key={key} ref={(ref)=>{
                swipeableRefs.current[habit.$id] = ref;
              }}
              overshootLeft={false}
              overshootRight={false} 
              renderLeftActions={renderLeftActions}
              renderRightActions={renderRightActions}
              onSwipeableOpen={(direction) => {
                if (direction === "left") {
                  deleteHabit(habit.$id);
                }

                swipeableRefs.current[habit.$id]?.close();
              }}
              >
                <Surface  style={styles.card} elevation={0}>              
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>
                      {habit.title}
                    </Text>
                    <Text style={styles.cardDesc}>
                      {habit.description}
                    </Text>
                    <View style={styles.cardFooter}>
                      <View style={styles.streakBadge}>
                        <MaterialCommunityIcons name="fire" size={18} color={"#ff9800"} />
                        <Text style={styles.streakText}>
                          {habit.streak_count} day streak
                        </Text>
                      </View>
                      <View style={styles.freqBadge}>
                        <Text style={styles.freqText}>
                          {habit.frequency.charAt(0).toUpperCase()+ habit.frequency.slice(1)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Surface>
              </Swipeable>
            ))
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    backgroundColor:"#f5f5f5",

  },
  header: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:24,
  },
  title: {
    fontWeight:"bold",
    color:"#000000"
  },
  emptyState: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  emptyStateText: {
    color:"#666666"
  },
  button: {

  },
  swipeActionLeft: {
    justifyContent:"center",
    alignItems:"flex-start",
    flex:1,
    backgroundColor:"#e53935",
    marginBottom:18,
    marginTop:2,
    paddingLeft:16,
    borderRadius:18,
  },
  swipeActionRight: {
    justifyContent:"center",
    alignItems:"flex-end",
    flex:1,
    backgroundColor:"#4caf50",
    marginBottom:18,
    marginTop:2,
    paddingRight:16,
    borderRadius:18,
  },
  card: {
    marginBottom:18,
    borderRadius:18,
    backgroundColor:"#f7f2ea",
    shadowColor:"#000",
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.80,
    elevation:4
  },
  cardContent: {
    padding:20,
  },
  cardTitle: {
    fontSize:20,
    fontWeight:"bold",
    marginBottom:4,
    color:"#22223b",
  },
  cardDesc: {
    fontSize:15,
    marginBottom:16,
    color:"#6c6c80",
  },
  cardFooter: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },
  streakBadge: {
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff3e0",
    borderRadius:12,
    paddingHorizontal:10,
    paddingVertical:4,
  },
  streakText: {
    marginLeft:6,
    color: "#ff9800",
    fontWeight:"bold",
    fontSize:14,
  },
  freqBadge: {
    backgroundColor:"#ede7f6",
    borderRadius:12,
    paddingHorizontal:12,
    paddingVertical:4,
  },
  freqText: {
    color: "#c74dff",
    fontWeight:"bold",
    fontSize:14,
    textTransform:"capitalize",
  },

});
