import React, { useState } from "react";
import { StyleSheet, StatusBar, Text, View } from "react-native";
import { BaseMealProps, DateType, MealProps, MealState } from "../interfaces/MealProps";
import { EditMeal } from "./EditMeal";
import { MealSummary } from "./MealSummary";
import ErrorBoundary from "../ErrorBoundary";


export class Meal extends React.Component<MealProps, MealState> {

    constructor(props: MealProps) {
      super(props);
      this.state = { ...this.props.meal, inEditMode: false, lastDatePickerOpen: false, scheduleDatePickerOpen: false }; 
    }

    editMeal = () => {
      
      this.setState({inEditMode: true});
    }

    scheduleMeal = (id: string, date: Date) => {
      this.setState({scheduleDatePickerOpen: false, nextDate: date});  
      this.props.saveMeal(id, {...this.props.meal, nextDate: date});
    }

    setDateServed = (id: string, date: Date) => {
      this.setState({lastDatePickerOpen: false, lastDateServed: date});
      this.props.saveMeal(id, {...this.props.meal,  lastDateServed: date});
    }

    onDatePickerOpened = (t: DateType) => {
      if (t === DateType.lastDate) {
        this.setState({lastDatePickerOpen: true});
      } else {
        this.setState({scheduleDatePickerOpen: true});
      }
    }
    render() {
      if (this.state.error) {
        return (<ErrorBoundary meal={this.props.meal}></ErrorBoundary>);
      }
      else if (!this.state.inEditMode) {
        //return (<MealSummary onEditMeal:this.editMeal />);
        return (<MealSummary {...this.state} meal={this.props.meal} scheduleMeal={this.scheduleMeal} 
          onOpenDatePicker={this.onDatePickerOpened}
          setNewDateServed={this.setDateServed} 
          onEditMeal={this.editMeal} ></MealSummary>);
      } else {
        return (<EditMeal {...this.state} onSaveMealChanges = {this.props.saveMeal}></EditMeal>);
      }
    }  
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    error: {
    backgroundColor: '##D4E6F1',
    color: '#ff0000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
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