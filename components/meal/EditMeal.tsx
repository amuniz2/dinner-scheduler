import React from "react";
import { StyleSheet, View, Text, StatusBar, TextInput, Button, TouchableOpacity, TouchableOpacityProps } from "react-native";
import  Icon  from 'react-native-vector-icons/Fontisto';
import { EditMealProps } from "../interfaces/MealProps";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MealDate } from "./MealDate";
// ref: https://stackoverflow.com/questions/68977911/how-can-type-a-button-including-an-icon-with-react-native
/*const IconButton = ({ title, onPress, icon }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text>{title}</Text>
    {icon}
  </TouchableOpacity>
);*/
type IconButtonProps = TouchableOpacityProps & {
  title: string;
  icon?: any;
}

const IconButton = ({ title, onPress, icon }: IconButtonProps) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text>{title}</Text>
    {icon}
  </TouchableOpacity>
);

function DateLastServed(props: { lastDateServed: Date,
  onDateChanged: (newDate: Date) => void}) {
    return  (<DateTimePicker
    value = {props.lastDateServed}
    mode={'date'}
  />);
}

export class EditMeal extends React.Component<EditMealProps> {
  description!:string;
  name!: string;
  lastDateServed: Date | undefined;
  nextDate: Date | undefined;
  isDatePickerOpen: boolean = false;

  constructor(props: EditMealProps) {
    super(props);
    this.name = this.props.name;
    this.description = this.props.description;
    this.lastDateServed = this.props.lastDateServed;
    this.nextDate = this.props.nextDate;
    this.state = ({lastDateServed: {
                    changingDate: false,
                    date: this.props.lastDateServed}
                  });
  }

  private getLastDateServed(): string {
    if (this.props.lastDateServed)
      return this.props.lastDateServed.toDateString();
    return "-";
  }


  saveMeal = () => {
    this.props.onSaveMealChanges(this.props.name, {
      name: this.name,
      description: this.description,
      lastDateServed: this.lastDateServed,
      nextDate: this.nextDate
    });
    
    //this.props.onSaveMeal({});
  }
  handleNameChange = (name: string) => {
    if (!name || name[0] >= '0' && name[0] <= '9') {
      alert('name failed validation');
    }
    this.name = name;
  }

  handleDescriptionChange = (des: string) => {

  }

  handleLastEnteredDateChange = (newDate: Date) => {
    this.lastDateServed = newDate;

  }
/*

      <input name="mealName" key="name" type="date" value={this.lastDateServed ? this.lastDateServed.toLocaleDateString() :  '-' }></input>
      <input name="nextScheduledDate" key="desc" type="date" value={this.nextDate ? this.nextDate.toLocaleDateString() : '-'}></input>
  */
  render() {
    // todo make this a form with Submit
    return  (
      <View style={styles.item}>
        <Text style={styles.label}>Meal Name:</Text>
        <TextInput key="mealName" style={styles.editField}  
               value={this.props.name} onChangeText={this.handleNameChange}></TextInput>
  
        <Text style={styles.label}>Details</Text>
        <TextInput key="mealDesc" style={styles.editField} value={this.props.description}
         multiline={true}
        onChangeText={this.handleDescriptionChange}></TextInput>

        <Button color="#841584" title="Save" onPress={this.saveMeal} />
        
      </View>);
  }
}
    

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    
    item: {
      backgroundColor: '#D4E6F1',
      padding: 20,
      marginVertical: 2,
      marginHorizontal: 2,
      
    },
    label: {
      fontSize: 16,
      margin: 2,
      fontWeight:"bold"
    },
    buttonBar: {
      flexDirection: "row",
    },
    dateEntry: {
      flexDirection: "row",
      borderWidth: 2,
      margin: 2,
      padding: 6,
      borderColor: "#841584"
    },
    
    editField: {
      fontSize: 16,
      borderWidth: 2,
      margin: 2,
      padding: 6,
      borderColor: "#841584",
    },
    editDate: {
      borderWidth: 2,
      margin: 2,
      padding: 6,
      borderColor: "#841584",
      alignContent: "center"
    }
  });