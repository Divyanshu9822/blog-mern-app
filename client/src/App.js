import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './Layout';
import HomePage from './pages/HomePage';
import BlogsPage from './pages/BlogsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateBlogPage from './pages/CreateBlogPage';
import BlogPage from "./pages/BlogPage";
import MyBlogsPage from "./pages/MyBlogsPage";

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <RegisterPage />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <LoginPage />
              </Layout>
            }
          />
          <Route
            path="/write"
            element={
              <Layout>
                <CreateBlogPage />
              </Layout>
            }
          />
          <Route
            path="/blogs"
            element={
              <Layout>
                <BlogsPage />
              </Layout>
            }
          />
          <Route
            path="/my-blogs"
            element={
              <Layout>
                <MyBlogsPage />
              </Layout>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Layout>
                <BlogPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
