import { DATA } from "../../data/data";
import { BaseMealProps, MealState } from "./MealProps";

export interface IMealService {
    getDefaultMeals() : BaseMealProps[];
    getMeals() : BaseMealProps[];
    saveMeal(meal: BaseMealProps): boolean;
    autoScheduleMeals(meals: MealState[]): MealState[]
}

export class MealService implements IMealService {
    getMeals(): BaseMealProps[] {
        throw new Error("Method not implemented.");
    }
    saveMeal(meal: BaseMealProps): boolean {
        throw new Error("Method not implemented.");
    }

    getDefaultMeals() {
        return DATA;
    }

    autoScheduleMeals(meals: MealState[]): MealState[] {
        const currentDate = new Date();
        const scheduledMeals = meals.filter(x => x.nextDate && x.nextDate >= currentDate )
        .sort((a,b) => ((a.nextDate as Date) > (b.nextDate as Date) ? 1 : a.nextDate === b.nextDate ? 0 : -1));
        const notScheduledMeals = meals.filter(x => !x.nextDate || x.nextDate < currentDate).sort((a,b) => {
            if (!a.lastDateServed) {
                return -1;
            }
            if (!b.lastDateServed) {
                return 1;
            }
            const aDate = a.nextDate as Date;
            const bDate = b.nextDate as Date;
            if (aDate === bDate) return 0;
            if (aDate > bDate) return -1;
            return 0;
        });
        let firstDateScheduled = scheduledMeals[0].nextDate as Date;
        let lastScheduledMealDate = scheduledMeals[scheduledMeals.length -1].nextDate as Date;
        notScheduledMeals.forEach(unscheduledMeal => {            
            unscheduledMeal.nextDate = this.getNextWeekdayAfter(lastScheduledMealDate, 2);
            lastScheduledMealDate = unscheduledMeal.nextDate;
        });
        const allMeals = scheduledMeals.concat(notScheduledMeals);
   
        return allMeals;
    }

    private getNextWeekdayAfter(date: Date, interval: number): Date {
        let targetDate = new Date(date);
        targetDate.setDate(date.getDate() + interval);


        if (targetDate.getDay() == 0) {
            // Sunday
            targetDate.setDate(targetDate.getDate() + 1);
        } else if (targetDate.getDay() == 6) {
            // Saturday
            targetDate.setDate(targetDate.getDate() + 2);
        } 
        return targetDate;
    }
}

