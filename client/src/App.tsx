import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HomePage, RoomPage, NotFoundPage } from 'pages';

export function App(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
