import { Routes, Route, Outlet, Link } from "react-router-dom";

import "./index.css";
import React from "react";
import Admin from "./pages/admin";
import Consumer from "./pages/consumer";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import DragDropProvider from "./context/context";
import Home from "./pages/home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route  index element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="consumer"
          element={
            <React.Suspense fallback={<>...</>}>
              <Consumer />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <DragDropProvider>
        <AppRouter />
      </DragDropProvider>
    </BrowserRouter>
  )
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/admin">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App
