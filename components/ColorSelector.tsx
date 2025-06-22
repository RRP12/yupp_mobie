"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, Dimensions, Platform, Vibration, StatusBar } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
  useAnimatedGestureHandler,
  withRepeat,
} from "react-native-reanimated"
import { PanGestureHandler } from "react-native-gesture-handler"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"

const { width, height } = Dimensions.get("window")
const ITEM_SIZE = 60
const ITEM_MARGIN = 12
const HIT_TARGET = 44
const CONTAINER_PADDING = 20

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(View)
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

interface ColorOption {
  id: string
  name: string
  hex: string
  gradient: string[]
  category: "warm" | "cool" | "neutral" | "vibrant"
  popularity: number
}

const colorPalettes: ColorOption[] = [
  // Warm Colors
  {
    id: "1",
    name: "Sunset Orange",
    hex: "#FF6B35",
    gradient: ["#FF6B35", "#F7931E"],
    category: "warm",
    popularity: 95,
  },
  { id: "2", name: "Coral Pink", hex: "#FF6B6B", gradient: ["#FF6B6B", "#FF8E8E"], category: "warm", popularity: 88 },
  {
    id: "3",
    name: "Golden Yellow",
    hex: "#FFD93D",
    gradient: ["#FFD93D", "#FFC107"],
    category: "warm",
    popularity: 82,
  },
  { id: "4", name: "Crimson Red", hex: "#DC143C", gradient: ["#DC143C", "#FF6B6B"], category: "warm", popularity: 76 },

  // Cool Colors
  { id: "5", name: "Ocean Blue", hex: "#4ECDC4", gradient: ["#4ECDC4", "#45B7D1"], category: "cool", popularity: 92 },
  { id: "6", name: "Sky Blue", hex: "#87CEEB", gradient: ["#87CEEB", "#90CAF9"], category: "cool", popularity: 85 },
  { id: "7", name: "Mint Green", hex: "#A8E6CF", gradient: ["#A8E6CF", "#6BCF7F"], category: "cool", popularity: 79 },
  { id: "8", name: "Lavender", hex: "#BB8FCE", gradient: ["#BB8FCE", "#A569BD"], category: "cool", popularity: 73 },

  // Neutral Colors
  { id: "9", name: "Charcoal", hex: "#36454F", gradient: ["#36454F", "#2C3E50"], category: "neutral", popularity: 90 },
  {
    id: "10",
    name: "Warm Gray",
    hex: "#8D8D8D",
    gradient: ["#8D8D8D", "#BCAAA4"],
    category: "neutral",
    popularity: 84,
  },
  { id: "11", name: "Cream", hex: "#F5F5DC", gradient: ["#F5F5DC", "#FFF8DC"], category: "neutral", popularity: 78 },
  { id: "12", name: "Slate", hex: "#708090", gradient: ["#708090", "#778899"], category: "neutral", popularity: 71 },

  // Vibrant Colors
  {
    id: "13",
    name: "Electric Purple",
    hex: "#8A2BE2",
    gradient: ["#8A2BE2", "#9932CC"],
    category: "vibrant",
    popularity: 87,
  },
  {
    id: "14",
    name: "Neon Green",
    hex: "#39FF14",
    gradient: ["#39FF14", "#32CD32"],
    category: "vibrant",
    popularity: 81,
  },
  { id: "15", name: "Hot Pink", hex: "#FF1493", gradient: ["#FF1493", "#FF69B4"], category: "vibrant", popularity: 75 },
  {
    id: "16",
    name: "Cyber Yellow",
    hex: "#FFFF00",
    gradient: ["#FFFF00", "#FFD700"],
    category: "vibrant",
    popularity: 69,
  },
]

