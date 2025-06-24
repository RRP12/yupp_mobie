import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const queryClient = new QueryClient();

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });

  if (isPending) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>An error has occurred: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.stats}>👀 {data.subscribers_count}</Text>
        <Text style={styles.stats}>✨ {data.stargazers_count}</Text>
        <Text style={styles.stats}>🍴 {data.forks_count}</Text>
      </View>
    </View>
  );
}

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 12,
    color: "#333",
  },
  statsContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  stats: {
    fontSize: 18,
    marginVertical: 4,
  },
});


//       {renderHeader()}
//       {renderCategories()}

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>✨ Trending Now</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAllText}>See All 🚀</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.postsGrid}>{posts.map(renderPostCard)}</View>
//       </ScrollView>

//       {renderBottomNav()}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//   },
//   header: {
//     paddingBottom: 20,
//   },
//   headerContent: {
//     paddingHorizontal: 20,
//   },
//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   headerLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   logoContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   logo: {
//     fontSize: 24,
//     marginRight: 8,
//   },
//   brandName: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "800",
//     letterSpacing: -0.5,
//   },
//   headerRight: {
//     flexDirection: "row",
//   },
//   headerButton: {
//     marginLeft: 16,
//     padding: 4,
//     position: "relative",
//   },
//   notificationBadge: {
//     position: "absolute",
//     top: -2,
//     right: -2,
//     backgroundColor: "#FF6B6B",
//     borderRadius: 8,
//     width: 16,
//     height: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1,
//   },
//   badgeText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   searchContainer: {
//     borderRadius: 20,
//     overflow: "hidden",
//   },
//   searchBlur: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   searchIcon: {
//     marginRight: 12,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: "#1e293b",
//     fontWeight: "500",
//   },
//   micButton: {
//     padding: 4,
//   },
//   categoriesContainer: {
//     paddingVertical: 20,
//     backgroundColor: "white",
//   },
//   categoriesScroll: {
//     paddingHorizontal: 20,
//   },
//   categoryButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 25,
//     marginRight: 12,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   activeCategoryButton: {
//     elevation: 6,
//     shadowOpacity: 0.2,
//   },
//   categoryText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#64748b",
//   },
//   activeCategoryText: {
//     color: "white",
//   },
//   content: {
//     flex: 1,
//     backgroundColor: "#f1f5f9",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#1e293b",
//   },
//   seeAllText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#667eea",
//   },
//   postsGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     paddingHorizontal: 16,
//     justifyContent: "space-between",
//   },
//   cardContainer: {
//     width: CARD_WIDTH,
//     marginBottom: 20,
//   },
//   card: {
//     borderRadius: 20,
//     padding: 16,
//     height: CARD_WIDTH * 1.5,
//     justifyContent: "space-between",
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
//   trendingBadge: {
//     position: "absolute",
//     top: 12,
//     right: 12,
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   trendingText: {
//     fontSize: 10,
//     fontWeight: "800",
//     color: "#FF6B6B",
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   userInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   avatar: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     marginRight: 8,
//     borderWidth: 2,
//     borderColor: "white",
//   },
//   username: {
//     color: "white",
//     fontSize: 13,
//     fontWeight: "700",
//   },
//   followButton: {
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 15,
//   },
//   followText: {
//     color: "white",
//     fontSize: 11,
//     fontWeight: "600",
//   },
//   playButtonContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   playButtonGlow: {
//     shadowColor: "#fff",
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   playButton: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "rgba(255, 255, 255, 0.25)",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "rgba(255, 255, 255, 0.3)",
//   },
//   tagsContainer: {
//     flexDirection: "row",
//     marginVertical: 8,
//   },
//   tag: {
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 10,
//     marginRight: 6,
//   },
//   tagText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "500",
//   },
//   cardFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   statsContainer: {
//     flexDirection: "row",
//   },
//   stat: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   statText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "600",
//     marginLeft: 4,
//   },
//   priceContainer: {
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 12,
//   },
//   priceText: {
//     color: "#1e293b",
//     fontSize: 14,
//     fontWeight: "800",
//   },
//   actionButtons: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 8,
//   },
//   actionButton: {
//     padding: 8,
//   },
//   bottomNav: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingBottom: Platform.OS === "ios" ? 25 : 10,
//   },
//   navContent: {
//     flexDirection: "row",
//     paddingVertical: 12,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 8,
//     position: "relative",
//   },
//   activeNavBackground: {
//     position: "absolute",
//     top: 4,
//     left: "25%",
//     right: "25%",
//     bottom: 4,
//     borderRadius: 20,
//   },
//   navLabel: {
//     fontSize: 11,
//     color: "#64748b",
//     marginTop: 4,
//     fontWeight: "600",
//   },
// })

// import { Ionicons } from "@expo/vector-icons"
// import { BlurView } from "expo-blur"
// import { LinearGradient } from "expo-linear-gradient"
// import React, { useEffect, useRef, useState } from "react"
// import {
//   Animated,
//   Dimensions,
//   Image,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native"

// const { width, height } = Dimensions.get("window")
// const VIDEO_HEIGHT = height * 0.65 // Much larger video area
// const VIDEO_WIDTH = width - 32

// export default function VibeZoneApp() {
//   const [activeCategory, setActiveCategory] = useState("For You")
//   const [activeTab, setActiveTab] = useState("Home")

//   const scaleAnim = useRef(new Animated.Value(1)).current
//   const fadeAnim = useRef(new Animated.Value(0)).current

//   useEffect(() => {
//     // Fade in animation
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start()
//   }, [])

//   const categories = [
//     { id: "foryou", label: "For You", emoji: "🔥" },
//     { id: "trending", label: "Trending", emoji: "📈" },
//     { id: "fashion", label: "Fashion", emoji: "👗" },
//     { id: "streetwear", label: "Streetwear", emoji: "🧢" },
//     { id: "vintage", label: "Vintage", emoji: "✨" },
//     { id: "luxury", label: "Luxury", emoji: "💎" },
//   ]

//   const videos = [
//     {
//       id: 1,
//       creator: "@stylegoddess",
//       handle: "Maya Chen",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
//       thumbnail:
//         "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
//       likes: "47.2K",
//       comments: "2.1K",
//       shares: "892",
//       views: "1.2M",
//       duration: "0:15",
//       isVerified: true,
//       description:
//         "thrifted this entire fit for under $30 💅 #thriftfinds #ootd #sustainable",
//       tags: ["#thriftfinds", "#ootd", "#sustainable", "#vintage"],
//       products: [
//         { name: "Vintage Denim Jacket", price: "$12", shop: "@thriftqueen" },
//         { name: "White Crop Top", price: "$8", shop: "@basics_co" },
//       ],
//       music: "original sound - stylegoddess",
//     },
//     {
//       id: 2,
//       creator: "@hypebeast_jay",
//       handle: "Jay Martinez",
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//       thumbnail:
//         "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
//       likes: "89.5K",
//       comments: "5.3K",
//       shares: "1.2K",
//       views: "2.8M",
//       duration: "0:22",
//       isVerified: true,
//       description:
//         "when the fit hits different 🔥🔥 cop or drop? #streetwear #hypebeast #ootd",
//       tags: ["#streetwear", "#hypebeast", "#ootd", "#fire"],
//       products: [
//         {
//           name: "Travis Scott Jordan 1",
//           price: "$1,200",
//           shop: "@sneaker_plug",
//         },
//         { name: "Off-White Hoodie", price: "$650", shop: "@luxury_drops" },
//       ],
//       music: "SICKO MODE - Travis Scott",
//     },
//   ]

//   const navItems = [
//     { icon: "home", label: "Home", key: "Home" },
//     { icon: "search", label: "Discover", key: "Discover" },
//     { icon: "add-circle", label: "Create", key: "Create", isSpecial: true },
//     { icon: "heart", label: "Activity", key: "Activity" },
//     { icon: "person", label: "Profile", key: "Profile" },
//   ]

//   const renderHeader = () => (
//     <View style={styles.header}>
//       <SafeAreaView>
//         <View style={styles.headerContent}>
//           {/* Brand Logo */}
//           <View style={styles.brandContainer}>
//             <LinearGradient
//               colors={["#FF0080", "#7928CA", "#0070F3"]}
//               style={styles.logoGradient}
//             >
//               <Text style={styles.logoText}>VZ</Text>
//             </LinearGradient>
//             <Text style={styles.brandName}>VibeZone</Text>
//           </View>

//           {/* Category Pills */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.categoriesContainer}
//             contentContainerStyle={styles.categoriesContent}
//           >
//             {categories.map((category) => (
//               <TouchableOpacity
//                 key={category.id}
//                 style={[
//                   styles.categoryPill,
//                   activeCategory === category.label &&
//                     styles.activeCategoryPill,
//                 ]}
//                 onPress={() => setActiveCategory(category.label)}
//               >
//                 <Text style={styles.categoryEmoji}>{category.emoji}</Text>
//                 <Text
//                   style={[
//                     styles.categoryLabel,
//                     activeCategory === category.label &&
//                       styles.activeCategoryLabel,
//                   ]}
//                 >
//                   {category.label}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       </SafeAreaView>
//     </View>
//   )

//   const renderVideoCard = (video, index) => (
//     <Animated.View
//       key={video.id}
//       style={[
//         styles.videoContainer,
//         {
//           opacity: fadeAnim,
//           transform: [
//             {
//               translateY: fadeAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [50, 0],
//               }),
//             },
//           ],
//         },
//       ]}
//     >
//       {/* Video Thumbnail/Player */}
//       <View style={styles.videoPlayer}>
//         <Image
//           source={{ uri: video.thumbnail }}
//           style={styles.videoThumbnail}
//         />

//         {/* Video Overlay Controls */}
//         <View style={styles.videoOverlay}>
//           {/* Duration Badge */}
//           <View style={styles.durationBadge}>
//             <Text style={styles.durationText}>{video.duration}</Text>
//           </View>

//           {/* Play Button */}
//           <TouchableOpacity style={styles.playButton}>
//             <LinearGradient
//               colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
//               style={styles.playButtonGradient}
//             >
//               <Ionicons name="play" size={32} color="white" />
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>

//         {/* Right Side Actions */}
//         <View style={styles.videoActions}>
//           <TouchableOpacity style={styles.actionButton}>
//             <View style={styles.actionButtonBg}>
//               <Ionicons name="heart" size={24} color="#FF0080" />
//             </View>
//             <Text style={styles.actionText}>{video.likes}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <View style={styles.actionButtonBg}>
//               <Ionicons name="chatbubble" size={24} color="white" />
//             </View>
//             <Text style={styles.actionText}>{video.comments}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <View style={styles.actionButtonBg}>
//               <Ionicons name="arrow-redo" size={24} color="white" />
//             </View>
//             <Text style={styles.actionText}>{video.shares}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <View style={styles.actionButtonBg}>
//               <Ionicons name="bookmark" size={24} color="white" />
//             </View>
//           </TouchableOpacity>

//           {/* Creator Avatar */}
//           <TouchableOpacity style={styles.creatorAvatar}>
//             <Image source={{ uri: video.avatar }} style={styles.avatarImage} />
//             <View style={styles.followButton}>
//               <Ionicons name="add" size={16} color="white" />
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Video Info */}
//       <View style={styles.videoInfo}>
//         <View style={styles.creatorInfo}>
//           <Text style={styles.creatorHandle}>
//             {video.creator}
//             {video.isVerified && <Text style={styles.verifiedBadge}> ✓</Text>}
//           </Text>
//           <Text style={styles.creatorName}>{video.handle}</Text>
//         </View>

//         <Text style={styles.videoDescription}>{video.description}</Text>

//         {/* Tags */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.tagsContainer}
//         >
//           {video.tags.map((tag, tagIndex) => (
//             <TouchableOpacity key={tagIndex} style={styles.tag}>
//               <Text style={styles.tagText}>{tag}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Music Info */}
//         <View style={styles.musicInfo}>
//           <Ionicons name="musical-notes" size={14} color="#666" />
//           <Text style={styles.musicText}>{video.music}</Text>
//         </View>

//         {/* Products */}
//         <View style={styles.productsContainer}>
//           <Text style={styles.productsTitle}>🛍️ Shop this look</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {video.products.map((product, productIndex) => (
//               <TouchableOpacity key={productIndex} style={styles.productCard}>
//                 <LinearGradient
//                   colors={["#FF0080", "#7928CA"]}
//                   style={styles.productGradient}
//                 >
//                   <Text style={styles.productName}>{product.name}</Text>
//                   <Text style={styles.productPrice}>{product.price}</Text>
//                   <Text style={styles.productShop}>{product.shop}</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       </View>
//     </Animated.View>
//   )

//   const renderBottomNav = () => (
//     <BlurView intensity={100} style={styles.bottomNav}>
//       <View style={styles.navContent}>
//         {navItems.map((item) => {
//           const isActive = activeTab === item.key
//           const isSpecial = item.isSpecial

//           if (isSpecial) {
//             return (
//               <TouchableOpacity key={item.key} style={styles.specialNavItem}>
//                 <LinearGradient
//                   colors={["#FF0080", "#7928CA"]}
//                   style={styles.createButton}
//                 >
//                   <Ionicons name={item.icon} size={28} color="white" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             )
//           }

//           return (
//             <TouchableOpacity
//               key={item.key}
//               style={styles.navItem}
//               onPress={() => setActiveTab(item.key)}
//             >
//               <Ionicons
//                 name={isActive ? item.icon : item.icon + "-outline"}
//                 size={24}
//                 color={isActive ? "#FF0080" : "#666"}
//               />
//               <Text
//                 style={[styles.navLabel, isActive && styles.activeNavLabel]}
//               >
//                 {item.label}
//               </Text>
//             </TouchableOpacity>
//           )
//         })}
//       </View>
//     </BlurView>
//   )

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="white" />

//       {renderHeader()}

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         bounces={true}
//       >
//         {videos.map(renderVideoCard)}
//       </ScrollView>

