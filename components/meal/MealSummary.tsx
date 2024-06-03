import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, GestureResponderEvent } from "react-native";
import { IconButtonProps, MealSummaryProps } from '../interfaces/MealProps';
import  Icon  from 'react-native-vector-icons/SimpleLineIcons';
//import  Icon  from 'react-native-vector-icons';
import { MealDate } from './MealDate';

const EditIconButton = ({ onPress, icon }: IconButtonProps) => (
  <TouchableOpacity style={styles.editIcon} onPress={onPress}>
    {icon}
  </TouchableOpacity>
);

const IconOnly = ({ onPress, icon }: IconButtonProps) => (
  <TouchableOpacity style={styles.icon} onPress={onPress}>
    {icon}
  </TouchableOpacity>
);


const NotScheduledDate = () =>
(
  <View style={styles.buttonBar}>
            <MealDate dateLabel={ 'Not Scheduled'} onOpenDatePicker={this.onOpenNextDatePicker} 
            datePickerOpen={this.state.scheduleDatePickerOpen ?? false} dateValue={this.props.nextDate} onDateChanged={this.scheduleFor}></MealDate>
   </View>       
)

interface MealSummaryState {
  lastDatePickerOpen: boolean,
  scheduleDatePickerOpen: boolean
}

export class MealSummary extends React.Component<MealSummaryProps, MealSummaryState> {
  constructor(props: MealSummaryProps) {
    super(props);
    this.state = 
    { 
      lastDatePickerOpen: props.lastDatePickerOpen ?? false,
      scheduleDatePickerOpen: props.scheduleDatePickerOpen ?? false
    };
  }

  scheduledDate = (nextDate?: Date) => {
    if (this.props.nextDate) {
      return (<View>
        <MealDate dateLabel={'Scheduled for:'} onOpenDatePicker={this.onOpenNextDatePicker} 
        datePickerOpen={this.state.scheduleDatePickerOpen ?? false} dateValue={this.props.nextDate} onDateChanged={this.scheduleFor}></MealDate>
        <IconOnly 
            onPress={this.onUnschedule} icon={<Icon  style={styles.rightIcon} name="close" color="#900"></Icon>}>
        </IconOnly>  
      </View>)

    }
    else {
      return (<View>
        <MealDate dateLabel={'Not Scheduled'} onOpenDatePicker={this.onOpenNextDatePicker} 
        datePickerOpen={this.state.scheduleDatePickerOpen ?? false} dateValue={this.props.nextDate} onDateChanged={this.scheduleFor}></MealDate>
      </View>);
    }
  }
  
  
  deleteMeal = (event: GestureResponderEvent): void => {
    if (confirm("Are you sure you want to delete this meal?")) {
      this.props.onDeleteMeal(this.props.name);
    }
  }
  
  editMeal = (event: GestureResponderEvent): void => {
    // todo: propogate to parent to change state
    this.props.onEditMeal(this.props.name);
    
  }

  handleLastEnteredDateChange = (newDate: Date) => {
    this.props.setNewDateServed(this.props.name, newDate);
    this.setState({lastDatePickerOpen: false});
  }

  scheduleFor = (newDate: Date) => {
    this.props.scheduleMeal(this.props.name, newDate);
    this.setState({scheduleDatePickerOpen: false});
  }

  //onOpenDatePicker = () => this.props.onOpenDatePicker();

  onUnschedule  = () => {
    this.props.unscheduleMeal(this.props.name); 
  }
  onOpenNextDatePicker = () => this.setState({scheduleDatePickerOpen: true});
  onOpenLastDatePicker = () => this.setState({lastDatePickerOpen: true});
  render() {
    return (
      <View style={styles.item}>
        <View style = {styles.buttonBar}>
          <Text style={styles.title}>{this.props.name}</Text>
          <EditIconButton
                onPress={this.editMeal} icon={<Icon  style={styles.editIcon} name="pencil" color="#900"></Icon>}>
          </EditIconButton>
          <EditIconButton
            onPress={this.deleteMeal} icon={<Icon  style={styles.editIcon} name="trash" color="#900"></Icon>}>
          </EditIconButton>
        </View>
        <Text style={styles.description}>{this.props.description}</Text>
        <View>
          <MealDate dateLabel={'Scheduled for:'} onOpenDatePicker={this.onOpenNextDatePicker} 
          datePickerOpen={this.state.scheduleDatePickerOpen ?? false} dateValue={this.props.nextDate} onDateChanged={this.scheduleFor}></MealDate>
          <IconOnly 
              onPress={this.onUnschedule} icon={<Icon  style={styles.rightIcon} name="close" color="#900"></Icon>}>
          </IconOnly>  
        </View>)
        <View style={styles.buttonBar}>
            <MealDate dateLabel='Last served:' onOpenDatePicker={this.onOpenLastDatePicker} 
            datePickerOpen={this.state.lastDatePickerOpen ?? false} dateValue={this.props.lastDateServed} onDateChanged={this.handleLastEnteredDateChange}></MealDate>
        </View>
      </View>
      );    
  }

}
const textFontSize = 18; 
const styles = StyleSheet.create({
    item: {
      color: '##D4E6F1',
      borderBottomWidth: 1,
      BorderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      flex: 1,
    },
    icon: {
      color: '##D4E6F1',
      borderBottomWidth: 0,
      BorderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      flex: 1,
    },    
    title: {
      fontSize: 18,
      fontWeight: "bold",
      width: "80%"
    },
    description: {
        fontWeight: "400",
        fontSize: 16
    },
  
    editIcon: {
      flexDirection: "row",
      fontSize: 18,
      marginLeft: 10,
      marginRight: 6,
      
    },
    buttonBar: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      fontSze: 18,
      justifyContent: "space-between",
      marginBottom: 2
    },
    rightIcon: {      
      alignSelf: "flex-end",
          color: "#841584",
      marginLeft:10,
      fontSize: textFontSize + 2
      },    
  });
  