import { Stack, useRouter, useSegments } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {user, isLoading} = useAuth();
  const segments = useSegments();

  const [hasMounted, setHasMounted]=useState(false);

  useEffect(()=>{ 
    setHasMounted(true)
  },[]);

  useFocusEffect(
    useCallback(() => {

      const inAuth = segments[0] === "auth";

      if (!user && !inAuth && !isLoading && hasMounted) {
        router.replace("/auth");
      }
      else if(user && inAuth && !isLoading){
        router.replace("/");
      }

    }, [user,segments,hasMounted])
  );

  return <>{children}</>

}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <AuthProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <RouteGuard>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </RouteGuard>
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
