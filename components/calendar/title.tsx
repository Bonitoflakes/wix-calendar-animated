import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";

const Title = ({ title, incrementStep }: { title: string; incrementStep: () => void }) => {
  return (
    <Pressable onPress={incrementStep}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor:'#000',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "Lato",
    fontWeight: 700,
  },
});

export default React.memo(Title);
