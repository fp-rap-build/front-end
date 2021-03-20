import { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import RenderComment from './Comments/RenderComment';

import { Comment } from 'antd';

const Comments = ({ request }) => {
  const { id } = request;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async id => {
    try {
      const res = await axiosWithAuth().get('/comments/find', {
        params: { requestId: id },
      });
      setComments(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
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
    </div>
  );
};

export default Comments;
