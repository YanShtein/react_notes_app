import { useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('light');

  function changeTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  let themeClass = theme === 'light' ? 'theme_light' : 'theme_dark';
  let svgColor = theme === 'light' ? {color: 'black'} : {color: 'white'};

  return { changeTheme, themeClass, svgColor };
};

export default useTheme;
