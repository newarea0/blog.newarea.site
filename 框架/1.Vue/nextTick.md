# nextTick

```vue
<template>
  <div>
    <button @click="handleClick">button</button>
    <p ref="pRef">{{ msg }}</p>
  </div>
</template>

<script setup>
  import { ref, onUpdated, watch } from 'vue'

  defineOptions({
    name: 'nextTick'
  })
  const count = ref(0)
  const show = ref(false)
  const pRef = ref(null)
  const msg = ref('hello world')

  watch(msg, (val) => {
    // console.log(0, val);

    console.log(0, pRef.value.textContent);
  })

  function handleClick() {
    // count.value ++
    // count.value = count.value + 2
    // show.value = !show.value

    // console.log(pRef.value.textContent);
    // // console.log(1, count.value);
    msg.value = 'hello vue'
  }

  // onUpdated(() => {
  //   console.log(count.value);
  // })
</script>
```