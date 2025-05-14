import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { View, Text } from "@/components/Themed";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type EasingFunction,
} from "react-native-reanimated";

import Step1 from "@/components/steps/Step1";
import Step2 from "@/components/steps/Step2";
import Step3 from "@/components/steps/Step3";
import Month from "@/components/steps/Month";
import Year from "@/components/steps/Year";

const ANIMATION_EASING: EasingFunction = Easing.out(Easing.exp);
const ANIMATION_DURATION = 250;

const ANIMATION_CONFIGS_IOS = {
  damping: 500,
  stiffness: 1000,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 10,
  restSpeedThreshold: 10,
};

const ANIMATION_CONFIGS_ANDROID = {
  duration: ANIMATION_DURATION,
  easing: ANIMATION_EASING,
};

const ANIMATION_CONFIGS =
  Platform.OS === "ios" ? ANIMATION_CONFIGS_IOS : ANIMATION_CONFIGS_ANDROID;

export default function TabOneScreen() {
  const height = useSharedValue<number>(0);
  const [index, setIndex] = useState(0);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const toggleCalendarModal = () => setShowCalendarModal((p) => !p);
  const hideCalendarModal = () => setShowCalendarModal(false);

  const onNext = () => setIndex((prev) => Math.min(prev + 1, 4));
  const onBack = () => setIndex((prev) => Math.max(prev - 1, 0));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height:
        Platform.OS === "ios"
          ? withSpring(height.value, ANIMATION_CONFIGS)
          : withTiming(height.value, {
              duration: ANIMATION_DURATION,
              easing: ANIMATION_EASING,
            }),
    };
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "pink" }}>
      <Pressable
        style={{ paddingHorizontal: 20, paddingVertical: 10, borderWidth: 1, margin: 20 }}
        onPress={toggleCalendarModal}
      >
        <Text style={{ fontSize: 20 }}>Open Calendar</Text>
      </Pressable>

      <Modal
        transparent
        animationType="fade"
        visible={showCalendarModal}
        onRequestClose={hideCalendarModal}
        accessible={showCalendarModal}
      >
        <TouchableWithoutFeedback
          onPress={hideCalendarModal}
          accessible={showCalendarModal}
        >
          <View
            style={{
              paddingTop: 100,
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Text>asfda fasd fasdf asdf asd Ipsum</Text>
            <Text>asfda fasd fasdf asdf asd Ipsum</Text>
            <Text>asfda fasd fasdf asdf asd Ipsum</Text>
            <Text>asfda fasd fasdf asdf asd Ipsum</Text>

            <Animated.View style={[styles.parentView]}>
              <Animated.View style={[styles.animatedBox, animatedStyle]}>
                <Animated.View
                  style={styles.animatedView}
                  key={`step_${index}`}
                  entering={FadeIn}
                  // exiting={FadeOut.duration(100)}
                  onLayout={(e) => {
                    const measuredHeight = e.nativeEvent.layout.height;
                    console.log(
                      "🚀🚀🚀 ~ TabOneScreen ~ measuredHeight:",
                      measuredHeight
                    );
                    height.value = measuredHeight;
                  }}
                >
                  {index === 0 && <Step1 onNext={onNext} onBack={onBack} />}
                  {index === 1 && <Step2 onNext={onNext} onBack={onBack} />}
                  {index === 2 && <Step3 onNext={onNext} onBack={onBack} />}
                  {index === 3 && <Month onNext={onNext} onBack={onBack} />}
                  {index === 4 && <Year onNext={onNext} onBack={onBack} />}
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* <Animated.View style={[styles.parentView]}>
        <Animated.View style={[styles.animatedBox, animatedStyle]}>
          <Animated.View
            style={styles.animatedView}
            key={`step_${index}`}
            entering={FadeIn}
            exiting={FadeOut}
            onLayout={(e) => {
              const measuredHeight = e.nativeEvent.layout.height;
              console.log("🚀🚀🚀 ~ TabOneScreen ~ measuredHeight:", measuredHeight);
              height.value = measuredHeight;
            }}
          >
            {index === 0 && <Step1 onNext={onNext} onBack={onBack} />}
            {index === 1 && <Step2 onNext={onNext} onBack={onBack} />}
            {index === 2 && <Step3 onNext={onNext} onBack={onBack} />}
          </Animated.View>
        </Animated.View>
      </Animated.View> */}

      <Text>Lorem Ipsum</Text>
      <Text>Lorem Ipsum</Text>
      <Text>Lorem Ipsum</Text>
      <Text>Lorem Ipsum</Text>
      <Text>Lorem Ipsum</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parentView: {
    justifyContent: "flex-end",
    padding: 20,
    // backgroundColor: "black",
  },
  animatedBox: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  animatedView: {
    position: "absolute",
    width: "100%",
  },
});
