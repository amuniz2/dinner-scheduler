import React, { useState } from "react";
import { StyleSheet, StatusBar, Text, View } from "react-native";
import { BaseMealProps, DateType, EditMealProps, MealProps, MealState } from "../interfaces/MealProps";
import { EditMeal } from "./EditMeal";
import { MealSummary } from "./MealSummary";
import ErrorBoundary from "../ErrorBoundary";

export class Meal extends React.Component<MealProps, MealState> {

  constructor(props: MealProps) {
    super(props);
    this.state = { ...props,
      lastDatePickerOpen: false,
      scheduleDatePickerOpen: false, 
      originalName: props.name }; 
  }

  onNameChange = (oldName: string, newName: string) => {
      
      this.setState({ name: newName });
    };

  onDescriptionChange = (name: string, newDescription: string) => {
    this.setState({
      description: newDescription
    })
  };


    editMeal = () => {
      
      this.setState({inEditMode: true});
    }

    deleteMeal = (id: string) => {
      
      this.setState({inEditMode: false});
      this.props.deleteMeal(id);
    }
    scheduleMeal = (id: string, date: Date) => {
      this.setState({scheduleDatePickerOpen: false, nextDate: date});  
      this.props.saveMeal(id, {...this.props, nextDate: date}, true);
    }
    unscheduleMeal = (id: string) => {
      this.setState({nextDate: undefined});  
      this.props.saveMeal(id, {...this.props, nextDate: undefined}, true);
    }

    setDateServed = (id: string, date: Date) => {
      this.setState({lastDatePickerOpen: false, lastDateServed: date});
      this.props.saveMeal(id, {...this.props,  lastDateServed: date}, true);
    }

    onDatePickerOpened = (t: DateType) => {
      if (t === DateType.lastDate) {
        this.setState({lastDatePickerOpen: true});
      } else {
        this.setState({scheduleDatePickerOpen: true});
      }
    }

    onSaveChanges = (originalName: string, newName: string, newDescription: string) => {
      this.setState({ 
        inEditMode: false,
        name: newName, 
        description: newDescription
      });
      this.props.saveMeal(originalName, {
        ...this.props, name: newName, description: newDescription  
        }, false);
    }

    buildEditMealProps = (): EditMealProps =>
    {
      const editMealProps = {
        originalName: this.props.name,
        name: this.props.name,
        description: this.props.description,
        onNameChange: this.onNameChange,
        onDescriptionChange: this.onDescriptionChange,
        onSaveMealChanges: this.onSaveChanges

      };
      return editMealProps;
    }
    render() {
      if (this.state.error) {
        return (<ErrorBoundary meal={this.props}></ErrorBoundary>);
      }
      else if (!this.state.inEditMode) {
        //return (<MealSummary onEditMeal:this.editMeal />);
        return (<MealSummary {...this.props} scheduleMeal={this.scheduleMeal} 
          onOpenDatePicker={this.onDatePickerOpened}
          setNewDateServed={this.setDateServed} 
          unscheduleMeal={this.unscheduleMeal}
          onEditMeal={this.editMeal} 
          onDeleteMeal={this.deleteMeal}></MealSummary>);
      } else {
        return (<EditMeal {...this.buildEditMealProps()}></EditMeal>);
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