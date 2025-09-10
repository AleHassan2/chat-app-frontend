import LoadingScreen from "../components/common/LoadingScreen";
import useAuthStore from "../store/authStore";

const AppRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Protected routes */}
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/displays"
          element={
            <ProtectedRoute>
              <DisplaysList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/slideshows"
          element={
            <ProtectedRoute>
              <SlideshowsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/slides"
          element={
            <ProtectedRoute>
              <SlideLibrary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/accounts"
          element={
            <ProtectedRoute requiredRole="admin">
              <AccountsList />
            </ProtectedRoute>
          }
        /> */}

        {/* Catch all route */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
