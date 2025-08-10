<template>
  <div class="container mx-auto p-4">
    <div class="mb-4">
      <h2 class="text-2xl font-bold mb-4">Posts</h2>
      <button @click="showCreateForm = true" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create New Post
      </button>
    </div>

    <!-- Posts List -->
    <div class="grid gap-4">
      <div v-for="post in posts" :key="post.id" class="bg-white p-4 rounded shadow">
        <h3 class="text-xl font-semibold">{{ post.title }}</h3>
        <p class="text-gray-600 mt-2">{{ post.content }}</p>
        <div class="mt-4 flex gap-2">
          <button @click="editPost(post)" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
            Edit
          </button>
          <button @click="deletePost(post.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateForm || editingPost" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">{{ editingPost ? 'Edit Post' : 'Create New Post' }}</h3>
        <form @submit.prevent="submitPost">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full px-3 py-2 border rounded"
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea
              v-model="form.content"
              class="w-full px-3 py-2 border rounded"
              rows="4"
              required
            ></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="cancelEdit"
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {{ editingPost ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../axios'

const posts = ref([])
const showCreateForm = ref(false)
const editingPost = ref(null)
const form = ref({
  title: '',
  content: ''
})

const fetchPosts = async () => {
  try {
    const response = await axios.get('/api/posts')
    posts.value = response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

const submitPost = async () => {
  try {
    if (editingPost.value) {
      await axios.put(`/api/posts/${editingPost.value.id}`, form.value)
    } else {
      await axios.post('/api/posts', form.value)
    }
    await fetchPosts()
    cancelEdit()
  } catch (error) {
    console.error('Error submitting post:', error)
  }
}

const editPost = (post) => {
  editingPost.value = post
  form.value = {
    title: post.title,
    content: post.content
  }
  showCreateForm.value = true
}

const deletePost = async (id) => {
  if (!confirm('Are you sure you want to delete this post?')) return
  
  try {
    await axios.delete(`/api/posts/${id}`)
    await fetchPosts()
  } catch (error) {
    console.error('Error deleting post:', error)
  }
}

const cancelEdit = () => {
  showCreateForm.value = false
  editingPost.value = null
  form.value = {
    title: '',
    content: ''
  }
}

onMounted(() => {
  fetchPosts()
})
</script>