
<template>
  <header class="bg-black p-4 fixed top-0 right-0 w-full z-50">
    <nav class="flex justify-between items-center">
      <!-- Logo Section -->
      <RouterLink to="/">
        <img src="../assets/navbar.svg" alt="Logo" class="h-100"/>
      </RouterLink>
      
      <!-- Navigation Links (All point to Home) -->
      <div class="flex space-x-4">
        
        <RouterLink to="/" class="text-white hover:text-yellow-500">Home</RouterLink>
        <RouterLink to="/about" class="text-white hover:text-yellow-500">About</RouterLink>
        <RouterLink to="/projects" class="text-white hover:text-yellow-500">Project</RouterLink>
        <RouterLink to="/myprofile" class="text-white hover:text-yellow-500">Resume</RouterLink>
        <RouterLink to="/admin" class="text-white hover:text-yellow-500">Admin</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
// No script needed for this.
</script>