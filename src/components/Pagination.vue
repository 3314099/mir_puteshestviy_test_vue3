<template>
<div class="flex justify-start items-center">
    <div
        v-for="item in pages" :key="item"
    >
        <div
            class="w-10 h-10 p-2 rounded border-2 border-blue-200 mx-1 flex items-center justify-center"
            :class="item === value || values.includes(item) ? 'bg-blue-200 font-bold' : 'cursor-pointer'"
            @click="chgValue(item)"
        >
            {{item}}
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Pagination",
    emits: ['chgValue'],
    props: {
        pages: {type: Number, default:() => 0},
        value: {type: Number, default:() => 0},
        values: {type: Array, default:() => []}
    },
    setup(props, {emit}) {
        const chgValue = (val) => {
            if (val === props.value || props.values.includes(val)) return
            emit('chgValue', val)
        }
        return {
            chgValue
        }
    }
}
</script>

<style scoped>

</style>