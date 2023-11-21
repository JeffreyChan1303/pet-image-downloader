import Home from './components/Home';
import About from './components/About';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

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
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="about-me">About Me</Link>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
