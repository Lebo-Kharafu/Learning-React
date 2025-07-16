import { useAuth } from "@/lib/auth-context";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";


export default function Index() {

  const { signOut } = useAuth();

  return (
    <View
      style={styles.view}
    >
      <Text>Hello Kharafu</Text>
      <Button mode="outlined" onPress={signOut} style={styles.button}>
        {"Sign Out"}
      </Button>
    </View>
  );
}

const styles =  StyleSheet.create({
    view:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      button: {
       marginTop:8,
       textAlign:"center",
      },
});
