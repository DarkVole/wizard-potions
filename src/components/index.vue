<template>
    <div class="index container ">
        <div class="card card-panel" v-for="potion in potions" :key="potion.id">
            <div class="card-content">
                <i class="material-icons delete" @click="deletePotion(potion.id)">delete</i>
                <h2 class="indigo-text">{{potion.title}}</h2>
                <ul class="ingredients">
                    <li v-for="(ing, index) in potion.ingredients" :key="index">
                        <span class="chip-level">{{ing}}</span>
                    </li>
                </ul>
            </div>
            <span class="btn-floating btn-large halfway-fab light-blue accent-4">
                <router-link :to="{name: 'EditPotion', params: {potion_slug: potion.slug} }">
                    <i class="material-icons edit">edit</i>
                </router-link>


            </span>
        </div>
    </div>
</template>

<script>
    import db from '@/firebase/init.js'
    export default {
        name: 'Index',
        data() {
            return {
                potions: []
            }
        },
        methods: {
            deletePotion(id) {
                // deletes a potion from firebase
                db.collection('potions').doc(id).delete().then(() => {
                    this.potions = this.potions.filter(potion => {
                        return potion.id != id
                    })
                })
            }
        },
        created() {
            // fetch data from the firestore
            db.collection('potions').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let potion = doc.data()
                    potion.id = doc.id
                    this.potions.push(potion)
                })
            })
        }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .card-panel {
        background-color: #f0ead6;

    }

    .index {

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 30px;
        margin-top: 60px;

    }

    .index h2 {
        font-size: 1.8em;
        text-align: center;
        margin-top: 0;
        font-family: 'Pacifico', cursive;

    }


    .index .ingredients li {
        display: inline-block;
    }


    .index .delete {
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
        color: #616161;
        font-size: 1.4em;
    }

    .chip-level {

        background-color: #bbdefb;
        display: block;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-left: 5px;
        border-radius: 15px;
        margin-bottom: 5px;
        font-family: 'Handlee', cursive;




    }

</style>
