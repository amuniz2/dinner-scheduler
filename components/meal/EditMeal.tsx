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
  name!: string;

  constructor(props: EditMealProps) {
    super(props);
    /*this.name = this.props.name;
    this.description = this.props.description;
    this.lastDateServed = this.props.lastDateServed;
    this.nextDate = this.props.nextDate;
    this.state = ({lastDateServed: {
                    changingDate: false,
                    date: this.props.meal.lastDateServed}
                  });
                  */
  }

  saveMeal = () => {
    this.props.onSaveMealChanges();
  }
  handleNameChange = (newName: string) => {
    if (!newName || newName[0] >= '0' && newName[0] <= '9') {
      alert('name failed validation');
      return;
    }
    this.props.onNameChange(this.name, newName);
  }

  handleDescriptionChange = (desc: string) => {
    this.props.onDescriptionChange(this.name, desc);
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
               value={this.props.meal.name} onChangeText={this.handleNameChange}></TextInput>
  
        <Text style={styles.label}>Details</Text>
        <TextInput key="mealDesc" style={styles.editField} value={this.props.meal.description}
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