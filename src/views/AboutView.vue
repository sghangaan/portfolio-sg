
<script setup>
import NavBar from '../components/NavBar.vue'
</script>

<template>
  <main>
    <NavBar />
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center p-6">
        <h1 class="text-4xl font-bold text-black animate-bounce">Hello! I Am</h1>
        <h2 class="text-3xl font-extrabold text-yellow-500 mt-2 hover:text-yellow-400 transition duration-300">
          Sharon Grace Hangaan
        </h2>
        <h3 class="text-2xl font-semibold text-gray-600 mt-4">
          &lt; Frontend Developer / &gt;
        </h3>
        <p class="mt-6 text-lg text-gray-800 max-w-lg mx-auto bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
          I am a Front-End Developer with a strong foundation in HTML, CSS, JavaScript, and modern frameworks, eager to apply my skills to create responsive and user-friendly web applications. In addition to my front-end expertise, I have knowledge of cybersecurity practices, which I aim to integrate into my work to enhance the security and resilience of web applications. I look forward to contributing to a company’s success while growing both personally and professionally in the fields of web development and cybersecurity.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
 
</style>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
