export default function (schema) {
  if (window.__wxjs_environment === 'miniprogram') {
    if (
      schema?.['x-component'] === 'Upload'
    ) {
      schema['x-component-props'] = {
        ...schema?.['x-component-props'],
        "readonly": "{{wxUsable.value}}",
        "click-upload": "{{useWxChooseImage}}",
      }
    }
  }
  return schema
}
