import { Text, View, StyleSheet } from "react-native";

export default function login() {
  return (
    <View
      style={styles.view}
    >
      <Text>Login-Page</Text>
    </View>
  );

}

const styles =  StyleSheet.create({
    view:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      },
});