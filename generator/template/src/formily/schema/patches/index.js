import setComponentStyle from './setComponentStyle'
import setDecoratorStyle from './setDecoratorStyle'
import setPlaceholder from './setPlaceholder'
import setWXEnv from './setWXEnv'

export default function usePatches () {
  const patches = [
    setComponentStyle,
    setDecoratorStyle,
    setPlaceholder,
    setWXEnv,
  ]
  return patches
}

