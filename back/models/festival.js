class Festival {
  constructor(info) {
    const formattedDate1 = info.BEGIN_DATE.toISOString().split("T")[0];
    const formattedDate2 = info.END_DATE.toISOString().split("T")[0];

    this.id = info.FESTIVAL_ID;
    this.category = info.CATEGORY;
    this.name = info.NAME;
    this.place = info.PLACE;
    this.description = info.DESCRIPTION;
    this.info = info.INFO;
    this.show_times = info.SHOW_TIMES;
    this.fee = info.FEE;
    this.call = info.PHONENUMBER;
    this.image = info.IMAGE;
    this.address = info.ADDRESS;
    this.like = info.LIKE;
    this.begin_date = formattedDate1;
    this.end_date = formattedDate2;
    this.latitude = info.LATITUDE;
    this.longitude = info.LONGITUDE;
    this.likestate = info.LIKESTATE;
    this.sentiment = info.SENTIMENT;
  }
}
module.exports = Festival;