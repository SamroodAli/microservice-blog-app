const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <div className="mt-3">{renderedComments}</div>;
};

export default CommentList;