// Vue
import store from "@/store"
// Vant
// import { Toast, } from "vant"
import { Message } from 'element-ui'
// Formily
import {
  createForm,
  setValidateLanguage,
} from "@formily/core"
import { observable, autorun, } from "@formily/reactive"
import { Schema, } from "@formily/vue"
import { usePatches, useScopes } from '@/formily/schema'
import {
  CLASS_NAME_KEY,
  CLASS_PROPERTY_KEY,
} from '@/formily/constant'
import useEffects from '@/formily/effects'
// Utils
import _ from "lodash"
// Common
import { request, } from "@/common/utils"
import { api, rest, } from "@/common"
import { loadEntities, } from '@/common/rest'

export default function ({ mode, }) {
  const { schema } = useSchema({ usePatches, })

  const { scope } = useScope({ schema, useScopes, })

  const { form } = useForm({ mode, schema, })

  // isSave && saveSchemaData(schemaData);

  return {
    schema,
    scope,
    form,
  }
}

function useSchema ({ usePatches, }) {
  // 设置类型默认组件
  Schema.registerTypeDefaultComponents({
    string: "Input",
    number: "Input.Number",
    intergar: "Input.Intergar",
  })
  Schema.enablePolyfills(['1.0'])

  Schema.registerPatches(
    ...usePatches()
  )
  return {
    schema: new Schema(),
  }
}

function useScope ({ schema, useScopes, }) {
  const scope = {
    ...rest,
    ...useScopes(),
    useAsyncDataSource: (service) => (field) => {
      /**
       * Initializing
       */
      // data source
      if (!field.dataSource) field.dataSource = []
      // data source count
      const count = observable.ref(0)
      // load data source options
      const serviceOptions = observable.ref({
        offset: 0,
        limit: 20,
        search: {},
      })
      // Component finished prop
      const finished = observable.ref(false)
      // auto run
      autorun(() => {
        field.setComponentProps({ count: count.value })
        field.setComponentProps({ searchOptions: serviceOptions.value.search })
        field.setComponentProps({ loadOptions: serviceOptions.value })
        field.setComponentProps({ finished: finished.value })
      })
      // field data name
      const {
        props: { name: fieldName },
      } = field
      let dataName = ''
      schema.mapProperties((property, key) => {
        if (key === fieldName) dataName = property[CLASS_NAME_KEY]
      })
      // onFieldInit(field.path.entire, (field) => {
      !field.component[1].loadData &&
        field.setComponentProps({
          loadData: async (_loadOptions, _searchOptions) => {
            console.log(_loadOptions, _searchOptions)
            try {
              field.loading = true

              // reset
              if (_loadOptions?.offset === 0) {
                field.dataSource = []
                count.value = 0
                if (finished.value) finished.value = false
              }

              serviceOptions.value = {
                ...serviceOptions.value,
                ..._loadOptions,
              }
              if (!_.isEqual(_searchOptions, serviceOptions.value.search)) {
                serviceOptions.value.search = _searchOptions
              }

              let data = await service(
                dataName,
                null,
                serviceOptions.value,
              )
              // console.log(data);
              // data source
              field.dataSource = [...field.dataSource, ...data.list]
              // data source count
              count.value = data.totalCount
              // loading state
              field.loading = false
              // finished state
              if (
                data.currPage === data.totalPage ||
                data.list.length === 0
              ) {
                finished.value = true
              }
              // load options
              serviceOptions.value = {
                ...serviceOptions.value,
                offset: field.dataSource.length,
              }
            } catch (err) {
              console.log(err)
              // Toast({ type: 'danger', message: err.message })
              Message({ type: 'error', message: err.message })
            }
          },
          onSetLoading: (bool) => {
            field.loading = bool || !field.loading
          },
        })
      // });
    },
    handleSearchEntities: ({ dataName, searchOptions, loadOptions }) => {
      const entityName = dataName
      // https://doc.cuba-platform.cn/frontend/cuba-frontend-docs/v20.1/api-reference/cuba-rest-js/interfaces/_filter_.condition.html
      // const searchOptions = [{
      //   property: "keyword",
      //   value: searchOptions.keyword || "",
      //   operator: "contains", // "=" | ">" | ">=" | "<" | "<=" | "<>" | "startsWith" | "endsWith" | "contains" | "doesNotContain" | "in" | "notIn" | "notEmpty"
      // }];
      loadOptions = {
        offset: 0,
        limit: 20,
        ...loadOptions,
      }
      return loadEntities(entityName, loadOptions, searchOptions)
    },
  }

  return {
    scope,
  }
}

function useForm ({ mode, schema, }) {

  const fieldsNeedDataSource = []
  schema.mapProperties((property, key) => {
    if (property[CLASS_NAME_KEY] && property[CLASS_PROPERTY_KEY]) {
      fieldsNeedDataSource.push(key)
    }
  })

  const effects = useEffects()

  const form = createForm({
    effects,
    pattern: getFormilyPattern(mode),
  })

  console.log("form Instance", form)

  // validation
  setValidateLanguage("zh-CN")

  return {
    form,
  }
}

function getFormilyPattern (mode) {
  let pattern = ""
  switch (mode) {
    case "read":
      pattern = "readPretty"
      break
    case "readPretty":
      pattern = "readPretty"
      break
    case "readOnly":
      pattern = "readOnly"
      break
    default:
      pattern = "editable"
  }
  return pattern
}

async function saveSchemaData (schemaData) {
  let json = schemaData.json
  if (json.properties.buttons) delete json.properties.buttons
  json =
    typeof schemaData.json === "string"
      ? schemaData.json
      : JSON.stringify(schemaData.json)
  const res = await request.post(store.state.server + api.save.schema, {
    sourceCode: schemaData.code,
    // id: schemaData.id,
    json,
  })
  console.log(res)
}
