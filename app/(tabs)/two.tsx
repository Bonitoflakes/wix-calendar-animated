import { StyleSheet, type LayoutChangeEvent } from "react-native";

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
} from "react-native-reanimated";

export default function TabTwoScreen() {
  const [index, setIndex] = useState(0);
  const height = useSharedValue<null | number>(null);
  const stepRef = useAnimatedRef();

  useEffect(() => {
    runOnUI(() => {
      const measured = measure(stepRef);

      console.log("🚀🚀🚀 ~ runOnUI ~ measured:", measured);

      if (measured) {
        height.value = withTiming(measured.height, { duration: 300 });
      }
    })();
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const onNext = () => setIndex((prev) => Math.min(prev + 1, 1));
  const onBack = () => setIndex((prev) => Math.max(prev - 1, 0));

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.stepWrapper, animatedStyle]}>
        <Animated.View
          ref={stepRef}
          entering={FadeIn}
          exiting={FadeOut}
        >
          {index === 0 && <Step1 onNext={onNext} onBack={onBack} />}
          {index === 1 && <Step2 onNext={onNext} onBack={onBack} />}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    gap: 20,
    marginTop: "auto",
    justifyContent: "flex-end",
    overflow: "hidden",
    backgroundColor: "black",
  },
  stepWrapper: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 20,
    position: "absolute",
    width: "100%",
  },
});
