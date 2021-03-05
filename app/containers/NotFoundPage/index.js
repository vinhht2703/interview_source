/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default function NotFound() {
  return (
    <div className="container py-5">
      <h1 className="text-center">
        <FormattedMessage {...messages.header} />
      </h1>
    </div>
  );
}
