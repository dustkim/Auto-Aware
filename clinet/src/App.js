import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Header from "./component/Header";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Main from "./component/Main";
import Register from "./component/Register";
import Face from "./component/Face";
import List from "./component/List";
import MyPage from "./component/MyPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/face" element={<Face />} />
          <Route path="/list" element={<List />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
