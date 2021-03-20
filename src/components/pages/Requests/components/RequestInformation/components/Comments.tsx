import { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import RenderComment from './Comments/RenderComment';
import CreateComment from './Comments/CreateComment';

import { Button } from 'antd';

const Comments = ({ request }) => {
  const { id } = request;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ text: '' });

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

  const addComment = async e => {
    e.stopPropagation();
  };

  useEffect(() => {
    fetchComments(id);
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
      >
        Add Comment!
      </Button>
    </div>
  );
};

export default Comments;
