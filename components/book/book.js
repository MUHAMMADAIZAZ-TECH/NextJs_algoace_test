'use client';
export default function Book (
  {book}
) {
  return (
    <div>
      <div>{book.author}</div>
      <img src={book.imageLink}
       alt="Book cover"
       width={500} // Add the width attribute
       height={300} // Add the height attribute
      />
    </div>
  );
};