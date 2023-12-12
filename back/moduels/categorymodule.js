function convertToLikePatterns(addressList) {
    const likePatterns = [];
    for (let i in addressList) {
      if (addressList[i] == '충남' || addressList[i] == '충북' || addressList[i] == '전남' || addressList[i] == '전북' || addressList[i] == '경남' || addressList[i] == '경북') {
        likePatterns.push(addressList[i].split('').join('_') + '%');
      } else if (addressList[i] == '광주' || addressList[i] == '대구' || addressList[i] == '대전' || addressList[i] == '울산' || addressList[i] == '부산' || addressList[i] == '인천') {
        likePatterns.push(addressList[i] + '광역시%');
      } else if (addressList[i] == '세종') {
        likePatterns.push(addressList[i] + '특별%');
      } else {
        likePatterns.push(addressList[i] + '%');
      }
    }
    return likePatterns;
  }
  
  module.exports = {
    convertToLikePatterns: convertToLikePatterns
  };
  