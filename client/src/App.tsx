import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { HomePage, RoomPage, NotFoundPage, NewHomePage } from "@/pages";
import { Path } from "@/settings";

export function App(): ReactElement {
  return (
    <Routes>
      <Route path={Path.OldHome} element={<HomePage />} />
      <Route path={Path.Home} element={<NewHomePage />} />
      <Route path={Path.Room} element={<RoomPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
