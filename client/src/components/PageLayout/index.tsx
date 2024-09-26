import { ReactElement, ReactNode } from "react";

import { Header } from "@/components/Header";
import { Room, User } from "@/types";

interface PageLayoutProps {
  children: ReactNode;
  room?: Room;
  users?: User[];
}

export function PageLayout({
  children,
  room,
  users,
}: PageLayoutProps): ReactElement {
  return (
    <>
      <Header room={room} users={users} />
      <main className="flex-grow">{children}</main>
    </>
  );
}
