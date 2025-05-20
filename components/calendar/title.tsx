import React from "react";
import { Pressable, Text } from "react-native";

const Title = ({ title, onNext }: { title: string; onNext: () => void }) => {
  return (
    <Pressable onPress={onNext}>
      <Text>{title}</Text>
    </Pressable>
  );
};

export default React.memo(Title);
