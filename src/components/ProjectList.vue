<script setup>
import { useProjectStore } from '../stores/projectStore.js'

const { state } = useProjectStore()
</script>

<template>
  <header class="bg-black p-4 fixed top-0 right-0 w-full z-50">
    <nav class="flex justify-between items-center">
      <RouterLink to="/">
        <img src="../assets/navbar.svg" alt="Logo" class="h-100" />
      </RouterLink>
      <div class="flex space-x-4">
        <RouterLink to="/" class="text-white hover:text-yellow-500">Home</RouterLink>
        <RouterLink to="/about" class="text-white hover:text-yellow-500">About</RouterLink>
        <RouterLink to="/projects" class="text-white hover:text-yellow-500">Projects</RouterLink>
        <RouterLink to="/myprofile" class="text-white hover:text-yellow-500">Resume</RouterLink>
        <RouterLink to="/admin" class="text-white hover:text-yellow-500">Admin</RouterLink>
      </div>
    </nav>
  </header>

  <div class="min-h-screen bg-gray-100 pt-20">
    <section class="container mx-auto p-4">
      <!-- Project Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="project in state.projects" :key="project.id">
          <a 
            :href="project.link" 
            class="block bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl mb-4"
            :title="project.title"
          >
            <img 
              v-if="project.image" 
              :src="project.image" 
              alt="Project Image" 
              class="w-full h-48 object-cover rounded-t-lg"
            />
            <div class="p-4">
              <h3 class="text-xl font-semibold text-center text-gray-800">{{ project.title }}</h3>
              <p class="mt-2 text-gray-600 text-sm text-justify">{{ project.description }}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
  
</template>
