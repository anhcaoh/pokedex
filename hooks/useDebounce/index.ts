/*
  Created on 9/17/2022
  by Anh Cao
  
  This hook is bootstrapped from .templates/hook
*/

import debounce from 'helpers/utils/debounce'
import { useEffect, useState } from 'react'

const useDebounce = <TypeAny = unknown, TypeReturn = void>(
  callbackFunc: (args: any) => TypeReturn,
  durationInMs?: number
): ((args: TypeAny) =>  Promise<TypeReturn>) => {
  const [debouncedValue, cleanup] = debounce(callbackFunc, durationInMs)
  useEffect(() => {
    cleanup()
  }, [cleanup])
  return debouncedValue
}
export default useDebounce
