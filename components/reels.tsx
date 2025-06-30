import { Ionicons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import { Video, ResizeMode } from 'expo-av';
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

const screenHeight = Dimensions.get("window").height;

interface ReelsProps {
  ProductData: any;
}

const VideoComponent = ({ videoUri, isVisible, isPaused, onPress }: { videoUri: string, isVisible: boolean, isPaused: boolean, onPress: () => void }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ width: '100%', height: screenHeight }}>
        {videoUri ? (
          <Video
            source={{ uri: videoUri }}
            style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'black' }}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay={isVisible}
            isMuted={!isVisible}
          />
        ) : (
          <View style={{ width: '100%', height: '100%', backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>No Video</Text>
          </View>
        )}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
        {/* Play/Pause Indicator - overlay only when paused */}
        {isPaused && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateX: -25 }, { translateY: -25 }],
              zIndex: 10,
            }}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <BlurView intensity={30} style={{ borderRadius: 25, padding: 15 }}>
              <Ionicons name="play" size={24} color="white" />
            </BlurView>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function ReelsComponent({ ProductData }: ReelsProps) {

  console.log("ProductData",ProductData)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pausedIndexes, setPausedIndexes] = useState<{ [key: number]: boolean }>({});

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const visibleIndex = viewableItems[0].index;
      setCurrentIndex(visibleIndex);
      setPausedIndexes((prev) => {
        // Only keep the paused state for the current (visible) index
        return { [visibleIndex]: prev[visibleIndex] };
      });
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const togglePause = (index: number) => {
    setPausedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const media = item.media;
    const reel = media?.reels?.[0] || {};
    const videoUri = reel?.url || '';
    const thumbnail = reel?.thumbnail || media?.images?.[0] || '';
    const caption = reel?.caption || '';
    const likes = reel?.likes || 0;
    const views = reel?.views || 0;
    const saves = reel?.saves || 0;
    const postedAt = reel?.postedAt || '';
    const isPaused = pausedIndexes[index] ?? index !== currentIndex;

    return (
      <View key={item.id || index} style={{ height: screenHeight, width: '100%' }}>
        <VideoComponent
          videoUri={videoUri}
          isVisible={currentIndex === index && !isPaused}
          isPaused={isPaused}
          onPress={() => togglePause(index)}
        />
        {/* VIRAL Score */}
        <View style={{ position: "absolute", top: 80, left: 20 }}>
          <BlurView intensity={30} tint="dark" style={{ borderRadius: 20, padding: 8 }}>
            <LinearGradient colors={["#FF4500", "#FF0080"]} style={{ borderRadius: 20, padding: 6 }}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
                {views} 👁️ VIEWS
              </Text>
            </LinearGradient>
          </BlurView>
        </View>

        {/* Side Action Buttons */}
        <View style={{ position: "absolute", right: 15, bottom: 200 }}>
          {[
            { icon: "heart", count: likes },
            { icon: "bookmark", count: saves },
          ].map((action, idx) => (
            <TouchableOpacity key={idx} style={{ marginBottom: 25, alignItems: 'center' }}>
              <BlurView intensity={20} style={{ padding: 12, borderRadius: 30 }}>
                <LinearGradient colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]} style={{ padding: 8, borderRadius: 30 }}>
                  <Ionicons name={action.icon as any} size={24} color="white" />
                </LinearGradient>
              </BlurView>
              <Text style={{ color: "white", fontSize: 11, textAlign: "center", marginTop: 4 }}>
                {action.count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom User Info */}
        <View style={{ position: "absolute", bottom: 120, left: 20, right: 80 }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            {/* You can add a username field if available */}
          </Text>
          <Text style={{ color: "white", fontSize: 14, marginTop: 4, lineHeight: 20 }}>
            {caption}
          </Text>
        </View>

        {/* Play/Pause Indicator */}
        {isPaused && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateX: -25 }, { translateY: -25 }]
            }}
            onPress={() => togglePause(index)}
            activeOpacity={0.7}
          >
            <BlurView intensity={30} style={{ borderRadius: 25, padding: 15 }}>
              <Ionicons name="play" size={24} color="white" />
            </BlurView>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <LegendList
        data={ProductData?.data?.products || []}
        keyExtractor={(item: any, index: number) => `${item.id}-${index}`}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        estimatedItemSize={screenHeight}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        recycleItems
        bounces={false}
      />
    </View>
  );
}

