import React from "react";
import {
  PixelRatio,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Heart, MessageCircle, Share } from "~/lib/icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Text } from "./ui/text";

const Tidbit = ({
  title = "Interesting Fact",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
}) => {
  const { height } = useWindowDimensions();
  const fontScale = PixelRatio.getFontScale();
  const getFontSize = (size: number) => size / fontScale;
  const getLineHeight = (fontSize: number) => {
    if (fontSize <= 16) return fontSize * 1.5;
    if (fontSize <= 20) return fontSize * 1.4;
    if (fontSize <= 30) return fontSize * 1.2;
    return fontSize;
  };

  return (
    <View className="flex-col justify-center flex-1 px-6 bg-background">
      <View
        className="flex-row items-center justify-between"
        style={{ marginBottom: height * 0.05 }}
      >
        <Avatar className="w-12 h-12" alt="AI_readings">
          <AvatarImage
            source={{
              uri: "https://avatars.githubusercontent.com/u/88842870?v=4",
            }}
          />
          <AvatarFallback>
            <Text>AI</Text>
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
            AI_Insights
          </Text>
          <Text
            style={{ fontSize: getFontSize(12), lineHeight: getLineHeight(12) }}
            className="text-muted-foreground"
          >
            @ai_insights • 2h ago
          </Text>
        </View>
      </View>

      <Card
        className="pt-8 mb-5 bg-background"
        style={{ maxHeight: height * 0.5 }}
      >
        <ScrollView>
          <CardHeader className="py-0">
            <CardTitle
              style={{
                fontSize: getFontSize(28),
                lineHeight: getLineHeight(28),
              }}
            >
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
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

      <View
        className="flex-row justify-between"
        style={{ marginBottom: height * 0.1 }}
      >
        <ActionButton
          icon={<Heart size={getFontSize(24)} className="text-foreground" />}
          count="1.2K"
        />
        <ActionButton
          icon={
            <MessageCircle size={getFontSize(24)} className="text-foreground" />
          }
          count="234"
        />
        <ActionButton
          icon={<Share size={getFontSize(24)} className="text-foreground" />}
          count="856"
        />
      </View>
    </View>
  );
};

const ActionButton = ({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count: string;
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
    <TouchableOpacity className="flex-row items-center gap-2 p-2">
      {icon}
      <Text
        style={{ fontSize: getFontSize(14), lineHeight: getLineHeight(14) }}
      >
        {count}
      </Text>
    </TouchableOpacity>
  );
};

export default Tidbit;
