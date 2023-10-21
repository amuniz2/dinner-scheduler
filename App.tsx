import React from 'react';
import { StatusBar, StyleSheet} from 'react-native';
import { MealState } from './components/interfaces/MealProps';
import { DATA } from './data/data';
import { MealList, MealListProps1 } from './components/meal/MealList';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  AsyncStorage.getAllKeys();
  const mealsFromData: {[name: string]: MealState} = {};
  DATA.forEach((mealProps) => {
    mealsFromData[mealProps.name] = {...mealProps, inEditMode: false};
  });
  return (<MealList meals={mealsFromData} />);
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

