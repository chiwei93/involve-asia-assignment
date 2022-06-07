<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  modelValue: String,
  id: Number
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'addParameter', 'removeParameter']);

const idOrName = computed(() => {
  return `parameter-${props.id}`
});

const isFirstParameter = computed(() => {
  return props.id === 1;
});

function onInputChange(e: Event) {
  emit('update:modelValue', { id: props.id, value: (e.target as HTMLInputElement).value });
}

function onAddBtnClick() {
  emit('addParameter');
}

function onRemoveBtnClick() {
  emit('removeParameter', props.id);
}
</script>

<template>
  <div id="add-param-container">
    <div class="input-container">
      <input type="text" :name="idOrName" :id="idOrName" placeholder="Enter parameter" class="parameter-input"
        :value="modelValue" @input="onInputChange" />
    </div>

    <div class="btn-container">
      <button class="btn-add-param" type="button" v-if="isFirstParameter" @click="onAddBtnClick">
        <img src="@/assets/add_circle_outline.svg" alt="Add with circle" />
      </button>

      <button class="btn-add-param" type="button" v-if="!isFirstParameter" @click="onRemoveBtnClick">
        <img src="@/assets/remove_circle_outline.svg" alt="remove with circle" />
      </button>
    </div>
  </div>
</template>

<style scoped>
#add-param-container {
  display: grid;
  grid-template-columns: 7fr 1fr;
  align-items: center;
  gap: 0.5em;
}

.input-container {
  position: relative;
}

.input-container>input {
  width: 100%;
}

.btn-container {
  justify-self: end;
}

@media only screen and (min-width: 550px) {
  .btn-add-param>img {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>