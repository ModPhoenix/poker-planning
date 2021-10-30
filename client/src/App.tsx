import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HomePage, RoomPage, NotFoundPage } from 'pages';
import { Path } from 'settings';

export function App(): ReactElement {
  return (
    <Routes>
      <Route path={Path.Home} element={<HomePage />} />
      <Route path={Path.Room} element={<RoomPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
