import type { ReactElement } from 'react'
import type React from 'react'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import type { Ref } from 'vue'
import { onMounted } from 'vue'

function renderReact(
  Component: React.ComponentType<any>,
  el: Ref<Element | undefined>,
) {
  onMounted(() => {
    const root = createRoot(el.value!)
    root.render(createElement(Component, null, null) as ReactElement)
  })
}
export default renderReact
