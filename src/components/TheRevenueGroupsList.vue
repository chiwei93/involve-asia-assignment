<script lang="ts" setup>
import type { RevenueGroup } from '@/interfaces/revenueGroup';
import BaseRevenueGroupItem from './BaseRevenueGroupItem.vue';

interface Props {
  revenueGroups: RevenueGroup[]
}

defineProps<Props>();
const emit = defineEmits(['onRemoveGroup']);

function onRemoveGroup(id: number) {
  emit('onRemoveGroup', id);
}
</script>

<template>
  <div id="list-container">
    <h1>Browse Revenue Groups</h1>

    <p v-if="revenueGroups.length === 0">No Revenue Group found</p>

    <ul id="revenue-groups-list" v-if="revenueGroups.length > 0">
      <li class="group-item" v-for="(revenueGroup) in revenueGroups" :key="revenueGroup.id">
        <BaseRevenueGroupItem :revenue-group="revenueGroup" :id="revenueGroup.id" @on-remove-group="onRemoveGroup" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
#list-container {
  margin-top: 3em;
  margin-bottom: 4em;
}

#list-container>h1 {
  font-size: 1.1rem;
  margin-bottom: 1.5em;
}

.group-item:not(:last-child) {
  margin-bottom: 2em;
}

@media only screen and (min-width: 550px) {
  #list-container>h1 {
    font-size: 1.3rem;
  }
}

@media only screen and (min-width: 1150px) {
  #list-container {
    margin-top: 0;
  }
}
</style>