/*
  Created on 9/17/2022
  by Anh Cao
  
  This hook is bootstrapped from .templates/hook
*/

import axios from 'axios'
import { useEffect, useState } from 'react'

function use__templateNameToPascalCase__() {
  const [__templateName__, set__templateNameToPascalCase__] = useState(null)
  useEffect(() => {
    // Perform API request
    ;(async () => {
      const response = await axios({
        method: 'GET',
        url: '/api/pokemon',
      })
      if (response?.status === 200)
        set__templateNameToPascalCase__(response?.data)
    })()
  }, [])
  return [__templateName__, set__templateNameToPascalCase__]
}

export default use__templateNameToPascalCase__
