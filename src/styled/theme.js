import Base from './themes/base-theme';
import Borders from './themes/borders-theme';
import Button from './themes/button-theme';
import Checkbox from './themes/checkbox-theme';
import Colors from './themes/colors-theme';
import Input from './themes/input-theme';
import Textarea from './themes/textarea-theme';

export const colors = Colors();
export const borders = Borders({ colors });
export const baseStyles = Base({ colors });

// modules
export const button = Button({ borders, colors });
export const checkbox = Checkbox({ borders, colors });
export const input = Input({ borders, colors });
export const textarea = Textarea({ borders, colors });

export default {
  borders,
  colors,
  navbar: {
    height: '40px'
  },
  button,
  checkbox,
  input,
  textarea
};
