import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  type View as TView,
  TouchableWithoutFeedback,
} from "react-native";
import { useLayoutEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { View, Text } from "@/components/Themed";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  SlideInDown,
  withTiming,
  type EasingFunction,
  SlideInUp,
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
  const animatedHeight = useSharedValue<number>(0);
  const [index, setIndex] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const containerRef = useRef<null | TView>(null);
  const buttonRef = useRef<null | TView>(null);

  const toggleCalendarModal = () => setShowCalendarModal((p) => !p);
  const hideCalendarModal = () => {
    setShowCalendarModal(false);
    setIndex(0);
  };

  const onNext = () => setIndex((prev) => Math.min(prev + 1, 4));
  const onBack = () => setIndex((prev) => Math.max(prev - 1, 0));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height:
        Platform.OS === "ios"
          ? withSpring(animatedHeight.value, ANIMATION_CONFIGS)
          : withTiming(animatedHeight.value, {
              duration: ANIMATION_DURATION,
              easing: ANIMATION_EASING,
            }),
    };
  });

  useLayoutEffect(() => {
    buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      console.log(`{"===height": ${height}, "width": ${width}, "x": ${x}, "y": ${y}}`);
      console.log(`UseLayoutEffect: PageX:${pageX} PageY:${pageY} `);
      // setPaddingTop(pageY);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "pink" }}>
      <Pressable
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderWidth: 1,
          marginHorizontal: 20,
        }}
        onPress={toggleCalendarModal}
        onLayout={(e) => {
          console.log(e.nativeEvent.layout, "onLayout");
          setPaddingTop(e.nativeEvent.layout.y);
        }}
        ref={buttonRef}
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
              paddingTop,
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.0)",
            }}
          >
            <Animated.View
              style={[styles.parentView]}
              entering={SlideInUp}
              // className={}
            >
              <Animated.View style={[styles.animatedBox, animatedStyle]}>
                <Animated.View
                  style={styles.animatedView}
                  key={`step_${index}`}
                  entering={FadeIn}
                  exiting={FadeOut.duration(100)}
                  ref={containerRef}
                  onLayout={(e) => {
                    const measuredHeight = e.nativeEvent.layout.height;
                    // console.log(
                    //   "🚀🚀🚀 ~ TabOneScreen ~ measuredHeight:",
                    //   measuredHeight
                    // );
                    animatedHeight.value = measuredHeight;
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
    paddingHorizontal: 20,
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
