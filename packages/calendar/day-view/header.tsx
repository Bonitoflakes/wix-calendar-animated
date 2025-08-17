import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useCalendar } from '../calendar-context';

const Header = ({ title }: { title: string }) => {
  const { incrementStep } = useCalendar();
  return (
    <Pressable onPress={incrementStep}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 700,
  },
});

export default React.memo(Header);
