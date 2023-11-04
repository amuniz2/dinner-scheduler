import React from "react";
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

export interface MealSummaryProps  {
    meal: BaseMealProps;
    onEditMeal(id: string): void, // in MealSummary?,
    setNewDateServed(id: string, newDate:Date): void,
    scheduleMeal(id: string, newDate:Date): void,
    scheduleDatePickerOpen?: boolean
    lastDatePickerOpen?: boolean
    onOpenDatePicker: (t:DateType) => void
}

export interface EditMealProps {
    meal: BaseMealProps;
    onNameChange(oldName: string, newName: string): void
    onDescriptionChange(name: string, newDescription: string): void
    onSaveMealChanges(): void;
}

export interface MealProps {
    meal: BaseMealProps
    inEditMode: boolean
    saveMeal: (prevMealName: string, newMealProps: BaseMealProps, scheduleChange: boolean) => void
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
}

export interface MealsState {
    meals: { [name: string]: MealState }; 
    loading: boolean;
}