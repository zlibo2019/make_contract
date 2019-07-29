<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
			}
		},
		methods: {
			
		},
        mounted(){
		},
	}
</script>

<style type="text/scss" lang="scss">

    html, body {
        height: 100%;
        width: 100%;
        /*min-width: 1028px;*/
        overflow: hidden;
    }

    * {
        margin: 0;
        padding: 0;
        list-style: none;
        box-sizing: border-box;
    }

    #app {
        height: 100%;
        width: 100%;
    }
</style>
