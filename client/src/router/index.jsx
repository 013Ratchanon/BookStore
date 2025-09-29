import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import AddBook from "../pages/AddBook.jsx";
import BookPage from "../pages/BookPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "AddBook", element: <AddBook /> },
      { path: "BookPage", element: <BookPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
