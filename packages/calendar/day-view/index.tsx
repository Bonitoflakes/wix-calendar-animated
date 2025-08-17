import { format } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar, type DateData } from 'react-native-calendars';
import type { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import type { Direction, MarkedDates } from 'react-native-calendars/src/types';

import { useCalendar } from '../calendar-context';
import CustomArrow from './arrows';
import CustomDay, { type CustomDayProps } from './day';
import Header from './header';
import { calendarThemeOverride } from './theme';

export const DayView = () => {
  const {
    draftDate,
    updateDraftDate,
    setSelectedDate,
    selectedDate,
    onChange,
    toggleModal,
    resetInternals,
  } = useCalendar();

  const headerTitle = format(draftDate, 'MMMM yyyy');
  const currentDateString = format(draftDate, 'yyyy-MM-dd');

  // enable confirm button only on successful day selection.
  const [isDisabled, setIsDisabled] = useState(true);

  const handleMonthChange = useCallback(
    (data: DateData) => {
      console.log('~ handleMonthChange:', data);
      const newDate = new Date(data.dateString);
      updateDraftDate(newDate);
    },
    [updateDraftDate]
  );

  const handleDayPress = useCallback(
    (data: DateData) => {
      const { dateString } = data;
      console.log('~ handleDayPress:', dateString);
      const newDate = new Date(dateString);
      setSelectedDate(newDate);
      updateDraftDate(newDate);
      setIsDisabled(false);
    },
    [updateDraftDate, setSelectedDate]
  );

  const handleConfirm = () => {
    toggleModal();
    // save global state.
    if (onChange && selectedDate) {
      onChange(selectedDate);
    }
    // reset internal state.
    resetInternals();
  };

  const handleCancel = () => {
    toggleModal();
    // reset internal state.
    resetInternals();
  };

  const renderArrow = useCallback(
    (direction: Direction) => <CustomArrow direction={direction} />,
    []
  );

  const renderDay = useCallback(
    (data: CustomDayProps) => <CustomDay {...data} />,
    []
  );

  const markedDate = useMemo<MarkedDates>(() => {
    const formatOptions: MarkingProps = {
      selected: true,
      selectedColor: 'blue',
    };
    const formattedDate = selectedDate
      ? format(selectedDate, 'yyyy-MM-dd')
      : '';

    return {
      [formattedDate]: formatOptions,
    };
  }, [selectedDate]);

  return (
    <View>
      <Calendar
        enableSwipeMonths={false}
        hideExtraDays
        markedDates={markedDate}
        onDayPress={handleDayPress}
        current={currentDateString}
        renderArrow={renderArrow}
        onMonthChange={handleMonthChange}
        dayComponent={renderDay}
        customHeaderTitle={<Header title={headerTitle} />}
        disableAllTouchEventsForDisabledDays
        testID="day-view"
        theme={calendarThemeOverride}
        maxDate="2100-12-31"
        minDate="1970-01-01"
      />

      <View style={styles.buttonContainer}>
        <Pressable onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>

        <Pressable
          onPress={handleConfirm}
          style={[
            styles.confirmButton,
            isDisabled && {
              opacity: 0.5,
            },
          ]}
          disabled={isDisabled}
        >
          <Text style={styles.confirmText}>Set Date</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#0400D1',
    borderRadius: 8,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#0466C833',
    borderRadius: 8,
  },
  confirmText: {
    color: 'white',
  },
  cancelText: {
    color: '#0466C8',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    gap: 16,
  },
});
