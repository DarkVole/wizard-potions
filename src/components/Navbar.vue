<template>
    <div class=navbar>
        <nav class="nav-extended indigo darken-3">
            <div class="nav-content">
                <router-link :to="{name: 'Index'}">
                    <span class="nav-title red-text red-darken-4">Prospero's Potion Emporium</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab pink">
                    <router-link :to="{name: 'AddPotion'}">
                        <i class="material-icons">add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {

            }
        }
    }

</script>

<style>
    .navbar nav {
        font-family: 'Creepster', cursive;
        color: #b71c1c;
        text-decoration-color: #b71c1c;
        padding: 0 20px;
    }

</style>
