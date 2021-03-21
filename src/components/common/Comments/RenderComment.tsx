import { Comment } from 'antd';

const RenderComment = ({ comm }) => {
  const author = comm.firstName + ' ' + comm.lastName;

  const formatDate = dtg => {
    const stringCheck = String(dtg);

    const dtgSplit = stringCheck.split('T');
    const date = dtgSplit[0].split('-');
    const time = dtgSplit[1].split(':');

    return `${date[1]}/${date[2]} @ ${time[0]}:${time[1]}`;
  };

  return (
    <Comment
      author={author}
      datetime={formatDate(comm.createdAt)}
      content={<p>{comm.comment}</p>}
    />
  );
};

export default RenderComment;
