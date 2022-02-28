import React from "react";
import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import TestSuite from "../pages/TestSuite";
import Features from "../pages/Features";
import BasicLayout from "../layouts/BasicLayout";

export default function MyRouter() {
  return useRoutes([
    {
      path: "/",
      element: <BasicLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "testSuite",
          element: <TestSuite />,
        },
        {
          path: "feature",
          element: <Features />,
        },
      ],
    },
  ]);
}
