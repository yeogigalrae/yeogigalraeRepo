import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import appStyle from '../../configs/Style.json';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    this.props.select(date.toISOString().substring(0, 10));
  }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <CalendarPicker
          weekdays={["일", "월", "화", "수", "목", "금", "토"]}
          months={[
            "1월", "2월", "3월", "4월", "5월", "6월",
            "7월", "8월", "9월", "10월", "11월", "12월"
          ]}
          previousTitle={"이전"}
          nextTitle={"다음"}
          selectedDayColor={appStyle.APP_MAIN_COLOR}
          selectMonthTitle={"월 선택"}
          selectYearTitle={"년 선택"}
          minDate={new Date()}
          restrictMonthNavigation={true}
          monthYearHeaderWrapperStyle={styles.hearder}
          onDateChange={this.onDateChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hearder: {
    flexDirection: "row-reverse"
  }
});