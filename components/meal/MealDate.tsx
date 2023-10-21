import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import  Icon  from 'react-native-vector-icons/Fontisto';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
// ref: https://stackoverflow.com/questions/68977911/how-can-type-a-button-including-an-icon-with-react-native

type MealDateProps = {
  dateValue?: Date,
  dateLabel: string,
  onDateChanged: (newDate: Date) => void
}
type MealDateState =  {
  dateValue: Date | undefined,
  datePickerOpen: boolean
};

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

export class MealDate extends React.Component<MealDateProps, MealDateState> {
  constructor(props: MealDateProps) {
    super(props);
    this.state = ( {
                   dateValue: props.dateValue,
                   datePickerOpen: false
                  });
  }

  onDateChanged = (event: DateTimePickerEvent, newDate?: Date) => {
    
    alert(`setting new date: ${newDate}`);
    if (newDate) {
      this.setState({dateValue: newDate});
      this.props.onDateChanged(newDate);
    }
    this.setState({ datePickerOpen: false});
  }

  onEditDate = () => {
    this.setState({
      datePickerOpen: true,
    });
    let date: Date;
    if (this.state.dateValue) {
      date = this.state.dateValue;
    } else {
      date = new Date();
    }
    return  (<DateTimePicker
      onChange={this.onDateChanged}
      value = {date}
      mode={'date'}
    />);
  }

  render() {
    if (this.state.datePickerOpen) {
      return (<DateTimePicker mode="date" value={this.state.dateValue ?? new Date()} 
      onChange={this.onDateChanged} />)
    }
      
      if (this.state.dateValue) {
        return(
          <View style={styles.buttonBar}>
            <Text style={styles.parentView}>{this.props.dateLabel}</Text>
            <View >
              <IconButton title={this.state.dateValue.toDateString()}
                onPress={this.onEditDate} icon={<Icon  style={styles.rightIcon} name="calendar" color="#900"></Icon>}>
              </IconButton>
            </View>
          </View>);      
      }
      return(
        <View style={styles.buttonBar}>
            <Text style={styles.parentView}>{this.props.dateLabel}</Text>
            <View>
                <IconButton title= ' - '
                  onPress={this.onEditDate} icon={<Icon  style={styles.rightIcon} name="calendar" color="#900"></Icon>}>
                </IconButton>
            </View>
        </View>);      


  }
}
   const labelFontSize = 18; 
   const textFontSize = 18; 

  const styles = StyleSheet.create({
    parentView: {
      fontSize: labelFontSize,
      //margin: 2,
      fontWeight:"bold"
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
      flexDirection: "row",
      textAlignVertical: "top",
      paddingTop: 4,
    },
    dateEntry: {
      flexDirection: "row",
      fontSize:textFontSize,
      alignItems: "baseline"
    },
    
  });