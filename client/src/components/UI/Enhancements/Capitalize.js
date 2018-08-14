import React from 'react'

const Capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Capitalize