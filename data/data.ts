import { BaseMealProps, MealProps } from "../components/interfaces/MealProps";

export const defaultProps: BaseMealProps = {
    name: '',
    description: '',
    lastDateServed: undefined,
    nextDate: undefined
  }
  
export const DATA: BaseMealProps[] = [
  {
    ...defaultProps,
    name: "Barbecue Shredded Pork",
    description: "with mac'n'cheese",
    lastDateServed: new Date(2023, 7, 24)
  },
  {
    ...defaultProps,
    name: "Chicken Alfredo with Fetuccini",
    description: "",
    lastDateServed: new Date(2023, 9, 5)
  },
  {
    ...defaultProps,
    name: "Chicken with Rice-A-Roni",
    description: "",
    lastDateServed: new Date(2023, 8, 10),
    nextDate: new Date(2023, 10, 10)
  },
  {
    ...defaultProps,
    name: "Chili",
    description: "",
    lastDateServed: new Date(2023, 9, 31),
  },  {
    ...defaultProps,
    name: "Cornbread chicken pot pie",
    description: "",
    lastDateServed: new Date(2023, 9, 24)   
  },
  {
    ...defaultProps,
    name: "Ham and potatoes",
    description: "Ham cutlets with mashed sweet/russet potatos",
    lastDateServed: new Date(2023, 8, 10)
  },
  {
    ...defaultProps,
    name: "Pesto chicken",
    description: "",
    lastDateServed: new Date(2023, 7, 20)
  },
  {
    ...defaultProps,
    name: "Pinto beans with sausage",
    description: "",
    lastDateServed: new Date(2023, 9, 29)
  },
  {
    ...defaultProps,
    name: "Rice w/ black beans and sausge or steak",
    description: "<tbd>",
    lastDateServed: new Date(2023, 9, 13)
  },
  {
    ...defaultProps,
    name: "Sesame Chicken",
    description: "Sesame chicken with brown or fried rice",
    lastDateServed: new Date(2023, 9, 1)
  },
  {
      ...defaultProps,
      name: "Spaghetti",
      description: "Pot-sized spaghetti past with italian sauce and chicken meatballs",
      lastDateServed: new Date(2023, 8, 18),
  },
  {
    ...defaultProps,
    name: "Sweet'n'sour chicken",
    description: "With white rice",
    lastDateServed: new Date(2023, 7, 4),
    nextDate: new Date(2023, 10, 6)
  },
  {
      ...defaultProps,
      name: "Tacos",
      description: "Pot-sized spaghetti pasta with italian sauce and chicken meatballs",
      lastDateServed: new Date(2023, 7, 16),
      nextDate: new Date(2023, 10, 8)
  },
  {
      ...defaultProps,
      name: "Thai chicken",
      description: "With white rice",
      lastDateServed: new Date(2023, 9, 18)
  },
  {
      ...defaultProps,
      name: "Tortellini",
      description: "Tortellini with tomato/afredo cream sauce",
      lastDateServed: new Date(2023, 9, 19)
  },
  {
    ...defaultProps,
    name: "Turkey and mashed/sweet potatos",
    description: "with corn and carrots",
    lastDateServed: new Date(2023, 8, 19)
},
];
  function expandMeal(item: MealProps) {
  
  };