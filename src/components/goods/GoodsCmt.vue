<template>
    <div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
import Comment from '../subcomponents/Comments.vue'
export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
    components: {
        'comment': Comment
    },
}
</script>

<style scoped>

</style>
