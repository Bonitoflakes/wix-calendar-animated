import { Pressable, StyleSheet, Text, type LayoutChangeEvent } from "react-native";

import { View } from "@/components/Themed";
import Step1 from "../../components/steps/Step1";
import Step2 from "../../components/steps/Step2";
import { useEffect, useRef, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  measure,
  runOnUI,
  useAnimatedRef,
  FadeIn,
  FadeOut,
  LinearTransition,
  FadeInDown,
  FadeOutDown,
  FadeInUp,
} from "react-native-reanimated";

const _layout = LinearTransition.springify().damping(500).stiffness(500);

export default function TabTwoScreen() {
  const [index, setIndex] = useState(0);
  // const height = useSharedValue<null | number>(null);
  // const stepRef = useAnimatedRef();

  // useEffect(() => {
  //   runOnUI(() => {
  //     const measured = measure(stepRef);

  //     console.log("🚀🚀🚀 ~ runOnUI ~ measured:", measured);

  //     if (measured) {
  //       height.value = withTiming(measured.height, { duration: 300 });
  //     }
  //   })();
  // }, [index]);

  // const animatedStyle = useAnimatedStyle(() => ({
  //   height: height.value,
  // }));

  const [paddingTop, setPaddingTop] = useState(0);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const toggleCalendarModal = () => setShowCalendarModal((p) => !p);
  const hideCalendarModal = () => {
    setShowCalendarModal(false);
    setIndex(0);
  };

  const onNext = () => setIndex((prev) => Math.min(prev + 1, 1));
  const onBack = () => setIndex((prev) => Math.max(prev - 1, 0));

  return (
    <View style={styles.container}>
      <Pressable
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderWidth: 1,
          margin: 20,
        }}
        onPress={toggleCalendarModal}
        onLayout={(e) => {
          console.log(e.nativeEvent.layout, "onLayout");
          setPaddingTop(e.nativeEvent.layout.y);
        }}
      >
        <Text style={{ fontSize: 20 }}>Open Calendar</Text>
      </Pressable>

      <Animated.View
        style={[styles.stepWrapper]}
        entering={FadeInUp.duration(250)}
        layout={_layout}
      >
        <Animated.View
          // ref={stepRef}
          layout={_layout}
        >
          {index === 0 && <Step1 onNext={onNext} onBack={onBack} />}
          {index === 1 && <Step2 onNext={onNext} onBack={onBack} />}
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "green",
    padding: 20,
  },
  stepWrapper: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    width: "100%",
  },
});
