import { forwardRef } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

interface ReactRouterLinkProps extends Omit<RouterLinkProps, 'to'> {
  href: RouterLinkProps['to'];
}

// Map href (MUI) -> to (react-router)
export const LinkBehavior = forwardRef<HTMLAnchorElement, ReactRouterLinkProps>(
  ({ href, ...other }, ref) => <RouterLink ref={ref} to={href} {...other} />,
);

LinkBehavior.displayName = 'LinkBehavior';
