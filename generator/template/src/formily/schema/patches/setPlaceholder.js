import {
  CLASS_NAME_KEY
} from '../../constant'

export default function (schema) {
  if (schema?.['x-component']?.includes('Input')) {
    schema['x-component-props'] = {
      ...schema?.['x-component-props'],
      placeholder: `请输入${(schema.title) || (' ' + schema.name) || (' ' + schema[CLASS_NAME_KEY]) || ('相关信息')}`
    }
  }

  if(schema?.['x-component'] === 'Select') {
    schema['x-component-props'] = {
      ...schema?.['x-component-props'],
      placeholder: `请选择${(schema.title) || (' ' + schema.name) || (' ' + schema[CLASS_NAME_KEY]) || ('相关信息')}`
    }
  }

  return schema
}