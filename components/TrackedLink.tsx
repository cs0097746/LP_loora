'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { track } from '@/lib/analytics';
import { readPersistedUtm } from '@/lib/utm';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  children: ReactNode;
};

export function TrackedLink({ eventName, children, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(event) => {
        track(eventName, readPersistedUtm());
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
