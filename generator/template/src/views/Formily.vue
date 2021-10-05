<template>
  <div class="formily" v-if="schemaLoading">
    <Form :form="form">
      <SchemaField :schema="schema" :scope="scope" />
    </Form>
  </div>
</template>

<script>
import { createSchemaField } from "@formily/vue";
import {
  Form,
  FormItem,
  Input,
  Select,
  FormButtonGroup,
  Submit,
} from "@formily/element";

const { SchemaField } = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    FormButtonGroup,
    Submit,
  },
});

export default {
  components: {
    Form,
    SchemaField,
  },
  setup(props, context) {
    // queries
    useQueryDataSetting();

    // Formily
    const { schema, scope, form } = useFormily(props);
    store.commit("setForm", { form });

    // loading state
    store.commit("setSchemaLoadingRef", ref(true));
    store.commit("setFormilyLoadingRef", ref(true));

    onMounted(() => {
      getSchemData({ local: true, schemaCode: props?.schemaCode }).then(
        (schemaData) => {
          schema.fromJSON(schemaData.json);
          if (schema?.title) {
            document.title = schema.title;
          }
          store.commit("setSchema", { schema });
          store.state.schemaLoadingRef.value = false;
          console.log("Schema Instance", schema);
        }
      );
    });

    return {
      loading,
      form,
      schema,
      scope,
    };
  },
};

async function getSchemData({ local, schemaCode }) {
  try {
    if (local) {
      return await import(`@/formily/schema/jsons/${schemaCode}.json`).then(
        (module) => {
          return {
            json: module.default,
            id: undefined,
          };
        }
      );
    } else {
      return await fetchEntityData("schema", schemaCode).then((data) => {
        return {
          json: data.json,
          id: data.id,
        };
      });
    }
  } catch (err) {
    Toast({ type: "danger", message: err.message });
  }

  return {
    json: {},
    id: undefined,
  };
}
</script>

<style>
</style>