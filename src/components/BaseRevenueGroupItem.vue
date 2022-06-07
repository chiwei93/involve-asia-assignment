<script lang="ts" setup>
import { ref } from 'vue';
import type { RevenueGroup } from '@/interfaces/revenueGroup';
import type { RuleData } from '@/interfaces/rule';

interface Props {
  revenueGroup: RevenueGroup;
  id: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['onRemoveGroup']);

const maxParameterLength = ref(0);

let maxLength = 0;
props.revenueGroup.rules.forEach(rule => {
  if (rule.parameters.length > maxLength) {
    maxLength = rule.parameters.length;
  }
});
maxParameterLength.value = maxLength;

function onRemoveBtnClick() {
  emit('onRemoveGroup', props.id);
}

function getParameter(rule: RuleData, index: number) {
  if (rule.parameters[index]) {
    return rule.parameters[index].value;
  } else {
    return '';
  }
}
</script>

<template>
  <div id="group-item">
    <div class="group-header-container">
      <div class="group-header">
        <div class="title">
          <span class="name">Group Name</span>
          <span class="tag-special" v-if="revenueGroup.specialGroup">Special Group</span>
        </div>

        <div class="group-header-btn-container">
          <button class="btn-remove" @click="onRemoveBtnClick">
            <img src="@/assets/Iconsdelete.svg" alt="trash icon" class="icon-trash" />
          </button>
        </div>
      </div>

      <p class="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A
        reiciendis dolorem ullam enim aut. Quis voluptate voluptas nisi
        ipsum! Explicabo ab, tempora rem laudantium cumque molestiae
        repellendus neque eius expedita!
      </p>
    </div>

    <div class="group-table">
      <div class="group-table-head">
        <div class="group-table-row">
          <div class="group-table-col">
            <button class="btn-sort">
              <span class="title">Rule</span>
              <img src="@/assets/unfold.svg" alt="Unfold icon" />
            </button>
          </div>

          <div class="group-table-col">
            <button class="btn-sort">
              <span class="title">Field</span>
              <img src="@/assets/unfold.svg" alt="Unfold icon" />
            </button>
          </div>

          <div class="group-table-col">
            <button class="btn-sort">
              <span class="title">Operator</span>
              <img src="@/assets/unfold.svg" alt="Unfold icon" />
            </button>
          </div>

          <div class="group-table-col" v-for="n in maxParameterLength" :key="n">
            <button class="btn-sort">
              <span class="title">Parameter {{ n }}</span>
              <img src="@/assets/unfold.svg" alt="Unfold icon" />
            </button>
          </div>

          <div class="group-table-col">
            <button class="btn-sort">
              <span class="title">Action</span>
              <img src="@/assets/unfold.svg" alt="Unfold icon" />
            </button>
          </div>
        </div>
      </div>

      <div class="group-table-body">
        <div class="group-table-row" v-for="(rule, index) in revenueGroup.rules" :key="rule.id">
          <div class="group-table-col">{{ index + 1 }}</div>

          <div class="group-table-col">{{ rule.field }}</div>

          <div class="group-table-col">{{ rule.operator }}</div>

          <div class="group-table-col" v-for="n in maxParameterLength" :key="n">
            {{ getParameter(rule, n - 1) }}
          </div>

          <div class="group-table-col">
            <button class="btn-row-delete">
              <img src="@/assets/Iconsdelete.svg" alt="trash icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#group-item {
  border: 1px solid var(--color-gray-line);
  border-radius: var(--border-radius);
  font-size: 0.8rem;
  position: relative;
}

.group-header-container {
  padding: 1em;
  padding-bottom: 1.5em;
  border-bottom: 1px solid var(--color-gray-line);
}

.group-header {
  display: grid;
  align-items: center;
  grid-template-columns: 5fr 1fr;
  gap: 1em;
  margin-bottom: 1em;
}

.group-header>.title {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5em;
}

.group-header>.title>.tag-special {
  font-size: 0.6rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0.5em 1em;
  border-radius: 5rem;
}

.group-header-btn-container {
  justify-self: end;
}

.btn-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gray-trash-bg);
  padding: 0.5em;
  border-radius: 50%;
}

.btn-remove>img {
  width: 1rem;
  height: 1rem;
}

.group-table {
  max-width: 100%;
  position: relative;
  overflow-x: scroll;
}

.group-table-head {
  color: var(--color-gray-text);
}

.group-table-body {
  min-width: min-content;
}

.group-table-row {
  display: grid;
  grid-template-columns: repeat(v-bind(maxParameterLength+4), minmax(8rem, 1fr));
  gap: 0.5em;
}

.group-table-col {
  padding: 1em;
  position: relative;
}

.btn-sort {
  width: 100%;
  display: flex;
  align-items: center;
}

.btn-sort>.title {
  margin-right: 1em;
  white-space: nowrap;
}

.group-table-body {
  max-height: 15rem;
  overflow-y: scroll;
}

.group-table-body .group-table-row:nth-last-of-type(odd) {
  background-color: var(--color-row);
}

@media only screen and (min-width: 450px) {
  .group-header-container {
    padding: 2em;
  }

  .group-header-container {
    position: relative;
  }

  .group-header-container>.description {
    width: 80%;
  }
}

@media only screen and (min-width: 550px) {
  #group-item {
    font-size: 0.9rem;
  }

  .group-header>.title {
    font-size: 1rem;
  }

  .group-header>.title>.tag-special {
    font-size: 0.75rem;
  }

  .btn-remove>img {
    width: 1.3rem;
    height: 1.3rem;
  }
}

@media only screen and (min-width: 1150px) {
  #group-item {
    font-size: 0.8rem;
  }
}
</style>