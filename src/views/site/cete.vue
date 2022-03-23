<template>
<div>
    <dropdown :options="arrayOfObjects" :selected="object" v-on:updateOption="methodToRunOnSelect">
        hello
      
    </dropdown>
    </div>
</template>
<script>
import dropdown from 'vue-dropdowns';

export default {
        data() {
          return {
            arrayOfObjects: ['hello','fello'],
            object: {
              name: 'Object Name',
            }
          }
        },

        components: {
            'dropdown': dropdown,
        },

        methods: {
          methodToRunOnSelect(payload) {
            this.object = payload;
          }
        }
      }
</script>

