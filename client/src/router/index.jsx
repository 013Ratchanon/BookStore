import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import AddBook from "../pages/AddBook.jsx";
import Comics from "../pages/Comics.jsx";
import Journals from "../pages/Journals.jsx";
import Update from "../pages/Update.jsx";
import AddJournals from "../pages/AddJournals.jsx";
import AddComics from "../pages/AddComics.jsx";
import UpdateJournal from "../pages/UpdateJournal.jsx";
import UpdateComic from "../pages/UpdateComic.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/comics",
        element: <Comics />,
      },
      {
        path: "/journals",
        element: <Journals />,
      },
      {
        path: "/addbook",
        element: <AddBook />,
      },
      {
        path: "/add-journal",
        element: <AddJournals />
      },
      {
        path: "/add-comic",
        element: <AddComics />
      },
      {
        path: "/update/:id",
        element: <Update />,
      },
      {
        path: "/update-journal/:id",
        element: <UpdateJournal />,
      },
      {
        path: "/update-comic/:id",
        element: <UpdateComic />,
      },
      
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