//       {renderBottomNav()}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//   },
//   header: {
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//   },
//   headerContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//   },
//   brandContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   logoGradient: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 8,
//   },
//   logoText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "900",
//   },
//   brandName: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: "#000",
//     letterSpacing: -1,
//   },
//   categoriesContainer: {
//     marginHorizontal: -16,
//   },
//   categoriesContent: {
//     paddingHorizontal: 16,
//   },
//   categoryPill: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   activeCategoryPill: {
//     backgroundColor: "#000",
//   },
//   categoryEmoji: {
//     fontSize: 16,
//     marginRight: 6,
//   },
//   categoryLabel: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#666",
//   },
//   activeCategoryLabel: {
//     color: "white",
//   },
//   content: {
//     flex: 1,
//     backgroundColor: "black",
//   },
//   videoContainer: {
//     marginBottom: 24,
//     paddingHorizontal: 16,
//   },
//   videoPlayer: {
//     height: VIDEO_HEIGHT,
//     borderRadius: 16,
//     overflow: "hidden",
//     position: "relative",
//   },
//   videoThumbnail: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   videoOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   durationBadge: {
//     position: "absolute",
//     top: 16,
//     right: 16,
//     backgroundColor: "rgba(0,0,0,0.7)",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   durationText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   playButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     overflow: "hidden",
//   },
//   playButtonGradient: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   videoActions: {
//     position: "absolute",
//     right: 16,
//     bottom: 80,
//     alignItems: "center",
//   },
//   actionButton: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   actionButtonBg: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   actionText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   creatorAvatar: {
//     position: "relative",
//     marginTop: 12,
//   },
//   avatarImage: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     borderWidth: 2,
//     borderColor: "white",
//   },
//   followButton: {
//     position: "absolute",
//     bottom: -6,
//     right: -6,
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: "#FF0080",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   videoInfo: {
//     paddingTop: 16,
//   },
//   creatorInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   creatorHandle: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//     marginRight: 8,
//   },
//   verifiedBadge: {
//     color: "#1DA1F2",
//   },
//   creatorName: {
//     color: "#999",
//     fontSize: 14,
//   },
//   videoDescription: {
//     color: "white",
//     fontSize: 15,
//     lineHeight: 20,
//     marginBottom: 12,
//   },
//   tagsContainer: {
//     marginBottom: 12,
//   },
//   tag: {
//     backgroundColor: "rgba(255,255,255,0.1)",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//     marginRight: 8,
//   },
//   tagText: {
//     color: "#7928CA",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   musicInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   musicText: {
//     color: "#999",
//     fontSize: 13,
//     marginLeft: 6,
//     fontStyle: "italic",
//   },
//   productsContainer: {
//     marginTop: 8,
//   },
//   productsTitle: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 12,
//   },
//   productCard: {
//     marginRight: 12,
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   productGradient: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     minWidth: 140,
//   },
//   productName: {
//     color: "white",
//     fontSize: 13,
//     fontWeight: "600",
//     marginBottom: 4,
//   },
//   productPrice: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "800",
//     marginBottom: 2,
//   },
//   productShop: {
//     color: "rgba(255,255,255,0.8)",
//     fontSize: 11,
//   },
//   bottomNav: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingBottom: Platform.OS === "ios" ? 25 : 10,
//   },
//   navContent: {
//     flexDirection: "row",
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 8,
//   },
//   specialNavItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 4,
//   },
//   createButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   navLabel: {
//     fontSize: 11,
//     color: "#666",
//     marginTop: 4,
//     fontWeight: "600",
//   },
//   activeNavLabel: {
//     color: "#FF0080",
//   },
// })

// third desig

// import { Ionicons } from "@expo/vector-icons"
// import { BlurView } from "expo-blur"
// import { LinearGradient } from "expo-linear-gradient"
// import React, { useEffect, useRef, useState } from "react"
// import {
//   Animated,
//   Dimensions,
//   Image,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native"

// const { width, height } = Dimensions.get("window")
// const VIDEO_HEIGHT = height * 0.6

// export default function VibeZoneApp() {
//   const [activeCategory, setActiveCategory] = useState("For You")
//   const [activeTab, setActiveTab] = useState("Home")
//   const [cartCount, setCartCount] = useState(3)

//   const scaleAnim = useRef(new Animated.Value(1)).current
//   const bounceAnim = useRef(new Animated.Value(1)).current
//   const headerAnim = useRef(new Animated.Value(0)).current

//   useEffect(() => {
//     // Header entrance animation
//     Animated.spring(headerAnim, {
//       toValue: 1,
//       tension: 100,
//       friction: 8,
//       useNativeDriver: true,
//     }).start()

//     // Bounce animation for trending
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(bounceAnim, {
//           toValue: 1.1,
//           duration: 1500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(bounceAnim, {
//           toValue: 1,
//           duration: 1500,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start()
//   }, [])

//   const trendingCategories = [
//     {
//       id: "foryou",
//       label: "For You",
//       emoji: "✨",
//       color: "#FF0080",
//       isHot: true,
//     },
//     {
//       id: "trending",
//       label: "Trending",
//       emoji: "🔥",
//       color: "#FF4500",
//       isHot: true,
//     },
//     { id: "streetwear", label: "Street", emoji: "🧢", color: "#7928CA" },
//     { id: "vintage", label: "Vintage", emoji: "🕰️", color: "#FFD700" },
//     { id: "luxury", label: "Luxury", emoji: "💎", color: "#0070F3" },
//     { id: "thrift", label: "Thrift", emoji: "♻️", color: "#00DFA2" },
//   ]

//   const videos = [
//     {
//       id: 1,
//       creator: "@stylegoddess",
//       handle: "Maya Chen",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
//       thumbnail:
//         "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
//       likes: "47.2K",
//       comments: "2.1K",
//       shares: "892",
//       views: "1.2M",
//       duration: "0:15",
//       isVerified: true,
//       isTrending: true,
//       trendingRank: 1,
//       description:
//         "POV: you found the perfect thrift haul 💅✨ #thriftfinds #ootd",
//       tags: ["#thriftfinds", "#ootd", "#sustainable", "#vintage"],
//       products: [
//         {
//           id: 1,
//           name: "Vintage Denim Jacket",
//           price: "$12",
//           originalPrice: "$89",
//           shop: "@thriftqueen",
//           inStock: true,
//           quickBuy: true,
//         },
//         {
//           id: 2,
//           name: "White Crop Top",
//           price: "$8",
//           originalPrice: "$25",
//           shop: "@basics_co",
//           inStock: true,
//           quickBuy: true,
//         },
//       ],
//       music: "original sound - stylegoddess",
//       engagement: "high",
//     },
//     {
//       id: 2,
//       creator: "@hypebeast_jay",
//       handle: "Jay Martinez",
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//       thumbnail:
//         "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
//       likes: "89.5K",
//       comments: "5.3K",
//       shares: "1.2K",
//       views: "2.8M",
//       duration: "0:22",
//       isVerified: true,
//       isTrending: true,
//       trendingRank: 2,
//       description: "when the fit hits different 🔥🔥 link in bio for W2C",
//       tags: ["#streetwear", "#hypebeast", "#ootd", "#fire"],
//       products: [
//         {
//           id: 3,
//           name: "Travis Scott Jordan 1",
//           price: "$1,200",
//           shop: "@sneaker_plug",
//           inStock: false,
//           waitlist: true,
//         },
//         {
//           id: 4,
//           name: "Off-White Hoodie",
//           price: "$650",
//           shop: "@luxury_drops",
//           inStock: true,
//           quickBuy: true,
//         },
//       ],
//       music: "SICKO MODE - Travis Scott",
//       engagement: "viral",
//     },
//   ]

//   const navItems = [
//     {
//       icon: "home",
//       label: "Home",
//       key: "Home",
//       gradient: ["#FF0080", "#FF4081"],
//     },
//     {
//       icon: "search",
//       label: "Discover",
//       key: "Discover",
//       gradient: ["#7928CA", "#9C27B0"],
//     },
//     {
//       icon: "add-circle",
//       label: "Create",
//       key: "Create",
//       isSpecial: true,
//       gradient: ["#FF6B35", "#F7931E"],
//     },
//     {
//       icon: "heart",
//       label: "Saved",
//       key: "Saved",
//       gradient: ["#00DFA2", "#00C9FF"],
//     },
//     {
//       icon: "bag",
//       label: "Shop",
//       key: "Shop",
//       gradient: ["#0070F3", "#00D4FF"],
//       hasNotification: true,
//     },
//   ]

//   const renderFunkyHeader = () => (
//     <Animated.View
//       style={[
//         styles.funkyHeader,
//         {
//           transform: [
//             {
//               translateY: headerAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [-50, 0],
//               }),
//             },
//           ],
//           opacity: headerAnim,
//         },
//       ]}
//     >
//       <LinearGradient
//         colors={["#FF0080", "#7928CA", "#0070F3"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.headerGradient}
//       >
//         <SafeAreaView>
//           <View style={styles.headerContent}>
//             {/* Top Row - Brand + Actions */}
//             <View style={styles.headerTop}>
//               <View style={styles.brandSection}>
//                 <Animated.View
//                   style={[
//                     styles.logoContainer,
//                     { transform: [{ scale: bounceAnim }] },
//                   ]}
//                 >
//                   <LinearGradient
//                     colors={["#FFD700", "#FF6B35"]}
//                     style={styles.logoGradient}
//                   >
//                     <Text style={styles.logoText}>VZ</Text>
//                   </LinearGradient>
//                 </Animated.View>
//                 <View style={styles.brandText}>
//                   <Text style={styles.brandName}>VibeZone</Text>
//                   <Text style={styles.brandTagline}>
//                     where style meets vibe ✨
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.headerActions}>
//                 {/* Live Indicator */}
//                 <TouchableOpacity style={styles.liveButton}>
//                   <View style={styles.liveDot} />
//                   <Text style={styles.liveText}>LIVE</Text>
//                 </TouchableOpacity>

//                 {/* Notifications */}
//                 <TouchableOpacity style={styles.headerActionButton}>
//                   <View style={styles.notificationBadge}>
//                     <Text style={styles.badgeText}>5</Text>
//                   </View>
//                   <Ionicons name="notifications" size={22} color="white" />
//                 </TouchableOpacity>

//                 {/* Messages */}
//                 <TouchableOpacity style={styles.headerActionButton}>
//                   <View style={styles.messageBadge}>
//                     <Text style={styles.badgeText}>2</Text>
//                   </View>
//                   <Ionicons name="chatbubbles" size={22} color="white" />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Search Bar */}
//             <View style={styles.searchSection}>
//               <BlurView intensity={30} style={styles.searchBlur}>
//                 <Ionicons
//                   name="search"
//                   size={18}
//                   color="#FF0080"
//                   style={styles.searchIcon}
//                 />
//                 <TextInput
//                   style={styles.searchInput}
//                   placeholder="Search trends, creators, styles... 🔍"
//                   placeholderTextColor="rgba(255,255,255,0.7)"
//                 />
//                 <TouchableOpacity style={styles.searchFilter}>
//                   <Ionicons name="options" size={16} color="#FF0080" />
//                 </TouchableOpacity>
//               </BlurView>
//             </View>

//             {/* Trending Categories */}
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.trendingContainer}
//               contentContainerStyle={styles.trendingContent}
//             >
//               {trendingCategories.map((category, index) => (
//                 <TouchableOpacity
//                   key={category.id}
//                   style={[
//                     styles.trendingPill,
//                     activeCategory === category.label &&
//                       styles.activeTrendingPill,
//                   ]}
//                   onPress={() => setActiveCategory(category.label)}
//                 >
//                   {category.isHot && (
//                     <Animated.View
//                       style={[
//                         styles.hotIndicator,
//                         { transform: [{ scale: bounceAnim }] },
//                       ]}
//                     >
//                       <Text style={styles.hotText}>HOT</Text>
//                     </Animated.View>
//                   )}
//                   <LinearGradient
//                     colors={
//                       activeCategory === category.label
//                         ? ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]
//                         : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]
//                     }
//                     style={styles.pillGradient}
//                   >
//                     <Text style={styles.pillEmoji}>{category.emoji}</Text>
//                     <Text
//                       style={[
//                         styles.pillLabel,
//                         activeCategory === category.label &&
//                           styles.activePillLabel,
//                       ]}
//                     >
//                       {category.label}
//                     </Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
//         </SafeAreaView>
//       </LinearGradient>
//     </Animated.View>
//   )

//   const renderVideoCard = (video, index) => (
//     <View key={video.id} style={styles.videoContainer}>
//       {/* Video Player */}
//       <View style={styles.videoPlayer}>
//         <Image
//           source={{ uri: video.thumbnail }}
//           style={styles.videoThumbnail}
//         />

//         {/* Trending Badge */}
//         {video.isTrending && (
//           <Animated.View
//             style={[
//               styles.trendingVideoBadge,
//               { transform: [{ scale: bounceAnim }] },
//             ]}
//           >
//             <LinearGradient
//               colors={["#FF4500", "#FF0080"]}
//               style={styles.trendingBadgeGradient}
//             >
//               <Text style={styles.trendingRank}>#{video.trendingRank}</Text>
//               <Text style={styles.trendingLabel}>TRENDING</Text>
//             </LinearGradient>
//           </Animated.View>
//         )}

//         {/* Video Controls */}
//         <View style={styles.videoControls}>
//           <TouchableOpacity style={styles.playButton}>
//             <LinearGradient
//               colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
//               style={styles.playButtonGradient}
//             >
//               <Ionicons name="play" size={32} color="white" />
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>

//         {/* Side Actions */}
//         <View style={styles.sideActions}>
//           <TouchableOpacity style={styles.sideAction}>
//             <LinearGradient
//               colors={["#FF0080", "#FF4081"]}
//               style={styles.actionBg}
//             >
//               <Ionicons name="heart" size={20} color="white" />
//             </LinearGradient>
//             <Text style={styles.actionCount}>{video.likes}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.sideAction}>
//             <LinearGradient
//               colors={["#7928CA", "#9C27B0"]}
//               style={styles.actionBg}
//             >
//               <Ionicons name="chatbubble" size={20} color="white" />
//             </LinearGradient>
//             <Text style={styles.actionCount}>{video.comments}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.sideAction}>
//             <LinearGradient
//               colors={["#00DFA2", "#00C9FF"]}
//               style={styles.actionBg}
//             >
//               <Ionicons name="arrow-redo" size={20} color="white" />
//             </LinearGradient>
//             <Text style={styles.actionCount}>{video.shares}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.sideAction}>
//             <LinearGradient
//               colors={["#FFD700", "#FF6B35"]}
//               style={styles.actionBg}
//             >
//               <Ionicons name="bookmark" size={20} color="white" />
//             </LinearGradient>
//           </TouchableOpacity>

//           {/* Creator Avatar with Follow */}
//           <View style={styles.creatorSection}>
//             <Image
//               source={{ uri: video.avatar }}
//               style={styles.creatorAvatar}
//             />
//             <TouchableOpacity style={styles.quickFollow}>
//               <Ionicons name="add" size={14} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Video Info & Shopping */}
//       <View style={styles.videoInfo}>
//         <View style={styles.creatorRow}>
//           <Text style={styles.creatorHandle}>
//             {video.creator}
//             {video.isVerified && <Text style={styles.verified}> ✓</Text>}
//           </Text>
//           <View style={styles.engagementBadge}>
//             <Text style={styles.engagementText}>
//               {video.engagement === "viral" ? "🚀 VIRAL" : "🔥 HOT"}
//             </Text>
//           </View>
//         </View>

//         <Text style={styles.description}>{video.description}</Text>

//         {/* Quick Shop Section */}
//         <View style={styles.quickShopSection}>
//           <Text style={styles.shopTitle}>🛍️ Shop this vibe</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {video.products.map((product, productIndex) => (
//               <View key={product.id} style={styles.productQuickCard}>
//                 <LinearGradient
//                   colors={
//                     product.inStock ? ["#00DFA2", "#00C9FF"] : ["#666", "#999"]
//                   }
//                   style={styles.productCardGradient}
//                 >
//                   <Text style={styles.productName}>{product.name}</Text>
//                   <View style={styles.priceRow}>
//                     <Text style={styles.currentPrice}>{product.price}</Text>
//                     {product.originalPrice && (
//                       <Text style={styles.originalPrice}>
//                         {product.originalPrice}
//                       </Text>
//                     )}
//                   </View>
//                   <Text style={styles.shopName}>{product.shop}</Text>

//                   {product.inStock ? (
//                     <TouchableOpacity
//                       style={styles.quickBuyButton}
//                       onPress={() => setCartCount(cartCount + 1)}
//                     >
//                       <Text style={styles.quickBuyText}>Quick Add</Text>
//                     </TouchableOpacity>
//                   ) : (
//                     <TouchableOpacity style={styles.waitlistButton}>
//                       <Text style={styles.waitlistText}>Join Waitlist</Text>
//                     </TouchableOpacity>
//                   )}
//                 </LinearGradient>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </View>
//     </View>
//   )

//   const renderBottomNav = () => (
//     <View style={styles.bottomNavContainer}>
//       <BlurView intensity={100} style={styles.bottomNav}>
//         <View style={styles.navContent}>
//           {navItems.map((item, index) => {
//             const isActive = activeTab === item.key
//             const isSpecial = item.isSpecial

//             if (isSpecial) {
//               return (
//                 <TouchableOpacity key={item.key} style={styles.specialNavItem}>
//                   <LinearGradient
//                     colors={item.gradient}
//                     style={styles.createButton}
//                   >
//                     <Ionicons name="add" size={28} color="white" />
//                   </LinearGradient>
//                   <Text style={styles.createLabel}>Create</Text>
//                 </TouchableOpacity>
//               )
//             }

//             return (
//               <TouchableOpacity
//                 key={item.key}
//                 style={styles.navItem}
//                 onPress={() => setActiveTab(item.key)}
//               >
//                 {isActive && (
//                   <LinearGradient
//                     colors={[...item.gradient, "transparent"]}
//                     style={styles.activeNavBg}
//                   />
//                 )}

//                 <View style={styles.navIconContainer}>
//                   {item.hasNotification && cartCount > 0 && (
//                     <View style={styles.cartBadge}>
//                       <Text style={styles.cartBadgeText}>{cartCount}</Text>
//                     </View>
//                   )}
//                   <Ionicons
//                     name={isActive ? item.icon : item.icon + "-outline"}
//                     size={24}
//                     color={isActive ? item.gradient[0] : "#666"}
//                   />
//                 </View>

//                 <Text
//                   style={[
//                     styles.navLabel,
//                     isActive && { color: item.gradient[0] },
//                   ]}
//                 >
//                   {item.label}
//                 </Text>
//               </TouchableOpacity>
//             )
//           })}
//         </View>
//       </BlurView>
//     </View>
//   )

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#FF0080" />

//       {renderFunkyHeader()}

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         bounces={true}
//       >
//         {videos.map(renderVideoCard)}
//       </ScrollView>

//       {renderBottomNav()}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   funkyHeader: {
//     zIndex: 10,
//   },
//   headerGradient: {
//     paddingBottom: 20,
//   },
//   headerContent: {
//     paddingHorizontal: 20,
//   },
//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   brandSection: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   logoContainer: {
//     marginRight: 12,
//   },
//   logoGradient: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#FFD700",
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   logoText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "900",
//   },
//   brandText: {},
//   brandName: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "900",
//     letterSpacing: -1,
//   },
//   brandTagline: {
//     color: "rgba(255,255,255,0.8)",
//     fontSize: 12,
//     fontStyle: "italic",
//   },
//   headerActions: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   liveButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255,0,0,0.8)",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     marginRight: 12,
//   },
//   liveDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "white",
//     marginRight: 4,
//   },
//   liveText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "700",
//   },
//   headerActionButton: {
//     marginLeft: 12,
//     position: "relative",
//   },
//   notificationBadge: {
//     position: "absolute",
//     top: -4,
//     right: -4,
//     backgroundColor: "#FF4500",
//     borderRadius: 8,
//     width: 16,
//     height: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1,
//   },
//   messageBadge: {
//     position: "absolute",
//     top: -4,
//     right: -4,
//     backgroundColor: "#00DFA2",
//     borderRadius: 8,
//     width: 16,
//     height: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1,
//   },
//   badgeText: {
//     color: "white",
//     fontSize: 9,
//     fontWeight: "700",
//   },
//   searchSection: {
//     marginBottom: 16,
//   },
//   searchBlur: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.2)",
//   },
//   searchIcon: {
//     marginRight: 12,
//   },
//   searchInput: {
//     flex: 1,
//     color: "white",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   searchFilter: {
//     padding: 4,
//   },
//   trendingContainer: {
//     marginHorizontal: -20,
//   },
//   trendingContent: {
//     paddingHorizontal: 20,
//   },
//   trendingPill: {
//     marginRight: 12,
//     position: "relative",
//   },
//   activeTrendingPill: {},
//   hotIndicator: {
//     position: "absolute",
//     top: -8,
//     right: -4,
//     backgroundColor: "#FF4500",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 8,
//     zIndex: 1,
//   },
//   hotText: {
//     color: "white",
//     fontSize: 8,
//     fontWeight: "800",
//   },
//   pillGradient: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.2)",
//   },
//   pillEmoji: {
//     fontSize: 16,
//     marginRight: 6,
//   },
//   pillLabel: {
//     color: "rgba(255,255,255,0.8)",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   activePillLabel: {
//     color: "white",
//   },
//   content: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   videoContainer: {
//     marginBottom: 24,
//     paddingHorizontal: 16,
//   },
//   videoPlayer: {
//     height: VIDEO_HEIGHT,
//     borderRadius: 20,
//     overflow: "hidden",
//     position: "relative",
//   },
//   videoThumbnail: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   trendingVideoBadge: {
//     position: "absolute",
//     top: 16,
//     left: 16,
//     zIndex: 2,
//   },
//   trendingBadgeGradient: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//     alignItems: "center",
//   },
//   trendingRank: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "900",
//   },
//   trendingLabel: {
//     color: "white",
//     fontSize: 8,
//     fontWeight: "700",
//   },
//   videoControls: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   playButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     overflow: "hidden",
//   },
//   playButtonGradient: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sideActions: {
//     position: "absolute",
//     right: 16,
//     bottom: 20,
//     alignItems: "center",
//   },
//   sideAction: {
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   actionBg: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   actionCount: {
//     color: "white",
//     fontSize: 11,
//     fontWeight: "600",
//   },
//   creatorSection: {
//     alignItems: "center",
//     marginTop: 8,
//   },
//   creatorAvatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     borderWidth: 2,
//     borderColor: "white",
//   },
//   quickFollow: {
//     position: "absolute",
//     bottom: -6,
//     right: -6,
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: "#FF0080",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   videoInfo: {
//     paddingTop: 16,
//   },
//   creatorRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   creatorHandle: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   verified: {
//     color: "#1DA1F2",
//   },
//   engagementBadge: {
//     backgroundColor: "rgba(255,255,255,0.1)",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   engagementText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "700",
//   },
//   description: {
//     color: "white",
//     fontSize: 15,
//     lineHeight: 20,
//     marginBottom: 16,
//   },
//   quickShopSection: {
//     marginTop: 8,
//   },
//   shopTitle: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 12,
//   },
//   productQuickCard: {
//     marginRight: 12,
//     borderRadius: 16,
//     overflow: "hidden",
//   },
//   productCardGradient: {
//     padding: 16,
//     minWidth: 160,
//   },
//   productName: {
//     color: "white",
//     fontSize: 13,
//     fontWeight: "600",
//     marginBottom: 6,
//   },
//   priceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   currentPrice: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "800",
//     marginRight: 8,
//   },
//   originalPrice: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 12,
//     textDecorationLine: "line-through",
//   },
//   shopName: {
//     color: "rgba(255,255,255,0.8)",
//     fontSize: 11,
//     marginBottom: 8,
//   },
//   quickBuyButton: {
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingVertical: 8,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   quickBuyText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "700",
//   },
//   waitlistButton: {
//     backgroundColor: "rgba(255,255,255,0.1)",
//     paddingVertical: 8,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   waitlistText: {
//     color: "rgba(255,255,255,0.7)",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   bottomNavContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   bottomNav: {
//     paddingBottom: Platform.OS === "ios" ? 25 : 10,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(255,255,255,0.1)",
//   },
//   navContent: {
//     flexDirection: "row",
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 8,
//     position: "relative",
//   },
//   activeNavBg: {
//     position: "absolute",
//     top: 0,
//     left: "20%",
//     right: "20%",
//     bottom: 0,
//     borderRadius: 20,
//     opacity: 0.2,
//   },
//   navIconContainer: {
//     position: "relative",
//   },
//   cartBadge: {
//     position: "absolute",
//     top: -6,
//     right: -6,
//     backgroundColor: "#FF0080",
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1,
//   },
//   cartBadgeText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "700",
//   },
//   specialNavItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 4,
//   },
//   createButton: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#FF6B35",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   createLabel: {
//     color: "#FF6B35",
//     fontSize: 11,
//     fontWeight: "600",
//     marginTop: 4,
//   },
//   navLabel: {
//     fontSize: 11,
//     color: "#666",
//     marginTop: 4,
//     fontWeight: "600",
//   },
// })

// fouth design

import FeedService from "@/api/feedService"
import { Ionicons } from "@expo/vector-icons"
import MaskedView from "@react-native-masked-view/masked-view"
import { BlurView } from "expo-blur"
import { LinearGradient } from "expo-linear-gradient"
import React, { useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
const { width, height } = Dimensions.get("window")
const VIDEO_HEIGHT = height * 0.62

export default function PremiumVibeZoneApp() {
  const [activeCategory, setActiveCategory] = useState("For You")
  const [activeTab, setActiveTab] = useState("Home")
  const [cartCount, setCartCount] = useState(3)
  const [isScrolling, setIsScrolling] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) // Explicitly type error state
  // Premium animations
  const liquidAnim = useRef(new Animated.Value(0)).current
  const floatingAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current
  const shimmerAnim = useRef(new Animated.Value(0)).current
  const breatheAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    // Liquid gradient animation
    Animated.loop(
      Animated.timing(liquidAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false,
      })
    ).start()

    // Floating elements
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start()

    // Shimmer effect
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start()

    // Breathing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  useEffect(() => {
    const fetchFashionFeed = async () => {
      setLoading(true) // Start loading
      setError(null) // Clear previous errors
      try {
        const response = await FeedService.getPersonalizedFeed({})

        // Assuming the API response structure is { success: boolean, data: [] }
        // And 'data' here is an array of video objects, consistent with your dummy 'videos' array.
        setProducts(response.data.products || [])
        setLoading(false)
      } catch (err: any) {
        console.error("Failed to fetch personalized feed:", err)
        setError(err.message || "Failed to load personalized feed.") // Set error message
      } finally {
        setLoading(false) // End loading
      }
    }

    fetchFashionFeed()
  }, [])
  const trendingCategories = [
    {
      id: "foryou",
      label: "For You",
      emoji: "✨",
      gradient: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
      isHot: true,
      count: "2.1M",
    },
    {
      id: "trending",
      label: "Trending",
      emoji: "🔥",
      gradient: ["#FF4500", "#FF6B35", "#F7931E"],
      isHot: true,
      count: "892K",
    },
    {
      id: "streetwear",
      label: "Street",
      emoji: "🧢",
      gradient: ["#667eea", "#764ba2", "#f093fb"],
      count: "456K",
    },
    {
      id: "vintage",
      label: "Vintage",
      emoji: "🕰️",
      gradient: ["#FFD700", "#FF6B35", "#FF4500"],
      count: "234K",
    },
    {
      id: "luxury",
      label: "Luxury",
      emoji: "💎",
      gradient: ["#0070F3", "#00D4FF", "#7928CA"],
      count: "189K",
    },
  ]

  const videos = [
    {
      id: 1,
      creator: "@stylegoddess",
      handle: "Maya Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      thumbnail:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
      likes: "47.2K",
      comments: "2.1K",
      shares: "892",
      views: "1.2M",
      duration: "0:15",
      isVerified: true,
      isTrending: true,
      trendingRank: 1,
      viralScore: 98,
      description:
        "POV: you found the perfect thrift haul 💅✨ #thriftfinds #ootd",
      tags: ["#thriftfinds", "#ootd", "#sustainable", "#vintage"],
      products: [
        {
          id: 1,
          name: "Vintage Denim Jacket",
          price: "$12",
          originalPrice: "$89",
          discount: "86%",
          shop: "@thriftqueen",
          inStock: true,
          quickBuy: true,
          rating: 4.8,
          reviews: 234,
        },
        {
          id: 2,
          name: "White Crop Top",
          price: "$8",
          originalPrice: "$25",
          discount: "68%",
          shop: "@basics_co",
          inStock: true,
          quickBuy: true,
          rating: 4.6,
          reviews: 156,
        },
      ],
      music: "original sound - stylegoddess",
      engagement: "viral",
      mood: "aesthetic",
    },
  ]

  console.log("data", products) // Keep this for debugging if needed, but remove for production
  const navItems = [
    {
      icon: "home",
      label: "Home",
      key: "Home",
      gradient: ["#FF6B6B", "#4ECDC4"],
      glowColor: "#FF6B6B",
    },
    {
      icon: "search",
      label: "Discover",
      key: "Discover",
      gradient: ["#667eea", "#764ba2"],
      glowColor: "#667eea",
    },
    {
      icon: "add-circle",
      label: "Create",
      key: "Create",
      isSpecial: true,
      gradient: ["#FF6B35", "#F7931E", "#FFD700"],
      glowColor: "#FF6B35",
    },
    {
      icon: "heart",
      label: "Saved",
      key: "Saved",
      gradient: ["#FF0080", "#FF4081"],
      glowColor: "#FF0080",
    },
    {
      icon: "bag",
      label: "Shop",
      key: "Shop",
      gradient: ["#00DFA2", "#00C9FF"],
      hasNotification: true,
      glowColor: "#00DFA2",
    },
  ]

  const renderLiquidHeader = () => {
    const animatedGradient = liquidAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0%", "50%", "100%"],
    })

    return (
      <Animated.View style={styles.liquidHeader}>
        {/* Liquid Background */}
        <View style={styles.liquidContainer}>
          <Animated.View
            style={[
              styles.liquidGradient1,
              {
                transform: [
                  {
                    translateX: liquidAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 50],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={["#FF6B6B", "#4ECDC4", "#45B7D1"]}
              style={styles.liquidShape}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.liquidGradient2,
              {
                transform: [
                  {
                    translateX: liquidAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -30],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={["#667eea", "#764ba2", "#f093fb"]}
              style={styles.liquidShape}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.liquidGradient3,
              {
                transform: [
                  {
                    translateY: floatingAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -20],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={["#FFD700", "#FF6B35", "#FF4500"]}
              style={styles.liquidShape}
            />
          </Animated.View>
        </View>

        {/* Glass Morphism Overlay */}
        <BlurView intensity={40} style={styles.glassOverlay}>
          <SafeAreaView>
            <View style={styles.headerContent}>
              {/* Premium Brand Section */}
              <View style={styles.premiumBrandSection}>
                <Animated.View
                  style={[
                    styles.logoContainer,
                    { transform: [{ scale: breatheAnim }] },
                  ]}
                >
                  <MaskedView
                    style={styles.logoMask}
                    maskElement={
                      <View style={styles.logoMaskElement}>
                        <Text style={styles.logoMaskText}>VZ</Text>
                      </View>
                    }
                  >
                    <LinearGradient
                      colors={["#FFD700", "#FF6B35", "#FF4500"]}
                      style={styles.logoGradientMask}
                    />
                  </MaskedView>

                  {/* Glow Effect */}
                  <View style={styles.logoGlow} />
                </Animated.View>

                <View style={styles.brandTextSection}>
                  <MaskedView
                    style={styles.brandMask}
                    maskElement={
                      <Text style={styles.brandMaskText}>VibeZone</Text>
                    }
                  >
                    <LinearGradient
                      colors={["#FFFFFF", "#F0F0F0", "#E0E0E0"]}
                      style={styles.brandGradientMask}
                    />
                  </MaskedView>
                  <Text style={styles.premiumTagline}>
                    where luxury meets street ✨
                  </Text>
                </View>

                {/* Status Indicators */}
                <View style={styles.statusIndicators}>
                  <Animated.View
                    style={[
                      styles.liveIndicator,
                      { transform: [{ scale: pulseAnim }] },
                    ]}
                  >
                    <LinearGradient
                      colors={["#FF0000", "#FF4500"]}
                      style={styles.liveGradient}
                    >
                      <View style={styles.livePulse} />
                      <Text style={styles.liveText}>LIVE</Text>
                    </LinearGradient>
                  </Animated.View>

                  <TouchableOpacity style={styles.premiumActionButton}>
                    <BlurView intensity={20} style={styles.actionBlur}>
                      <View style={styles.notificationContainer}>
                        <Animated.View
                          style={[
                            styles.notificationBadge,
                            { transform: [{ scale: pulseAnim }] },
                          ]}
                        >
                          <LinearGradient
                            colors={["#FF4500", "#FF0080"]}
                            style={styles.badgeGradient}
                          >
                            <Text style={styles.badgeText}>5</Text>
                          </LinearGradient>
                        </Animated.View>
                        <Ionicons
                          name="notifications"
                          size={20}
                          color="white"
                        />
                      </View>
                    </BlurView>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.premiumActionButton}>
                    <BlurView intensity={20} style={styles.actionBlur}>
                      <View style={styles.messageContainer}>
                        <View style={styles.messageBadge}>
                          <Text style={styles.badgeText}>2</Text>
                        </View>
                        <Ionicons name="chatbubbles" size={20} color="white" />
                      </View>
                    </BlurView>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Premium Search */}
              <View style={styles.premiumSearchContainer}>
                <BlurView intensity={30} style={styles.searchGlass}>
                  <LinearGradient
                    colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
                    style={styles.searchGradient}
                  >
                    <Ionicons
                      name="search"
                      size={18}
                      color="#FFD700"
                      style={styles.searchIcon}
                    />
                    <TextInput
                      style={styles.premiumSearchInput}
                      placeholder="Discover your next vibe... ✨"
                      placeholderTextColor="rgba(255,255,255,0.6)"
                    />

                    {/* Shimmer Effect */}
                    <Animated.View
                      style={[
                        styles.searchShimmer,
                        {
                          transform: [
                            {
                              translateX: shimmerAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-100, 300],
                              }),
                            },
                          ],
                        },
                      ]}
                    />

                    <TouchableOpacity style={styles.voiceButton}>
                      <LinearGradient
                        colors={["#FF6B35", "#FFD700"]}
                        style={styles.voiceGradient}
                      >
                        <Ionicons name="mic" size={14} color="white" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </LinearGradient>
                </BlurView>
              </View>

              {/* Premium Categories */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesScroll}
                contentContainerStyle={styles.categoriesContent}
              >
                {trendingCategories.map((category, index) => (
                  <TouchableOpacity
                    key={category.id}
                    style={styles.premiumCategoryContainer}
                    onPress={() => setActiveCategory(category.label)}
                  >
                    <BlurView
                      intensity={activeCategory === category.label ? 40 : 20}
                      style={styles.categoryGlass}
                    >
                      <LinearGradient
                        colors={
                          activeCategory === category.label
                            ? [...category.gradient, "rgba(255,255,255,0.1)"]
                            : [
                                "rgba(255,255,255,0.1)",
                                "rgba(255,255,255,0.05)",
                              ]
                        }
                        style={styles.categoryGradient}
                      >
                        {category.isHot && (
                          <Animated.View
                            style={[
                              styles.hotBadge,
                              { transform: [{ scale: pulseAnim }] },
                            ]}
                          >
                            <LinearGradient
                              colors={["#FF4500", "#FF0080"]}
                              style={styles.hotGradient}
                            >
                              <Text style={styles.hotText}>HOT</Text>
                            </LinearGradient>
                          </Animated.View>
                        )}

                        <Text style={styles.categoryEmoji}>
                          {category.emoji}
                        </Text>
                        <Text
                          style={[
                            styles.categoryLabel,
                            activeCategory === category.label &&
                              styles.activeCategoryLabel,
                          ]}
                        >
                          {category.label}
                        </Text>
                        <Text style={styles.categoryCount}>
                          {category.count}
                        </Text>
                      </LinearGradient>
                    </BlurView>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </SafeAreaView>
        </BlurView>
      </Animated.View>
    )
  }

  const renderPremiumVideoCard = (video: any, index: number) => (
    // GET /feed/personalized?category=fashion
    <View key={video.id} style={styles.premiumVideoContainer}>
      {/* Video Player with Glass Morphism */}
      <View style={styles.premiumVideoPlayer}>
        <Image
          source={{ uri: video.thumbnail }}
          style={styles.videoThumbnail}
        />

        {/* Premium Overlays */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
          style={styles.videoGradientOverlay}
        />

        {/* Viral Score */}
        <Animated.View
          style={[
            styles.viralScoreContainer,
            { transform: [{ scale: breatheAnim }] },
          ]}
        >
          <BlurView intensity={30} style={styles.viralScoreBlur}>
            <LinearGradient
              colors={["#FF4500", "#FF0080", "#7928CA"]}
              style={styles.viralScoreGradient}
            >
              <Text style={styles.viralScoreText}>{video.viralScore}</Text>
              <Text style={styles.viralLabel}>VIRAL</Text>
            </LinearGradient>
          </BlurView>
        </Animated.View>

        {/* Premium Play Button */}
        <View style={styles.premiumPlayContainer}>
          <TouchableOpacity style={styles.premiumPlayButton}>
            <BlurView intensity={20} style={styles.playBlur}>
              <LinearGradient
                colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                style={styles.playGradient}
              >
                <Ionicons name="play" size={32} color="white" />

                {/* Play Button Glow */}
                <View style={styles.playGlow} />
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        </View>

        {/* Premium Side Actions */}
        <View style={styles.premiumSideActions}>
          {[
            {
              icon: "heart",
              count: video.likes,
              gradient: ["#FF0080", "#FF4081"],
              glow: "#FF0080",
            },
            {
              icon: "chatbubble",
              count: video.comments,
              gradient: ["#667eea", "#764ba2"],
              glow: "#667eea",
            },
            {
              icon: "arrow-redo",
              count: video.shares,
              gradient: ["#00DFA2", "#00C9FF"],
              glow: "#00DFA2",
            },
            {
              icon: "bookmark",
              count: "",
              gradient: ["#FFD700", "#FF6B35"],
              glow: "#FFD700",
            },
          ].map((action, actionIndex) => (
            <TouchableOpacity
              key={actionIndex}
              style={styles.premiumActionButton}
            >
              <BlurView intensity={20} style={styles.actionButtonBlur}>
                <LinearGradient
                  colors={action.gradient}
                  style={styles.actionButtonGradient}
                >
                  <Ionicons name={action.icon as any} size={20} color="white" />

                  {/* Action Glow */}
                  <View
                    style={[styles.actionGlow, { shadowColor: action.glow }]}
                  />
                </LinearGradient>
              </BlurView>
              {action.count && (
                <Text style={styles.actionCount}>{action.count}</Text>
              )}
            </TouchableOpacity>
          ))}

          {/* Premium Creator Avatar */}
          <View style={styles.premiumCreatorSection}>
            <View style={styles.creatorAvatarContainer}>
              <Image
                source={{ uri: video.avatar }}
                style={styles.creatorAvatar}
              />
              <LinearGradient
                colors={["#FFD700", "#FF6B35"]}
                style={styles.avatarBorder}
              />

              <TouchableOpacity style={styles.premiumFollowButton}>
                <LinearGradient
                  colors={["#FF0080", "#FF4081"]}
                  style={styles.followGradient}
                >
                  <Ionicons name="add" size={12} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Premium Video Info */}
      <View style={styles.premiumVideoInfo}>
        <View style={styles.creatorInfoRow}>
          <View style={styles.creatorDetails}>
            <Text style={styles.creatorHandle}>
              {video.creator}
              {video.isVerified && (
                <MaskedView
                  style={styles.verifiedMask}
                  maskElement={<Text style={styles.verifiedText}> ✓</Text>}
                >
                  <LinearGradient
                    colors={["#1DA1F2", "#00D4FF"]}
                    style={styles.verifiedGradient}
                  />
                </MaskedView>
              )}
            </Text>
            <Text style={styles.creatorName}>{video.handle}</Text>
          </View>

          <View style={styles.engagementBadges}>
            <BlurView intensity={20} style={styles.engagementBlur}>
              <LinearGradient
                colors={
                  video.engagement === "viral"
                    ? ["#FF4500", "#FF0080"]
                    : ["#FFD700", "#FF6B35"]
                }
                style={styles.engagementGradient}
              >
                <Text style={styles.engagementText}>
                  {video.engagement === "viral" ? "🚀 VIRAL" : "🔥 HOT"}
                </Text>
              </LinearGradient>
            </BlurView>
          </View>
        </View>

        <Text style={styles.videoDescription}>{video.description}</Text>

        {/* Premium Shopping Section */}
        <View style={styles.premiumShoppingSection}>
          <View style={styles.shoppingSectionHeader}>
            <MaskedView
              style={styles.shopTitleMask}
              maskElement={
                <Text style={styles.shopTitleText}>🛍️ Shop this vibe</Text>
              }
            >
              <LinearGradient
                colors={["#FFFFFF", "#F0F0F0"]}
                style={styles.shopTitleGradient}
              />
            </MaskedView>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {video.products.map((product, productIndex) => (
              <View key={product.id} style={styles.premiumProductCard}>
                <BlurView intensity={30} style={styles.productCardBlur}>
                  <LinearGradient
                    colors={
                      product.inStock
                        ? ["rgba(0, 223, 162, 0.2)", "rgba(0, 201, 255, 0.1)"]
                        : [
                            "rgba(102, 102, 102, 0.2)",
                            "rgba(153, 153, 153, 0.1)",
                          ]
                    }
                    style={styles.productCardGradient}
                  >
                    {/* Discount Badge */}
                    {product.discount && (
                      <View style={styles.discountBadge}>
                        <LinearGradient
                          colors={["#FF4500", "#FF0080"]}
                          style={styles.discountGradient}
                        >
                          <Text style={styles.discountText}>
                            -{product.discount}
                          </Text>
                        </LinearGradient>
                      </View>
                    )}

                    <Text style={styles.productName}>{product.name}</Text>

                    <View style={styles.priceSection}>
                      <Text style={styles.currentPrice}>{product.price}</Text>
                      {product.originalPrice && (
                        <Text style={styles.originalPrice}>
                          {product.originalPrice}
                        </Text>
                      )}
                    </View>

                    <View style={styles.productMeta}>
                      <Text style={styles.shopName}>{product.shop}</Text>
                      <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.ratingText}>{product.rating}</Text>
                        <Text style={styles.reviewsText}>
                          ({product.reviews})
                        </Text>
                      </View>
                    </View>

                    {product.inStock ? (
                      <TouchableOpacity
                        style={styles.premiumBuyButton}
                        onPress={() => setCartCount(cartCount + 1)}
                      >
                        <LinearGradient
                          colors={["#00DFA2", "#00C9FF"]}
                          style={styles.buyButtonGradient}
                        >
                          <Text style={styles.buyButtonText}>Quick Add</Text>
                          <Ionicons name="add" size={16} color="white" />
                        </LinearGradient>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={styles.waitlistButton}>
                        <BlurView intensity={20} style={styles.waitlistBlur}>
                          <Text style={styles.waitlistText}>Join Waitlist</Text>
                        </BlurView>
                      </TouchableOpacity>
                    )}
                  </LinearGradient>
                </BlurView>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  )

  const renderPremiumBottomNav = () => (
    <View style={styles.premiumBottomNavContainer}>
      <BlurView intensity={100} style={styles.premiumBottomNav}>
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.05)"]}
          style={styles.navBackgroundGradient}
        >
          <View style={styles.premiumNavContent}>
            {navItems.map((item, index) => {
              const isActive = activeTab === item.key
              const isSpecial = item.isSpecial

              if (isSpecial) {
                return (
                  <TouchableOpacity
                    key={item.key}
                    style={styles.specialNavContainer}
                  >
                    <Animated.View
                      style={[
                        styles.specialNavButton,
                        { transform: [{ scale: breatheAnim }] },
                      ]}
                    >
                      <LinearGradient
                        colors={item.gradient}
                        style={styles.specialButtonGradient}
                      >
                        <Ionicons name="add" size={28} color="white" />

                        {/* Special Button Glow */}
                        <View
                          style={[
                            styles.specialButtonGlow,
                            { shadowColor: item.glowColor },
                          ]}
                        />
                      </LinearGradient>
                    </Animated.View>
                    <Text style={styles.specialNavLabel}>Create</Text>
                  </TouchableOpacity>
                )
              }

              return (
                <TouchableOpacity
                  key={item.key}
                  style={styles.premiumNavItem}
                  onPress={() => setActiveTab(item.key)}
                >
                  {isActive && (
                    <BlurView intensity={30} style={styles.activeNavBackground}>
                      <LinearGradient
                        colors={[...item.gradient, "transparent"]}
                        style={styles.activeNavGradient}
                      />
                    </BlurView>
                  )}

                  <View style={styles.navIconContainer}>
                    {item.hasNotification && cartCount > 0 && (
                      <Animated.View
                        style={[
                          styles.premiumCartBadge,
                          { transform: [{ scale: pulseAnim }] },
                        ]}
                      >
                        <LinearGradient
                          colors={["#FF0080", "#FF4081"]}
                          style={styles.cartBadgeGradient}
                        >
                          <Text style={styles.cartBadgeText}>{cartCount}</Text>
                        </LinearGradient>
                      </Animated.View>
                    )}

                    <Ionicons
                      name={
                        isActive ? item.icon : ((item.icon + "-outline") as any)
                      }
                      size={24}
                      color={
                        isActive ? item.gradient[0] : "rgba(255,255,255,0.6)"
                      }
                    />

                    {isActive && (
                      <View
                        style={[
                          styles.iconGlow,
                          { shadowColor: item.glowColor },
                        ]}
                      />
                    )}
                  </View>

                  <Text
                    style={[
                      styles.premiumNavLabel,
                      isActive && { color: item.gradient[0] },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {renderLiquidHeader()}

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
        onScrollBeginDrag={() => setIsScrolling(true)}
        onScrollEndDrag={() => setIsScrolling(false)}
      >
        {loading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#00DFA2"
          />
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {products && products?.map(renderPremiumVideoCard)}
      </ScrollView>

      {renderPremiumBottomNav()}
      {/* <PremiumColorSelector /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingIndicator: {
    marginTop: 50,
  },
  errorText: {
    color: "#FF6B6B", // A red color for errors
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  emptyFeedText: {
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    paddingHorizontal: 20,
  },

  // Liquid Header Styles
  liquidHeader: {
    height: 280,
    position: "relative",
    overflow: "hidden",
  },
  liquidContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  liquidGradient1: {
    position: "absolute",
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  liquidGradient2: {
    position: "absolute",
    top: 50,
    right: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  liquidGradient3: {
    position: "absolute",
    bottom: -30,
    left: 50,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  liquidShape: {
    flex: 1,
    borderRadius: 100,
  },
  glassOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Premium Brand Section
  premiumBrandSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    position: "relative",
  },
  logoMask: {
    width: 44,
    height: 44,
  },
  logoMaskElement: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoMaskText: {
    fontSize: 20,
    fontWeight: "900",
    color: "black",
  },
  logoGradientMask: {
    flex: 1,
  },
  logoGlow: {
    position: "absolute",
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 25,
    backgroundColor: "rgba(255, 215, 0, 0.3)",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
  },
  brandTextSection: {
    flex: 1,
    marginLeft: 12,
  },
  brandMask: {
    height: 30,
  },
  brandMaskText: {
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -1,
    color: "black",
  },
  brandGradientMask: {
    flex: 1,
  },
  premiumTagline: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 2,
  },
  statusIndicators: {
    flexDirection: "row",
    alignItems: "center",
  },
  liveIndicator: {
    marginRight: 12,
  },
  liveGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    position: "relative",
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
    marginRight: 6,
  },
  liveText: {
    color: "white",
    fontSize: 10,
    fontWeight: "800",
  },
  premiumActionButton: {
    marginLeft: 12,
  },
  actionBlur: {
    borderRadius: 20,
    padding: 8,
  },
  notificationContainer: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    zIndex: 1,
  },
  badgeGradient: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 9,
    fontWeight: "800",
  },
  messageContainer: {
    position: "relative",
  },
  messageBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#00DFA2",
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  // Premium Search
  premiumSearchContainer: {
    marginBottom: 20,
  },
  searchGlass: {
    borderRadius: 25,
    overflow: "hidden",
  },
  searchGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "relative",
  },
  searchIcon: {
    marginRight: 12,
  },
  premiumSearchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  searchShimmer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    transform: [{ skewX: "-20deg" }],
  },
  voiceButton: {
    borderRadius: 15,
    overflow: "hidden",
  },
  voiceGradient: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  // Premium Categories
  categoriesScroll: {
    marginHorizontal: -20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  premiumCategoryContainer: {
    marginRight: 16,
  },
  categoryGlass: {
    borderRadius: 20,
    overflow: "hidden",
  },
  categoryGradient: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    position: "relative",
    minWidth: 80,
  },
  hotBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    zIndex: 1,
  },
  hotGradient: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  hotText: {
    color: "white",
    fontSize: 8,
    fontWeight: "800",
  },
  categoryEmoji: {
    fontSize: 18,
    marginBottom: 4,
  },
  categoryLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  activeCategoryLabel: {
    color: "white",
  },
  categoryCount: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    fontWeight: "500",
  },

  // Content
  content: {
    flex: 1,
    backgroundColor: "#000",
  },

  // Premium Video Card
  premiumVideoContainer: {
    marginBottom: 30,
    paddingHorizontal: 16,
  }, // Added missing closing brace
  premiumVideoPlayer: {
    height: VIDEO_HEIGHT,
    borderRadius: 25,
    overflow: "hidden",
    position: "relative",
  },
  videoThumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  videoGradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  viralScoreContainer: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  viralScoreBlur: {
    borderRadius: 20,
    overflow: "hidden",
  },
  viralScoreGradient: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  viralScoreText: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
  },
  viralLabel: {
    color: "white",
    fontSize: 8,
    fontWeight: "700",
  },
  premiumPlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  premiumPlayButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
  },
  playBlur: {
    flex: 1,
  },
  playGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  playGlow: {
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },

  // Premium Side Actions
  premiumSideActions: {
    position: "absolute",
    right: 20,
    bottom: 30,
    alignItems: "center",
  },
  actionButtonBlur: {
    borderRadius: 25,
    overflow: "hidden",
  },
  actionButtonGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  actionGlow: {
    position: "absolute",
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
  },
  actionCount: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 16,
  },
  premiumCreatorSection: {
    marginTop: 20,
  },
  creatorAvatarContainer: {
    position: "relative",
  },
  creatorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarBorder: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 27,
  },
  premiumFollowButton: {
    position: "absolute",
    bottom: -8,
    right: -8,
  },
  followGradient: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  // Premium Video Info
  premiumVideoInfo: {
    paddingTop: 20,
  },
  creatorInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  creatorDetails: {},
  creatorHandle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  verifiedMask: {
    width: 20,
    height: 20,
  },
  verifiedText: {
    fontSize: 16,
    color: "black",
  },
  verifiedGradient: {
    flex: 1,
  },
  creatorName: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    marginTop: 2,
  },
  engagementBadges: {},
  engagementBlur: {
    borderRadius: 15,
    overflow: "hidden",
  },
  engagementGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  engagementText: {
    color: "white",
    fontSize: 11,
    fontWeight: "700",
  },
  videoDescription: {
    color: "white",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },

  // Premium Shopping Section
  premiumShoppingSection: {
    marginTop: 12,
  },
  shoppingSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  shopTitleMask: {
    height: 24,
  },
  shopTitleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
  },
  shopTitleGradient: {
    flex: 1,
  },
  viewAllButton: {},
  viewAllText: {
    color: "#00DFA2",
    fontSize: 14,
    fontWeight: "600",
  },
  premiumProductCard: {
    marginRight: 16,
    width: 180,
  },
  productCardBlur: {
    borderRadius: 20,
    overflow: "hidden",
  },
  productCardGradient: {
    padding: 16,
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  discountGradient: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  discountText: {
    color: "white",
    fontSize: 10,
    fontWeight: "800",
  },
  productName: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  priceSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  currentPrice: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    marginRight: 8,
  },
  originalPrice: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    textDecorationLine: "line-through",
  },
  productMeta: {
    marginBottom: 12,
  },
  shopName: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  reviewsText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    marginLeft: 4,
  },
  premiumBuyButton: {
    borderRadius: 15,
    overflow: "hidden",
  },
  buyButtonGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  buyButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    marginRight: 6,
  },
  waitlistButton: {},
  waitlistBlur: {
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: "center",
  },
  waitlistText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    fontWeight: "600",
  },

  // Premium Bottom Navigation
  premiumBottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  premiumBottomNav: {
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  navBackgroundGradient: {
    paddingVertical: 15,
  },
  premiumNavContent: {
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  premiumNavItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    position: "relative",
  },
  activeNavBackground: {
    position: "absolute",
    top: 4,
    left: "15%",
    right: "15%",
    bottom: 4,
    borderRadius: 20,
  },
  activeNavGradient: {
    flex: 1,
    opacity: 0.3,
  },
  navIconContainer: {
    position: "relative",
  },
  premiumCartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    zIndex: 1,
  },
  cartBadgeGradient: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "800",
  },
  iconGlow: {
    position: "absolute",
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  premiumNavLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    marginTop: 6,
    fontWeight: "600",
  },
  specialNavContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  specialNavButton: {},
  specialButtonGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  specialButtonGlow: {
    position: "absolute",
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 36,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  specialNavLabel: {
    color: "#FF6B35",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 6,
  },
})

// fifth desigh

// import { Ionicons } from "@expo/vector-icons"
// import { BlurView } from "expo-blur"
// import { LinearGradient } from "expo-linear-gradient"
// import React, { useEffect, useRef, useState } from "react"
// import {
//   Animated,
//   Dimensions,
//   Image,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native"

// const { width, height } = Dimensions.get("window")
// const VIDEO_HEIGHT = height * 0.7

// export default function PremiumVibeZoneApp() {
//   const [activeCategory, setActiveCategory] = useState("For You")
//   const [activeTab, setActiveTab] = useState("Home")
//   const [cartCount, setCartCount] = useState(3)

//   const fadeAnim = useRef(new Animated.Value(0)).current
//   const slideAnim = useRef(new Animated.Value(30)).current

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//     ]).start()
//   }, [])

//   const categories = [
//     { id: "foryou", label: "For You", isActive: true },
//     { id: "trending", label: "Trending", badge: "Hot" },
//     { id: "fashion", label: "Fashion" },
//     { id: "streetwear", label: "Streetwear" },
//     { id: "vintage", label: "Vintage" },
//     { id: "luxury", label: "Luxury" },
//   ]

//   const videos = [
//     {
//       id: 1,
//       creator: "@stylegoddess",
//       handle: "Maya Chen",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
//       thumbnail:
//         "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
//       likes: "47.2K",
//       comments: "2.1K",
//       shares: "892",
//       views: "1.2M",
//       duration: "0:15",
//       isVerified: true,
//       description:
//         "Found the perfect thrift haul for under $30 💅 sustainable fashion is the future",
//       tags: ["#thriftfinds", "#ootd", "#sustainable"],
//       products: [
//         {
//           id: 1,
//           name: "Vintage Denim Jacket",
//           price: "$12",
//           originalPrice: "$89",
//           shop: "@thriftqueen",
//           inStock: true,
//           rating: 4.8,
//         },
//         {
//           id: 2,
//           name: "White Crop Top",
//           price: "$8",
//           originalPrice: "$25",
//           shop: "@basics_co",
//           inStock: true,
//           rating: 4.6,
//         },
//       ],
//       music: "original sound - stylegoddess",
//     },
//     {
//       id: 2,
//       creator: "@hypebeast_jay",
//       handle: "Jay Martinez",
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//       thumbnail:
//         "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
//       likes: "89.5K",
//       comments: "5.3K",
//       shares: "1.2K",
//       views: "2.8M",
//       duration: "0:22",
//       isVerified: true,
//       description: "When the fit hits different 🔥 cop or drop?",
//       tags: ["#streetwear", "#hypebeast", "#ootd"],
//       products: [
//         {
//           id: 3,
//           name: "Travis Scott Jordan 1",
//           price: "$1,200",
//           shop: "@sneaker_plug",
//           inStock: false,
//           rating: 4.9,
//         },
//       ],
//       music: "SICKO MODE - Travis Scott",
//     },
//   ]

//   const navItems = [
//     { icon: "home", label: "Home", key: "Home" },
//     { icon: "search", label: "Discover", key: "Discover" },
//     { icon: "add-circle", label: "Create", key: "Create", isSpecial: true },
//     { icon: "heart", label: "Saved", key: "Saved" },
//     { icon: "bag", label: "Shop", key: "Shop", hasNotification: true },
//   ]

//   const renderCleanHeader = () => (
//     <View style={styles.header}>
//       <SafeAreaView>
//         <View style={styles.headerContent}>
//           {/* Brand Section */}
//           <View style={styles.brandSection}>
//             <View style={styles.logoContainer}>
//               <View style={styles.logo}>
//                 <Text style={styles.logoText}>VZ</Text>
//               </View>
//               <View style={styles.brandInfo}>
//                 <Text style={styles.brandName}>VibeZone</Text>
//                 <Text style={styles.brandSubtitle}>
//                   Style • Discover • Shop
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.headerActions}>
//               <TouchableOpacity style={styles.headerButton}>
//                 <View style={styles.notificationDot} />
//                 <Ionicons
//                   name="notifications-outline"
//                   size={24}
//                   color="#1a1a1a"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.headerButton}>
//                 <Ionicons
//                   name="person-circle-outline"
//                   size={28}
//                   color="#1a1a1a"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Search Section */}
//           <View style={styles.searchSection}>
//             <View style={styles.searchContainer}>
//               <Ionicons
//                 name="search"
//                 size={20}
//                 color="#666"
//                 style={styles.searchIcon}
//               />
//               <TextInput
//                 style={styles.searchInput}
//                 placeholder="Search creators, styles, trends..."
//                 placeholderTextColor="#999"
//               />
//               <TouchableOpacity style={styles.filterButton}>
//                 <Ionicons name="options-outline" size={20} color="#666" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Categories */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.categoriesContainer}
//             contentContainerStyle={styles.categoriesContent}
//           >
//             {categories.map((category) => (
//               <TouchableOpacity
//                 key={category.id}
//                 style={[
//                   styles.categoryButton,
//                   activeCategory === category.label &&
//                     styles.activeCategoryButton,
//                 ]}
//                 onPress={() => setActiveCategory(category.label)}
//               >
//                 <Text
//                   style={[
//                     styles.categoryText,
//                     activeCategory === category.label &&
//                       styles.activeCategoryText,
//                   ]}
//                 >
//                   {category.label}
//                 </Text>
//                 {category.badge && (
//                   <View style={styles.categoryBadge}>
//                     <Text style={styles.badgeText}>{category.badge}</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       </SafeAreaView>
//     </View>
//   )

//   const renderVideoCard = (video, index) => (
//     <Animated.View
//       key={video.id}
//       style={[
//         styles.videoCard,
//         {
//           opacity: fadeAnim,
//           transform: [{ translateY: slideAnim }],
//         },
//       ]}
//     >
//       {/* Video Container */}
//       <View style={styles.videoContainer}>
//         <Image
//           source={{ uri: video.thumbnail }}
//           style={styles.videoThumbnail}
//         />

//         {/* Video Overlay */}
//         <LinearGradient
//           colors={["transparent", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
//           style={styles.videoOverlay}
//         />

//         {/* Duration Badge */}
//         <View style={styles.durationBadge}>
//           <Text style={styles.durationText}>{video.duration}</Text>
//         </View>

//         {/* Play Button */}
//         <TouchableOpacity style={styles.playButton}>
//           <View style={styles.playButtonInner}>
//             <Ionicons name="play" size={24} color="white" />
//           </View>
//         </TouchableOpacity>

//         {/* Side Actions */}
//         <View style={styles.sideActions}>
//           <TouchableOpacity style={styles.actionButton}>
//             <View style={styles.actionButtonBg}>
//               <Ionicons name="heart" size={20} color="#ff3040" />
//             </View>
//             <Text style={styles.actionText}>{video.likes}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <View style={styles.actionButtonBg}>
//               <Ionicons name="chatbubble" size={20} color="white" />
//             </View>
//             <Text style={styles.actionText}>{video.comments}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <View style={styles.actionButtonBg}>
//               <Ionicons name="arrow-redo" size={20} color="white" />
//             </View>
//             <Text style={styles.actionText}>{video.shares}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <View style={styles.actionButtonBg}>
//               <Ionicons name="bookmark-outline" size={20} color="white" />
//             </View>
//           </TouchableOpacity>

//           {/* Creator Avatar */}
//           <View style={styles.creatorAvatarSection}>
//             <Image
//               source={{ uri: video.avatar }}
//               style={styles.creatorAvatar}
//             />
//             <TouchableOpacity style={styles.followButton}>
//               <Ionicons name="add" size={16} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Video Info */}
//       <View style={styles.videoInfo}>
//         <View style={styles.creatorRow}>
//           <View style={styles.creatorInfo}>
//             <Text style={styles.creatorHandle}>
//               {video.creator}
//               {video.isVerified && <Text style={styles.verified}> ✓</Text>}
//             </Text>
//             <Text style={styles.creatorName}>{video.handle}</Text>
//           </View>
//           <TouchableOpacity style={styles.moreButton}>
//             <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.description}>{video.description}</Text>

//         {/* Tags */}
//         <View style={styles.tagsContainer}>
//           {video.tags.map((tag, tagIndex) => (
//             <TouchableOpacity key={tagIndex} style={styles.tag}>
//               <Text style={styles.tagText}>{tag}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Music */}
//         <View style={styles.musicInfo}>
//           <Ionicons name="musical-notes" size={14} color="#666" />
//           <Text style={styles.musicText}>{video.music}</Text>
//         </View>

//         {/* Products Section */}
//         <View style={styles.productsSection}>
//           <View style={styles.productsSectionHeader}>
//             <Text style={styles.productsTitle}>Shop this look</Text>
//             <TouchableOpacity>
//               <Text style={styles.viewAllText}>View all</Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {video.products.map((product) => (
//               <View key={product.id} style={styles.productCard}>
//                 <View style={styles.productInfo}>
//                   <Text style={styles.productName}>{product.name}</Text>
//                   <View style={styles.priceRow}>
//                     <Text style={styles.currentPrice}>{product.price}</Text>
//                     {product.originalPrice && (
//                       <Text style={styles.originalPrice}>
//                         {product.originalPrice}
//                       </Text>
//                     )}
//                   </View>
//                   <Text style={styles.shopName}>{product.shop}</Text>

//                   <View style={styles.ratingRow}>
//                     <Ionicons name="star" size={12} color="#ffa500" />
//                     <Text style={styles.ratingText}>{product.rating}</Text>
//                   </View>
//                 </View>

//                 {product.inStock ? (
//                   <TouchableOpacity
//                     style={styles.addToCartButton}
//                     onPress={() => setCartCount(cartCount + 1)}
//                   >
//                     <Text style={styles.addToCartText}>Add to Cart</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity style={styles.notifyButton}>
//                     <Text style={styles.notifyText}>Notify Me</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </View>
//     </Animated.View>
//   )

//   const renderBottomNav = () => (
//     <View style={styles.bottomNavContainer}>
//       <BlurView intensity={100} style={styles.bottomNav}>
//         <View style={styles.navContent}>
//           {navItems.map((item) => {
//             const isActive = activeTab === item.key
//             const isSpecial = item.isSpecial

//             if (isSpecial) {
//               return (
//                 <TouchableOpacity key={item.key} style={styles.specialNavItem}>
//                   <View style={styles.createButton}>
//                     <Ionicons name="add" size={24} color="white" />
//                   </View>
//                   <Text style={styles.createLabel}>Create</Text>
//                 </TouchableOpacity>
//               )
//             }

//             return (
//               <TouchableOpacity
//                 key={item.key}
//                 style={styles.navItem}
//                 onPress={() => setActiveTab(item.key)}
//               >
//                 <View style={styles.navIconContainer}>
//                   {item.hasNotification && cartCount > 0 && (
//                     <View style={styles.cartBadge}>
//                       <Text style={styles.cartBadgeText}>{cartCount}</Text>
//                     </View>
//                   )}
//                   <Ionicons
//                     name={isActive ? item.icon : item.icon + "-outline"}
//                     size={24}
//                     color={isActive ? "#007AFF" : "#8E8E93"}
//                   />
//                 </View>
//                 <Text
//                   style={[styles.navLabel, isActive && styles.activeNavLabel]}
//                 >
//                   {item.label}
//                 </Text>
//               </TouchableOpacity>
//             )
//           })}
//         </View>
//       </BlurView>
//     </View>
//   )

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="white" />

//       {renderCleanHeader()}

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         bounces={true}
//       >
//         {videos.map(renderVideoCard)}
//       </ScrollView>

//       {renderBottomNav()}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fafafa",
//   },

//   // Clean Header
//   header: {
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   headerContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 16,
//   },
//   brandSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   logoContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   logo: {
//     width: 36,
//     height: 36,
//     borderRadius: 8,
//     backgroundColor: "#007AFF",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   logoText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   brandInfo: {},
//   brandName: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     letterSpacing: -0.5,
//   },
//   brandSubtitle: {
//     fontSize: 12,
//     color: "#666",
//     marginTop: 1,
//   },
//   headerActions: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   headerButton: {
//     marginLeft: 16,
//     position: "relative",
//   },
//   notificationDot: {
//     position: "absolute",
//     top: 2,
//     right: 2,
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#ff3040",
//     zIndex: 1,
//   },

//   // Search Section
//   searchSection: {
//     marginBottom: 20,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f8f8f8",
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   searchIcon: {
//     marginRight: 12,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: "#1a1a1a",
//   },
//   filterButton: {
//     marginLeft: 12,
//   },

//   // Categories
//   categoriesContainer: {
//     marginHorizontal: -20,
//   },
//   categoriesContent: {
//     paddingHorizontal: 20,
//   },
//   categoryButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#f0f0f0",
//     marginRight: 12,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   activeCategoryButton: {
//     backgroundColor: "#007AFF",
//   },
//   categoryText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#666",
//   },
//   activeCategoryText: {
//     color: "white",
//   },
//   categoryBadge: {
//     backgroundColor: "#ff3040",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 8,
//     marginLeft: 6,
//   },
//   badgeText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "600",
//   },

//   // Content
//   content: {
//     flex: 1,
//   },

//   // Video Card
//   videoCard: {
//     backgroundColor: "white",
//     marginHorizontal: 16,
//     marginBottom: 24,
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//     overflow: "hidden",
//   },
//   videoContainer: {
//     height: VIDEO_HEIGHT,
//     position: "relative",
//   },
//   videoThumbnail: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   videoOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   durationBadge: {
//     position: "absolute",
//     top: 16,
//     right: 16,
//     backgroundColor: "rgba(0,0,0,0.7)",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   durationText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   playButton: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginTop: -30,
//     marginLeft: -30,
//   },
//   playButtonInner: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "rgba(255,255,255,0.9)",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//   },

//   // Side Actions
//   sideActions: {
//     position: "absolute",
//     right: 16,
//     bottom: 20,
//     alignItems: "center",
//   },
//   actionButton: {
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   actionButtonBg: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   actionText: {
//     color: "white",
//     fontSize: 11,
//     fontWeight: "600",
//   },
//   creatorAvatarSection: {
//     alignItems: "center",
//     marginTop: 8,
//   },
//   creatorAvatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     borderWidth: 2,
//     borderColor: "white",
//   },
//   followButton: {
//     position: "absolute",
//     bottom: -6,
//     right: -6,
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: "#007AFF",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   // Video Info
//   videoInfo: {
//     padding: 16,
//   },
//   creatorRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 12,
//   },
//   creatorInfo: {},
//   creatorHandle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#1a1a1a",
//   },
//   verified: {
//     color: "#007AFF",
//   },
//   creatorName: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 2,
//   },
//   moreButton: {
//     padding: 4,
//   },
//   description: {
//     fontSize: 15,
//     lineHeight: 20,
//     color: "#1a1a1a",
//     marginBottom: 12,
//   },
//   tagsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 12,
//   },
//   tag: {
//     backgroundColor: "#f0f0f0",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//     marginRight: 8,
//     marginBottom: 4,
//   },
//   tagText: {
//     color: "#007AFF",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   musicInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   musicText: {
//     fontSize: 13,
//     color: "#666",
//     marginLeft: 6,
//     fontStyle: "italic",
//   },

//   // Products Section
//   productsSection: {
//     borderTopWidth: 1,
//     borderTopColor: "#f0f0f0",
//     paddingTop: 16,
//   },
//   productsSectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   productsTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#1a1a1a",
//   },
//   viewAllText: {
//     fontSize: 14,
//     color: "#007AFF",
//     fontWeight: "600",
//   },
//   productCard: {
//     backgroundColor: "#f8f8f8",
//     borderRadius: 12,
//     padding: 12,
//     marginRight: 12,
//     width: 160,
//   },
//   productInfo: {
//     marginBottom: 12,
//   },
//   productName: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#1a1a1a",
//     marginBottom: 6,
//   },
//   priceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   currentPrice: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     marginRight: 8,
//   },
//   originalPrice: {
//     fontSize: 13,
//     color: "#999",
//     textDecorationLine: "line-through",
//   },
//   shopName: {
//     fontSize: 12,
//     color: "#666",
//     marginBottom: 4,
//   },
//   ratingRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   ratingText: {
//     fontSize: 12,
//     color: "#666",
//     marginLeft: 4,
//   },
//   addToCartButton: {
//     backgroundColor: "#007AFF",
//     paddingVertical: 8,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   addToCartText: {
//     color: "white",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   notifyButton: {
//     backgroundColor: "#f0f0f0",
//     paddingVertical: 8,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   notifyText: {
//     color: "#666",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   // Bottom Navigation
//   bottomNavContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   bottomNav: {
//     paddingBottom: Platform.OS === "ios" ? 25 : 10,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(0,0,0,0.1)",
//   },
//   navContent: {
//     flexDirection: "row",
//     paddingVertical: 8,
//     paddingHorizontal: 8,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 8,
//   },
//   navIconContainer: {
//     position: "relative",
//   },
//   cartBadge: {
//     position: "absolute",
//     top: -6,
//     right: -6,
//     backgroundColor: "#ff3040",
//     borderRadius: 8,
//     width: 16,
//     height: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1,
//   },
//   cartBadgeText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "700",
//   },
//   navLabel: {
//     fontSize: 11,
//     color: "#8E8E93",
//     marginTop: 4,
//     fontWeight: "500",
//   },
//   activeNavLabel: {
//     color: "#007AFF",
//   },
//   specialNavItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 4,
//   },
//   createButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "#007AFF",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#007AFF",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   createLabel: {
//     fontSize: 11,
//     color: "#007AFF",
//     marginTop: 4,
//     fontWeight: "600",
//   },
// })

// sixth design

// import { Ionicons } from "@expo/vector-icons"
// import { BlurView } from "expo-blur"
// import { LinearGradient } from "expo-linear-gradient"
// import React, { useEffect, useRef, useState } from "react"
// import {
//   Animated,
//   Dimensions,
//   Image,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Vibration,
//   View,
// } from "react-native"

// const { width, height } = Dimensions.get("window")
// const VIDEO_HEIGHT = height * 0.75

// export default function VibeZoneApp() {
//   const [activeCategory, setActiveCategory] = useState("🔥 Trending")
//   const [activeTab, setActiveTab] = useState("Home")
//   const [cartCount, setCartCount] = useState(3)
//   const [isLiked, setIsLiked] = useState({})

//   // Animations
//   const pulseAnim = useRef(new Animated.Value(1)).current
//   const rotateAnim = useRef(new Animated.Value(0)).current
//   const bounceAnim = useRef(new Animated.Value(0)).current
//   const glowAnim = useRef(new Animated.Value(0)).current

//   useEffect(() => {
//     // Continuous pulse for trending elements
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulseAnim, {
//           toValue: 1.1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(pulseAnim, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start()

//     // Rotation animation for logo
//     Animated.loop(
//       Animated.timing(rotateAnim, {
//         toValue: 1,
//         duration: 20000,
//         useNativeDriver: true,
//       })
//     ).start()

//     // Glow effect
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(glowAnim, {
//           toValue: 1,
//           duration: 2000,
//           useNativeDriver: false,
//         }),
//         Animated.timing(glowAnim, {
//           toValue: 0,
//           duration: 2000,
//           useNativeDriver: false,
//         }),
//       ])
//     ).start()
//   }, [])

//   const categories = [
//     { id: "trending", label: "🔥 Trending", color: "#FF0080", glow: "#FF0080" },
//     { id: "foryou", label: "✨ For You", color: "#7C3AED", glow: "#7C3AED" },
//     { id: "street", label: "🏙️ Street", color: "#06B6D4", glow: "#06B6D4" },
//     { id: "luxury", label: "💎 Luxury", color: "#F59E0B", glow: "#F59E0B" },
//     { id: "vintage", label: "🕰️ Vintage", color: "#10B981", glow: "#10B981" },
//     { id: "thrift", label: "♻️ Thrift", color: "#EF4444", glow: "#EF4444" },
//   ]

//   const videos = [
//     {
//       id: 1,
//       creator: "@stylegoddess",
//       handle: "Maya Chen",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
//       thumbnail:
//         "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
//       likes: "47.2K",
//       comments: "2.1K",
//       shares: "892",
//       views: "1.2M",
//       duration: "0:15",
//       isVerified: true,
//       viralScore: 98,
//       mood: "✨ aesthetic",
//       description:
//         "POV: you found the perfect thrift haul 💅 sustainable queen energy",
//       tags: ["#thriftfinds", "#ootd", "#sustainable", "#vintage"],
//       products: [
//         {
//           id: 1,
//           name: "Vintage Denim Jacket",
//           price: "$12",
//           originalPrice: "$89",
//           discount: "86% OFF",
//           shop: "@thriftqueen",
//           inStock: true,
//           rating: 4.8,
//           vibe: "🔥 fire",
//         },
//         {
//           id: 2,
//           name: "White Crop Top",
//           price: "$8",
//           originalPrice: "$25",
//           discount: "68% OFF",
//           shop: "@basics_co",
//           inStock: true,
//           rating: 4.6,
//           vibe: "✨ clean",
//         },
//       ],
//       music: "original sound - stylegoddess",
//       gradient: ["#FF0080", "#7C3AED", "#06B6D4"],
//     },
//     {
//       id: 2,
//       creator: "@hypebeast_jay",
//       handle: "Jay Martinez",
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//       thumbnail:
//         "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
//       likes: "89.5K",
//       comments: "5.3K",
//       shares: "1.2K",
//       views: "2.8M",
//       duration: "0:22",
//       isVerified: true,
//       viralScore: 95,
//       mood: "🔥 fire",
//       description: "when the fit hits different 🔥🔥 link in bio for W2C",
//       tags: ["#streetwear", "#hypebeast", "#ootd", "#fire"],
//       products: [
//         {
//           id: 3,
//           name: "Travis Scott Jordan 1",
//           price: "$1,200",
//           shop: "@sneaker_plug",
//           inStock: false,
//           rating: 4.9,
//           vibe: "💎 grail",
//         },
//       ],
//       music: "SICKO MODE - Travis Scott",
//       gradient: ["#EF4444", "#F59E0B", "#10B981"],
//     },
//   ]

//   const handleLike = (videoId) => {
//     setIsLiked((prev) => ({ ...prev, [videoId]: !prev[videoId] }))
//     Vibration.vibrate(50) // Haptic feedback

//     // Bounce animation
//     Animated.sequence([
//       Animated.timing(bounceAnim, {
//         toValue: 1,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.timing(bounceAnim, {
//         toValue: 0,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//     ]).start()
//   }

//   const renderHeader = () => (
//     <View style={styles.header}>
//       <LinearGradient
//         colors={["#000000", "#1a1a1a", "#000000"]}
//         style={styles.headerGradient}
//       >
//         <SafeAreaView>
//           <View style={styles.headerContent}>
//             {/* Brand Section */}
//             <View style={styles.brandSection}>
//               <View style={styles.logoSection}>
//                 <Animated.View
//                   style={[
//                     styles.logoContainer,
//                     {
//                       transform: [
//                         {
//                           rotate: rotateAnim.interpolate({
//                             inputRange: [0, 1],
//                             outputRange: ["0deg", "360deg"],
//                           }),
//                         },
//                       ],
//                     },
//                   ]}
//                 >
//                   <LinearGradient
//                     colors={["#FF0080", "#7C3AED", "#06B6D4"]}
//                     style={styles.logo}
//                   >
//                     <Text style={styles.logoText}>VZ</Text>
//                   </LinearGradient>
//                 </Animated.View>

//                 <View style={styles.brandInfo}>
//                   <Text style={styles.brandName}>VibeZone</Text>
//                   <Text style={styles.brandTagline}>
//                     where vibes become reality ✨
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.headerActions}>
//                 <TouchableOpacity style={styles.liveButton}>
//                   <Animated.View
//                     style={[
//                       styles.liveDot,
//                       { transform: [{ scale: pulseAnim }] },
//                     ]}
//                   />
//                   <Text style={styles.liveText}>LIVE</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.headerButton}>
//                   <Animated.View
//                     style={[
//                       styles.notificationBadge,
//                       { transform: [{ scale: pulseAnim }] },
//                     ]}
//                   >
//                     <Text style={styles.badgeText}>5</Text>
//                   </Animated.View>
//                   <Ionicons name="notifications" size={24} color="white" />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Search */}
//             <View style={styles.searchSection}>
//               <LinearGradient
//                 colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
//                 style={styles.searchContainer}
//               >
//                 <Ionicons name="search" size={20} color="#FF0080" />
//                 <TextInput
//                   style={styles.searchInput}
//                   placeholder="what's your vibe today? 🔍"
//                   placeholderTextColor="rgba(255,255,255,0.6)"
//                 />
//                 <TouchableOpacity style={styles.micButton}>
//                   <LinearGradient
//                     colors={["#FF0080", "#7C3AED"]}
//                     style={styles.micGradient}
//                   >
//                     <Ionicons name="mic" size={16} color="white" />
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </LinearGradient>
//             </View>

//             {/* Categories */}
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.categoriesContainer}
//             >
//               {categories.map((category, index) => (
//                 <TouchableOpacity
//                   key={category.id}
//                   style={styles.categoryWrapper}
//                   onPress={() => setActiveCategory(category.label)}
//                 >
//                   <Animated.View
//                     style={[
//                       styles.categoryButton,
//                       activeCategory === category.label && {
//                         transform: [{ scale: pulseAnim }],
//                       },
//                     ]}
//                   >
//                     <LinearGradient
//                       colors={
//                         activeCategory === category.label
//                           ? [category.color, category.color + "80"]
//                           : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]
//                       }
//                       style={styles.categoryGradient}
//                     >
//                       <Text
//                         style={[
//                           styles.categoryText,
//                           activeCategory === category.label && {
//                             color: "white",
//                           },
//                         ]}
//                       >
//                         {category.label}
//                       </Text>
//                     </LinearGradient>
//                   </Animated.View>

//                   {activeCategory === category.label && (
//                     <Animated.View
//                       style={[
//                         styles.categoryGlow,
//                         {
//                           shadowColor: category.glow,
//                           opacity: glowAnim,
//                         },
//                       ]}
//                     />
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
//         </SafeAreaView>
//       </LinearGradient>
//     </View>
//   )

//   const renderVideoCard = (video, index) => (
//     <View key={video.id} style={styles.videoCard}>
//       {/* Video Container */}
//       <View style={styles.videoContainer}>
//         <Image
//           source={{ uri: video.thumbnail }}
//           style={styles.videoThumbnail}
//         />

//         {/* Gradient Overlay */}
//         <LinearGradient
//           colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
//           style={styles.videoOverlay}
//         />

//         {/* Viral Score */}
//         <Animated.View
//           style={[styles.viralBadge, { transform: [{ scale: pulseAnim }] }]}
//         >
//           <LinearGradient colors={video.gradient} style={styles.viralGradient}>
//             <Text style={styles.viralScore}>{video.viralScore}</Text>
//             <Text style={styles.viralText}>VIRAL</Text>
//           </LinearGradient>
//         </Animated.View>

//         {/* Mood Badge */}
//         <View style={styles.moodBadge}>
//           <BlurView intensity={30} style={styles.moodBlur}>
//             <Text style={styles.moodText}>{video.mood}</Text>
//           </BlurView>
//         </View>

//         {/* Play Button */}
//         <TouchableOpacity style={styles.playButton}>
//           <BlurView intensity={20} style={styles.playBlur}>
//             <LinearGradient
//               colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
//               style={styles.playGradient}
//             >
//               <Ionicons name="play" size={32} color="white" />
//             </LinearGradient>
//           </BlurView>
//         </TouchableOpacity>

//         {/* Side Actions */}
//         <View style={styles.sideActions}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => handleLike(video.id)}
//           >
//             <Animated.View
//               style={[
//                 styles.actionBg,
//                 isLiked[video.id] && {
//                   transform: [
//                     {
//                       scale: bounceAnim.interpolate({
//                         inputRange: [0, 1],
//                         outputRange: [1, 1.2],
//                       }),
//                     },
//                   ],
//                 },
//               ]}
//             >
//               <LinearGradient
//                 colors={
//                   isLiked[video.id]
//                     ? ["#FF0080", "#FF4081"]
//                     : ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]
//                 }
//                 style={styles.actionGradient}
//               >
//                 <Ionicons
//                   name={isLiked[video.id] ? "heart" : "heart-outline"}
//                   size={20}
//                   color="white"
//                 />
//               </LinearGradient>
//             </Animated.View>
//             <Text style={styles.actionCount}>{video.likes}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <View style={styles.actionBg}>
//               <LinearGradient
//                 colors={["#7C3AED", "#A855F7"]}
//                 style={styles.actionGradient}
//               >
//                 <Ionicons name="chatbubble" size={20} color="white" />
//               </LinearGradient>
//             </View>
//             <Text style={styles.actionCount}>{video.comments}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <View style={styles.actionBg}>
//               <LinearGradient
//                 colors={["#06B6D4", "#0891B2"]}
//                 style={styles.actionGradient}
//               >
//                 <Ionicons name="arrow-redo" size={20} color="white" />
//               </LinearGradient>
//             </View>
//             <Text style={styles.actionCount}>{video.shares}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <View style={styles.actionBg}>
//               <LinearGradient
//                 colors={["#F59E0B", "#D97706"]}
//                 style={styles.actionGradient}
//               >
//                 <Ionicons name="bookmark" size={20} color="white" />
//               </LinearGradient>
//             </View>
//           </TouchableOpacity>

//           {/* Creator Avatar */}
//           <View style={styles.creatorSection}>
//             <View style={styles.avatarContainer}>
//               <Image
//                 source={{ uri: video.avatar }}
//                 style={styles.creatorAvatar}
//               />
//               <LinearGradient
//                 colors={video.gradient}
//                 style={styles.avatarBorder}
//               />
//               <TouchableOpacity style={styles.followButton}>
//                 <LinearGradient
//                   colors={["#FF0080", "#7C3AED"]}
//                   style={styles.followGradient}
//                 >
//                   <Ionicons name="add" size={14} color="white" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Video Info */}
//       <View style={styles.videoInfo}>
//         <View style={styles.creatorRow}>
//           <View style={styles.creatorDetails}>
//             <Text style={styles.creatorHandle}>
//               {video.creator}
//               {video.isVerified && <Text style={styles.verified}> ✓</Text>}
//             </Text>
//             <Text style={styles.creatorName}>{video.handle}</Text>
//           </View>

//           <View style={styles.engagementBadge}>
//             <LinearGradient
//               colors={["#FF0080", "#7C3AED"]}
//               style={styles.engagementGradient}
//             >
//               <Text style={styles.engagementText}>🚀 VIRAL</Text>
//             </LinearGradient>
//           </View>
//         </View>

//         <Text style={styles.description}>{video.description}</Text>

//         {/* Tags */}
//         <View style={styles.tagsContainer}>
//           {video.tags.map((tag, tagIndex) => (
//             <TouchableOpacity key={tagIndex} style={styles.tag}>
//               <LinearGradient
//                 colors={["rgba(255,0,128,0.2)", "rgba(124,58,237,0.2)"]}
//                 style={styles.tagGradient}
//               >
//                 <Text style={styles.tagText}>{tag}</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Products */}
//         <View style={styles.productsSection}>
//           <Text style={styles.productsTitle}>🛍️ shop this vibe</Text>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {video.products.map((product) => (
//               <View key={product.id} style={styles.productCard}>
//                 <LinearGradient
//                   colors={
//                     product.inStock
//                       ? ["rgba(16,185,129,0.2)", "rgba(6,182,212,0.2)"]
//                       : ["rgba(107,114,128,0.2)", "rgba(75,85,99,0.2)"]
//                   }
//                   style={styles.productGradient}
//                 >
//                   {product.discount && (
//                     <View style={styles.discountBadge}>
//                       <LinearGradient
//                         colors={["#EF4444", "#DC2626"]}
//                         style={styles.discountGradient}
//                       >
//                         <Text style={styles.discountText}>
//                           {product.discount}
//                         </Text>
//                       </LinearGradient>
//                     </View>
//                   )}

//                   <Text style={styles.productName}>{product.name}</Text>

//                   <View style={styles.priceRow}>
//                     <Text style={styles.currentPrice}>{product.price}</Text>
//                     {product.originalPrice && (
//                       <Text style={styles.originalPrice}>
//                         {product.originalPrice}
//                       </Text>j
//                     )}
//                   </View>

//                   <Text style={styles.shopName}>{product.shop}</Text>

//                   <View style={styles.productMeta}>
//                     <View style={styles.ratingContainer}>
//                       <Ionicons name="star" size={12} color="#F59E0B" />
//                       <Text style={styles.ratingText}>{product.rating}</Text>
//                     </View>
//                     <Text style={styles.vibeText}>{product.vibe}</Text>
//                   </View>

//                   {product.inStock ? (
//                     <TouchableOpacity
//                       style={styles.buyButton}
//                       onPress={() => {
//                         setCartCount(cartCount + 1)
//                         Vibration.vibrate(100)
//                       }}
//                     >
//                       <LinearGradient
//                         colors={["#10B981", "#059669"]}
//                         style={styles.buyGradient}
//                       >
//                         <Text style={styles.buyText}>cop this 🔥</Text>
//                       </LinearGradient>
//                     </TouchableOpacity>
//                   ) : (
//                     <TouchableOpacity style={styles.waitlistButton}>
//                       <Text style={styles.waitlistText}>join waitlist 😤</Text>
//                     </TouchableOpacity>
//                   )}
//                 </LinearGradient>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </View>
//     </View>
//   )

//   const renderBottomNav = () => (
//     <View style={styles.bottomNavContainer}>
//       <BlurView intensity={100} style={styles.bottomNav}>
//         <LinearGradient
//           colors={["rgba(0,0,0,0.8)", "rgba(26,26,26,0.8)"]}
//           style={styles.navGradient}
//         >
//           <View style={styles.navContent}>
//             {[
//               { icon: "home", label: "Home", key: "Home", color: "#FF0080" },
//               {
//                 icon: "search",
//                 label: "Discover",
//                 key: "Discover",
//                 color: "#7C3AED",
//               },
//               {
//                 icon: "add-circle",
//                 label: "Create",
//                 key: "Create",
//                 isSpecial: true,
//                 color: "#F59E0B",
//               },
//               { icon: "heart", label: "Saved", key: "Saved", color: "#EF4444" },
//               {
//                 icon: "bag",
//                 label: "Shop",
//                 key: "Shop",
//                 hasNotification: true,
//                 color: "#10B981",
//               },
//             ].map((item) => {
//               const isActive = activeTab === item.key
//               const isSpecial = item.isSpecial

//               if (isSpecial) {
//                 return (
//                   <TouchableOpacity
//                     key={item.key}
//                     style={styles.specialNavItem}
//                   >
//                     <Animated.View
//                       style={[
//                         styles.createButton,
//                         { transform: [{ scale: pulseAnim }] },
//                       ]}
//                     >
//                       <LinearGradient
//                         colors={["#F59E0B", "#D97706", "#B45309"]}
//                         style={styles.createGradient}
//                       >
//                         <Ionicons name="add" size={28} color="white" />
//                       </LinearGradient>
//                     </Animated.View>
//                     <Text style={styles.createLabel}>Create</Text>
//                   </TouchableOpacity>
//                 )
//               }

//               return (
//                 <TouchableOpacity
//                   key={item.key}
//                   style={styles.navItem}
//                   onPress={() => setActiveTab(item.key)}
//                 >
//                   <View style={styles.navIconContainer}>
//                     {item.hasNotification && cartCount > 0 && (
//                       <Animated.View
//                         style={[
//                           styles.cartBadge,
//                           { transform: [{ scale: pulseAnim }] },
//                         ]}
//                       >
//                         <LinearGradient
//                           colors={["#EF4444", "#DC2626"]}
//                           style={styles.cartBadgeGradient}
//                         >
//                           <Text style={styles.cartBadgeText}>{cartCount}</Text>
//                         </LinearGradient>
//                       </Animated.View>
//                     )}

//                     <Ionicons
//                       name={isActive ? item.icon : item.icon + "-outline"}
//                       size={24}
//                       color={isActive ? item.color : "rgba(255,255,255,0.6)"}
//                     />
//                   </View>

//                   <Text
//                     style={[styles.navLabel, isActive && { color: item.color }]}
//                   >
//                     {item.label}
//                   </Text>
//                 </TouchableOpacity>
//               )
//             })}
//           </View>
//         </LinearGradient>
//       </BlurView>
//     </View>
//   )

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#000000" />

//       {renderHeader()}

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         bounces={true}
//       >
//         {videos.map(renderVideoCard)}
//       </ScrollView>

//       {renderBottomNav()}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000000",
//   },

//   // Header
//   header: {
//     zIndex: 10,
//   },
//   headerGradient: {
//     paddingBottom: 20,
//   },
//   headerContent: {
//     paddingHorizontal: 20,
//   },
//   brandSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   logoSection: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   logoContainer: {
//     marginRight: 12,
//   },
//   logo: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logoText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "900",
//   },
//   brandInfo: {},
//   brandName: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "900",
//     letterSpacing: -1,
//   },
//   brandTagline: {
//     color: "rgba(255,255,255,0.7)",
//     fontSize: 12,
//     fontStyle: "italic",
//   },
//   headerActions: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   liveButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#EF4444",
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 15,
//     marginRight: 16,
//   },
//   liveDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "white",
//     marginRight: 6,
//   },
//   liveText: {
//     color: "white",
//     fontSize: 11,
//     fontWeight: "800",
//   },
//   headerButton: {
//     position: "relative",
//   },
//   notificationBadge: {
//     position: "absolute",
//     top: -6,
//     right: -6,
//     backgroundColor: "#FF0080",
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1,
//   },
//   badgeText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "800",
//   },

//   // Search
//   searchSection: {
//     marginBottom: 20,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.1)",
//   },
//   searchInput: {
//     flex: 1,
//     color: "white",
//     fontSize: 16,
//     fontWeight: "500",
//     marginLeft: 12,
//   },
//   micButton: {
//     borderRadius: 15,
//     overflow: "hidden",
//   },
//   micGradient: {
//     padding: 8,
//   },

//   // Categories
//   categoriesContainer: {
//     marginHorizontal: -20,
//   },
//   categoryWrapper: {
//     marginRight: 16,
//     position: "relative",
//   },
//   categoryButton: {
//     borderRadius: 20,
//     overflow: "hidden",
//   },
//   categoryGradient: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.1)",
//   },
//   categoryText: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "rgba(255,255,255,0.8)",
//   },
//   categoryGlow: {
//     position: "absolute",
//     top: -5,
//     left: -5,
//     right: -5,
//     bottom: -5,
//     borderRadius: 25,
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 20,
//     elevation: 20,
//   },

//   // Content
//   content: {
//     flex: 1,
//   },

//   // Video Card
//   videoCard: {
//     marginBottom: 30,
//     paddingHorizontal: 16,
//   },
//   videoContainer: {
//     height: VIDEO_HEIGHT,
//     borderRadius: 25,
//     overflow: "hidden",
//     position: "relative",
//   },
//   videoThumbnail: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   videoOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   viralBadge: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//   },
//   viralGradient: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   viralScore: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "900",
//   },
//   viralText: {
//     color: "white",
//     fontSize: 8,
//     fontWeight: "700",
//   },
//   moodBadge: {
//     position: "absolute",
//     top: 20,
//     right: 20,
//     borderRadius: 15,
//     overflow: "hidden",
//   },
//   moodBlur: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//   },
//   moodText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   playButton: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginTop: -40,
//     marginLeft: -40,
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     overflow: "hidden",
//   },
//   playBlur: {
//     flex: 1,
//   },
//   playGradient: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   // Side Actions
//   sideActions: {
//     position: "absolute",
//     right: 20,
//     bottom: 30,
//     alignItems: "center",
//   },
//   actionButton: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   actionBg: {
//     borderRadius: 25,
//     overflow: "hidden",
//   },
//   actionGradient: {
//     width: 50,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   actionCount: {
//     color: "white",
//     fontSize: 11,
//     fontWeight: "700",
//     marginTop: 6,
//   },
//   creatorSection: {
//     marginTop: 20,
//   },
//   avatarContainer: {
//     position: "relative",
//   },
//   creatorAvatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   avatarBorder: {
//     position: "absolute",
//     top: -3,
//     left: -3,
//     right: -3,
//     bottom: -3,
//     borderRadius: 28,
//   },
//   followButton: {
//     position: "absolute",
//     bottom: -8,
//     right: -8,
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   followGradient: {
//     width: 24,
//     height: 24,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   // Video Info
//   videoInfo: {
//     paddingTop: 20,
//   },
//   creatorRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   creatorDetails: {},
//   creatorHandle: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   verified: {
//     color: "#06B6D4",
//   },
//   creatorName: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 14,
//     marginTop: 2,
//   },
//   engagementBadge: {
//     borderRadius: 15,
//     overflow: "hidden",
//   },
//   engagementGradient: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//   },
//   engagementText: {
//     color: "white",
//     fontSize: 11,
//     fontWeight: "700",
//   },
//   description: {
//     color: "white",
//     fontSize: 15,
//     lineHeight: 22,
//     marginBottom: 16,
//   },
//   tagsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 20,
//   },
//   tag: {
//     marginRight: 8,
//     marginBottom: 8,
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   tagGradient: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: "rgba(255,0,128,0.3)",
//   },
//   tagText: {
//     color: "#FF0080",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   // Products
//   productsSection: {
//     marginTop: 16,
//   },
//   productsTitle: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "800",
//     marginBottom: 16,
//   },
//   productCard: {
//     marginRight: 16,
//     width: 180,
//     borderRadius: 20,
//     overflow: "hidden",
//   },
//   productGradient: {
//     padding: 16,
//     position: "relative",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.1)",
//   },
//   discountBadge: {
//     position: "absolute",
//     top: 12,
//     right: 12,
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   discountGradient: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   discountText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "800",
//   },
//   productName: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   priceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   currentPrice: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "800",
//     marginRight: 8,
//   },
//   originalPrice: {
//     color: "rgba(255,255,255,0.5)",
//     fontSize: 14,
//     textDecorationLine: "line-through",
//   },
//   shopName: {
//     color: "rgba(255,255,255,0.7)",
//     fontSize: 12,
//     marginBottom: 8,
//   },
//   productMeta: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   ratingText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "600",
//     marginLeft: 4,
//   },
//   vibeText: {
//     color: "#F59E0B",
//     fontSize: 11,
//     fontWeight: "600",
//   },
//   buyButton: {
//     borderRadius: 15,
//     overflow: "hidden",
//   },
//   buyGradient: {
//     paddingVertical: 12,
//     alignItems: "center",
//   },
//   buyText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "700",
//   },
//   waitlistButton: {
//     backgroundColor: "rgba(255,255,255,0.1)",
//     paddingVertical: 12,
//     borderRadius: 15,
//     alignItems: "center",
//   },
//   waitlistText: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 14,
//     fontWeight: "600",
//   },

//   // Bottom Nav
//   bottomNavContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   bottomNav: {
//     paddingBottom: Platform.OS === "ios" ? 30 : 15,
//   },
//   navGradient: {
//     paddingVertical: 15,
//   },
//   navContent: {
//     flexDirection: "row",
//     paddingHorizontal: 12,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 8,
//   },
//   navIconContainer: {
//     position: "relative",
//   },
//   cartBadge: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     zIndex: 1,
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   cartBadgeGradient: {
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cartBadgeText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "800",
//   },
//   navLabel: {
//     fontSize: 11,
//     color: "rgba(255,255,255,0.6)",
//     marginTop: 6,
//     fontWeight: "600",
//   },
//   specialNavItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 4,
//   },
//   createButton: {
//     borderRadius: 28,
//     overflow: "hidden",
//   },
//   createGradient: {
//     width: 56,
//     height: 56,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   createLabel: {
//     color: "#F59E0B",
//     fontSize: 11,
//     fontWeight: "700",
//     marginTop: 6,
//   },
// })

// import { Ionicons } from "@expo/vector-icons"
// import { BlurView } from "expo-blur"
// import { LinearGradient } from "expo-linear-gradient"
// import React, { useEffect, useRef, useState } from "react"
// import {
//   Animated,
//   Dimensions,
//   Image,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Vibration,
//   View,
// } from "react-native"

// const { width, height } = Dimensions.get("window")
// const VIDEO_HEIGHT = height * 0.78 // One-hand reachability
// const THUMB_ZONE = height * 0.4 // Bottom 40% for thumb zone

// export default function PremiumVibeZoneApp() {
//   const [activeCategory, setActiveCategory] = useState("For You")
//   const [activeTab, setActiveTab] = useState("Home")
//   const [cartCount, setCartCount] = useState(3)
//   const [isLiked, setIsLiked] = useState({})
//   const [lastActivity, setLastActivity] = useState(Date.now())

//   // Premium micro-animations
//   const scaleAnim = useRef(new Animated.Value(1)).current
//   const slideAnim = useRef(new Animated.Value(0)).current
//   const fadeAnim = useRef(new Animated.Value(1)).current
//   const breatheAnim = useRef(new Animated.Value(1)).current

//   useEffect(() => {
//     // Context-aware: Remember last activity
//     const interval = setInterval(() => {
//       setLastActivity(Date.now())
//     }, 30000)

//     // Subtle breathing animation for trending elements
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(breatheAnim, {
//           toValue: 1.02,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(breatheAnim, {
//           toValue: 1,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start()

//     return () => clearInterval(interval)
//   }, [])

//   // Weighted gesture for one-hand use
//   const handleLike = (videoId) => {
//     // Haptic feedback
//     Vibration.vibrate([50, 30, 50])

//     setIsLiked((prev) => ({ ...prev, [videoId]: !prev[videoId] }))

//     // Micro-animation sequence
//     Animated.sequence([
//       Animated.timing(scaleAnim, {
//         toValue: 1.2,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         tension: 300,
//         friction: 10,
//         useNativeDriver: true,
//       }),
//     ]).start()
//   }

//   const categories = [
//     { id: "foryou", label: "For You", color: "#FF6B6B", trending: true },
//     { id: "trending", label: "Trending", color: "#4ECDC4", trending: true },
//     { id: "street", label: "Street", color: "#45B7D1" },
//     { id: "luxury", label: "Luxury", color: "#F7DC6F" },
//     { id: "vintage", label: "Vintage", color: "#BB8FCE" },
//     { id: "thrift", label: "Thrift", color: "#85C1E9" },
//   ]

//   const videos = [
//     {
//       id: 1,
//       creator: "@stylegoddess",
//       handle: "Maya Chen",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
//       thumbnail:
//         "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
//       likes: "47.2K",
//       comments: "2.1K",
//       shares: "892",
//       views: "1.2M",
//       duration: "0:15",
//       isVerified: true,
//       viralScore: 98,
//       description:
//         "thrift haul that changed my life 💅 sustainable queen energy only",
//       tags: ["#thriftfinds", "#ootd", "#sustainable"],
//       products: [
//         {
//           id: 1,
//           name: "Vintage Denim Jacket",
//           price: "$12",
//           originalPrice: "$89",
//           shop: "@thriftqueen",
//           inStock: true,
//           rating: 4.8,
//           quickBuy: true,
//         },
//         {
//           id: 2,
//           name: "White Crop Top",
//           price: "$8",
//           originalPrice: "$25",
//           shop: "@basics_co",
//           inStock: true,
//           rating: 4.6,
//           quickBuy: true,
//         },
//       ],
//       music: "original sound - stylegoddess",
//       dominantColors: ["#FF6B6B", "#4ECDC4", "#45B7D1"], // Color adaptive
//     },
//     {
//       id: 2,
//       creator: "@hypebeast_jay",
//       handle: "Jay Martinez",
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//       thumbnail:
//         "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
//       likes: "89.5K",
//       comments: "5.3K",
//       shares: "1.2K",
//       views: "2.8M",
//       duration: "0:22",
//       isVerified: true,
//       viralScore: 95,
//       description: "when the fit hits different 🔥🔥 W2C in bio",
//       tags: ["#streetwear", "#hypebeast", "#ootd"],
//       products: [
//         {
//           id: 3,
//           name: "Travis Scott Jordan 1",
//           price: "$1,200",
//           shop: "@sneaker_plug",
//           inStock: false,
//           rating: 4.9,
//           waitlist: true,
//         },
//       ],
//       music: "SICKO MODE - Travis Scott",
//       dominantColors: ["#F7DC6F", "#BB8FCE", "#85C1E9"],
//     },
//   ]

//   const renderStickyHeader = () => (
//     <View style={styles.stickyHeader}>
//       <BlurView intensity={95} style={styles.headerBlur}>
//         <SafeAreaView>
//           <View style={styles.headerContent}>
//             {/* Smart sticky: Context-aware brand */}
//             <View style={styles.brandSection}>
//               <Animated.View
//                 style={[
//                   styles.logoContainer,
//                   { transform: [{ scale: breatheAnim }] },
//                 ]}
//               >
//                 <LinearGradient
//                   colors={["#FF6B6B", "#4ECDC4"]}
//                   style={styles.logo}
//                 >
//                   <Text style={styles.logoText}>VZ</Text>
//                 </LinearGradient>
//               </Animated.View>

//               <View style={styles.brandInfo}>
//                 <Text style={styles.brandName}>VibeZone</Text>
//                 <Text style={styles.brandTagline}>
//                   discover • create • vibe
//                 </Text>
//               </View>
//             </View>

//             {/* One-hand reachable actions */}
//             <View style={styles.headerActions}>
//               <TouchableOpacity
//                 style={styles.headerButton}
//                 onPress={() => Vibration.vibrate(30)}
//               >
//                 <View style={styles.notificationBadge}>
//                   <Text style={styles.badgeText}>3</Text>
//                 </View>
//                 <Ionicons
//                   name="notifications-outline"
//                   size={22}
//                   color="white"
//                 />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.headerButton}
//                 onPress={() => Vibration.vibrate(30)}
//               >
//                 <Ionicons
//                   name="person-circle-outline"
//                   size={26}
//                   color="white"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Progressive search with color adaptation */}
//           <View style={styles.searchSection}>
//             <View style={styles.searchContainer}>
//               <Ionicons name="search" size={18} color="#FF6B6B" />
//               <TextInput
//                 style={styles.searchInput}
//                 placeholder="discover your next vibe..."
//                 placeholderTextColor="rgba(255,255,255,0.6)"
//               />
//               <TouchableOpacity
//                 style={styles.voiceButton}
//                 onPress={() => Vibration.vibrate(50)}
//               >
//                 <LinearGradient
//                   colors={["#FF6B6B", "#4ECDC4"]}
//                   style={styles.voiceGradient}
//                 >
//                   <Ionicons name="mic" size={14} color="white" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Smart categories with trending indicators */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.categoriesContainer}
//           >
//             {categories.map((category, index) => (
//               <TouchableOpacity
//                 key={category.id}
//                 style={styles.categoryWrapper}
//                 onPress={() => {
//                   setActiveCategory(category.label)
//                   Vibration.vibrate(30)
//                 }}
//               >
//                 <Animated.View
//                   style={[
//                     styles.categoryButton,
//                     activeCategory === category.label && {
//                       transform: [{ scale: breatheAnim }],
//                     },
//                   ]}
//                 >
//                   <LinearGradient
//                     colors={
//                       activeCategory === category.label
//                         ? [category.color, category.color + "80"]
//                         : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]
//                     }
//                     style={styles.categoryGradient}
//                   >
//                     {category.trending && <View style={styles.trendingDot} />}
//                     <Text
//                       style={[
//                         styles.categoryText,
//                         activeCategory === category.label && { color: "white" },
//                       ]}
//                     >
//                       {category.label}
//                     </Text>
//                   </LinearGradient>
//                 </Animated.View>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </SafeAreaView>
//       </BlurView>
//     </View>
//   )

//   const renderVideoCard = (video, index) => (
//     <View key={video.id} style={styles.videoCard}>
//       {/* Full-screen video optimized for one-hand use */}
//       <View style={styles.videoContainer}>
//         <Image
//           source={{ uri: video.thumbnail }}
//           style={styles.videoThumbnail}
//         />

//         {/* Progressive blur overlay */}
//         <LinearGradient
//           colors={["transparent", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
//           style={styles.videoOverlay}
//         />

//         {/* Context-aware viral indicator */}
//         <Animated.View
//           style={[styles.viralBadge, { transform: [{ scale: breatheAnim }] }]}
//         >
//           <BlurView intensity={30} style={styles.viralBlur}>
//             <LinearGradient
//               colors={video.dominantColors}
//               style={styles.viralGradient}
//             >
//               <Text style={styles.viralScore}>{video.viralScore}</Text>
//               <Text style={styles.viralText}>VIRAL</Text>
//             </LinearGradient>
//           </BlurView>
//         </Animated.View>

//         {/* Weighted gesture play button */}
//         <TouchableOpacity
//           style={styles.playButton}
//           onPress={() => Vibration.vibrate([50, 30, 50])}
//         >
//           <BlurView intensity={20} style={styles.playBlur}>
//             <View style={styles.playInner}>
//               <Ionicons name="play" size={28} color="white" />
//             </View>
//           </BlurView>
//         </TouchableOpacity>

//         {/* Thumb zone optimized actions */}
//         <View style={styles.thumbZoneActions}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => handleLike(video.id)}
//           >
//             <Animated.View
//               style={[styles.actionBg, { transform: [{ scale: scaleAnim }] }]}
//             >
//               <LinearGradient
//                 colors={
//                   isLiked[video.id]
//                     ? ["#FF6B6B", "#FF8E8E"]
//                     : ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]
//                 }
//                 style={styles.actionGradient}
//               >
//                 <Ionicons
//                   name={isLiked[video.id] ? "heart" : "heart-outline"}
//                   size={18}
//                   color="white"
//                 />
//               </LinearGradient>
//             </Animated.View>
//             <Text style={styles.actionCount}>{video.likes}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => Vibration.vibrate(30)}
//           >
//             <View style={styles.actionBg}>
//               <LinearGradient
//                 colors={["#4ECDC4", "#45B7D1"]}
//                 style={styles.actionGradient}
//               >
//                 <Ionicons name="chatbubble-outline" size={18} color="white" />
//               </LinearGradient>
//             </View>
//             <Text style={styles.actionCount}>{video.comments}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => Vibration.vibrate(30)}
//           >
//             <View style={styles.actionBg}>
//               <LinearGradient
//                 colors={["#F7DC6F", "#F4D03F"]}
//                 style={styles.actionGradient}
//               >
//                 <Ionicons name="arrow-redo-outline" size={18} color="white" />
//               </LinearGradient>
//             </View>
//             <Text style={styles.actionCount}>{video.shares}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => Vibration.vibrate(30)}
//           >
//             <View style={styles.actionBg}>
//               <LinearGradient
//                 colors={["#BB8FCE", "#A569BD"]}
//                 style={styles.actionGradient}
//               >
//                 <Ionicons name="bookmark-outline" size={18} color="white" />
//               </LinearGradient>
//             </View>
//           </TouchableOpacity>

//           {/* Creator section with follow */}
//           <View style={styles.creatorSection}>
//             <View style={styles.avatarContainer}>
//               <Image
//                 source={{ uri: video.avatar }}
//                 style={styles.creatorAvatar}
//               />
//               <LinearGradient
//                 colors={video.dominantColors}
//                 style={styles.avatarBorder}
//               />
//               <TouchableOpacity
//                 style={styles.followButton}
//                 onPress={() => Vibration.vibrate(50)}
//               >
//                 <LinearGradient
//                   colors={["#FF6B6B", "#4ECDC4"]}
//                   style={styles.followGradient}
//                 >
//                   <Ionicons name="add" size={12} color="white" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Context-aware video info */}
//       <View style={styles.videoInfo}>
//         <View style={styles.creatorRow}>
//           <View style={styles.creatorDetails}>
//             <Text style={styles.creatorHandle}>
//               {video.creator}
//               {video.isVerified && <Text style={styles.verified}> ✓</Text>}
//             </Text>
//             <Text style={styles.creatorName}>{video.handle}</Text>
//           </View>

//           <View style={styles.engagementBadge}>
//             <BlurView intensity={20} style={styles.engagementBlur}>
//               <Text style={styles.engagementText}>🚀 VIRAL</Text>
//             </BlurView>
//           </View>
//         </View>

//         <Text style={styles.description}>{video.description}</Text>

//         {/* Color-adaptive tags */}
//         <View style={styles.tagsContainer}>
//           {video.tags.map((tag, tagIndex) => (
//             <TouchableOpacity
//               key={tagIndex}
//               style={styles.tag}
//               onPress={() => Vibration.vibrate(30)}
//             >
//               <LinearGradient
//                 colors={[
//                   video.dominantColors[0] + "30",
//                   video.dominantColors[1] + "20",
//                 ]}
//                 style={styles.tagGradient}
//               >
//                 <Text
//                   style={[styles.tagText, { color: video.dominantColors[0] }]}
//                 >
//                   {tag}
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Smart shopping section */}
//         <View style={styles.shoppingSection}>
//           <Text style={styles.shoppingTitle}>🛍️ shop this vibe</Text>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {video.products.map((product) => (
//               <View key={product.id} style={styles.productCard}>
//                 <BlurView intensity={20} style={styles.productBlur}>
//                   <LinearGradient
//                     colors={
//                       product.inStock
//                         ? ["rgba(76, 205, 196, 0.2)", "rgba(69, 183, 209, 0.1)"]
//                         : [
//                             "rgba(128, 128, 128, 0.2)",
//                             "rgba(160, 160, 160, 0.1)",
//                           ]
//                     }
//                     style={styles.productGradient}
//                   >
//                     <Text style={styles.productName}>{product.name}</Text>

//                     <View style={styles.priceRow}>
//                       <Text style={styles.currentPrice}>{product.price}</Text>
//                       {product.originalPrice && (
//                         <Text style={styles.originalPrice}>
//                           {product.originalPrice}
//                         </Text>
//                       )}
//                     </View>

//                     <Text style={styles.shopName}>{product.shop}</Text>

//                     <View style={styles.ratingRow}>
//                       <Ionicons name="star" size={12} color="#F7DC6F" />
//                       <Text style={styles.ratingText}>{product.rating}</Text>
//                     </View>

//                     {product.inStock ? (
//                       <TouchableOpacity
//                         style={styles.buyButton}
//                         onPress={() => {
//                           setCartCount(cartCount + 1)
//                           Vibration.vibrate([50, 30, 50])
//                         }}
//                       >
//                         <LinearGradient
//                           colors={["#4ECDC4", "#45B7D1"]}
//                           style={styles.buyGradient}
//                         >
//                           <Text style={styles.buyText}>add to cart</Text>
//                         </LinearGradient>
//                       </TouchableOpacity>
//                     ) : (
//                       <TouchableOpacity
//                         style={styles.waitlistButton}
//                         onPress={() => Vibration.vibrate(30)}
//                       >
//                         <Text style={styles.waitlistText}>join waitlist</Text>
//                       </TouchableOpacity>
//                     )}
//                   </LinearGradient>
//                 </BlurView>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </View>
//     </View>
//   )

//   const renderSmartBottomNav = () => (
//     <View style={[styles.bottomNavContainer, { bottom: 0 }]}>
//       <BlurView intensity={100} style={styles.bottomNav}>
//         <View style={styles.navContent}>
//           {[
//             { icon: "home", label: "Home", key: "Home", color: "#FF6B6B" },
//             {
//               icon: "search",
//               label: "Discover",
//               key: "Discover",
//               color: "#4ECDC4",
//             },
//             {
//               icon: "add-circle",
//               label: "Create",
//               key: "Create",
//               isSpecial: true,
//               color: "#F7DC6F",
//             },
//             { icon: "heart", label: "Saved", key: "Saved", color: "#BB8FCE" },
//             {
//               icon: "bag",
//               label: "Shop",
//               key: "Shop",
//               hasNotification: true,
//               color: "#85C1E9",
//             },
//           ].map((item) => {
//             const isActive = activeTab === item.key
//             const isSpecial = item.isSpecial

//             if (isSpecial) {
//               return (
//                 <TouchableOpacity
//                   key={item.key}
//                   style={styles.specialNavItem}
//                   onPress={() => Vibration.vibrate([50, 30, 50])}
//                 >
//                   <Animated.View
//                     style={[
//                       styles.createButton,
//                       { transform: [{ scale: breatheAnim }] },
//                     ]}
//                   >
//                     <LinearGradient
//                       colors={["#F7DC6F", "#F4D03F"]}
//                       style={styles.createGradient}
//                     >
//                       <Ionicons name="add" size={24} color="white" />
//                     </LinearGradient>
//                   </Animated.View>
//                   <Text style={styles.createLabel}>Create</Text>
//                 </TouchableOpacity>
//               )
//             }

//             return (
//               <TouchableOpacity
//                 key={item.key}
//                 style={styles.navItem}
//                 onPress={() => {
//                   setActiveTab(item.key)
//                   Vibration.vibrate(30)
//                 }}
//               >
//                 <View style={styles.navIconContainer}>
//                   {item.hasNotification && cartCount > 0 && (
//                     <Animated.View
//                       style={[
//                         styles.cartBadge,
//                         { transform: [{ scale: breatheAnim }] },
//                       ]}
//                     >
//                       <LinearGradient
//                         colors={["#FF6B6B", "#FF8E8E"]}
//                         style={styles.cartBadgeGradient}
//                       >
//                         <Text style={styles.cartBadgeText}>{cartCount}</Text>
//                       </LinearGradient>
//                     </Animated.View>
//                   )}

//                   <Ionicons
//                     name={isActive ? item.icon : item.icon + "-outline"}
//                     size={22}
//                     color={isActive ? item.color : "rgba(255,255,255,0.6)"}
//                   />
//                 </View>

//                 <Text
//                   style={[styles.navLabel, isActive && { color: item.color }]}
//                 >
//                   {item.label}
//                 </Text>
//               </TouchableOpacity>
//             )
//           })}
//         </View>
//       </BlurView>
//     </View>
//   )

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor="transparent"
//         translucent
//       />

//       {renderStickyHeader()}

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         bounces={true}
//         onScroll={() => {
//           // Progressive state updates
//           setLastActivity(Date.now())
//         }}
//       >
//         {videos.map(renderVideoCard)}
//       </ScrollView>

//       {renderSmartBottomNav()}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000000",
//   },

//   // Smart Sticky Header
//   stickyHeader: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 100,
//   },
//   headerBlur: {
//     paddingBottom: 16,
//   },
//   headerContent: {
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   brandSection: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   logoContainer: {
//     marginRight: 12,
//   },
//   logo: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logoText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "800",
//   },
//   brandInfo: {},
//   brandName: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "800",
//     letterSpacing: -0.5,
//   },
//   brandTagline: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 11,
//     fontWeight: "500",
//   },
//   headerActions: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   headerButton: {
//     marginLeft: 16,
//     position: "relative",
//   },
//   notificationBadge: {
//     position: "absolute",
//     top: -4,
//     right: -4,
//     backgroundColor: "#FF6B6B",
//     borderRadius: 8,
//     width: 16,
//     height: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1,
//   },
//   badgeText: {
//     color: "white",
//     fontSize: 9,
//     fontWeight: "700",
//   },

//   // Progressive Search
//   searchSection: {
//     paddingHorizontal: 20,
//     marginBottom: 16,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.1)",
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.1)",
//   },
//   searchInput: {
//     flex: 1,
//     color: "white",
//     fontSize: 15,
//     fontWeight: "500",
//     marginLeft: 12,
//   },
//   voiceButton: {
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   voiceGradient: {
//     padding: 6,
//   },

//   // Smart Categories
//   categoriesContainer: {
//     paddingLeft: 20,
//   },
//   categoryWrapper: {
//     marginRight: 12,
//   },
//   categoryButton: {
//     borderRadius: 16,
//     overflow: "hidden",
//   },
//   categoryGradient: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.1)",
//   },
//   trendingDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#FF6B6B",
//     marginRight: 8,
//   },
//   categoryText: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "rgba(255,255,255,0.7)",
//   },

//   // Content
//   content: {
//     flex: 1,
//     paddingTop: 180, // Account for sticky header
//   },

//   // Video Card
//   videoCard: {
//     marginBottom: 24,
//     paddingHorizontal: 16,
//   },
//   videoContainer: {
//     height: VIDEO_HEIGHT,
//     borderRadius: 20,
//     overflow: "hidden",
//     position: "relative",
//   },
//   videoThumbnail: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   videoOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   viralBadge: {
//     position: "absolute",
//     top: 16,
//     left: 16,
//   },
//   viralBlur: {
//     borderRadius: 16,
//     overflow: "hidden",
//   },
//   viralGradient: {
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     alignItems: "center",
//   },
//   viralScore: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "800",
//   },
//   viralText: {
//     color: "white",
//     fontSize: 8,
//     fontWeight: "600",
//   },
//   playButton: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginTop: -30,
//     marginLeft: -30,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     overflow: "hidden",
//   },
//   playBlur: {
//     flex: 1,
//   },
//   playInner: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.2)",
//   },

//   // Thumb Zone Actions
//   thumbZoneActions: {
//     position: "absolute",
//     right: 16,
//     bottom: THUMB_ZONE * 0.1, // Within thumb zone
//     alignItems: "center",
//   },
//   actionButton: {
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   actionBg: {
//     borderRadius: 20,
//     overflow: "hidden",
//   },
//   actionGradient: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   actionCount: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "600",
//     marginTop: 4,
//   },
//   creatorSection: {
//     marginTop: 16,
//   },
//   avatarContainer: {
//     position: "relative",
//   },
//   creatorAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   avatarBorder: {
//     position: "absolute",
//     top: -2,
//     left: -2,
//     right: -2,
//     bottom: -2,
//     borderRadius: 22,
//   },
//   followButton: {
//     position: "absolute",
//     bottom: -6,
//     right: -6,
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   followGradient: {
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   // Video Info
//   videoInfo: {
//     paddingTop: 16,
//   },
//   creatorRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   creatorDetails: {},
//   creatorHandle: {
//     color: "white",
//     fontSize: 15,
//     fontWeight: "700",
//   },
//   verified: {
//     color: "#4ECDC4",
//   },
//   creatorName: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 13,
//     marginTop: 1,
//   },
//   engagementBadge: {
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   engagementBlur: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   engagementText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "600",
//   },
//   description: {
//     color: "white",
//     fontSize: 14,
//     lineHeight: 20,
//     marginBottom: 12,
//   },
//   tagsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 16,
//   },
//   tag: {
//     marginRight: 8,
//     marginBottom: 6,
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   tagGradient: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.1)",
//   },
//   tagText: {
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   // Smart Shopping
//   shoppingSection: {
//     marginTop: 12,
//   },
//   shoppingTitle: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 12,
//   },
//   productCard: {
//     marginRight: 12,
//     width: 160,
//     borderRadius: 16,
//     overflow: "hidden",
//   },
//   productBlur: {
//     borderRadius: 16,
//   },
//   productGradient: {
//     padding: 12,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.1)",
//   },
//   productName: {
//     color: "white",
//     fontSize: 13,
//     fontWeight: "600",
//     marginBottom: 6,
//   },
//   priceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   currentPrice: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//     marginRight: 6,
//   },
//   originalPrice: {
//     color: "rgba(255,255,255,0.5)",
//     fontSize: 12,
//     textDecorationLine: "line-through",
//   },
//   shopName: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 11,
//     marginBottom: 6,
//   },
//   ratingRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   ratingText: {
//     color: "white",
//     fontSize: 11,
//     fontWeight: "600",
//     marginLeft: 4,
//   },
//   buyButton: {
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   buyGradient: {
//     paddingVertical: 8,
//     alignItems: "center",
//   },
//   buyText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   waitlistButton: {
//     backgroundColor: "rgba(255,255,255,0.1)",
//     paddingVertical: 8,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   waitlistText: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   // Smart Bottom Nav
//   bottomNavContainer: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//   },
//   bottomNav: {
//     paddingBottom: Platform.OS === "ios" ? 25 : 10,
//   },
//   navContent: {
//     flexDirection: "row",
//     paddingVertical: 10,
//     paddingHorizontal: 8,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 6,
//   },
//   navIconContainer: {
//     position: "relative",
//   },
//   cartBadge: {
//     position: "absolute",
//     top: -6,
//     right: -6,
//     zIndex: 1,
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   cartBadgeGradient: {
//     width: 16,
//     height: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cartBadgeText: {
//     color: "white",
//     fontSize: 9,
//     fontWeight: "700",
//   },
//   navLabel: {
//     fontSize: 10,
//     color: "rgba(255,255,255,0.6)",
//     marginTop: 4,
//     fontWeight: "600",
//   },
//   specialNavItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 2,
//   },
//   createButton: {
//     borderRadius: 22,
//     overflow: "hidden",
//   },
//   createGradient: {
//     width: 44,
//     height: 44,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   createLabel: {
//     color: "#F7DC6F",
//     fontSize: 10,
//     fontWeight: "600",
//     marginTop: 4,
//   },
// })
