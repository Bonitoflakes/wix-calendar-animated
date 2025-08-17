import { type FC, type ReactNode } from 'react';
import {
  Modal as RNModal,
  Pressable,
  type PressableProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from 'react-native';

import { CalendarProvider, useCalendar } from './calendar-context';
import { DayView } from './day-view';
import { MonthView } from './month-view';
import { YearView } from './year-view';

export const Root: FC<{
  children: ReactNode;
  onChange?: (date: Date) => void;
  value?: Date;
}> = ({ children, ...props }) => {
  return <CalendarProvider {...props}>{children}</CalendarProvider>;
};

type TriggerProps = {
  children?: ReactNode;
  pressableProps?: PressableProps;
  pressableStyle?: ViewStyle;
  renderItem?: (value: Date | undefined) => ReactNode;
};

export const Trigger: FC<TriggerProps> = ({
  children,
  renderItem,
  pressableProps,
}) => {
  const { toggleModal, value } = useCalendar();

  return (
    <Pressable
      onPress={(e) => {
        if (pressableProps?.onPress) pressableProps.onPress(e);
        toggleModal();
      }}
      {...pressableProps}
    >
      {renderItem ? renderItem(value) : children}
    </Pressable>
  );
};

export const Modal: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { isOpen, toggleModal, resetInternals } = useCalendar();
  return (
    <RNModal
      visible={isOpen}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={() => {
        resetInternals();
        toggleModal();
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          resetInternals();
          toggleModal();
        }}
      >
        <View
          style={{
            padding: 20,
            flex: 1,
            width: '100%',
            backgroundColor: '0 2px 8px rgba(0, 0, 0, 0.5)',
            paddingTop: 200,
          }}
        >
          <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export const Content: FC = () => {
  const { step, isOpen } = useCalendar();

  if (!isOpen) return null;

  return (
    <TouchableWithoutFeedback>
      <View style={styles.content}>
        {step === 1 && <DayView />}
        {step === 2 && <MonthView />}
        {step === 3 && <YearView />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
});
