import React from 'react';
import { Card, Typography, Space, Rate } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const { Text } = Typography;

export default function Book({ book }) {
  console.log(book);
  const isLiked = book.is_liked;

  return (
    <>
      {book && (
        <Card
          hoverable
          cover={
            <div style={{ position: 'relative', width: '100%', height: 300 }}>
              <img
                src={book.imageLink}
                alt="Book cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '85%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                  backgroundColor:'white',
                  borderRadius:'100%',
                  height:'35px',
                  width:'35px'
                }}
              >
                {isLiked ? (
                  <HeartFilled style={{ fontSize: 24, color: 'red',marginTop:6 }} />
                ) : (
                  <HeartOutlined style={{ fontSize: 24, color: 'red',marginTop:6 }} />
                )}
              </div>
            </div>
          }
        >
          <Card.Meta
            title={book.title}
            description={
              <>
                <Rate disabled allowHalf defaultValue={book.rating} />
                <div>
                 ${book.price}
                </div>
              </>
            }
          />
        </Card>
      )}
    </>
  );
}
