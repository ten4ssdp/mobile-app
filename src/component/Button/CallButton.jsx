import PropTypes from 'prop-types';
import React from 'react';

import Button from '.';
import { phoneCall } from '../../utils/phoneCall';

export default function CallButton({ variant }) {
  return (
    <Button variant={variant} func={() => phoneCall(+33122334455)}>
      Appeler l'opérateur
    </Button>
  );
}

CallButton.propType = {
  variant: PropTypes.oneOf(['default', null])
};
