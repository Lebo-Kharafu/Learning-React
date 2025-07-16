import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";



export default function AuthScreen() {

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>("");

    const theme = useTheme();
    const {signIn,signUp} = useAuth();
    const router = useRouter();


    const handleSwitchMode = () => {
        setIsSignUp( prevIsSignUp => !prevIsSignUp);
    };

    const handleAuth = async () => {
        if(!email || !password){
            setError("Plz Type all inputs.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be 8 characters or more.");
            return;
        }

        setError(null);

        if (isSignUp) {
            const error = await signUp(email,password);
            if(error){
                setError(error);
                return;
            }
        } else {
            const error = await signIn(email,password);
            if(error){
                setError(error);
                return;
            }

            router.replace("/");


        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title} variant="headlineMedium">
                    {isSignUp?"Create Account":"Welcome Back"}
                </Text>

                <TextInput
                    label="Email"
                    autoCapitalize="none" 
                    keyboardType="email-address" 
                    placeholder="example@gmail.com"
                    mode="outlined"
                    onChangeText={setEmail}
                    style={styles.input}
                />

                <TextInput
                    label="Password"
                    autoCapitalize="none" 
                    keyboardType="email-address" 
                    placeholder="Your Password"
                    mode="outlined"
                    onChangeText={setPassword}
                    style={styles.input}
                />

                {
                    error && 
                    <Text style={{textAlign:"center",color: theme.colors.error}}>
                        {error} 
                    </Text>
                }

                <Button mode="outlined" onPress={handleAuth} style={styles.button}>
                    {isSignUp?"Sign Up":"Sign In"}
                </Button>

                <Button mode="text" onPress={handleSwitchMode} style={styles.switchButton}>
                    {isSignUp?"Already have Account? Sign In":"Don't have Account? Sign up"}
                </Button>

            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#f5f5f5",
    },
    content: {
        flex: 1,
        padding:16,
        justifyContent: "center",
    },
    title: {
        textAlign:"center",
        marginBottom:24,
    },
    input: {
        marginBottom:16,
    },
    button: {
       marginTop:8,
       textAlign:"center",
    },
    switchButton: {
       marginTop:16,
       textAlign:"center",
    },
    error: {
       textAlign:"center",
       color: "red",
    }
});