import React from "react";
import { FlatList, SafeAreaView, Text, StatusBar, StyleSheet, Task } from "react-native";
import { BaseMealProps, MealProps, MealsState } from '../interfaces/MealProps';
import {Meal } from './Meal';
import {DATA, defaultProps} from '../../data/data';
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface MealListProps {
  onUpdateMeal(id: string): void
}

export interface MealState extends MealProps {
  inEditMode: boolean;
};
export type MealListProps1 = { meals: {[name: string]: MealState}};
export class MealList extends React.Component<MealListProps1, MealsState> {

  constructor(props: MealListProps1) {
    super(props);
   
    this.state = { meals: this.props.meals, loading: true };
  }

  private async loadDataFromStorage(keys: readonly string[]) {
    const dataRead = await AsyncStorage.multiGet(keys);
    if(!dataRead) {
      alert('NO data read!');
      return;
    }
    const mealsState: MealsState = {
      loading: true,
      meals: {}
    };

    for (let i = 0; i < keys.length; i++) {
      if (dataRead[i][1] != null) {
        const name: string = dataRead[i][0];
        const value: string | null = dataRead[i][1];
        const meal = JSON.parse(value ? value : "");
        mealsState.meals[name] = meal;
      }
    }


      //  this.mealsFromData[mealProps.name] = {...mealProps, inEditMode: false};
      //});      

    this.setState(mealsState);
    
  }
    //private mealsFromData: MealListProps = {};
    componentDidMount(): void {
      this.initializeMeals();

//      this.setState( {meals: this.mealsFromData});
    
    }
    onMealUpdated = async (prevMealName: string, newMealProps: BaseMealProps) => {
      let meals = {...this.state.meals};
      if (prevMealName) {
        meals[prevMealName] = {...newMealProps, inEditMode: false};
      } else {
        meals[newMealProps.name] = {...newMealProps, inEditMode: false};
      }
      this.setState( {meals: {...meals}}); 
      await this.save(newMealProps);
    }

    initializeMeals = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        if (!keys || keys.length === 0) {
          const allKeys: string[] = [];
 
          alert("no keys read");
          let dataToStore2: [string, string][] = [];
          DATA.forEach(item => {
            dataToStore2.push([item.name,  JSON.stringify(item)]);
            allKeys.push(item.name);
          });
          //await this.loadDataFromStorage(allKeys);

          AsyncStorage.multiSet(dataToStore2, async () => {
            //todo: update state with data just read
            this.setState({loading: false});
            await this.loadDataFromStorage(allKeys);
          });
          
        } else {
          alert('loading from storage');
          await this.loadDataFromStorage(keys);
        }

      } catch(e) {
        // read key error
        alert(`exception getting or setting all keys ${e}`);
      }
    }

    save = async (newProps: BaseMealProps): Promise<boolean> => {
      await AsyncStorage.setItem(newProps.name, JSON.stringify(newProps), () => {
        alert(`${newProps.name} item saved`);
        //this.loadDataFromStorage(newProps.name)
        //this.setState({});
      });
      return true;
    }

    render() {
        const x = Object.values(this.props.meals);
        return (
          <SafeAreaView style={styles.container}>
          <Text>Meals</Text>
          <FlatList
            data={x}            
            renderItem =  {
              (meal) => {
                return (<Meal {...meal.item} saveMeal={this.onMealUpdated} ></Meal>);
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

