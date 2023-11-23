import Home from './components/Home';
import About from './components/About';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/about-me" element={<About />} />
      </Route>
    )
  );
  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <>
      <Navbar />

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
