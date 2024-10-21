import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  PixelRatio,
  RefreshControl,
  ScrollView,
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
import { Heart, MessageCircle, Share } from "~/lib/icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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
  const likeCount = useRef(new Animated.Value(1200)).current;
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

    Animated.timing(likeCount, {
      toValue: liked ? 1200 : 1201,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [liked, likeScale, likeCount]);

  const handleDoubleTap = useCallback((x: number, y: number) => {
    if (!liked) {
      toggleLike();
    }
    setHeartPosition({ x, y });
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
  }, [liked, toggleLike, heartOpacity, heartScale, heartRotation]);

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart((event) => {
      runOnJS(handleDoubleTap)(event.x, event.y);
    });

  const singleTapGesture = Gesture.Tap().onStart(() => {
    // Handle single tap if needed
  });

  const gestures = Gesture.Exclusive(doubleTapGesture, singleTapGesture);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gestures}>
        <View className="flex-col justify-center h-[80vh] gap-8 px-6 bg-background">
          <View className="flex-row items-center justify-between">
            <Avatar className="w-12 h-12" alt={name}>
              <AvatarImage
                source={{
                  uri: avatarUrl,
                }}
              />
              <AvatarFallback>
                <Text>{name.charAt(0)}</Text>
              </AvatarFallback>
            </Avatar>
            <View className="items-end">
              <Text
                style={{
                  fontSize: getFontSize(14),
                  lineHeight: getLineHeight(14),
                  fontWeight: "bold",
                }}
              >
                {name}
              </Text>
              <Text
                style={{ fontSize: getFontSize(12), lineHeight: getLineHeight(12) }}
                className="text-muted-foreground"
              >
                @{username} • 2h ago
              </Text>
            </View>
          </View>

          <Card className="bg-background max-h-[50%]">
            <ScrollView>
              <CardHeader>
                <CardTitle
                  style={{
                    fontSize: getFontSize(28),
                    lineHeight: getLineHeight(28),
                  }}
                >
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text
                  style={{
                    fontSize: getFontSize(18),
                    lineHeight: getLineHeight(18),
                  }}
                >
                  {content}
                </Text>
              </CardContent>
            </ScrollView>
          </Card>

          <View className="flex-row justify-between mb-10">
            <ActionButton
              icon={
                <Animated.View style={{ transform: [{ scale: likeScale }] }}>
                  <Heart
                    size={getFontSize(24)}
                    className={liked ? "text-red-500" : colorScheme === 'dark' ? "text-gray-300" : "text-gray-700"}
                  />
                </Animated.View>
              }
              count={likeCount}
              onPress={toggleLike}
            />
            <ActionButton
              icon={
                <MessageCircle size={getFontSize(24)} className="text-foreground" />
              }
              count={234}
            />
            <ActionButton
              icon={<Share size={getFontSize(24)} className="text-foreground" />}
              count={856}
            />
          </View>
          <Animated.View
            style={{
              position: 'absolute',
              left: heartPosition.x - 25,
              top: heartPosition.y - 25,
              opacity: heartOpacity,
              transform: [
                { scale: heartScale },
                {
                  translateY: heartScale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -50]
                  })
                },
                {
                  rotate: heartRotation.interpolate({
                    inputRange: [-20, 20],
                    outputRange: ['-20deg', '20deg']
                  })
                }
              ],
            }}
          >
            <Heart size={50} fill="#ff6b6b" stroke="none" />
          </Animated.View>
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
  count: number | Animated.Value;
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
    <TouchableOpacity className="flex-row items-center gap-2 p-2" onPress={onPress}>
      {icon}
      <Animated.Text
        className="text-foreground"
        style={{
          fontSize: getFontSize(14),
          lineHeight: getLineHeight(14),
        }}
      >
        {count}
      </Animated.Text>
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
      snapToAlignment="start"
      decelerationRate="fast"
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
