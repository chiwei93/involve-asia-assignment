<script setup lang="ts">
import { ref } from 'vue';
import TheRevenueGroupForm from './components/TheRevenueGroupForm.vue';
import TheRevenueGroupsList from './components/TheRevenueGroupsList.vue';
import type { RevenueGroup } from './interfaces/revenueGroup';

const revenueGroups = ref<RevenueGroup[]>([]);

function addRevenueGroup(revenueGroupData: RevenueGroup) {
  revenueGroups.value.push(revenueGroupData);
}

function removeRevenueGroup(id: number) {
  const index = revenueGroups.value.findIndex(group => group.id === id);
  revenueGroups.value.splice(index, 1);
}
</script>

<template>
  <TheRevenueGroupForm @on-form-submit="addRevenueGroup" />
  <TheRevenueGroupsList :revenue-groups="revenueGroups" @on-remove-group="removeRevenueGroup" />
</template>

<style>
@import './assets/base.css';
</style>
