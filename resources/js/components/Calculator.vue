<template>
  <div class="max-w-md mx-auto p-4 bg-white shadow rounded space-y-4">
    <h2 class="text-xl font-bold text-center">Simple Calculator</h2>

    <div class="grid grid-cols-2 gap-4">
      <input
        v-model.number="num1"
        type="number"
        placeholder="First Number"
        class="border p-2 rounded"
      />
      <input
        v-model.number="num2"
        type="number"
        placeholder="Second Number"
        class="border p-2 rounded"
      />
    </div>

    <div class="flex justify-center gap-2">
      <button @click="calculate('+')" class="px-4 py-2 bg-blue-500 text-white rounded">+</button>
      <button @click="calculate('-')" class="px-4 py-2 bg-blue-500 text-white rounded">-</button>
      <button @click="calculate('*')" class="px-4 py-2 bg-blue-500 text-white rounded">*</button>
      <button @click="calculate('/')" class="px-4 py-2 bg-blue-500 text-white rounded">/</button>
    </div>

    <div class="text-center font-medium text-lg">
      Result: <span class="text-green-600">{{ result }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const num1 = ref(0);
const num2 = ref(0);
const result = ref(0);

function calculate(op) {
  switch (op) {
    case '+':
      result.value = num1.value + num2.value;
      break;
    case '-':
      result.value = num1.value - num2.value;
      break;
    case '*':
      result.value = num1.value * num2.value;
      break;
    case '/':
      result.value = num2.value !== 0 ? num1.value / num2.value : '∞';
      break;
  }
}
</script>
