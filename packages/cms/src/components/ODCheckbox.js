import { withStyles } from '@material-ui/styles';
import { Checkbox } from '@material-ui/core';

export const ODCheckbox = withStyles({
  root: {
    color: '#ffb347',
    '&$checked': {
      color: '#ffb347'
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);
