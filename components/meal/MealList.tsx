import React from "react";
import { FlatList, SafeAreaView, Text, StatusBar, StyleSheet, Task, ActivityIndicator, View, TouchableOpacity } from "react-native";
import { BaseMealProps, IconButtonProps, MealProps, MealState, MealsState, SerializedMeal } from '../interfaces/MealProps';
import {Meal } from './Meal';
import {DATA, defaultProps} from '../../data/data';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMealService, MealService } from "../interfaces/meal.service";
import ErrorBoundary from "../ErrorBoundary";
import  Icon  from 'react-native-vector-icons/SimpleLineIcons';


const AddIconButton = ({ onPress, icon }: IconButtonProps) => (
  <TouchableOpacity style={styles.addIcon} onPress={onPress}>
    {icon}
  </TouchableOpacity>
);
export class MealList extends React.Component<{}, MealsState> {

  private mealService: IMealService;

  constructor(props: any, mealService: IMealService) {
    super(props);
    const initialState:MealsState = { loading: false, meals: [] };
    this.mealService = new MealService();
    const defaultMeals = this.mealService.getDefaultMeals();
    
    defaultMeals.forEach((meal) => {
      initialState.meals.push(
        { 
          ...meal,
          inEditMode: false,
          originalName: meal.name
        });
      });
    this.state = initialState;

  }

  componentDidMount(): void {
    
    this.initializeMeals().then((newState) => {
      this.setState({...newState});
      return newState;
    }).catch((e) => alert(`exception ${e}`));
  }

  loadDataFromStorage = async (keys: readonly string[]): Promise<MealsState> => {
  
    const dataRead = await AsyncStorage.multiGet(keys);
    if(!dataRead) {
      console.log('NO data read!');
      return { loading: false, meals: []};
    }
    const meals: MealState[] = [];

    dataRead.forEach(kvp => {
      const key = kvp[0];
      const value = kvp[1] ?? "";

      if (key != null && value != null) {
        const name: string = key;

        const meal: SerializedMeal = JSON.parse(value ? value : "");
        meals.push( {
          ...meal,
          lastDateServed: meal.lastDateServed ? new Date(meal.lastDateServed) : undefined,
          nextDate: meal.nextDate ? new Date(meal.nextDate) : undefined,
          inEditMode: false,
          originalName: meal.name
        });
//        return meals;
      }
    });

    return {loading: false, meals: this.mealService.autoScheduleMeals(meals)};
    
  }

  
  initializeMeals = async (): Promise<MealsState> => {
    try {

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
    return { loading: false, meals: []};
  }


  onMealUpdated = (prevMealName: string, newMealProps: BaseMealProps, schduleChanges: boolean = false) => {

      let meals = [...this.state.meals];
      if (prevMealName) {
        const i = meals.findIndex(x => x.originalName === prevMealName);
        if (i >= 0) {
          meals[i] = {...meals[i],...newMealProps}
        } else {
          meals.push({...newMealProps, inEditMode: false, originalName: newMealProps.name});
        }       
      } else {
        meals.push({...newMealProps, inEditMode: false, originalName: newMealProps.name});        
      }
      this.setState( {meals: meals}); 
      this.save(prevMealName, newMealProps);
    }


    save = (originalName: string, newProps: BaseMealProps): boolean=> {
      const serializedMeal = JSON.stringify(newProps);
      AsyncStorage.setItem(originalName, serializedMeal, () => {
        console.log('item saved');
      });
      return true;
    }

    getMealProperties(meal: MealState): MealProps {
      return {
        description: meal.description,
        name: meal.name,
        error: meal.error,
        lastDateServed: meal.lastDateServed,
        nextDate: meal.nextDate,
        scheduleDatePickerOpen: meal.scheduleDatePickerOpen
      };
    }
    addMeal = () => {}

    render() {

        if (this.state.loading) {
          return (<ActivityIndicator></ActivityIndicator>);

        }
        return (
          <View style={styles.container}>
              <View style={styles.buttonBar}>
                  <Text style={styles.title}>Meal Schedule</Text>
                  <AddIconButton style={styles.addIcon} 
                      onPress={this.addMeal} icon={<Icon  style={styles.addIcon} name="plus" color="#900"></Icon>}>
                  </AddIconButton>
              </View>
            <SafeAreaView style={styles.listContainer}>
            
            <FlatList
              data={this.state.meals}            
              renderItem =  {
                (meal) => {
                  return (<View>          
                      <ErrorBoundary meal={this.getMealProperties(meal.item)}></ErrorBoundary>
                      <Meal { ...this.getMealProperties(meal.item)} inEditMode={meal.item.inEditMode} saveMeal={this.onMealUpdated} ></Meal>
                  </View>);
                }
              } 
            />
          </SafeAreaView>
        </View>);
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
    marginTop: (StatusBar.currentHeight || 0) +4,
  },
  listContainer: {
    flex: 1,
    
  },
  item: {
    backgroundColor: '##D4E6F1',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16
  },
  addIcon: {
    fontSize: 18,
    marginRight: 6,
    verticalAlign: "middle"
  },
  buttonBar: {
    flexDirection: "row",
    margin: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,    
    borderTopWidth: 1,
  }
});

