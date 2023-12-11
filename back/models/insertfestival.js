class insertFestival{
    constructor(info){

        this.name = info.fstvlNm
        this.place = info.opar
        this.address = info.rdnmadr
        this.description = info.fstvlCo
        this.phonenumber = info.phoneNumber
        this.begin_date = info.fstvlStartDate
        this.end_date = info.fstvlEndDate
        this.latitude = info.latitude
        this.longitude = info.longitude
        this.institution = info.mnnstNm 

    }
}
module.exports = insertFestival