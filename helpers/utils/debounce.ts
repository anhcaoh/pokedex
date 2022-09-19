/*
  Created on 9/17/2022
  by Anh Cao
  
  This helper debounce func is inspired and derived from the Internet
  courtesy of https://dev.to/bwca/create-a-debounce-function-from-scratch-in-typescript-560m
*/

function debounce<TypeAny = unknown, TypeReturn = void>( 
  callbackFunc: (args: TypeAny) => TypeReturn, 
  durationInMs: number = 500): [(args: TypeAny) => Promise<TypeReturn>, () => void ] {
  let timer: ReturnType<typeof setTimeout>
  const debouncedFunc = (args: TypeAny): Promise<TypeReturn> => 
    new Promise((resolve) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => resolve(callbackFunc(args)), durationInMs)
  })
  const cleanup = () => clearTimeout(timer)
  return [debouncedFunc, cleanup]
}

export default debounce