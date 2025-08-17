import { StyleSheet, View } from 'react-native';

import { YearItem } from './item';

type YearGridProps = {
  currentYear: number;
  disabledFromYear?: number;
  handleYearSelect: (year: number) => void;
  years: number[];
};

export const YearGrid = ({
  years,
  currentYear,
  disabledFromYear,
  handleYearSelect,
}: YearGridProps) => {
  return (
    <View style={styles.gridContainer}>
      {years.map((item, index) => {
        if (item === null) {
          return <View key={`empty-${index}`} style={styles.yearButton} />;
        }

        const isActive = currentYear === item;
        const disabled =
          disabledFromYear !== undefined && item >= disabledFromYear;

        return (
          <YearItem
            key={item}
            item={item}
            handleYearSelect={handleYearSelect}
            disabled={disabled}
            isActive={isActive}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    paddingTop: 20,
  },
  yearButton: {
    minWidth: 84,
    alignItems: 'center',
    padding: 10,
    flex: 1,
    borderRadius: 4,
  },
});
