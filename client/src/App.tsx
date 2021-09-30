import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HomePage, RoomPage } from 'pages';

export function App(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room/:id" element={<RoomPage />} />
    </Routes>
  );
}
