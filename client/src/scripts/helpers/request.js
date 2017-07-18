import qs from 'querystring';

const APPID = () => '454d9538142191fe4d6fec760075d53c';

const CORS = () => {
  let corsURL = '';

  if (window.location.protocol === 'https:') {
    corsURL = 'https://cors-anywhere.herokuapp.com/';
  }

  return corsURL;
};

const weatherAPIUrl = () =>
  `${CORS()}http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${APPID()}`;

const get = (params, successFunction, errorFunction) => {
  const paramsStringify = qs.stringify(params);
  const http = new XMLHttpRequest();
  http.open('GET', `${weatherAPIUrl()}&${paramsStringify}`, true);

  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200) {
        if (successFunction !== undefined) {
          successFunction(http.responseText);
        }
      } else if (errorFunction !== undefined) {
        errorFunction(http.responseText);
      }
    }
  };
  http.send(null);
};

const Request = {
  get,
};

export default Request;
