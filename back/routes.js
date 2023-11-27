const express = require('express');

const userController = require('./Controller/userController');
const likeController = require('./Controller/likeController');
const festivalController = require('./Controller/festivalController');
const loginController = require('./Controller/loginController');

const routes = express.Router();

// 회원 정보 변경
routes.put('/users/:user_id', userController.updateuserinfo);

// 프로필 사진 변경
routes.put('/users/:user_id/image', userController.updateUserImage);

// 알림 설정 변경
routes.put('/users/:user_id/notice', userController.updateNoticeSettings);

// 회원 탈퇴
routes.delete('/users/:user_id', userController.deleteUser);


// 좋아요 버튼 기능
routes.put('/festivals/:festival_id/like/:user_id', likeController.putlikebutton);

// 좋아요한 축제 조회
routes.get('/festivals/:user_id/liked', likeController.getlikedfestival);


// 진행 예정인 축제
routes.get('/festivals/soon-festival', festivalController.getsoonfestival);

// 진행 중인 축제
routes.get('/festivals/doing-festival', festivalController.getdoingfestival);

// 종료된 축제
routes.get('/festivals/end-festival', festivalController.getendfestival);

// 분류별 축제 검색
routes.get('/festivals/:category/:date/:place', festivalController.getcategorizefestival);

// 축제 상세 조회
routes.get('/festivals/:festival_id', festivalController.getfestivalinfo);


// 로그인
routes.post('/users/login', loginController.userlogin);

// 회원가입
routes.post('/users/signup', loginController.usersignup);

module.exports = routes;


