import React, { useState } from "react";
import { StyleSheet, StatusBar, GestureResponderEvent } from "react-native";
import { BaseMealProps, MealProps, MealState } from "../interfaces/MealProps";
import { EditMeal } from "./EditMeal";
import { MealSummary } from "./MealSummary";

export class Meal extends React.Component<MealProps, MealState> {

    constructor(props: MealProps) {
      super(props);
      this.state = { ...props }; 
    }

    editMeal = () => {
      
      alert(`editing ${this.state.name}`);
      this.setState({inEditMode: true});
    }

    saveMeal = (id: string, newProps: BaseMealProps) => {
      this.setState( {
        ...newProps,
        inEditMode: false
      });
      this.props.saveMeal(id, newProps);
    }

    scheduleMeal = (id: string, date: Date) => {
      alert(`editing ${this.state.name} inside scheduleMeal`);
      
      this.saveMeal(id, {...this.props, nextDate: date});
    }

    setDateServed = (id: string, date: Date) => {
      alert(`editing ${this.state.name} inside setDateServed`);
     this.saveMeal(id, {...this.props,  lastDateServed: date});
    }

    render() {
      if (!this.state.inEditMode) {
        //return (<MealSummary onEditMeal:this.editMeal />);
        return (<MealSummary {...this.state} scheduleMeal={this.scheduleMeal} setNewDateServed={this.setDateServed} onEditMeal={this.editMeal} ></MealSummary>);
      } else {
        return (<EditMeal {...this.state} onSaveMealChanges = {this.saveMeal}></EditMeal>);
      }
    }  
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