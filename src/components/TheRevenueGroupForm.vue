<script setup lang="ts">
import { ref } from 'vue'
import type { RuleData } from '@/interfaces/rule';
import BaseRuleInputs from './BaseRuleInputs.vue';

const emit = defineEmits(['onFormSubmit']);

const revenueGroupId = ref(1);
const groupName = ref('');
const groupDescription = ref('');
const specialGroup = ref(false);
const rules = ref<RuleData[]>([
  { id: 1, field: null, operator: null, parameters: [{ id: 1, value: '' }], revenue: '' }
]);
const isFormResetted = ref(false);

function onFormSubmit(e: Event) {
  e.preventDefault();
  emit('onFormSubmit', { id: revenueGroupId.value, name: groupName.value, description: groupDescription.value, specialGroup: specialGroup.value, rules: rules.value });
  revenueGroupId.value = revenueGroupId.value + 1;
  reset();
}

function onAddRuleBtnClick() {
  const newId = rules.value[rules.value.length - 1].id + 1;
  rules.value.push({ id: newId, field: null, operator: null, parameters: [{ id: 1, value: '' }], revenue: '' });
}

function onRemoveRule(id: number) {
  const ruleIndex = rules.value.findIndex(rule => rule.id === id);
  rules.value.splice(ruleIndex, 1);
}

function onRuleChange(ruleData: RuleData) {
  const ruleIndex = rules.value.findIndex(rule => rule.id === ruleData.id);
  rules.value[ruleIndex] = ruleData;
}

function reset() {
  groupName.value = '';
  groupDescription.value = '';
  specialGroup.value = false;
  isFormResetted.value = true;
  rules.value = [
    { id: 1, field: null, operator: null, parameters: [{ id: 1, value: '' }], revenue: '' }
  ].slice();

  setTimeout(() => {
    isFormResetted.value = false;
  }, 10);
}
</script>

<template>
  <form id="form" @submit="onFormSubmit">
    <h1>Create Revenue Group</h1>

    <div class="form-control">
      <div class="input-container">
        <label for="groupNameInput">Group Name</label>
        <input type="text" id="groupNameInput" name="groupName" placeholder="Name" v-model="groupName" />
      </div>
    </div>

    <div class="form-control">
      <div class="input-container">
        <label for="groupDescriptionInput">Group Description</label>
        <textarea name="groupDescription" id="groupDescriptionInput" rows="5" placeholder="Add description"
          v-model="groupDescription"></textarea>
      </div>
    </div>

    <div class="form-control">
      <div class="input-container checkbox">
        <input type="checkbox" id="specialGroupInput" name="specialGroup" v-model="specialGroup" />
        <label for="specialGroupInput">Special Group</label>
      </div>
    </div>

    <div class="form-row">
      <h2>Rules</h2>

      <button class="btn-add" type="button" id="btn-add-rule" @click="onAddRuleBtnClick">
        <img src="@/assets/add.svg" alt="Add" class="icon-add" />
        <span class="text-add">Add</span>
      </button>
    </div>

    <ul class="rules-list">
      <li class="rule-item" v-for="(rule, index) in rules" :key="rule.id">
        <BaseRuleInputs :id="rule.id" :rule="rule" :ruleNumber="index + 1" :isFormResetted="isFormResetted" @on-rule-change="onRuleChange"
          @on-remove-rule="onRemoveRule" />
      </li>
    </ul>

    <div class="form-btn-container">
      <button class="btn-reset form-btn" type="reset" @click="reset">Reset</button>
      <button class="btn-submit form-btn" type="submit">Submit</button>
    </div>
  </form>
</template>

<style scoped>
#form {
  border: 1px solid var(--color-gray-line);
  border-radius: var(--border-radius);
  padding: 1.5em;
  font-size: 0.8rem;
}

#form>h1 {
  font-size: 1.1rem;
  margin-bottom: 1.5em;
}

.form-control {
  margin-bottom: 1em;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-container>label {
  margin-bottom: 0.5em;
}

.input-container.checkbox {
  flex-direction: row;
  align-items: center;
}

.input-container.checkbox>label {
  margin-bottom: 0;
  margin-left: 0.5em;
  font-size: 0.75em;
  font-weight: 550;
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2em;
  margin-top: 2em;
}

.form-row>h2 {
  font-size: 1rem;
}

.btn-add {
  display: flex;
  align-items: center;
  padding: 0.4em 0.8em;
  background-color: var(--color-secondary);
  color: var(--color-primary);
  border-radius: 5rem;
  font-weight: 550;
  font-size: 0.7rem;
}

.icon-add {
  width: 0.9rem;
  height: 0.9rem;
  margin-right: 0.3em;
}

.rules-list {
  margin-bottom: 3em;
}

.rule-item:not(:last-child) {
  margin-bottom: 1.5em;
}

.form-btn-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.form-btn {
  padding: 0.8em 1.2em;
  border-radius: var(--border-radius-field);
  font-weight: 550;
  font-size: 0.9em;
}

.btn-reset {
  border: 1px solid var(--color-gray-line);
  margin-right: 0.5em;
}

.btn-submit {
  border: 1px solid var(--color-primary);
  color: var(--color-white);
  background-color: var(--color-primary);
}

@media only screen and (min-width: 450px) {
  #form {
    padding: 2em;
  }
}

@media only screen and (min-width: 550px) {
  #form {
    font-size: 0.9rem;
  }

  #form>h1 {
    font-size: 1.3rem;
  }

  .input-container.checkbox>label {
    font-size: 0.8em;
  }

  .btn-add {
    font-size: 0.8rem;
  }

  .icon-add {
    width: 1.1rem;
    height: 1.1rem;
  }
}

@media only screen and (min-width: 1150px) {
  #form {
    font-size: 0.8rem;
  }
}
</style>