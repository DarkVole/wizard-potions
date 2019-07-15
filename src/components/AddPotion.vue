<template>
    <div class="add-potion container z-depth-1">
        <h2 class="center-align indigo-text">Add New Potion Recipe</h2>
        <form @submit.prevent="addPotion">
            <div class="field title">
                <label for="title">Potion title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient>">Ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>

            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient then Press TAB:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Potion</button>
            </div>
        </form>
    </div>
</template>

<script>
    import db from '@/firebase/init'
    import slugify from 'slugify'
    export default {
        name: 'AddPotion',
        data() {
            return {
                title: null,
                ingredients: [],
                another: null,
                feedback: null,
                slug: null
            }
        },
        methods: {
            addPotion() {
                if (this.title) {
                    this.feedback = null
                    // create a slug
                    this.slug = slugify(this.title, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true
                    })

                    db.collection('potions').add({
                        title: this.title,
                        ingredients: this.ingredients,
                        slug: this.slug
                    }).then(() => {
                        this.$router.push({
                            name: 'Index'
                        })
                    }).catch(error => {
                        console.log(err)
                    })

                } else {
                    this.feedback = "You must enter a potion title"
                }
            },
            addIng() {
                if (this.another) {
                    this.ingredients.push(this.another)
                    this.another = null
                    this.feedback = null
                } else {
                    this.feedback = 'You must enter an ingredient add an ingredient. Its a potions thing!'
                }
            },
            deleteIng(ing) {
                this.ingredients = this.ingredients.filter(ingredient => {
                    return ingredient != ing

                })

            }
        }
    }

</script>

<style>
    .add-potion {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .add-potion h2 {
        font-size: 2em;
        margin: 20px auto;
    }

    .add-potion .field {
        margin: 20px auto;
        position: relative;
    }

    .add-potion .delete {
        position: absolute;
        right: 0;
        bottom: 16px;
        font-size: 1.4em;
        color: #aaa;
        cursor: pointer;

    }

</style>
