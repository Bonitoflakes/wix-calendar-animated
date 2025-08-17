import type { Theme } from 'react-native-calendars/src/types';

export const calendarThemeOverride: Theme = {
  // @ts-expect-error // * the type of this library is not correctly inferred
  'stylesheet.calendar.main': {
    container: {
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 8,
    },
    week: {
      marginTop: 10 * 1.5,
      gap: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
  'stylesheet.calendar.header': {
    header: {
      // paddingHorizontal: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    week: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: 10,
    },
    dayHeader: {
      marginTop: 2,
      flex: 1,
      textAlign: 'center',
      fontSize: 15,
      fontFamily: 'Lato',
      fontWeight: 700,
      color: '#5A5A5A',
      // backgroundColor: "pink",
      // borderWidth: 1,
    },
  },
  arrowStyle: {
    backgroundColor: '#F2F2F5',
    padding: 0,
    width: 36,
    height: 36,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
