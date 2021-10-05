export default function (schema) {
  if (
    schema?.['x-component']?.includes('Input') ||
    schema?.['x-component'] === 'Select'
  ) {
    schema['x-component-props'] = {
      ...schema?.['x-component-props'],
      "input-style": {
        "padding": "3px 5px",
        "border": "1px solid #8abe40",
        "border-radius": "3px",
        "line-height": "24px"
      }
    }
  }
  return schema
}