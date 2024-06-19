
<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { site, theme, page, frontmatter } = useData()

const features = computed(() => {
  return theme.value.sidebar
})
console.log('site, theme, page, frontmatter', site, theme, page, frontmatter)
</script>
