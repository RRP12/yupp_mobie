import React, { useRef, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import { LegendList } from "@legendapp/list";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from 'expo-av';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

// Mock data for UI/UX demo
const demoAccounts = [
  {
    username: "skincarequeen",
    reels: [
      {
        url: "https://res.cloudinary.com/dnrjvekqn/video/upload/v1750619994/reels/1750619992513-demovideo.mp4",
        thumbnail: "https://res.cloudinary.com/dnrjvekqn/image/upload/v1750619992/images/1750619990214-img-%281%29.png",
        caption: "Transform your skin with our premium serum!",
        likes: 123,
        views: 4567,
        saves: 32,
        _id: "1",
      },
      {
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail: "https://placekitten.com/400/800",
        caption: "Get glowing with this hack!",
        likes: 99,
        views: 2000,
        saves: 11,
        _id: "2",
      }
    ]
  },
  {
    username: "fashionguru",
    reels: [
      {
        url: "https://www.w3schools.com/html/movie.mp4",
        thumbnail: "https://placekitten.com/401/800",
        caption: "OOTD: Summer Edition!",
        likes: 321,
        views: 7890,
        saves: 45,
        _id: "3",
      }
    ]
  }
];

const DemoReelVideo = ({ videoUri, isVisible, isPaused, onPress }) => (
  <TouchableOpacity activeOpacity={1} onPress={onPress} style={{ width: screenWidth, height: screenHeight }}>
    <Video
      source={{ uri: videoUri }}
      style={{ width: "100%", height: "100%", position: "absolute", backgroundColor: "black" }}
      resizeMode={ResizeMode.COVER}
      isLooping
      shouldPlay={isVisible && !isPaused}
      isMuted={!isVisible || isPaused}
    />
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    />
    {isPaused && (
      <View style={{ position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -25 }, { translateY: -25 }] }}>
        <BlurView intensity={30} style={{ borderRadius: 25, padding: 15 }}>
          <Ionicons name="play" size={24} color="white" />
        </BlurView>
      </View>
    )}
  </TouchableOpacity>
);

export default function ReelsDemoUI() {
  const [accountIndex, setAccountIndex] = useState(0);
  const [reelIndexes, setReelIndexes] = useState({}); // { [accountIndex]: reelIndex }
  const [paused, setPaused] = useState({}); // { [accountIndex]: { [reelIndex]: boolean } }

  // Handlers for vertical (accounts) and horizontal (reels) swipes
  const onAccountViewable = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setAccountIndex(viewableItems[0].index);
    }
  }).current;
  const onReelViewable = useRef((accountIdx) => ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setReelIndexes(prev => ({ ...prev, [accountIdx]: viewableItems[0].index }));
    }
  }).current;

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <LegendList
        data={demoAccounts}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        estimatedItemSize={screenHeight}
        onViewableItemsChanged={onAccountViewable}
        renderItem={({ item: account, index: accIdx }) => {
          const reelIndex = reelIndexes[accIdx] || 0;
          return (
            <View style={{ height: screenHeight, width: screenWidth }}>
              {/* Username overlay */}
              <View style={{ position: "absolute", top: 60, left: 20, zIndex: 10 }}>
                <BlurView intensity={20} style={{ borderRadius: 16, padding: 8 }}>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>{account.username}</Text>
                </BlurView>
              </View>
              <LegendList
                data={account.reels}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                estimatedItemSize={screenWidth}
                onViewableItemsChanged={onReelViewable(accIdx)}
                renderItem={({ item: reel, index: reelIdx }) => (
                  <View key={reel._id} style={{ height: screenHeight, width: screenWidth }}>
                    <DemoReelVideo
                      videoUri={reel.url}
                      isVisible={accountIndex === accIdx && reelIndex === reelIdx}
                      isPaused={paused[accIdx]?.[reelIdx]}
                      onPress={() => setPaused(prev => ({ ...prev, [accIdx]: { ...prev[accIdx], [reelIdx]: !prev[accIdx]?.[reelIdx] } }))}
                    />
                    {/* Caption and stats overlays */}
                    <View style={{ position: "absolute", bottom: 120, left: 20, right: 80 }}>
                      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>{account.username}</Text>
                      <Text style={{ color: "white", fontSize: 14, marginTop: 4, lineHeight: 20 }}>{reel.caption}</Text>
                    </View>
                    <View style={{ position: "absolute", right: 15, bottom: 200 }}>
                      {[{ icon: "heart", count: reel.likes }, { icon: "bookmark", count: reel.saves }].map((action, idx) => (
                        <View key={idx} style={{ marginBottom: 25, alignItems: 'center' }}>
                          <BlurView intensity={20} style={{ padding: 12, borderRadius: 30 }}>
                            <LinearGradient colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]} style={{ padding: 8, borderRadius: 30 }}>
                              <Ionicons name={action.icon as any} size={24} color="white" />
                            </LinearGradient>
                          </BlurView>
                          <Text style={{ color: "white", fontSize: 11, textAlign: "center", marginTop: 4 }}>{action.count}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={{ position: "absolute", top: 80, left: 20 }}>
                      <BlurView intensity={30} tint="dark" style={{ borderRadius: 20, padding: 8 }}>
                        <LinearGradient colors={["#FF4500", "#FF0080"]} style={{ borderRadius: 20, padding: 6 }}>
                          <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>{reel.views} 👁️ VIEWS</Text>
                        </LinearGradient>
                      </BlurView>
                    </View>
                  </View>
                )}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
