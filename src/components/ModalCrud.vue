<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50" @click="close"></div>
    <div class="bg-white rounded-lg p-8 shadow-lg z-10">
      <h2 class="text-xl font-bold mb-4 text-center">{{ isEditing ? 'Edit Project' : 'Add Project' }}</h2>
      <form @submit.prevent="submitProject" class="mb-12 bg-white shadow-lg rounded-lg p-8 transition duration-300 transform hover:scale-105">
        <h1 class="text-2xl font-extrabold mt-10 mb-9 text-center text-gray-900">Admin Panel - Manage Projects</h1>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <input 
            v-model="newProject.title" 
            placeholder="Project Title" 
            required 
            aria-label="Project Title" 
            class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:shadow-md" 
          />
          <input 
            v-model="newProject.description" 
            placeholder="Project Description" 
            required 
            aria-label="Project Description" 
            class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:shadow-md" 
          />
          <input 
            v-model="newProject.link" 
            placeholder="Project Link" 
            required 
            aria-label="Project Link" 
            class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:shadow-md" 
          />
          <input 
            type="file" 
            @change="handleImageUpload" 
            accept="image/*" 
            aria-label="Project Image" 
            class="border border-gray-300 rounded-lg p-3 hover:shadow-md" 
          />
          
          <div class="flex justify-between mt-4">
            <button 
              type="button" 
              @click="close" 
              class="bg-gray-300 rounded-lg p-3 hover:shadow-md transition duration-200 transform hover:scale-105"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="flex items-center justify-center bg-black text-white rounded-lg p-3 hover:bg-yellow hover:text-white transition duration-200 shadow-md transform hover:scale-105"
            >
              <svg class="w-4 h-4 mr-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18m-9 9l9-9-9-9"></path>
              </svg>
              {{ isEditing ? 'Update Project' : 'Add Project' }}
            </button>
          </div>
        </div>
      </form>
      <div v-if="newProject.image" class="mt-4">
        <img :src="newProject.image" alt="Project Image Preview" class="rounded w-full h-48 object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  isEditing: Boolean,
  project: Object
});

const emit = defineEmits(['close', 'submit']);

// Reactive object for the project
const newProject = ref({
  title: '',
  description: '',
  link: '',
  image: null
});

// Watch for changes in the project prop to fill in the form for editing
watch(() => props.project, (newVal) => {
  if (props.isEditing && newVal) {
    newProject.value = { ...newVal }; // Fill form with project data
  } else {
    resetForm(); // Reset form if not editing
  }
});

// Watch for changes in isEditing to reset form
watch(() => props.isEditing, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

// Function to reset the form
const resetForm = () => {
  newProject.value = { title: '', description: '', link: '', image: null };
};

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newProject.value.image = e.target.result; // Update the image preview
    };
    reader.readAsDataURL(file);
  }
};

// Submit project data
const submitProject = () => {
  emit('submit', newProject.value); // Emit the project data
  close(); // Close modal after submission
};

// Close the modal
const close = () => {
  resetForm(); // Reset the form when closing
  emit('close');
};
</script>

<style scoped>
.fixed {
  position: fixed;
}
</style>
