import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import  Icon  from 'react-native-vector-icons/Fontisto';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
// ref: https://stackoverflow.com/questions/68977911/how-can-type-a-button-including-an-icon-with-react-native

type MealDateProps = {
  dateValue?: Date,
  dateLabel: string,
  onDateChanged: (newDate: Date) => void,
  datePickerOpen: boolean;
  onOpenDatePicker: () => void
}

type IconButtonProps = TouchableOpacityProps & {
  title: string;
  icon?: any;
}

const IconButton = ({ title, onPress, icon }: IconButtonProps) => (
  <TouchableOpacity style={styles.dateEntry} onPress={onPress}>
    <Text style={styles.dateText}>{title}</Text>
    {icon}
  </TouchableOpacity>
);

export class MealDate extends React.Component<MealDateProps> {
  constructor(props: MealDateProps) {
    super(props);
  }

  onDateChanged = (event: DateTimePickerEvent, newDate?: Date) => {
    
    
    if (newDate) {
      this.props.onDateChanged(newDate);
    }
    
  }

  onEditDate = () => {
    /*let date: Date;
    if (this.props.dateValue) {
      date = this.props.dateValue;
    } else {
      date = new Date();
    }*/
    this.props.onOpenDatePicker();
    
  }

  private days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  private formatDate = (date?: Date): string => {
    if (!date) {
      return "N/A";
    }
    return `${this.days[date.getUTCDay()]}, ${date.getUTCMonth()+1}/${date.getUTCDate()}/${date.getUTCFullYear()}}`;
  }

  render() {
    if (this.props.datePickerOpen) {
      return (<DateTimePicker mode="date" value={this.props.dateValue ?? new Date()} 
      onChange={this.onDateChanged} />)
    }
      
      //if (this.props.dateValue) {
        return(
          <View style={styles.buttonBar}>
            <Text style={styles.parentView}>{this.props.dateLabel}</Text>
            <View >
              <IconButton title={this.formatDate(this.props.dateValue)}
                onPress={this.onEditDate} icon={<Icon  style={styles.rightIcon} name="calendar" color="#900"></Icon>}>
              </IconButton>
            </View>
          </View>);      
      /*}
      return(
        <View style={styles.buttonBar}>
            <Text style={styles.parentView}>{this.props.dateLabel}</Text>
            <View>
                <IconButton title= ' - '
                  onPress={this.onEditDate} icon={<Icon  style={styles.rightIcon} name="calendar" color="#900"></Icon>}>
                </IconButton>
            </View>
        </View>);      
*/

  }
}
   const labelFontSize = 18; 
   const textFontSize = 18; 

  const styles = StyleSheet.create({
    parentView: {
      fontSize: labelFontSize,
      //margin: 2,
      fontWeight:"500"
    },
    rightIcon: {
      
      alignSelf: "flex-end",
          color: "#841584",
      marginLeft:10,
      fontSize: textFontSize + 2
      },
    item: {
      backgroundColor: '#D4E6F1',
      padding: 2,
      //marginVertical: 2,
      marginHorizontal: 2,
      flexDirection: "row",
      
    },
    dateText: {      
      //margin: 2,
      fontSize: textFontSize
    },
    buttonBar: {
      flexDirection: "column",
      textAlignVertical: "top",
      paddingTop: 4,
    },
    dateEntry: {
      flexDirection: "row",
      fontSize:textFontSize,
      alignItems: "baseline"
    },
    
  });