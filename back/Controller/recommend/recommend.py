import pandas as pd
import numpy as np
import sys
from sqlalchemy import create_engine
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from scipy.sparse import hstack
from datetime import datetime
from dbConnection import connect_to_database

engine = connect_to_database()

# userId = sys.argv[1]
userId = '8708e3fa 95ae 11ee 9e5a 9883899920ee'

# 쿼리 실행 및 결과 가져오기
query = "SELECT * FROM festival_info"
festivals = pd.read_sql(query, engine)

festivals = festivals[['NAME', 'BEGIN_DATE', 'DESCRIPTION', 'INSTITUTION', 'ADDRESS']]

# '축제시작일자' 열을 datetime 형식으로 변환
festivals['BEGIN_DATE'] = pd.to_datetime(festivals['BEGIN_DATE'], format='%Y-%m-%d')

# 오늘 날짜 가져오기
current_date = datetime.now().date()

# 현재 날짜 이후의 데이터만 선택하기
future_festivals = festivals[festivals['BEGIN_DATE'].dt.date > current_date].reset_index(drop=True)

# 사용자가 좋아요한 축제
likequery = f"SELECT festival_info.* FROM festival_info JOIN like1 ON festival_info.festival_id = like1.festival_id WHERE like1.user_id = '{userId}' ORDER BY festival_info.begin_date"
liked_festivals = pd.read_sql(likequery, engine)

liked_festivals = liked_festivals[['NAME', 'BEGIN_DATE', 'DESCRIPTION', 'INSTITUTION', 'ADDRESS']]

# 축제 데이터를 텍스트로 변환
festivals_text = [';'.join([str(fest['NAME']), str(fest['DESCRIPTION']), str(fest['INSTITUTION']), str(fest['ADDRESS']), str(fest['BEGIN_DATE'])]) 
                  for index, fest in future_festivals.iterrows()]
liked_festivals_text = [';'.join([str(fest['NAME']), str(fest['DESCRIPTION']), str(fest['INSTITUTION']), str(fest['ADDRESS']), str(fest['BEGIN_DATE'])]) 
                        for index, fest in liked_festivals.iterrows()]

# TF-IDF 벡터화
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(festivals_text)

# 사용자가 좋아요한 축제에 대한 TF-IDF 벡터 가져오기
liked_festivals_tfidf = tfidf_vectorizer.transform(liked_festivals_text)  # transform 사용

# 코사인 유사도 계산
cosine_similarities = linear_kernel(liked_festivals_tfidf, tfidf_matrix).flatten()

# 유사한 축제 정렬
similar_festivals_indices = cosine_similarities.argsort()[::-1]

similar_festivals_indices = similar_festivals_indices - (similar_festivals_indices // len(future_festivals)) * len(future_festivals)

similar_festivals_indices = list(dict.fromkeys(similar_festivals_indices))

# 사용자가 좋아요한 축제에 대한 축제명 가져오기
liked_festival_names = liked_festivals['NAME'].tolist()

# 추천된 축제 출력 (이미 좋아요한 축제는 제외)
recommended_festivals = [future_festivals.iloc[i] for i in similar_festivals_indices if future_festivals.iloc[i]['NAME'] not in liked_festival_names]

for fest in recommended_festivals[:5]:
    print(fest['NAME'])