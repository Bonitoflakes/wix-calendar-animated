import React from "react";
import { Pressable, Text } from "react-native";

const Title = ({ title }: { title: string }) => {
  return (
    <Pressable onPress={() => console.log("Custom Header Pressed")}>
      <Text>{title}</Text>
    </Pressable>
  );
};

export default React.memo(Title);
