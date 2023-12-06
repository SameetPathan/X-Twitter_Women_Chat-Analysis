import React, { useState,useEffect } from 'react';
import { getDatabase, ref, set ,get,remove} from "firebase/database";

function PostTwitter() {
const [posts, setPosts] = useState([]);
const [showModal, setShowModal] = useState(false);
const [editMode, setEditMode] = useState(false);
const [editedPostId, setEditedPostId] = useState(null);
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [content, setContent] = useState('');
const [isedit, setisedit] = useState('');
const db = getDatabase();

useEffect(() => {
  fetchPosts();
}, []);

const handleAnalysis = async () => {
  try {
    const response = await fetch('https://sameetpathan.pythonanywhere.com/xtwitter/get-post-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paragraph: content }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    const { sentiment, sentiment_score } = data;
    addPost(sentiment,sentiment_score)
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

const fetchPosts = async () => {
    const db = getDatabase();
    const userRef = ref(db, "Posts");
    const userSnapshot = await get(userRef);
    const fetchedPosts = userSnapshot.val();
    if (fetchedPosts) {
      const postsArray = Object.keys(fetchedPosts).map((key) => ({
        id: key,
        ...fetchedPosts[key],
      }));
      setPosts(postsArray);
    }

};

const getRandomInt=(min, max)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


const addPost = (sentiment,score) => {
  const dateTime = new Date().toLocaleString();
  let id = getRandomInt(1,500)
  if(editedPostId){
    id = editedPostId
  }
  const dbb = getDatabase();
  set(ref(dbb, 'Posts/' + id), {
      name: name,
      phone: phone,
      content: content,
      dateTime: dateTime,
      analysis:false,
      sentiment:sentiment,
      score:score
  });

  setShowModal(false);
  setName('');
  setPhone('');
  setContent('');
  fetchPosts();
};

const deletePost = (id) => {
  const db = getDatabase();
  remove(ref(db, 'Posts/' + id)).then(() => {
    fetchPosts();
  }).catch((error) => {
    console.error('Error removing post: ', error);
  });
};


const handleEdit = (id) => {
  const postToEdit = posts.find((post) => post.id === id);
  if (postToEdit) {
    setName(postToEdit.name);
    setPhone(postToEdit.phone);
    setContent(postToEdit.content);
    setEditMode(true);
    setEditedPostId(id);
    setShowModal(true);
  }
};

  return (
    <>
<div className="container-fluid mt-5 text-center">
      <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>
        Add New Twit
      </button>
</div>
    <div className="container mt-5">
    

      <div className="row">
        {posts.map((post) => (
          <div className="col-md-6" key={post.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{post.name}</h5>
                <hr></hr>
                <p className="card-text">{post.content}</p>
                <hr></hr>
                <p className="card-text"><span className='text-mute'>Sentiments:</span> {post.sentiment}</p>
                <p className="card-text"><span>Score:</span> {post.score}</p>
                <p className="card-text">
                <hr></hr>
                  <small className="text-muted">{post.dateTime}</small>
                </p>
                <hr></hr>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEdit(post.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="modal" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editMode ? 'Edit Post' : 'Add New Post'}
              </h5>
              <button
                className="close"
                onClick={() => {
                  setShowModal(false);
                  setEditMode(false);
                  setName('');
                  setPhone('');
                  setContent('');
                }}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Post Content</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowModal(false);
                  setEditMode(false);
                  setName('');
                  setPhone('');
                  setContent('');
                }}
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={() => { handleAnalysis();  editMode?setisedit(editedPostId):setisedit(null) }}>
                {editMode ? 'Update Post' : 'Add Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default PostTwitter;
