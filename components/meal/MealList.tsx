import React from "react";
import { FlatList, SafeAreaView, Text, StatusBar, StyleSheet, Task, ActivityIndicator, View } from "react-native";
import { BaseMealProps, MealProps, MealState, MealsState, SerializedMeal } from '../interfaces/MealProps';
import {Meal } from './Meal';
import {DATA, defaultProps} from '../../data/data';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMealService, MealService } from "../interfaces/meal.service";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import ErrorBoundary from "../ErrorBoundary";


export class MealList extends React.Component<{}, MealsState> {

  private mealService: IMealService;

  constructor(props: any, mealService: IMealService) {
    super(props);
    const initialState:MealsState = { loading: false, meals: {} };
    this.mealService = new MealService();
    const defaultMeals = this.mealService.getDefaultMeals();
    
    defaultMeals.forEach((meal) => {
      initialState.meals[meal.name] = {
        ...meal,
        inEditMode: false
      };
    });

    this.state = initialState;

  }

  componentDidMount(): void {
    
    this.initializeMeals().then((newState) => {
      alert('initialized meals');
      this.setState({...newState});
      return newState;
    }).catch((e) => alert(`exception ${e}`));
  }

  loadDataFromStorage = async (keys: readonly string[]): Promise<MealsState> => {
  
    const dataRead = await AsyncStorage.multiGet(keys);
    if(!dataRead) {
      console.log('NO data read!');
      return { loading: false, meals: {}};
    }
    const mealsState: MealsState = {
      loading: true,
      meals: {}
    };

    console.log(`data read: ${dataRead}`);

    new Date()
    dataRead.forEach(kvp => {
      const key = kvp[0];
      const value = kvp[1] ?? "";

      if (key != null && value != null) {
        const name: string = key;
        console.log(`reading: ${name}`);

        const meal: SerializedMeal = JSON.parse(value ? value : "");
        mealsState.meals[name] = {
          ...meal,
          lastDateServed: meal.lastDateServed ? new Date(meal.lastDateServed) : undefined,
          nextDate: meal.nextDate ? new Date(meal.nextDate) : undefined,
          inEditMode: false
        }
        return mealsState;
      }
    })

    return {loading: false, meals: mealsState.meals};
    
  }

  
  initializeMeals = async (): Promise<MealsState> => {
    try {

      const emptyState: MealsState = {
        loading: true,
        meals: {}
      };
      const keys = await AsyncStorage.getAllKeys();
      if (!keys || keys.length === 0) {
        const allKeys: string[] = [];

        alert("no keys read");
        
        let dataToStore2: [string, string][] = [];
        DATA.forEach((item: BaseMealProps) => {
          dataToStore2.push([item.name,  JSON.stringify(item)]);
          allKeys.push(item.name);
        });
        //await this.loadDataFromStorage(allKeys);

        AsyncStorage.multiSet(dataToStore2, async () => {
          //todo: update state with data just read
            return await this.loadDataFromStorage(allKeys);
        });
        
      } else {
        try {
          return await this.loadDataFromStorage(keys);
        }
        catch(e) {
          alert('exception loading from storage');
        }
      }

    } catch(e) {
      // read key error
      console.log(`exception getting or setting all keys ${e}`);
    }
    return { loading: false, meals: {}};
  }


  onMealUpdated = (prevMealName: string, newMealProps: BaseMealProps) => {

      let meals = {...this.state.meals};
      const newState = {...newMealProps, inEditMode: false};
      if (prevMealName) {
        meals[prevMealName] = newState;
      } else {
        meals[newMealProps.name] = newState;
      }
      this.save(newMealProps);
      this.setState( {meals: {...meals}}); 
    }


    save = (newProps: BaseMealProps): boolean=> {
      const serializedMeal = JSON.stringify(newProps)
      AsyncStorage.setItem(newProps.name, serializedMeal, () => {
      });
      return true;
    }

    getMealProperties(meal: MealState): BaseMealProps {
      return {
        description: meal.description,
        name: meal.name,
        error: meal.error,
        lastDateServed: meal.lastDateServed,
        nextDate: meal.nextDate
      };
    }
    render() {

        if (this.state.loading) {
          return (<ActivityIndicator></ActivityIndicator>);

        }
       const x = Object.values(this.state.meals);
        return (
          <SafeAreaView style={styles.container}>
          <Text>Meals</Text>
          <FlatList
            data={x}            
            renderItem =  {
              (meal) => {
                return (<View>          
                    <ErrorBoundary meal={this.getMealProperties(meal.item)}></ErrorBoundary>
                    <Meal meal={ this.getMealProperties(meal.item)} inEditMode={meal.item.inEditMode} saveMeal={this.onMealUpdated} ></Meal>
                </View>);
              }
            } 
          />
        </SafeAreaView>);
    }
    /*render() {return (
      <SafeAreaView style={styles.container}>
      <Text>Meals</Text>
      <Text>{JSON.stringify(Object.values(this.state.meals))}</Text>
    
    </SafeAreaView>);
      
    }*/
}

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

