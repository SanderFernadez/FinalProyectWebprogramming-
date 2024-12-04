import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Importa Firestore desde Firebase
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore"; 
import { useAuth } from "../context/AuthContext"; // Importa el hook useAuth
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import '../styles/Posts.css'; 

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState(""); 
  const [imageUrl, setImageUrl] = useState(""); 
  const [youtubeLink, setYoutubeLink] = useState(""); 
  const [uploading, setUploading] = useState(false); 

  const { currentUser } = useAuth(); 

  useEffect(() => {
    const fetchPosts = async () => {
      const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(postsQuery);
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push(doc.data());
      });
      setPosts(postsArray);
    };
    fetchPosts();
  }, []);


  const handleYouTubeLink = (link) => {
    const youtubeRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:[\w-]{11}))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(youtubeRegex);
    return match ? match[1] : "";  
  };


  const createPost = async (event) => {
    event.preventDefault();
    setUploading(true);

    let imageURL = imageUrl;  

   
    const processedYouTubeLink = handleYouTubeLink(youtubeLink);

    try {
      
      await addDoc(collection(db, "posts"), {
        text: newPostText,
        imageUrl: imageURL, 
        youtubeLink: processedYouTubeLink, 
        timestamp: serverTimestamp(), 
        userId: currentUser.uid, 
        userName: currentUser.displayName, 
      });

  
      setPosts([{ 
        text: newPostText, 
        imageUrl: imageURL, 
        youtubeLink: processedYouTubeLink,
        userName: currentUser.displayName,
        timestamp: serverTimestamp(),
      }, ...posts]);

      setNewPostText(""); 
      setImageUrl(""); 
      setYoutubeLink(""); 
    } catch (error) {
      console.error("Error al crear el post:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5" >
      <h1 className="mb-4 text-center text-primary">Publicacion de usuarios</h1>

      {/* Formulario de creación de post */}
      {currentUser && (
        <div id = "FormContainer" className="card mb-4 shadow-sm rounded">
          <div className="card-body-form">
            <form onSubmit={createPost}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Escribe tu post..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  required
                  rows="3"
                />
              </div>

              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="URL de la imagen (opcional)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                {imageUrl && <p className="text-muted">{imageUrl}</p>}
              </div>

              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enlace de YouTube (opcional)"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100" type="submit" disabled={uploading}>
                {uploading ? "Publicando..." : "Publicar"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Posts listados */}
      <div className="posts-list">
        {posts.map((post, index) => (
          <div key={index} className="card mb-3 shadow-sm rounded">
            <div className="card-body">
              <h5 className="card-title text-dark">{post.userName}</h5>
              <p className="card-text text-muted">{post.text}</p>
              {post.imageUrl && <img className="img-fluid rounded mb-2" src={post.imageUrl} alt="Post" />}
              {post.youtubeLink && (
                <div className="embed-responsive embed-responsive-16by9 mt-3">
                  <iframe
                    className="embed-responsive-item"
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${post.youtubeLink}`}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
