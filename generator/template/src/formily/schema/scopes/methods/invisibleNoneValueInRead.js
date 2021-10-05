// Utils
import _ from 'lodash';

export default function (field) {
  if(field.readPretty) {
    if(_.isEmpty(field.value)) {
      field.visible = false;
    } else {
      field.visible = true;
    }
  }
}