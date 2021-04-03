import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { checkCommentLength, getFormattedDate } from './utils/utils';

import RenderComment from './RenderComment';
import CreateComment from './CreateComment';
import NoComment from './NoComment';

import { Button } from 'antd';

const Comments = ({ request, category }) => {
  const requestId = request.id;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ text: '' });

  const currentUser = useSelector(state => state.user.currentUser);
  console.log(currentUser.id);

  useEffect(() => {
    fetchComments(requestId);
    //eslint-disable-next-line
  }, []);
  const fetchComments = async id => {
    try {
      const res = await axiosWithAuth().post(
        `/comments/find/request/${id}/category`,
        { category: category }
      );
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async e => {
    e.stopPropagation();
    const commentToPOST = {
      requestId: requestId,
      authorId: currentUser.id,
      comment: newComment.text,
      createdAt: getFormattedDate(),
      category: category,
    };

    try {
      await axiosWithAuth().post('/comments', commentToPOST);
      fetchComments(requestId);
      setNewComment({ text: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {comments ? (
        comments.map(comm => <RenderComment comm={comm} />)
      ) : (
        <NoComment />
      )}
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
