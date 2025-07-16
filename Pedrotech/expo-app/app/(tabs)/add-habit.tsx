import { Text, View, StyleSheet } from "react-native";

export default function AddHabitScreen() {
  return (
    <View
      style={styles.view}
    >
      <Text>Add Habit</Text>
    </View>
  );

}

const styles =  StyleSheet.create({
    view:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
});