import React from 'react';
import { render } from '@testing-library/react';


export * from '@testing-library/react';

/**
 * @renderWithOptions use this function when you want your test
 * component to access our design system
 * @param {children:React.ReactNode}
 * @returns a transpiled reactNode object
 */
export function renderWithOptions(children: React.ReactNode) {
  render(
    <div>
      {children}
    </div>
  );
}