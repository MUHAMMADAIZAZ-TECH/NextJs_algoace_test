import React from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
const BookByID = ({book}) => {
    console.log(book);
    const router = useRouter();

    if (router.isFallback) {
      return <div>Loading...</div>;
    }
  return (
<div>
      <div>{book.author && book.author}</div>
     {book.imageLink && <img src={book.imageLink}
       alt="Book cover"
       width={500} // Add the width attribute
       height={300} // Add the height attribute
      />}
    </div>
  )
}

export default BookByID
export async function getStaticPaths() {
    // Fetch the book IDs from your API
    const response = await axios.get('https://books-list-api.vercel.app/books', {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-api-key': '#b0@6hX8YasCq6^unOaPw1tqR'
        }
      });
    const {data} = response.data;
      console.log(data);
    const paths = data.map((book,index) => ({
      params: { id: index.toString() }
    }));
  
    return { paths, fallback: true };
  }
  export async function getStaticProps({ params }) {
    // Fetch the book details based on the ID
    const response = await axios.get(`https://books-list-api.vercel.app/books`, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-api-key': '#b0@6hX8YasCq6^unOaPw1tqR'
        }
      });
    const {data} = response.data;
    const book = data[params.id]
    return { props: { params,book }, revalidate: 1 };
  }
  