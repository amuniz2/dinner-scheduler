import React from 'react';
import { StatusBar, Text, TouchableOpacity, View, StyleSheet, Button, GestureResponderEvent, Alert, TouchableOpacityProps } from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DateType, MealSummaryProps } from '../interfaces/MealProps';
import  Icon  from 'react-native-vector-icons/SimpleLineIcons';
//import  Icon  from 'react-native-vector-icons';
import { MealDate } from './MealDate';

type IconButtonProps = TouchableOpacityProps & {
  icon?: any;
}

const IconButton = ({ onPress, icon }: IconButtonProps) => (
  <TouchableOpacity style={styles.editIcon} onPress={onPress}>
    {icon}
  </TouchableOpacity>
);

export class MealSummary extends React.Component<MealSummaryProps> {
  constructor(props: MealSummaryProps) {
    super(props);
  }


  scheduleMeal(event: GestureResponderEvent): void {
    // todo: propogate to parent to change state
    
    
  }

  editMeal = (event: GestureResponderEvent): void => {
    // todo: propogate to parent to change state
    this.props.onEditMeal(this.props.meal.name);
    
  }

  handleLastEnteredDateChange = (newDate: Date) => {
    this.props.setNewDateServed(this.props.meal.name, newDate);
  }

  scheduleFor = (newDate: Date) => {
    this.props.scheduleMeal(this.props.meal.name, newDate);
  }

  //onOpenDatePicker = () => this.props.onOpenDatePicker();

  onOpenNextDatePicker = () => this.props.onOpenDatePicker(DateType.nextDate);
  onOpenLastDatePicker = () => this.props.onOpenDatePicker(DateType.lastDate);
  render() {
    return (
      <View style={styles.item}>
        <View style = {styles.buttonBar}>
          <Text style={styles.title}>{this.props.meal.name}</Text>
          <IconButton
                onPress={this.editMeal} icon={<Icon  style={styles.editIcon} name="pencil" color="#900"></Icon>}>
              </IconButton>
          </View>
          <Text style={styles.description}>{this.props.meal.description}</Text>
          <View style={styles.buttonBar}>
            <MealDate dateLabel='Last served:' onOpenDatePicker={this.onOpenLastDatePicker} 
            datePickerOpen={this.props.lastDatePickerOpen ?? false} dateValue={this.props.meal.lastDateServed} onDateChanged={this.handleLastEnteredDateChange}></MealDate>
          </View>
          <View style={styles.buttonBar}>
            <MealDate dateLabel='Scheduled for:' onOpenDatePicker={this.onOpenNextDatePicker} 
            datePickerOpen={this.props.scheduleDatePickerOpen ?? false} dateValue={this.props.meal.nextDate} onDateChanged={this.scheduleFor}></MealDate>
          </View>         
      </View>
      );    
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      color: '##D4E6F1',
      borderWidth: 2,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold"
    },
    description: {
        fontWeight: "400",
        fontSize: 16
    },
  
    editIcon: {
      flexDirection: "row",
      fontSize: 18,
      marginLeft: 20,
      
    },
    buttonBar: {
      flexDirection: "row",
      fontSze: 18,
      justifyContent: "space-between",
      marginBottom: 2
    }
  });
  