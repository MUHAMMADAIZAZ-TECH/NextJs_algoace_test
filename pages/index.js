import axios from 'axios';
import React,{ useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../store/bookSlice';
import {useRouter} from 'next/navigation'
import Book from "@/components/book/book";
export default function Home({books}) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const storedBooks = useSelector((state) => state.book.books);
  useEffect(() => {
    if (books.data.length > 0) {
      dispatch(setBooks(books.data));
    }
  }, [dispatch, books]);
  const handleSearch = () => {
    if (books.data.length > 0) {
      const filtered = books.data.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filtered);
    dispatch(setBooks(filtered))
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1>Homepage</h1>
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {storedBooks.map((book, index) => (
          <div onClick={() => router.push(`/books/${index}`)} key={index}>
            <Book book={book} />
          </div>
        ))}
      </ul>
    </div>
  )
}
export async function getStaticProps() {
  try {
    const response = await axios.get('https://books-list-api.vercel.app/books', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-api-key': '#b0@6hX8YasCq6^unOaPw1tqR'
      }
    });
    return {
      props: {
        books:response.data
      }
    };
  } catch (error) {
    return {
      props: {
        books: [] // Return an empty array or handle the error case accordingly
      }
    };
  }
}