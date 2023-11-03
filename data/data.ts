import { BaseMealProps, MealListProp, MealProps } from "../components/interfaces/MealProps";

export const defaultProps: BaseMealProps = {
    name: '',
    description: '',
    lastDateServed: new Date(new Date().getFullYear(), 1, 1),
    nextDate: undefined
  }
  
export const DATA: MealListProp = [
    {
      ...defaultProps,
      name: "Spaghetti",
      description: "Pot-sized spaghetti past with italian sauce and chicken meatballs",
      lastDateServed: new Date(2023, 9, 21),
    },
    {
      ...defaultProps,
      name: "Tortellini",
      description: "Farfalle (aka bowtie) pasts with tomato/afredo cream sauce",
      lastDateServed: new Date(2023, 7, 27)
    },
    {
      ...defaultProps,
      name: "Fetuccini",
      description: "Cajun Chicken with Fetuccini Alfredo",
      lastDateServed: new Date(2023, 10, 5)
    },
/*    {
      ...defaultProps,
      name: "Sesame Chicken",
      description: "Sesame chicken with brown or fried rice",
      lastDateServed: new Date(2023, 10, 1)
    },
    {
      ...defaultProps,
      name: "Cornbread chicken pot pie",
      description: "",
      lastDateServed: new Date(2023, 7, 31)
     
    },
    {
      ...defaultProps,
      name: "Tacos",
      description: "Pot-sized spaghetti pasta with italian sauce and chicken meatballs",
      lastDateServed: new Date(2023, 8, 16)
    },
    {
      ...defaultProps,
      name: "Rice w/ black beans and sausge or steak",
      description: "<tbd>",
      lastDateServed: new Date(2023, 8, 7)
    },
    {
      ...defaultProps,
      name: "Stir Fry steak",
      description: "<tbd>",
      lastDateServed: new Date(2023, 7, 18)
    },
    {
      ...defaultProps,
      name: "Ham and potatoes",
      description: "Ham cutlets with mashed sweet/russet potatos",
      lastDateServed: new Date(2023, 9, 11)
    },
    {
      ...defaultProps,
      name: "Thai chicken",
      description: "With white rice",
      lastDateServed: new Date(2023, 7, 23)
    },
    {
      ...defaultProps,
      name: "Chicken with Rice-A-Roni",
      description: "",
      lastDateServed: new Date(2023, 8, 10)
    },
    {
      ...defaultProps,
      name: "Sweet'n'sour chicken",
      description: "With white rice",
      lastDateServed: new Date(2023, 1, 1),
      nextDate: new Date(2023, 8,25)
    },
    {
      ...defaultProps,
      name: "Pesto chicken",
      description: "",
      lastDateServed: new Date(2023, 8, 20)
    },
    {
      ...defaultProps,
      name: "Pot Roast",
      description: "with mac'n'cheese",
      lastDateServed: new Date(2023, 1, 1),
      nextDate: new Date(2023,8,273)
    }*/
  ];
  function expandMeal(item: MealProps) {
  
  };