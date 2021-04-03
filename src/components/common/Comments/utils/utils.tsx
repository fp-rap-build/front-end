import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const getFormattedDate = () => {
  const now = new Date();
  const currentDate =
    now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  const currentTime =
    now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  return currentDate + ' ' + currentTime;
};

const checkCommentLength = comm => {
  if (comm.text.length < 10) {
    return true;
  }
  return false;
};

export { checkCommentLength, getFormattedDate };
