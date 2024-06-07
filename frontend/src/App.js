import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components"
import { Home, InfoPage, FullBlog, EditBlog, CreateBlog, LoginSignUp, User, AllUsers, FriendRequests, Friends, NotFound } from './pages'

function App() {
  return (
    <div className="relative">
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/blogs" element={<InfoPage />} />
            <Route path="/blogs/:blogId" element={<FullBlog />}/>
            <Route path="/blogs/:blogId/edit" element={<EditBlog />} />
            <Route path="/blog/create" element={<CreateBlog />} />
            <Route path="/auth" element={<LoginSignUp />}/>
            <Route path="/user/me" element={<User />}/>
            <Route path="/users/:userId" element={<User />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/requests" element={<FriendRequests />}/>
            <Route path="/friends" element={<Friends />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
