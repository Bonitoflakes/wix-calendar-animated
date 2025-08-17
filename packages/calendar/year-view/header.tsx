import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type YearHeaderProps = {
  handleNext: () => void;
  handlePrev: () => void;
  page: number;
  totalPages: number;
  years: number[];
};

export const YearHeader = ({
  page,
  totalPages,
  years,
  handlePrev,
  handleNext,
}: YearHeaderProps) => {
  const validYears = years.filter((y) => y !== null);

  return (
    <View style={styles.headerContainer}>
      <Pressable
        onPress={handlePrev}
        disabled={page === 0}
        style={styles.headerArrow}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={page === 0 ? '#ccc' : '#222'}
        />
      </Pressable>

      <Text style={styles.headerTitle}>
        {validYears[0]} - {validYears[validYears.length - 1]}
      </Text>

      <Pressable
        onPress={handleNext}
        disabled={page === totalPages - 1}
        style={styles.headerArrow}
      >
        <Ionicons
          name="arrow-forward"
          size={24}
          color={page === totalPages - 1 ? '#ccc' : '#222'}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    width: '100%',
  },
  headerArrow: {
    backgroundColor: '#F2F2F5',
    padding: 0,
    width: 36,
    aspectRatio: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 700,
  },
});
