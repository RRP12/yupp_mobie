import { Ionicons } from "@expo/vector-icons"
import MaskedView from "@react-native-masked-view/masked-view"
import { BlurView } from "expo-blur"
import { LinearGradient } from "expo-linear-gradient"
import React, { useRef } from "react"
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

const { height } = Dimensions.get("window")
const VIDEO_HEIGHT = height * 0.62

const renderPremiumVideoCard = (video: any, index: number) => {
  const breatheAnim = useRef(new Animated.Value(1))?.current

  return (
    <View key={video.id} style={styles.premiumVideoContainer}>
      {/* Video Player with Glass Morphism */}

      {/* {console.log("video.thumbnail", video)} */}
      <View style={styles.premiumVideoPlayer}>
        <Image
          source={{ uri: video?.thumbnail }}
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
            {video?.products?.map((product, productIndex) => (
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

export default renderPremiumVideoCard
