import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { EnrollmentLayout } from '../layouts/EnrollmentLayout';
import { Dashboard } from 'views/Dashboard/Dashboard';

export const RouterComponent: React.FC = () => (
  <Routes>
    <Route
      path="/*"
      element={
        <PublicRoute>
          <EnrollmentLayout />
        </PublicRoute>
      }
    />
    <Route
      path="dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
  </Routes>
);
