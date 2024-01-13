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
        currentDate.setHours(0,0,0,0);

        const scheduledMeals = meals.filter(x => x.nextDate && (!x.lastDateServed || x.nextDate > x.lastDateServed))
        .sort((a,b) => ((a.nextDate as Date) > (b.nextDate as Date) ? 1 : a.nextDate === b.nextDate ? 0 : -1));

        /*const notScheduledMeals = meals.filter(x => !x.nextDate || x.nextDate < x.lastDateServed)*/
        
        const notScheduledMeals = meals.filter(m => !scheduledMeals.includes(m, 0)).sort((a,b) => {
            const aDate = a.lastDateServed as Date;
            const bDate = b.lastDateServed as Date;
            if (!aDate) {
                return -1;
            }
            if (!bDate) {
                return 1;
            }
            if (aDate === bDate) return 0;
            if (aDate < bDate) return -1;
            return 1;
        });
        let lastScheduledMealDate = scheduledMeals[scheduledMeals.length -1].nextDate as Date;
        if (lastScheduledMealDate < currentDate) {
            lastScheduledMealDate = currentDate;
        }
        let numberOfMealsScheduled = scheduledMeals.length;
        let numberOfMealsNotScheduled = notScheduledMeals.length;
        const numberOfmealsToSchedule = numberOfMealsScheduled < Math.min(3, numberOfMealsNotScheduled) ? numberOfMealsScheduled - Math.min(3, numberOfMealsNotScheduled) : 0;
        for (let i = 0; i < numberOfmealsToSchedule; i++) {
            const unscheduledMeal = notScheduledMeals[i];
            unscheduledMeal.nextDate = this.getNextWeekdayAfter(lastScheduledMealDate, 2);
            lastScheduledMealDate = unscheduledMeal.nextDate;
        }
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

