import React from 'react';
import { StatusBar, StyleSheet} from 'react-native';
import { MealList } from './components/meal/MealList';

export default function App() {  
  return (<MealList />);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '##D4E6F1',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  description: {
    fontSize: 16
  }
});

