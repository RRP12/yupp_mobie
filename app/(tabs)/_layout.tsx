import { Slot, useRouter, useSegments } from "expo-router"
import React, { useEffect } from "react"

import { useColorScheme } from "@/hooks/useColorScheme"
import { useAuth } from "../../lib/auth/authContext"

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { isAuthenticated, isLoading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    // If the user is not authenticated and not on an auth screen, redirect to login
    if (!isLoading && !isAuthenticated && segments[0] !== "(auth)") {
      router.replace("/")
    }
  }, [isAuthenticated, isLoading, segments])

  return (
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //     tabBarBackground: TabBarBackground,
    //     tabBarStyle: Platform.select({
    //       ios: {
    //         // Use a transparent background on iOS to show the blur effect
    //         position: "absolute",
    //       },
    //       default: {},
    //     }),
    //   }}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: "Home",
    //       headerShown: false,
    //       tabBarIcon: ({ color }) => (
    //         <IconSymbol size={28} name="house.fill" color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       headerShown: false,
    //       title: "Explore",
    //       tabBarIcon: ({ color }) => (
    //         <IconSymbol size={28} name="paperplane.fill" color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       headerShown: false,
    //       title: "Profile",
    //       tabBarIcon: ({ color }) => (
    //         <IconSymbol size={28} name="person.fill" color={color} />
    //       ),
    //     }}
    //   />
    // </Tabs>

    <Slot />
  )
}
