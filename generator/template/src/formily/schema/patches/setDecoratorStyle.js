export default function (schema) {
  if (schema?.['x-decorator'] === 'FormItem') {
    schema['x-decorator-props'] = {
      ...schema?.['x-decorator-props'],
      "border": false,
      "colon": true,
    }
  }

  return schema
}