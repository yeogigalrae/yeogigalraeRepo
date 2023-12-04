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


// 진행 중이거나 예정인 축제
routes.get('/festivals', festivalController.getFestivals);

// 분류별 축제 검색
routes.get('/festivals/search/:category/:date/:place', festivalController.getCategorizeFestival);

// 축제 검색
routes.get('/festivals/search/:search', festivalController.getSearchFestival);

// 축제 상세 조회
routes.get('/festivals/:festival_id', festivalController.getFestivalInfo);


// 로그인
routes.post('/users/login', loginController.userLogin);

// 회원가입
routes.post('/users/signup', loginController.userSignup);

module.exports = routes;


