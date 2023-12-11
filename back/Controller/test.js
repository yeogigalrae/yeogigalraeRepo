const { exec } = require('child_process');
const path = require('path');

process.env.PYTHONIOENCODING = 'utf-8';

// 파이썬 파일의 디렉토리 경로
const pythonFilePath = path.join(__dirname, 'recommend', 'recommend.py');
const userId = '7dfe6670 9742 11ee 9e5a 9883899920ee'; // 유효한 사용자 ID로 수정해주세요

// 파이썬 실행
const command = `python ${pythonFilePath} "${userId}"`;
console.log(userId);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`실행 중 에러가 발생했습니다: ${error}`);
    return;
  }
  const results = stdout.split('\n');

  for (let i in results) {
    console.log(results[i]);
  }
});