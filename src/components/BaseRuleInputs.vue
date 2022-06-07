<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import type { Parameter } from '@/interfaces/parameter';
import type { RuleData } from '@/interfaces/rule';
import BaseParameterInput from './BaseParameterInput.vue';

interface Props {
  id: number;
  rule: RuleData;
  ruleNumber: number;
  isFormResetted: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['onRuleChange', 'onRemoveRule']);

const fields = [
  { label: 'Select field', value: null },
  { label: 'Field 1', value: 'Field 1' },
  { label: 'Field 2', value: 'Field 2' },
  { label: 'Field 3', value: 'Field 3' },
];

const operators = [
  { label: 'Select operator', value: null },
  { label: 'Operator 1', value: 'Operator 1' },
  { label: 'Operator 2', value: 'Operator 2' },
  { label: 'Operator 3', value: 'Operator 3' },
]

const initialParameters = computed(() => {
  return props.rule.parameters;
});

watch(props, (newValue, _) => {
  if (newValue.isFormResetted) {
    reset();
  }
});

const fieldValue = ref(null);
const operatorValue = ref(null);
const parametersValue = ref<Parameter[]>([{ id: 1, value: '' }]);
const revenue = ref('');

function onBtnCloseClick() {
  emit('onRemoveRule', props.id);
}

function emitOnRuleChange() {
  emit('onRuleChange', { id: props.id, field: fieldValue.value, operator: operatorValue.value, parameters: parametersValue.value, revenue: revenue.value });
}

function onParametersChange(parameter: { id: number, value: string }) {
  const { id, value } = parameter;
  const parameterIndex = parametersValue.value.findIndex(param => param.id === id);
  parametersValue.value[parameterIndex].value = value;
  emitOnRuleChange()
}

function onAddParamBtn() {
  const newId = parametersValue.value[parametersValue.value.length - 1].id + 1;
  parametersValue.value.push({ id: newId, value: '' });
  emitOnRuleChange();
}

function onRemoveParamBtn(id: number) {
  const parameterIndex = parametersValue.value.findIndex(param => param.id === id);
  parametersValue.value.splice(parameterIndex, 1);
  emitOnRuleChange();
}

function reset() {
  fieldValue.value = null;
  operatorValue.value = null;
  parametersValue.value = [{ id: 1, value: '' }].slice();
  revenue.value = ''
}
</script>

<template>
  <div id="rule-item">
    <div class="rule-header">
      <p class="title">Rule {{ ruleNumber }}</p>
      <button class="btn-close" type="button" @click="onBtnCloseClick" v-if="props.rule.id !== 1">
        <img src="@/assets/close.svg" alt="Close" class="icon-close" />
      </button>
    </div>

    <div class="rule-table">
      <div class="rule-table-row">
        <div class="rule-table-col">If</div>

        <div class="rule-table-col">
          <select name="field" id="field" v-model="fieldValue" @change="emitOnRuleChange">
            <option v-for="(field, index) in fields" :key="index" :value="field.value">
              {{ field.label }}
            </option>
          </select>
        </div>

        <div class="rule-table-col">
          <select name="operator" id="operator" v-model="operatorValue" @change="emitOnRuleChange">
            <option v-for="(operator, index) in operators" :key="index" :value="operator.value">
              {{ operator.label }}
            </option>
          </select>
        </div>

        <div class="rule-table-col add-param" id="parameters-column">
          <BaseParameterInput v-for="(parameter) in parametersValue" :key="parameter.id" :model-value="parameter.value"
            @update:model-value="onParametersChange" :id="parameter.id" @add-parameter="onAddParamBtn"
            @remove-parameter="onRemoveParamBtn" />
        </div>
      </div>
    </div>

    <div class="rule-revenue-row">
      <span>then revenue is</span>
      <input type="number" name="revenue" id="revenue" placeholder="% Enter amount" @input="emitOnRuleChange"
        v-model="revenue" />
    </div>
  </div>
</template>

<style scoped>
#rule-item {
  border: 1.5px dashed var(--color-gray-line);
  border-radius: var(--border-radius);
  padding: 1em;
}

.rule-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  margin-bottom: 1em;
}

.btn-close {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-close {
  width: 1rem;
  height: 1rem;
}

.rule-table {
  background-color: var(--color-light-gray-bg);
  padding: 1em;
  border-radius: var(--border-radius);
}

.rule-table-row:not(:last-of-type) {
  margin-bottom: 1em;
}

.rule-table-col {
  position: relative;
  display: flex;
  flex-direction: column;
}

.rule-table-col:not(:last-of-type) {
  margin-bottom: 0.5em;
}

.rule-table-col.add-param {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.rule-revenue-row {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
}

.rule-revenue-row>input {
  margin-top: 0.5em;
}

.btn-container {
  justify-self: end;
}

@media only screen and (min-width: 450px) {
  .rule-table {
    padding: 1.5em;
  }
}

@media only screen and (min-width: 650px) {
  .rule-table-row {
    display: grid;
    grid-template-columns: 0.3fr 1.5fr 1.5fr 3fr;
    align-items: start;
    gap: 0.5em;
  }

  .rule-table-col:first-of-type {
    margin-top: 0.6em;
  }

  .rule-table-col:not(:last-of-type) {
    margin-bottom: 0;
  }

  .rule-revenue-row {
    flex-direction: row;
    align-items: center;
  }

  .rule-revenue-row>input {
    margin-top: 0;
    margin-left: 1em;
  }
}
</style>