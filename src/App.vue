<template>
    <div id="app">
        <div class="content-box">
            <div class="main-box">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
}
</script>

<style>
html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}
</style>