import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Input from '.';
import colors from '../../utils/colors';

export default function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      {...props}
      type="password"
      secureTextEntry={!showPassword}
      required
      ionicons="md-eye"
      iconFunc={() => setShowPassword((prev) => !prev)}
      iconColor={showPassword ? colors['calendar-inactive-black'] : colors['grey-logo']}
      placeholder="Mot de passe"
    />
  );
}

PasswordInput.propTypes = {
  props: PropTypes.object
};
