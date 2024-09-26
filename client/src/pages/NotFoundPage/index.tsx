import { Link } from "@tanstack/react-router";
import { ReactElement } from "react";

import { PageLayout } from "@/components";

export function NotFoundPage(): ReactElement {
  return (
    <PageLayout>
      <div className="flex flex-col items-center flex-grow">
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <Link to="/">
          <span className="text-lg">Go to home</span>
        </Link>
      </div>
    </PageLayout>
  );
}
