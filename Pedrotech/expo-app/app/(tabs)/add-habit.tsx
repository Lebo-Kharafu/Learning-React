import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { router } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ID } from "react-native-appwrite";
import { Text, Button, SegmentedButtons, TextInput, useTheme } from "react-native-paper";

const FREQ = ["Daily", "Weekly", "Monthly"];
type Freq = (typeof FREQ)[number];

export default function AddHabitScreen() {

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [freq, setFreq] = useState<Freq>("daily");
  const [error, setError] = useState<string>("");
  const { user } = useAuth();
  const theme = useTheme();


  const handleAddHabit = async () => {
    if (!user) { return }

    try {
      await databases.createDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        ID.unique(),
        {
          user_id: user.$id,
          title,
          description:desc,
          frequency:freq,
          streak_count: 0,
          last_completed: new Date().toISOString(),
          created_at: new Date().toISOString(),
        }
      );
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }

      setError("There was a issue when adding habit.");


    }
  }

  return (
    <View style={styles.container}>

      <TextInput label="Title" mode="outlined"
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput label="Description" mode="outlined"
        onChangeText={setDesc}
        style={styles.input}
      />

      <View style={styles.freqContainer}>

        <SegmentedButtons
          value={freq}
          onValueChange={(value) => {
            setFreq(value as Freq)
          }}
          buttons={FREQ.map(freq => ({
            value: freq.toLowerCase(),
            label: freq
          }))}
          style={styles.segBtns}
        />

      </View>

      <Button mode="contained" style={styles.btn} disabled={!title || !desc} onPress={handleAddHabit}>
        Add Habit
      </Button>

      {
        error &&
        <Text style={{ textAlign: "center", color: theme.colors.error }}>
          {error}
        </Text>
      }


    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  }, input: {
    marginBottom: 16,
  },
  freqContainer: {
    marginBottom: 24,
  },
  segBtns: {
  },
  btn: {
  },
});