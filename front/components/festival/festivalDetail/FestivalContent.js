import {View} from "react-native";
import ContentLine from "./ContentLine";
import FestivalDetailScreenStyle from "../../../styles/festival/FestivalDetailScreenStyle";

export default FestivalContent = ({data}) => {
    return (
        <View
            style={FestivalDetailScreenStyle.content}
        >
            <ContentLine
                subject={"행사 진행 날짜"}
                content={data.begin_date+" ~ "+data.end_date}
            />
            <ContentLine
                subject={"행사 진행 장소"}
                content={data.place}
            />
            {/* <ContentLine
                subject={"참여 방법"}
                content={}
            /> */}
            <ContentLine
                subject={"요금"}
                content={data.fee}
            />
        </View>
    )
}