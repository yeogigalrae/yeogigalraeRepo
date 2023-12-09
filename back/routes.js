import { Router } from 'express';

import { updateUserInfo, updateNoticeSettings, deleteUser } from './Controller/userController';
import { putLikeButton, getLikedFestival } from './Controller/likeController';
import { getMainFestivals, getFestivals, getRecommendFestivals, getCategorizeFestival, getSearchFestival } from './Controller/festivalController';
import { userLogin, userSignup, userSignupIdCheck } from './Controller/loginController';

const routes = Router();

// 회원 정보 변경
routes.put('/users/:user_id', updateUserInfo);

// 알림 설정 변경
routes.put('/users/:user_id/notice', updateNoticeSettings);

// 회원 탈퇴
routes.delete('/users/:user_id', deleteUser);


// 좋아요 버튼 기능
routes.put('/festivals/:festival_id/like/:user_id', putLikeButton);

// 좋아요한 축제 조회
routes.get('/festivals/:user_id/liked', getLikedFestival);


// 축제 상위 5개 조회
routes.get('/festivals/:user_id', getMainFestivals);

// 진행 중이거나 예정인 축제
routes.get('/festivals/:user_id', getFestivals);

// 추천 축제 조회
routes.get('/festivals/recommends/:user_id', getRecommendFestivals);

// 분류별 축제 검색
routes.get('/festivals/search/:user_id/:category/:date/:place', getCategorizeFestival);

// 축제 검색
routes.get('/festivals/search/:user_id/:search', getSearchFestival);

// // 축제 상세 조회
// routes.get('/festivals/:festival_id/:user_id', festivalController.getFestivalInfo);


// 로그인
routes.get('/users/login/:id/:password', userLogin);

// 회원가입
routes.post('/users/signup', userSignup);

// 아이디 중복 체크
routes.get('/users/signup/idcheck/:id', userSignupIdCheck);

export default routes;


