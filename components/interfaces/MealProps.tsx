import React from "react";
import { TouchableOpacityProps } from "react-native/Libraries/Components/Touchable/TouchableOpacity";
/*export interface MealsProps extends React.PropsWithRef<any>
{
    meals: { [name: string]: MealProps }; 
}*/

export enum DateType {
    nextDate = 2, lastDate = 1
  };

export interface BaseMealProps {
    name: string,
    description: string,
    lastDateServed?: Date,
    nextDate?: Date,
    error?: Error
}

export interface SerializedMeal {
    name: string,
    description: string,
    lastDateServed: string,
    nextDate: string,
}

export interface MealSummaryProps extends BaseMealProps {
    //meal: BaseMealProps;
    onEditMeal(id: string): void, // in MealSummary?,
    setNewDateServed(id: string, newDate:Date): void,
    scheduleMeal(id: string, newDate:Date): void,
    unscheduleMeal(id: string): void,
    scheduleDatePickerOpen?: boolean
    lastDatePickerOpen?: boolean
    onOpenDatePicker: (t:DateType) => void
}

export interface EditMealProps {
    name: string;
    description: string;
    originalName: string;
    onNameChange(oldName: string, newName: string): void
    onDescriptionChange(name: string, newDescription: string): void
    onSaveMealChanges(originalName: string, name: string, newDescription: string): void;
}

export interface MealProps extends BaseMealProps{
    //meal: BaseMealProps; 
    inEditMode: boolean;
    saveMeal: (prevMealName: string, newMealProps: BaseMealProps, scheduleChange: boolean) => void;
    
    //onMealClick: () => {}
}

export interface MealState {
    name: string,
    description: string,
    lastDateServed?: Date,
    nextDate?: Date,
    inEditMode: boolean;
    scheduleDatePickerOpen?: boolean;
    lastDatePickerOpen?: boolean;
    error?: Error;
    originalName: string;
}

export interface MealsState {
    meals: MealState[]; 
    loading: boolean;
}

export type IconButtonProps = TouchableOpacityProps & {
    icon?: any;
  }
  
  