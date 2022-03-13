import React from "react";
import { Routes, Route } from "react-router-dom";

import Lobby from "./pages/Lobby";
import Friends from "./pages/Friends";
import RoomDetail from "./pages/RoomDetail";
import RoomList from "./pages/RoomList";
import SeeMore from "./pages/SeeMore";

function App() {
  return (
    <Routes>
      <Route index element={<Lobby />} /> {/* 로비 */}
      <Route path="/friends" element={<Friends />} /> {/* 친구목록 */}
      <Route path="/rooms" element={<RoomList />} /> {/* 톡방목록 */}
      <Route path="/rooms/:roomId" element={<RoomDetail />} /> {/* 톡방*/}
      <Route path="/more" element={<SeeMore />} /> {/* 더보기 */}
    </Routes>
  );
}

export default App;
