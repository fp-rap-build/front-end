import { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

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

  const RenderComment = comm => {
    return <Comment content={<p>{comm.comment}</p>} />;
  };

  return (
    <div>
      <h1>Comments Placeholder</h1>
      {comments.map(comm => RenderComment(comm))}
    </div>
  );
};

export default Comments;
