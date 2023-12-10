const express = require('express');

const userController = require('./Controller/userController');
const likeController = require('./Controller/likeController');
const festivalController = require('./Controller/festivalController');
const loginController = require('./Controller/loginController');

const routes = express.Router();

// 회원 정보 변경
routes.put('/users/:user_id', userController.updateUserInfo);

// 알림 설정 변경
routes.put('/users/:user_id/notice', userController.updateNoticeSettings);

// 회원 탈퇴
routes.delete('/users/:user_id', userController.deleteUser);


// 좋아요 버튼 기능
routes.put('/festivals/:festival_id/like/:user_id', likeController.putLikeButton);

// 좋아요한 축제 조회
routes.get('/festivals/:user_id/liked', likeController.getLikedFestival);


// 축제 상위 5개 조회
routes.get('/festivals/top5/:user_id', festivalController.getMainFestivals);

// 진행 중이거나 예정인 축제
routes.get('/festivals/:user_id', festivalController.getFestivals);

// 추천 축제 조회
routes.get('/festivals/recommends/:user_id', festivalController.getRecommendFestivals);

// 분류별 축제 검색
routes.get('/festivals/search/:user_id/:category/:date/:place', festivalController.getCategorizeFestival);

// 축제 검색
routes.get('/festivals/search/:user_id/:search', festivalController.getSearchFestival);

// // 축제 상세 조회
// routes.get('/festivals/:festival_id/:user_id', festivalController.getFestivalInfo);


// 로그인
routes.get('/users/login/:id/:password', loginController.userLogin);

// 회원가입
routes.post('/users/signup', loginController.userSignup);

// 아이디 중복 체크
routes.get('/users/signup/idcheck/:id', loginController.userSignupIdCheck);

module.exports = routes;


