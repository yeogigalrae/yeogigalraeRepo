import { View, Text } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import Modal from 'react-native-modal';
import UserInfoStyle from '../../styles/user/UserInfoStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default CustomPostcode = (props) => {

    return (
        <Modal
            isVisible={props.isModal}
            onBackdropPress={() => props.setModal(false)}
        >
            <View
                style={UserInfoStyle.postcodeBox}
            >
                <View
                    style={UserInfoStyle.postcodeTopBox}
                >
                  <TouchableOpacity
                    onPress={() => props.setModal(false)}
                  >
                    <Text
                        style={UserInfoStyle.postcodeCancleLabel}
                    >취소</Text>
                  </TouchableOpacity>
                  <Text
                    style={UserInfoStyle.postcodeTitle}
                  >주소 입력</Text>
                </View>
                <Postcode
                    style={{ width: "100%", height: "85%" }}
                    jsOptions={{ animation: true, hideMapBtn: false }}
                    onSelected={data => {
                        props.setAddress(data.roadAddress);
                        props.setModal(false);
                    }}
                />
            </View>
        </Modal>
    )
}