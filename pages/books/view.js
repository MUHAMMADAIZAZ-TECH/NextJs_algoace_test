import React, { useState } from "react";
import { useRouter } from "next/router";
import { Card, Typography, Space, Rate } from 'antd';

const BookByID = () => {
  const storage = JSON.parse(localStorage.getItem("book"))
  const [book, setBook] = useState(storage);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const imageContainerStyle = {
    width: "50%"
  };

  const bookImageStyle = {
    width: "100%",
    height: "auto"
  };

  const detailsContainerStyle = {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    marginLeft:'20px',
    paddingLeft:'20px'
  };

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        {book.imageLink && (
          <img
            src={book.imageLink}
            alt="Book cover"
            style={bookImageStyle}
          />
        )}
      </div>
      <div style={detailsContainerStyle}>
        <h2>{book.title}</h2>
        <div style={rowStyle}>
          <p><strong>Rating</strong><br/>  <Rate disabled allowHalf defaultValue={book.rating} /></p>
          <p style={{marginLeft:20}}><strong>Reviews</strong><br/> ({book.reviews})</p>
          <p style={{marginLeft:20}}><strong>Price</strong><br/> ${book.price}</p>
        </div>
        <div style={{textAlign:'left'}}>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Country:</strong> {book.country}</p>
          <p><strong>Language:</strong> {book.language}</p>
          <p><strong>Pages:</strong> {book.pages}</p>
          <button style={{
            padding:15,
            width:'100%',
            border:'none',
            backgroundColor: "#004D6D",
            color:'white'
          }} >View details</button>
        </div>
      </div>
    </div>
  );
};

export default BookByID;
