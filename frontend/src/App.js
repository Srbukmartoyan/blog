import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components"
import { Home, InfoPage, FullBlog, EditBlog, CreateBlog, LoginSignUp, User, AllUsers, FriendRequests, Friends } from './pages'

function App() {
  return (
    <div className="relative">
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/blog" element={<InfoPage />} />
            <Route path="/blog/:blogId" element={<FullBlog />}/>
            <Route path="/blog/:blogId/edit" element={<EditBlog />} />
            <Route path="/blog/create" element={<CreateBlog />} />
            <Route path="/auth" element={<LoginSignUp />}/>
            <Route path="/user" element={<User />}/>
            <Route path="/user/:userId" element={<User />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/requests" element={<FriendRequests />}/>
            <Route path="/friends" element={<Friends />}/>
          </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
