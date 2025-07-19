import { client, DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit, RealtimeResponse } from "@/types/database.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {View, StyleSheet } from "react-native";
import { Query } from "react-native-appwrite";
import { Text, Button, useTheme, Surface } from "react-native-paper";




export default function Index() {

  const [habits, setHabits] = useState<Habit[]>();
  
  const { signOut ,user} = useAuth();
  const theme = useTheme();

  useEffect(() =>{
    fetchHabits();
    const HabitSub = client.subscribe(
      `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`,
      (response:RealtimeResponse )=>{
        return;
      }
    );
  },[user]);


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


  return (
    <View
      style={styles.container}
    >
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          {"Today's Habits"}
        </Text>
        <Button mode="text" onPress={signOut} icon={"sign-out"} style={styles.button}>
          {"Sign Out"}
        </Button>
      </View>

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
            <Surface style={styles.card} elevation={0}>              
              <View key={key} style={styles.cardContent}>
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
          ))
        )
      }

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
  card: {
    marginBottom:18,
    borderRadius:18,
    backgroundColor:"#f7f2fa",
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
