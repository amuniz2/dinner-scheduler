import React from "react";
/*export interface MealsProps extends React.PropsWithRef<any>
{
    meals: { [name: string]: MealProps }; 
}*/

export interface BaseMealProps {
    name: string,
    description: string,
    lastDateServed?: Date,
    nextDate?: Date,

}
export interface MealSummaryProps extends BaseMealProps {
    onEditMeal(id: string): void, // in MealSummary?,
    setNewDateServed(id: string, newDate:Date): void,
    scheduleMeal(id: string, newDate:Date): void
}

export interface EditMealProps extends BaseMealProps {
    onSaveMealChanges(id: string, newMeal: BaseMealProps): void
}

export interface MealProps extends BaseMealProps
{
    inEditMode: boolean
    saveMeal: (prevMealName: string, newMealProps: BaseMealProps) => void
    //onMealClick: () => {}
}

export interface MealState {
    name: string,
    description: string,
    lastDateServed?: Date,
    nextDate?: Date,
    inEditMode: boolean;
}

export interface MealsState {
    meals: { [name: string]: MealState }; 
    loading: boolean;
}