const serverUrl = NODE_ENV === 'development' ? 'https://nomoreparties.co/' : 'http://nomoreparties.co/'

const obj = {
  userToken: 'dd8b6dea22fe4ea0ad5d46f4',
  baseUrl: `${serverUrl}/cohort0`,
  authorization: '80a75492-21c5-4330-a02f-308029e94b63',
  contentType: 'application/json',
  };

export const config = JSON.stringify(obj);
