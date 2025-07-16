import { Text, View, StyleSheet } from "react-native";

export default function StreakScreen() {
  return (
    <View
      style={styles.view}
    >
      <Text>Streak</Text>
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