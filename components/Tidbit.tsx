import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  PixelRatio,
  RefreshControl,
  TouchableOpacity,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import Svg, { LinearGradient, Path, Stop } from "react-native-svg";
import { Heart, MessageCircle, Share } from "~/lib/icons";
import { abbreviateNumber } from "~/lib/utils";
import ContentSlider from "./ContentSlider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Text } from "./ui/text";

const Tidbit = ({
  title = "Interesting Fact",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  name = "AI_Insights",
  username = "ai_insights",
  avatarUrl = "https://avatars.githubusercontent.com/u/88842870?v=4",
}) => {
  const fontScale = PixelRatio.getFontScale();
  const getFontSize = (size: number) => size / fontScale;
  const getLineHeight = (fontSize: number) => {
    if (fontSize <= 16) return fontSize * 1.5;
    if (fontSize <= 20) return fontSize * 1.4;
    if (fontSize <= 30) return fontSize * 1.2;
    return fontSize;
  };

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1249);
  const likeScale = useRef(new Animated.Value(1)).current;
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  const heartOpacity = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(0)).current;
  const heartRotation = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  const toggleLike = useCallback(() => {
    setLiked((prev) => !prev);
    const randomScale = 1.1 + Math.random() * 0.2; // Random scale between 1.1 and 1.3
    Animated.spring(likeScale, {
      toValue: randomScale,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(likeScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    });

    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  }, [liked, likeScale]);

  const handleDoubleTap = useCallback(
    (x: number, y: number) => {
      if (!liked) {
        toggleLike();
      }
      setHeartPosition({ x, y: y - 390 });
      heartOpacity.setValue(0);
      heartScale.setValue(0);
      heartRotation.setValue(0);

      const randomRotation = Math.random() * 40 - 20; // Random rotation between -20 and 20 degrees
      const randomDuration = 800 + Math.random() * 400; // Random duration between 800ms and 1200ms

      Animated.parallel([
        Animated.spring(heartScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(heartRotation, {
          toValue: randomRotation,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.spring(heartOpacity, {
            toValue: 1,
            friction: 10,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.timing(heartOpacity, {
            toValue: 0,
            duration: randomDuration,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    },
    [liked, toggleLike, heartOpacity, heartScale, heartRotation]
  );

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart((event) => {
      runOnJS(handleDoubleTap)(event.x, event.y);
    });

  const singleTapGesture = Gesture.Tap().onStart(() => {
    // Handle single tap if needed
  });

  const gestures = Gesture.Exclusive(doubleTapGesture, singleTapGesture);

  const GradientHeart = () => (
    <Svg width="50" height="50" viewBox="0 0 24 24" fill="none">
      <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#FF6B6B" stopOpacity="1" />
        <Stop offset="1" stopColor="#FFA07A" stopOpacity="1" />
      </LinearGradient>
      <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="url(#grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gestures}>
        <View className="flex-col justify-between px-5 bg-background">
          <View className="max-h-full ">
            <Text
              className="font-bold"
              style={{
                fontSize: getFontSize(28),
                lineHeight: getLineHeight(28),
              }}
            >
              {title}
            </Text>
            <ContentSlider text={content} />
            {/* <Text
              style={{
                fontSize: getFontSize(18),
                lineHeight: getLineHeight(18),
              }}
            >
              {content}
            </Text> */}
          </View>

          <View className="flex flex-row items-center justify-between">
            <View className="flex-row items-center gap-5">
              <Avatar className="w-16 h-16" alt={name}>
                <AvatarImage
                  source={{
                    uri: avatarUrl,
                  }}
                />
                <AvatarFallback>
                  <Text>
                    {name.charAt(0).toUpperCase() +
                      name.charAt(2).toUpperCase()}
                  </Text>
                </AvatarFallback>
              </Avatar>
              <View className="items-start">
                <Text
                  style={{
                    fontSize: getFontSize(16),
                    lineHeight: getLineHeight(16),
                    fontWeight: "bold",
                  }}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    fontSize: getFontSize(14),
                    lineHeight: getLineHeight(14),
                  }}
                  className="text-muted-foreground"
                >
                  @{username} • 2h ago
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-center mb-10 mr-2">
              <ActionButton
                icon={
                  <Animated.View style={{ transform: [{ scale: likeScale }] }}>
                    <Heart
                      size={getFontSize(22)}
                      className={
                        liked
                          ? "text-red-500"
                          : colorScheme === "dark"
                            ? "text-gray-300"
                            : "text-gray-700"
                      }
                    />
                  </Animated.View>
                }
                count={likeCount}
                onPress={toggleLike}
              />
              <ActionButton
                icon={
                  <MessageCircle
                    size={getFontSize(28)}
                    className="text-foreground"
                  />
                }
                count={234}
              />
              <ActionButton
                icon={
                  <Share size={getFontSize(28)} className="text-foreground" />
                }
                count={856}
              />
            </View>
            <Animated.View
              style={{
                position: "absolute",
                left: heartPosition.x - 25,
                top: heartPosition.y - 25,
                opacity: heartOpacity,
                transform: [
                  { scale: heartScale },
                  {
                    translateY: heartScale.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -80],
                    }),
                  },
                  {
                    rotate: heartRotation.interpolate({
                      inputRange: [-20, 20],
                      outputRange: ["-20deg", "20deg"],
                    }),
                  },
                ],
              }}
            >
              <GradientHeart />
            </Animated.View>
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const ActionButton = ({
  icon,
  count,
  onPress,
}: {
  icon: React.ReactNode;
  count: number;
  onPress?: () => void;
}) => {
  const fontScale = PixelRatio.getFontScale();
  const getFontSize = (size: number) => size / fontScale;
  const getLineHeight = (fontSize: number) => {
    if (fontSize <= 16) return fontSize * 1.5;
    if (fontSize <= 20) return fontSize * 1.4;
    if (fontSize <= 30) return fontSize * 1.2;
    return fontSize;
  };

  return (
    <TouchableOpacity
      className="flex-col items-center gap-2 p-2"
      onPress={onPress}
    >
      {icon}
      <Text
        className="text-foreground"
        style={{
          fontSize: getFontSize(12),
          lineHeight: getLineHeight(12),
        }}
      >
        {abbreviateNumber(count)}
      </Text>
    </TouchableOpacity>
  );
};

const Tidbits = ({
  tidbits,
}: {
  tidbits: {
    title: string;
    content: string;
    name: string;
    username: string;
    avatarUrl: string;
  }[];
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { height, width } = useWindowDimensions();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulating a refresh action
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = ({
    item,
  }: {
    item: {
      title: string;
      content: string;
      name: string;
      username: string;
      avatarUrl: string;
    };
  }) => {
    return (
      <View style={{ width, height }}>
        <Tidbit
          title={item.title}
          content={item.content}
          name={item.name}
          username={item.username}
          avatarUrl={item.avatarUrl}
        />
      </View>
    );
  };

  const renderFooter = () => {
    if (tidbits.length === 0) return null;
    return (
      <View
        style={{
          width,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Text>No more tidbits to show</Text>
      </View>
    );
  };

  return (
    <Animated.FlatList
      data={tidbits}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={height}
      disableIntervalMomentum
      snapToAlignment="start"
      decelerationRate={"fast"}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={tidbits.length > 0 ? renderFooter : null}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEventThrottle={16}
      onMomentumScrollEnd={(event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / height);
        scrollY.setValue(index * height);
      }}
    />
  );
};

export default Tidbits;
