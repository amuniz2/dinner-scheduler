import { DATA } from "../../data/data";
import { BaseMealProps } from "./MealProps";

export interface IMealService {
    getDefaultMeals() : BaseMealProps[];
    getMeals() : BaseMealProps[];
    saveMeal(meal: BaseMealProps): boolean;
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

}