<script setup>
import { ref, watch } from 'vue';
import NavBar from '../components/NavBar.vue';
import Modal from '../components/ModalCrud.vue'; // Import the ModalCrud component
import { useProjectStore } from '../stores/projectStore.js';

const { state, addProject, updateProject, deleteProject } = useProjectStore();

const newProject = ref({
  title: '',
  description: '',
  link: '',
  image: null,
});

const isEditing = ref(false);
const currentProjectId = ref(null);
const isModalVisible = ref(false);

// Handle image file upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newProject.value.image = e.target.result; // Set image data
    };
    reader.readAsDataURL(file);
  }
};

const submitProject = (projectData) => {
  if (isEditing.value) {
    updateProject({ ...projectData, id: currentProjectId.value }); // Update project
  } else {
    addProject(projectData); // Add new project
  }
  resetForm();
};

// Open the modal for editing a project
const editProject = (project) => {
  newProject.value = { ...project }; // Copy project data
  currentProjectId.value = project.id;
  isEditing.value = true;
  isModalVisible.value = true; // Show modal for editing
};

// Reset the form and close the modal
const resetForm = () => {
  newProject.value = { title: '', description: '', link: '', image: null }; // Clear the form
  isEditing.value = false;
  currentProjectId.value = null;
  isModalVisible.value = false; // Close modal
};

// Remove project
const removeProject = (projectId) => {
  deleteProject(projectId);
};

// Watch for project state changes to close modal if needed
watch(() => state.projects, () => {
  if (isModalVisible.value) {
    isModalVisible.value = false; // Close modal after project is updated
  }
});
</script>

<template>
  <main class="bg-gradient-to-r from-blue-50 to-white min-h-screen">
    <NavBar />
    <div class="container mx-auto mb-9 p-8 mt-77">
      <form @submit.prevent="submitProject" class="mb-12 bg-white shadow-lg rounded-lg p-8 transition duration-300 transform hover:scale-105">
        <h1 class="text-2xl font-extrabold mt-10 mb-9 text-center text-gray-900">Admin Panel - Manage Projects</h1>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <input v-model="newProject.title" placeholder="Project Title" required aria-label="Project Title" class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:shadow-md" />
          <input v-model="newProject.description" placeholder="Project Description" required aria-label="Project Description" class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:shadow-md" />
          <input v-model="newProject.link" placeholder="Project Link" required aria-label="Project Link" class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:shadow-md" />
          <input type="file" @change="handleImageUpload" accept="image/*" aria-label="Project Image" class="border border-gray-300 rounded-lg p-3 hover:shadow-md" />
          
          <button type="submit" class="flex items-center justify-center bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition duration-200 shadow-md transform hover:scale-105">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18m-9 9l9-9-9-9"></path>
            </svg>
            {{ isEditing ? 'Update Project' : 'Add Project' }}
          </button>
        </div>
      </form>

      <div class="projects grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <div v-for="(project) in state.projects" :key="project.id" class="flex flex-col transition duration-300 ease-in-out transform hover:-translate-y-1">
          <a :href="project.link" target="_blank" class="block bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl mb-4">
            <img v-if="project.image" :src="project.image" alt="Project Image" class="w-full h-48 object-cover rounded-t-xl" />
            <div class="p-4">
              <h3 class="text-xl font-semibold text-center text-gray-800">{{ project.title }}</h3>
              <p class="mt-2 text-gray-700 text-sm text-justify">{{ project.description }}</p>
            </div>
          </a>
          <div class="flex justify-between items-center">
            <button @click="editProject(project)" class="bg-yellow-500 text-black font-bold rounded-lg p-1 w-36 hover:bg-yellow-600 transition duration-200 shadow-lg transform hover:scale-105 border-2 border-yellow-600">
              Edit
            </button>
            <button @click="removeProject(project.id)" class="bg-red-500 text-white font-bold rounded-lg p-1 w-36 hover:bg-red-600 transition duration-200 shadow-lg transform hover:scale-105 border-2 border-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
      
      <!-- Modal Component --> 
      <Modal 
        :isVisible="isModalVisible" 
        :isEditing="isEditing" 
        :project="newProject" 
        @close="resetForm" 
        @submit="submitProject" 
      />
    </div>
  </main>
</template>
