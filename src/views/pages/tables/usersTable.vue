<script setup lang="ts">
const users = [
  {
    name: 'Frozen Yogurt',
    email: "anopua@gm.com",
    created_date: "12/2/2020",
    role: "Admin",
  },
  {
    name: 'Frozen Yogurt',
    email: "anopua@gm.com",
    created_date: "12/2/2020",
    role: "Admin",
  },
  {
    name: 'Frozen Yogurt',
    email: "anopua@gm.com",
    created_date: "12/2/2020",
    role: "Admin",
  },
  {
    name: 'Frozen Yogurt',
    email: "anopua@gm.com",
    created_date: "12/2/2020",
    role: "Admin",
  },
  {
    name: 'Frozen Yogurt',
    email: "anopua@gm.com",
    created_date: "12/2/2020",
    role: "Admin",
  },
]
</script>

<template>
  <VTable
    height="250"
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-uppercase">
name        </th>
        <th class="text-uppercase text-center">
          email
        </th>
        <th class="text-uppercase text-center">
          role
        </th>
        <th class="text-uppercase text-center">
created date      </th>
        <th class="text-uppercase text-center">
actions
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in users"
        :key="item.user"
      >
        <td>
          {{ item.name }}
        </td>
        <td class="text-center">
          {{ item.email }}
        </td>
        <td class="text-center">
          {{ item.role }}
        </td>
        <td class="text-center">
          {{ item.created_date }}
        </td>
        <td class="text-center">
          <i class="ri-delete-bin-line"></i>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
