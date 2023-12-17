import {View} from "react-native";
import ContentLine from "./ContentLine";
import FestivalDetailScreenStyle from "../../../styles/festival/FestivalDetailScreenStyle";

export default FestivalContent = ({data}) => {
    return (
        <View
            style={FestivalDetailScreenStyle.content}
        >
            <ContentLine
                subject={"분류"}
                content={data.category}
            />
            <ContentLine
                subject={"행사 진행 날짜"}
                content={data.begin_date+" ~ "+data.end_date}
            />
            <ContentLine
                subject={"행사 진행 장소"}
                content={data.place}
            />
            <ContentLine
                subject={"진행 시간"}
                content={data.show_times}
            />
            <ContentLine
                subject={"상세 주소"}
                content={data.address}
            />
            <ContentLine
                subject={"요금"}
                content={data.fee}
            />
        </View>
    )
}