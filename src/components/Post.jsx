import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import moment from "moment";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";

const belongToCurrentUser = (currentUser, postAuthor) => {
  if (!currentUser) {
    return false;
  } else {
    return currentUser.uid === postAuthor.uid;
  }
};

const Post = ({ Title, Content, User, createdAt, stars, comments, id }) => {
  const currentUser = useContext(UserContext);

  return (
    <article className="Post">
      <div className="Post--content">
        <Link to={`/posts/${id}`}>
          {" "}
          <h3>{Title}</h3>
        </Link>

        <div>{Content}</div>
      </div>
      <div className="Post--meta">
        <div>
          <p>
            <span role="img" aria-label="star">
              ⭐️
            </span>
            {stars}
          </p>
          <p>
            <span role="img" aria-label="comments">
              🙊
            </span>
            {comments}
          </p>
          <p>Posted by {User.displayName}</p>
          <p>{moment(createdAt.toDate()).calendar()}</p>
        </div>
        <div>
          <button
            className="star"
            onClick={() =>
              firestore.doc(`posts/${id}`).update({ stars: stars + 1 })
            }
          >
            Star
          </button>
          {belongToCurrentUser(currentUser, User) && (
            <button
              className="delete"
              onClick={() => {
                firestore.doc(`posts/${id}`).delete();
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

Post.defaultProps = {
  title: "An Incredibly Hot Take",
  content:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.",
  user: {
    id: "123",
    displayName: "Bill Murray",
    email: "billmurray@mailinator.com",
    photoURL: "https://www.fillmurray.com/300/300"
  },
  createdAt: new Date(),
  stars: 0,
  comments: 0
};

export default Post;
