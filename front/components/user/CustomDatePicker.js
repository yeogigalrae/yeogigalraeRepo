import { View, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import UserInfoStyle from '../../styles/user/UserInfoStyle';
import { useState } from 'react';

export default CustomDatePicker = (props) => {
    const [dateValue, setDateValue] = useState(new Date());

    return (
        <>
            {
                props.open ? (
                    <Modal
                        isVisible={props.open}
                    >
                        <View>
                            <DateTimePicker
                                value={dateValue}
                                mode='date'
                                display='spinner'
                                maximumDate={new Date()}
                                timeZoneName={'Asia/Seoul'}
                                onChange={(event, value) => {
                                    setDateValue(value);
                                }}
                            >
                            </DateTimePicker>
                        </View>
                        <View
                            style={UserInfoStyle.detePickerButtonBox}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    props.setDate(dateValue);
                                    props.setOpen(false);
                                }}
                            >
                                <Text
                                    style={UserInfoStyle.datePickerButtonLabel}
                                >확인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    props.setOpen(false);
                                }}
                            >
                                <Text
                                    style={UserInfoStyle.datePickerButtonLabel}
                                >취소</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                ) : null
            }
        </>
    )
}