export default function PremiumColorSelector() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colorPalettes[0])
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // App Muscle Memory - Context Awareness
  const [appState, setAppState] = useState({
    recentColors: [colorPalettes[0].id, colorPalettes[4].id, colorPalettes[8].id],
    favoriteColors: [],
    lastUsed: Date.now(),
    selectionHistory: [],
  })

  // Smart Sticky & Progressive Animations
  const scrollY = useSharedValue(0)
  const headerOpacity = useSharedValue(1)
  const selectedScale = useSharedValue(1)
  const breatheScale = useSharedValue(1)
  const progressiveBlur = useSharedValue(20)

  // Micro-animations for feedback
  const buttonScale = useSharedValue(1)
  const rippleScale = useSharedValue(0)
  const rippleOpacity = useSharedValue(0)
  const colorTransition = useSharedValue(0)

  // Weighted Gestures
  const gestureScale = useSharedValue(1)
  const gestureRotation = useSharedValue(0)

  React.useEffect(() => {
    // Context-aware breathing animation (subtle, not overcook)
    breatheScale.value = withRepeat(
      withSequence(withTiming(1.02, { duration: 2000 }), withTiming(1, { duration: 2000 })),
      -1,
      false,
    )
  }, [])

  // Color selection with haptic feedback and micro-animations
  const handleColorSelect = (color: ColorOption) => {
    // Haptic feedback pattern
    Vibration.vibrate([50, 30, 50])

    setSelectedColor(color)

    // Update app muscle memory
    setAppState((prev) => ({
      ...prev,
      recentColors: [color.id, ...prev.recentColors.slice(0, 4)],
      selectionHistory: [color.id, ...prev.selectionHistory.slice(0, 9)],
      lastUsed: Date.now(),
    }))

    // Sequence + Stagger = Depth animation
    selectedScale.value = withSequence(
      withTiming(1.2, { duration: 150 }),
      withDelay(50, withSpring(1, { damping: 8, stiffness: 200 })),
    )

    // Color transition animation
    colorTransition.value = withSequence(withTiming(1, { duration: 200 }), withTiming(0, { duration: 300 }))

    // Ripple effect
    rippleScale.value = 0
    rippleOpacity.value = 0.6
    rippleScale.value = withTiming(2, { duration: 600 })
    rippleOpacity.value = withTiming(0, { duration: 600 })
  }

  // Weighted gesture handler for color items
  const colorGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      gestureScale.value = withSpring(0.95, { damping: 15, stiffness: 300 })
    },
    onActive: (event) => {
      const force = Math.min(event.force || 1, 3)
      gestureScale.value = 0.95 + force * 0.03
      gestureRotation.value = (event.velocityX || 0) * 0.0005
    },
    onEnd: () => {
      gestureScale.value = withSequence(
        withTiming(1.1, { duration: 100 }),
        withSpring(1, { damping: 8, stiffness: 200 }),
      )
      gestureRotation.value = withSpring(0)
    },
  })

  // Animation styles
  const selectedAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: selectedScale.value }],
  }))

  const breatheAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breatheScale.value }],
  }))

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const colorTransitionStyle = useAnimatedStyle(() => ({
    opacity: interpolate(colorTransition.value, [0, 1], [1, 0.3]),
  }))

  const gestureAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: gestureScale.value }, { rotate: `${gestureRotation.value}deg` }],
  }))

  const rippleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value,
  }))

  // Filter colors based on category and search
  const filteredColors = colorPalettes.filter((color) => {
    const matchesCategory = activeCategory === "all" || color.category === activeCategory
    const matchesSearch = color.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Render color item with premium animations
  const renderColorItem = (color: ColorOption, index: number) => {
    const isSelected = selectedColor.id === color.id
    const isRecent = appState.recentColors.includes(color.id)
    const isFavorite = appState.favoriteColors.includes(color.id)

    return (
      <PanGestureHandler key={color.id} onGestureEvent={colorGestureHandler}>
        <AnimatedTouchableOpacity
          style={[styles.colorItem, gestureAnimatedStyle, isSelected && selectedAnimatedStyle]}
          onTouchEnd={() => handleColorSelect(color)}
        >
          {/* Ripple effect for selection */}
          {isSelected && (
            <Animated.View style={[styles.ripple, rippleAnimatedStyle]}>
              <LinearGradient
                colors={[color.gradient[0] + "40", color.gradient[1] + "20"]}
                style={styles.rippleGradient}
              />
            </Animated.View>
          )}

          {/* Color gradient */}
          <LinearGradient
            colors={color.gradient}
            style={[styles.colorGradient, isSelected && styles.selectedColorGradient]}
          >
            {/* Selection indicator */}
            {isSelected && (
              <Animated.View style={[styles.selectionIndicator, breatheAnimatedStyle]}>
                <Ionicons name="checkmark" size={20} color="white" />
              </Animated.View>
            )}

            {/* Popularity indicator */}
            {color.popularity > 85 && (
              <View style={styles.popularityBadge}>
                <Text style={styles.popularityText}>🔥</Text>
              </View>
            )}

            {/* Recent indicator */}
            {isRecent && !isSelected && (
              <View style={styles.recentBadge}>
                <View style={styles.recentDot} />
              </View>
            )}
          </LinearGradient>

          {/* Color name */}
          <Text style={[styles.colorName, isSelected && { color: color.hex, fontWeight: "700" }]}>{color.name}</Text>

          {/* Color hex */}
          <Text style={styles.colorHex}>{color.hex}</Text>
        </AnimatedTouchableOpacity>
      </PanGestureHandler>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Smart Sticky Header */}
      <AnimatedBlurView intensity={progressiveBlur} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={styles.brandSection}>
              <Animated.View style={[styles.logoContainer, breatheAnimatedStyle]}>
                <LinearGradient colors={selectedColor.gradient} style={styles.logo}>
                  <Ionicons name="color-palette" size={20} color="white" />
                </LinearGradient>
              </Animated.View>

              <View style={styles.brandInfo}>
                <Text style={styles.brandName}>Color Selector</Text>
                <Text style={styles.brandTagline}>choose your perfect palette</Text>
              </View>
            </View>

            <AnimatedTouchableOpacity
              style={[styles.favoriteButton, buttonAnimatedStyle]}
              onPress={() => {
                Vibration.vibrate(30)
                buttonScale.value = withSequence(withTiming(0.9, { duration: 100 }), withSpring(1, { damping: 8 }))
              }}
            >
              <LinearGradient colors={selectedColor.gradient} style={styles.favoriteGradient}>
                <Ionicons name="heart-outline" size={18} color="white" />
              </LinearGradient>
            </AnimatedTouchableOpacity>
          </View>

          {/* Category filters */}
          <View style={styles.categoriesContainer}>
            {["all", "warm", "cool", "neutral", "vibrant"].map((category) => (
              <AnimatedTouchableOpacity
                key={category}
                style={[styles.categoryButton, activeCategory === category && breatheAnimatedStyle]}
                onPress={() => {
                  setActiveCategory(category)
                  Vibration.vibrate(30)

                  buttonScale.value = withSequence(
                    withTiming(0.95, { duration: 100 }),
                    withSpring(1.05, { damping: 8 }),
                    withTiming(1, { duration: 200 }),
                  )
                }}
              >
                <LinearGradient
                  colors={
                    activeCategory === category
                      ? selectedColor.gradient
                      : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]
                  }
                  style={styles.categoryGradient}
                >
                  <Text
                    style={[styles.categoryText, activeCategory === category && { color: "white", fontWeight: "700" }]}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </LinearGradient>
              </AnimatedTouchableOpacity>
            ))}
          </View>
        </View>
      </AnimatedBlurView>

      {/* Selected Color Preview */}
      <Animated.View style={[styles.selectedColorPreview, colorTransitionStyle]}>
        <LinearGradient colors={selectedColor.gradient} style={styles.selectedColorGradient}>
          <BlurView intensity={20} style={styles.selectedColorBlur}>
            <View style={styles.selectedColorInfo}>
              <Text style={styles.selectedColorName}>{selectedColor.name}</Text>
              <Text style={styles.selectedColorHex}>{selectedColor.hex}</Text>
              <Text style={styles.selectedColorCategory}>
                {selectedColor.category} • {selectedColor.popularity}% popular
              </Text>
            </View>
          </BlurView>
        </LinearGradient>
      </Animated.View>

      {/* Color Grid */}
      <View style={styles.colorGrid}>
        <View style={styles.gridContainer}>{filteredColors.map((color, index) => renderColorItem(color, index))}</View>
      </View>

      {/* Recent Colors Section */}
      {appState.recentColors.length > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recently Used</Text>
          <View style={styles.recentColors}>
            {appState.recentColors.slice(0, 5).map((colorId) => {
              const color = colorPalettes.find((c) => c.id === colorId)
              if (!color) return null

              return (
                <AnimatedTouchableOpacity
                  key={colorId}
                  style={[styles.recentColorItem, buttonAnimatedStyle]}
                  onPress={() => handleColorSelect(color)}
                >
                  <LinearGradient colors={color.gradient} style={styles.recentColorGradient} />
                </AnimatedTouchableOpacity>
              )
            })}
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <AnimatedTouchableOpacity
          style={[styles.actionButton, buttonAnimatedStyle]}
          onPress={() => {
            Vibration.vibrate([50, 30, 50])
            buttonScale.value = withSequence(withTiming(0.95, { duration: 100 }), withSpring(1, { damping: 8 }))
          }}
        >
          <LinearGradient colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]} style={styles.actionGradient}>
            <Ionicons name="copy-outline" size={18} color="white" />
            <Text style={styles.actionText}>Copy Hex</Text>
          </LinearGradient>
        </AnimatedTouchableOpacity>

        <AnimatedTouchableOpacity
          style={[styles.primaryActionButton, buttonAnimatedStyle]}
          onPress={() => {
            Vibration.vibrate([100, 50, 100])
            buttonScale.value = withSequence(
              withTiming(0.95, { duration: 100 }),
              withSpring(1.1, { damping: 6 }),
              withTiming(1, { duration: 200 }),
            )
          }}
        >
          <LinearGradient colors={selectedColor.gradient} style={styles.primaryActionGradient}>
            <Ionicons name="checkmark" size={18} color="white" />
            <Text style={styles.primaryActionText}>Select Color</Text>
          </LinearGradient>
        </AnimatedTouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  // Smart Sticky Header
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 20,
    paddingHorizontal: CONTAINER_PADDING,
  },
  headerContent: {},
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  brandSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  brandInfo: {},
  brandName: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  brandTagline: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    fontWeight: "500",
    fontStyle: "italic",
  },
  favoriteButton: {
    borderRadius: 12,
    overflow: "hidden",
    minWidth: HIT_TARGET,
    minHeight: HIT_TARGET,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteGradient: {
    padding: 8,
  },

  // Categories
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    borderRadius: 16,
    overflow: "hidden",
    minHeight: 32,
  },
  categoryGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },

  // Selected Color Preview
  selectedColorPreview: {
    marginHorizontal: CONTAINER_PADDING,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    height: 120,
  },
  selectedColorGradient: {
    flex: 1,
  },
  selectedColorBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColorInfo: {
    alignItems: "center",
  },
  selectedColorName: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  selectedColorHex: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  selectedColorCategory: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "500",
  },

  // Color Grid
  colorGrid: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  colorItem: {
    width: (width - CONTAINER_PADDING * 2 - ITEM_MARGIN * 2) / 3,
    marginBottom: 20,
    alignItems: "center",
  },
  ripple: {
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: 30,
    borderRadius: 40,
    zIndex: 0,
  },
  rippleGradient: {
    flex: 1,
    borderRadius: 40,
  },
  colorGradient: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    position: "relative",
  },
  selectedColorGradient: {
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.8)",
  },
  selectionIndicator: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  popularityBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  popularityText: {
    fontSize: 10,
  },
  recentBadge: {
    position: "absolute",
    top: -3,
    right: -3,
  },
  recentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ECDC4",
  },
  colorName: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 2,
  },
  colorHex: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
  },

  // Recent Colors
  recentSection: {
    paddingHorizontal: CONTAINER_PADDING,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  recentColors: {
    flexDirection: "row",
    gap: 12,
  },
  recentColorItem: {
    borderRadius: 12,
    overflow: "hidden",
  },
  recentColorGradient: {
    width: 40,
    height: 40,
  },

  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: CONTAINER_PADDING,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    minHeight: HIT_TARGET,
  },
  actionGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  actionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  primaryActionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    minHeight: HIT_TARGET,
  },
  primaryActionGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  primaryActionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
})
