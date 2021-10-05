// States
import wxUsable from "./states/wxUsable"
// Methods
import invisibleInRead from './methods/invisibleInRead'
import invisibleNoneValueInRead from './methods/invisibleNoneValueInRead'
import submit from './methods/submit'
import visibleInRead from './methods/visibleInRead'
// Contents


export default function useScopes () {
  return {
    // states
    wxUsable,
    // methods
    invisibleInRead,
    invisibleNoneValueInRead,
    submit,
    visibleInRead,
    // contents
  }

}
