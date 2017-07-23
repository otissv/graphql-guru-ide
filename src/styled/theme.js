import Base from './themes/base-theme';
import Borders from './themes/borders-theme';
import Button from './themes/button-theme';
import Checkbox from './themes/checkbox-theme';
import Colors from './themes/colors-theme';
import Input from './themes/input-theme';
import Textarea from './themes/textarea-theme';
import Fonts from './themes/fonts-theme';
import Clearfix from './themes/clearfix-theme';

export const colors = Colors();
export const fonts = Fonts({ colors });
export const borders = Borders({ colors });
export const baseStyles = Base({ colors, fonts });
export const clearfix = Clearfix();

// modules
export const button = Button({ borders, colors, fonts });
export const checkbox = Checkbox({ borders, colors, fonts });
export const input = Input({ borders, colors, fonts });
export const textarea = Textarea({ borders, colors, fonts });

export default {
  borders,
  clearfix,
  colors,
  fonts,
  navbar: {
    height: '40px'
  },
  button,
  checkbox,
  input,
  textarea
};
