import { View, StyleSheet } from "react-native";
import React, { useState, useMemo, useCallback, type FC } from "react";
import { YearHeader } from "./header";
import { YearGrid } from "./grid";
import { useCalendar } from "../calendar-context";

type YearProps = {
  disabledFromYear?: number;
  yearsPerPage?: number;
};

const START_YEAR = 1970;
const END_YEAR = 2100;
const COLUMN_COUNT = 3;
const TOTAL_YEARS = END_YEAR - START_YEAR + 1;

export const YearView: FC<YearProps> = React.memo(
  ({ disabledFromYear, yearsPerPage = 12 }) => {
    const { internalDate, updateInternalDate, decrementStep } = useCalendar();
    const currentYear = internalDate.getFullYear();

    const totalPages = Math.ceil(TOTAL_YEARS / yearsPerPage);
    const initialPage = Math.floor((currentYear - START_YEAR) / yearsPerPage);

    const [page, setPage] = useState(initialPage);

    // Create an array of years for the current page.
    const years = useMemo(() => {
      // start = 1970 + (10 * 12) = 1970 + 120 = 2090
      // end = 2090 + 12 - 1 = min(2101, 2100) = 2100
      const start = START_YEAR + page * yearsPerPage;
      const end = Math.min(start + yearsPerPage - 1, END_YEAR);

      const data = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      const remainder = data.length % COLUMN_COUNT;

      if (remainder !== 0) {
        const padding = Array(COLUMN_COUNT - remainder).fill(null);
        data.push(...padding);
      }

      return data;
    }, [page, yearsPerPage]);

    const handlePrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);

    const handleNext = useCallback(
      () => setPage((p) => Math.min(totalPages - 1, p + 1)),
      [totalPages]
    );

    const handleYearSelect = (year: number) => {
      if (disabledFromYear !== undefined && year >= disabledFromYear) {
        return;
      }
      const newDate = new Date(internalDate);
      newDate.setFullYear(year);
      updateInternalDate(newDate);
      decrementStep();
    };

    return (
      <View style={styles.container}>
        <YearHeader
          page={page}
          totalPages={totalPages}
          years={years}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
        <YearGrid
          years={years}
          currentYear={currentYear}
          disabledFromYear={disabledFromYear}
          handleYearSelect={handleYearSelect}
        />
      </View>
    );
  }
);

YearView.displayName = "YearView";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
  },
});
