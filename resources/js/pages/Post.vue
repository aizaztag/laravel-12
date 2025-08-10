<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Posts</h1>
    <div class="mb-4">
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Create New Post
      </button>
    </div>
    <div class="space-y-4">
      <!-- Posts will be listed here -->
      <p class="text-gray-600">No posts found.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  data() {
    return {
      posts: []
    }
  },
  created() {
    // We'll implement post fetching logic here
  }
}
</script>