import React, { useEffect, useState } from "react";
import '../styles/Home.module.css'
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../store/bookSlice";
import { useRouter } from "next/navigation";
import Book from "@/components/book/book";
import axios from "axios";
import { Layout, theme, Space, Input, Avatar, List, Row, Col,Spin  } from "antd";
import { SearchOutlined, UserOutlined, BookOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 64,
  paddingInline: 50,
  backgroundColor: "#fff",
};

const leftHeaderStyle = {
  display: "flex",
  alignItems: "center",
};

const searchBarContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
};

const searchBarStyle = {
  width: "100%",
  // maxWidth: 400,
  height: 32,
  width: 700,
  padding: '0 12px', // Updated padding
  border: "none",
  borderRadius: 4,
};

const rightHeaderStyle = {
  display: "flex",
  alignItems: "center",
};

export default function Home({ books }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [searchQuery, setSearchQuery] = useState("");
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
      dispatch(setBooks(filtered));
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    backgroundColor: "#108ee9",
  };

  return (
    <Layout>
      <Header style={headerStyle}>
        <div style={leftHeaderStyle}>
          <Image src={image1} alt="image1" />
        </div>
        <div style={searchBarContainerStyle}>
          <Input
            placeholder="Search books..."
            value={searchQuery}
            onChange={handleInputChange}
            style={searchBarStyle}
            className="search-input" 
            addonBefore={<SearchOutlined onClick={handleSearch} />}
          />
        </div>
        <div style={rightHeaderStyle}>
          <Avatar />
        </div>
      </Header>
      <Content style={contentStyle}>
        <div style={{ display: "flex", height: 300 }}>
          <div
            style={{
              backgroundColor: "#004D6D",
              width: "50%",
              color: "#FFFFFF",
              fontFamily: "Poppins",
            }}
          >
            <h1
              style={{
                fontWeight: 600,
                fontSize: "30px",
                lineHeight: "45px",
                marginTop: 70,
              }}
            >
              Lorem ipsum dolor sit amet consectetur.
            </h1>
            <h1
              style={{ fontWeight: 400, fontSize: "26px", lineHeight: "39px" }}
            >
              Lorem ipsum dolor sit amet consectetur. Viverr scelerisqu.
            </h1>
          </div>
          <div style={{ width: "50%", position: "relative" }}>
            <Image
              src={image2}
              alt="Image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        <div
          style={{ padding: 24, minHeight: 360, background: colorBgContainer }}
        >
          <Row gutter={[16, 16]}>
            {storedBooks.length>0?storedBooks.map((book, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index} onClick={()=>{
                router.push('/books/view')
                localStorage.setItem('book',JSON.stringify(book))
              }}>
                <Book book={book} />
              </Col>
            )): <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
            }}
          >
            <Spin size="large"/>
          </div>}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      "https://books-list-api.vercel.app/books",
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-api-key": "#b0@6hX8YasCq6^unOaPw1tqR",
        },
      }
    );

    return {
      props: {
        books: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        books: [], // Return an empty array or handle the error case accordingly
      },
    };
  }
}
