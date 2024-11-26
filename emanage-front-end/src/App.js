import React from 'react';
import ViewEmployee from './Components/ViewEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import DeleteEmployee from './Components/DeleteEmployee';
import CreateEmployee from './Components/CreateEmployee';
import Navigation from './Components/Navigation';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Navigation/>,
      children:[
        {
          path:"/",
          element:<ViewEmployee/>
        },
        {
          path:"/create",
          element:<CreateEmployee/>
        },
        {
          path:"/update",
          element:<UpdateEmployee/>
        },
        {
          path:"/delete",
          element:<DeleteEmployee/>
        },
      ]
    },
  ])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
