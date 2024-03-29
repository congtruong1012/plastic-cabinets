import routes from 'assets/js/routes';
import MainLayout from 'components/Layouts/MainLayout';
import Login from 'containers/Pages/Login';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Response from 'containers/Response';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckLogged } from './reducer';
import { unwrapResult } from '@reduxjs/toolkit';
import LoadingCircular from 'components/molecules/Loading/LoadingCircular';
import PageForbidden from '../Response/PageForbidden';

const pageNotLogin = ['/login'];

function App() {
  const { pathname } = useLocation();
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isLogin, user } = useSelector((state) => state.app);

  useEffect(() => {
    if (!pageNotLogin.includes(pathname)) {
      (async () => {
        try {
          const res = await dispatch(fetchCheckLogged());
          unwrapResult(res);
        } catch (error) {
          console.log('error', error);
          navigator('/login');
        }
      })();
    }
  }, []);

  return (
    <>
      {pathname !== '/login' ? (
        <>
          {isLoading ? (
            <LoadingCircular isInitApp />
          ) : (
            <>
              {isLogin && (
                <>
                  {[0, 1].includes(user?.role) ? (
                    <MainLayout>
                      <Routes>
                        {routes.map((item, index) => {
                          const Component = item?.element;
                          if (Component) {
                            return (
                              <Route key={String(index)} path={item.path} element={<Component role={user?.role} />} />
                            );
                          }
                          return <Route key={String(index)} path={item.path} element={<Response code={403} />} />;
                        })}
                        <Route path="*" element={<Response />} />
                      </Routes>
                    </MainLayout>
                  ) : (
                    <PageForbidden />
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
