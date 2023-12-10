import pandas as pd
import numpy as np
import sys
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from dbConnection import connect_to_database

userId = sys.argv[1]
# userId = "f98a44f6 95dd 11ee 9e5a 9883899920ee"

engine = connect_to_database()
# 쿼리 실행 및 결과 가져오기
query = f"SELECT name, category, description, institution, address FROM festival_info WHERE CURDATE() < begin_date"
festivals = pd.read_sql(query, engine)

# 사용자가 좋아요한 축제
likequery = f"SELECT festival_info.name, festival_info.category, festival_info.description, festival_info.institution, festival_info.address FROM festival_info JOIN like1 ON festival_info.festival_id = like1.festival_id WHERE like1.user_id = '{userId}'"
liked_festivals = pd.read_sql(likequery, engine)

# 축제 데이터를 텍스트로 변환
festivals_text = [';'.join([str(fest['name']), str(fest['category']), str(fest['description']), str(fest['institution']), str(fest['address'])]) 
                  for index, fest in festivals.iterrows()]
liked_festivals_text = [';'.join([str(fest['name']), str(fest['category']), str(fest['description']), str(fest['institution']), str(fest['address'])]) 
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

similar_festivals_indices = similar_festivals_indices - (similar_festivals_indices // len(festivals)) * len(festivals)

similar_festivals_indices = list(dict.fromkeys(similar_festivals_indices))

# 사용자가 좋아요한 축제에 대한 축제명 가져오기
liked_festival_names = liked_festivals['name'].tolist()

# 추천된 축제 출력 (이미 좋아요한 축제는 제외)
recommended_festivals = [festivals.iloc[i] for i in similar_festivals_indices if festivals.iloc[i]['name'] not in liked_festival_names]

for fest in recommended_festivals[:5]:
    print(fest['name'])