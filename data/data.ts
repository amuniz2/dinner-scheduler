import { BaseMealProps, MealProps } from "../components/interfaces/MealProps";

export const defaultProps: BaseMealProps = {
    name: '',
    description: '',
    lastDateServed: new Date(new Date().getFullYear(), 1, 1),
    nextDate: undefined
  }
  
export const DATA: BaseMealProps[] = [
  {
    ...defaultProps,
    name: "Barbecue Shredded Pork",
    description: "with mac'n'cheese",
    lastDateServed: new Date(2023, 8, 24)
  },
  {
    ...defaultProps,
    name: "Chicken Alfredo with Fetuccini",
    description: "",
    lastDateServed: new Date(2023, 10, 5)
  },
  {
    ...defaultProps,
    name: "Chicken with Rice-A-Roni",
    description: "",
    lastDateServed: new Date(2023, 8, 10),
    nextDate: new Date(2023, 11, 10)
  },
  {
    ...defaultProps,
    name: "Chili",
    description: "",
    lastDateServed: new Date(2023, 10, 31),
  },  {
    ...defaultProps,
    name: "Cornbread chicken pot pie",
    description: "",
    lastDateServed: new Date(2023, 10, 24)   
  },
  {
    ...defaultProps,
    name: "Ham and potatoes",
    description: "Ham cutlets with mashed sweet/russet potatos",
    lastDateServed: new Date(2023, 9, 10)
  },
  {
    ...defaultProps,
    name: "Pesto chicken",
    description: "",
    lastDateServed: new Date(2023, 8, 20)
  },
  {
    ...defaultProps,
    name: "Pinto beans with sausage",
    description: "",
    lastDateServed: new Date(2023, 10, 29)
  },
  {
    ...defaultProps,
    name: "Rice w/ black beans and sausge or steak",
    description: "<tbd>",
    lastDateServed: new Date(2023, 10, 13)
  },
  {
    ...defaultProps,
    name: "Sesame Chicken",
    description: "Sesame chicken with brown or fried rice",
    lastDateServed: new Date(2023, 10, 1)
  },
  {
      ...defaultProps,
      name: "Spaghetti",
      description: "Pot-sized spaghetti past with italian sauce and chicken meatballs",
      lastDateServed: new Date(2023, 9, 18),
  },
  {
    ...defaultProps,
    name: "Sweet'n'sour chicken",
    description: "With white rice",
    lastDateServed: new Date(2023, 8, 4),
    nextDate: new Date(2023, 11,6)
  },
  {
      ...defaultProps,
      name: "Tacos",
      description: "Pot-sized spaghetti pasta with italian sauce and chicken meatballs",
      lastDateServed: new Date(2023, 8, 16),
      nextDate: new Date(2023, 11, 8)
  },
  {
      ...defaultProps,
      name: "Thai chicken",
      description: "With white rice",
      lastDateServed: new Date(2023, 10, 18)
  },
  {
      ...defaultProps,
      name: "Tortellini",
      description: "Tortellini with tomato/afredo cream sauce",
      lastDateServed: new Date(2023, 10, 19)
  },
  {
    ...defaultProps,
    name: "Turkey and mashed/sweet potatos",
    description: "with corn and carrots",
    lastDateServed: new Date(2023, 10, 19)
},
];
  function expandMeal(item: MealProps) {
  
  };