import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import RenderComment from './Comments/RenderComment';
import CreateComment from './Comments/CreateComment';

import { Button } from 'antd';

const Comments = ({ request }) => {
  const requestId = request.id;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ text: '' });

  const currentUser = useSelector(state => state.user.currentUser);

  const fetchComments = async id => {
    try {
      const res = await axiosWithAuth().get('/comments/find', {
        params: { requestId: id },
      });
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkCommentLength = comm => {
    if (comm.text.length < 10) {
      return true;
    }
    return false;
  };

  const getFormattedDate = () => {
    const now = new Date();
    const currentDate =
      now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    const currentTime =
      now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return currentDate + ' ' + currentTime;
  };

  const addComment = async e => {
    e.stopPropagation();
    const commentToPOST = {
      requestId: requestId,
      authorId: currentUser.id,
      comment: newComment.text,
      createdAt: getFormattedDate(),
    };

    try {
      await axiosWithAuth().post('/comments', commentToPOST);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments(requestId);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {comments.map(comm => (
        <RenderComment comm={comm} />
      ))}
      <CreateComment newComment={newComment} setNewComment={setNewComment} />
      <Button
        type="primary"
        style={{ marginTop: '1%' }}
        disabled={checkCommentLength(newComment)}
        onClick={addComment}
      >
        Add Comment!
      </Button>
    </div>
  );
};

export default Comments;
