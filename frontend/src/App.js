import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components"
import {Home, InfoPage, FullBlog, EditBlog, CreateBlog, LoginSignUp, User} from './pages'

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
          </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
