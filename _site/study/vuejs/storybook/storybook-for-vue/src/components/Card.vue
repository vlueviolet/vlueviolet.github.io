<template>
  <div class="card">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: {
      type: String,
      required: true
    },
    message: String
  }
}
</script>