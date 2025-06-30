import { SplashScreen, Stack } from "expo-router"
import "react-native-reanimated"
// import { AuthProvider } from "../lib/auth/authContext"
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  // useEffect(() => {
  //   if (loaded) {
  //     // Hide the splash screen after the fonts have loaded
  //     SplashScreen.hideAsync()
  //   }
  // }, [loaded])

  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null
  // }

  return <Stack />
}
