<template>
    <div class="card p-0">
        <div class="card-header mx-4 mt-2 p-1 text-center">
            <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                <i class="fas fa-archive opacity-10" aria-hidden="true"></i>
            </div>
        </div>
        <div class="card-body pt-0 p-1 text-center">

            <span class="text-xs">{{ materia.materia }}</span>
            <hr class="horizontal dark my-2" />
            <!-- <h5 class="mb-0 text-sm">0.00</h5> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        materia: {
            type: Object,
            default: () => { },
        },
    },
}
</script>

<style>

</style>