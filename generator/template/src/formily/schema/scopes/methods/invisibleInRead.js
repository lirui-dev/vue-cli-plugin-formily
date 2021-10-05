export default function (field) {
  if(!field.readPretty) {
    field.visible = true;
  } else {
    field.visible = false;
  }
}