import { DATABASE_ID, HABITS_COLLECTION_ID, client, HABITS_COMPLETED_COLLECTION_ID, databases } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit, HabitCompleted, RealtimeResponse } from "@/types/database.type";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Query } from "react-native-appwrite";
import { Text, Button, Card } from "react-native-paper";

export default function StreakScreen() {

  const [habits, setHabits] = useState<Habit[]>([]);
  const [completedHabits, setCompletedHabits] = useState<HabitCompleted[]>([]);

  const { signOut, user } = useAuth();


  useEffect(() => {

    if (user) {

      fetchHabits();
      fetchAllHabits();

    }
  }, [user]);


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

  const fetchAllHabits = async () => {
    try {

      const response = await databases.listDocuments(
        DATABASE_ID,
        HABITS_COMPLETED_COLLECTION_ID,
        [
          Query.equal("user_id", user?.$id ?? ""),
        ],
      );

      const completed = response.documents as HabitCompleted[];
      setCompletedHabits(completed);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return;
      }
    }
  }

  interface streakData {
    streak: number;
    bestStreak: number;
    total: number;
  }

  const getHabitStreak = (habitID: string) => {

    const habitCompletion = completedHabits
      ?.filter((habit) => habit.habit_id === habitID)
      .sort((a, b) => new Date(a.completed_at).getTime() -
        new Date(b.completed_at).getTime()
      );

    if (habitCompletion?.length === 0) {
      return { streak: 0, bestStreak: 0, total: 0 }
    }

    let streak = 0;
    let bestStreak = 0;
    let total = habitCompletion.length;

    let lastDate: Date | null = null;
    let currentStreak: number = 0;

    habitCompletion?.forEach((habit) => {
      const date = new Date(habit.completed_at);
      if (lastDate) {
        const dateDiff = (date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

        if (dateDiff <= 1.5) {
          currentStreak += 1;
        }
        else {
          currentStreak = 1;
        }
      }
      else {
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
        }
        streak = currentStreak;
        lastDate = date;
      }
    }
    );

    return { streak, bestStreak, total }

  }

  const habitStreak = habits.map((habit) => {
    const { streak, bestStreak, total } = getHabitStreak(habit.$id);
    return { habit, streak, bestStreak, total };
  }
  );

  const rankedHabits = habitStreak.sort((a, b) => a.bestStreak - b.bestStreak);

  return (
    <View
      style={styles.container}
    >
      {/* <Text variant="headlineSmall" style={styles.title}> {"Habit Streaks"}</Text> */}
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          {"Habit Streaks"}
        </Text>
        <Button mode="text" onPress={signOut} icon={"logout"} style={styles.button}>
          {"Sign Out"}
        </Button>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {
          habits.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {"No Habit yet, Add Habits"}
              </Text>
            </View>
          ) :
            (
              rankedHabits.map(({ habit, streak, bestStreak, total }, key) =>
                <Card key={key} style={[styles.card, key === 0 && styles.firstCard]}>
                  <Card.Content>
                    <Text variant="titleMedium" style={styles.habitTitle}> {habit.title} </Text>
                    <Text style={styles.habitDescription}> {habit.description} </Text>
                    <View style={styles.statsRow}>
                      <View style={styles.statsBadge}>
                        <Text style={styles.statsBadgeText}>🔥 {streak} </Text>
                        <Text style={styles.statsBadgeLabel}>Current</Text>
                      </View>

                      <View style={styles.statsBadgeGold}>
                        <Text style={styles.statsBadgeText}> 🏆 {bestStreak} </Text>
                        <Text style={styles.statsBadgeLabel}>Current</Text>
                      </View>

                      <View style={styles.statsBadgeGreen}>
                        <Text style={styles.statsBadgeText}> ✅ {total} </Text>
                        <Text style={styles.statsBadgeLabel}>Total</Text>
                      </View>

                    </View>
                  </Card.Content>
                </Card>
              )
            )
        }
      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000000"
  },
  firstCard: {
    borderWidth: 2,
    borderColor: "#7c4dff"

  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0"
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#666666"
  },
  button: {

  },
  habitTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 2,
    color: "black"
  },
  habitDescription: {
    color: "#6c6c80",
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 8,
  },
  statsBadge: {
    backgroundColor: "#fff3e0",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    minWidth: 60,
  },
  statsBadgeGold: {
    backgroundColor: "#fffde7",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    minWidth: 60,
  },
  statsBadgeGreen: {
    backgroundColor: "#e8f5e9",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    minWidth: 60,
  },
  statsBadgeText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#22223b"
  },
  statsBadgeLabel: {
    fontSize: 11,
    color: "#888",
    marginTop:2,
    fontWeight:"500"
  },
  habitStreak: {

  },
  habitBest: {

  },
  habitTotal: {

  },
});