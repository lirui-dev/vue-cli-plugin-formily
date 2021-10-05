// Formily
import {
  onFormSubmitValidateSuccess,
  onFormMount,
} from "@formily/core"

// Effect Hooks Callback
// Form
import onFormSubmitValidateSuccessCB from './form/onFormSubmitValidateSuccess'
import onFormMountCB from './form/onFormMount'
// Field

export default function useEffects () {
  return function effects () {
    // Form
    onFormMount(onFormMountCB)
    onFormSubmitValidateSuccess(onFormSubmitValidateSuccessCB)
    // Field
  }
}