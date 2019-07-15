<template>
    <div v-if="potion" class="edit-potion container">
        <h2>Edit {{potion.title}} Potion</h2>
        <form @submit.prevent="editPotion">
            <div class="field title">
                <label for="title">Potion title:</label>
                <input type="text" name="title" v-model="potion.title">
            </div>
            <div v-for="(ing, index) in potion.ingredients" :key="index" class="field">
                <label for="ingredient>">Ingredient:</label>
                <input type="text" name="ingredient" v-model="potion.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>

            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient then Press TAB:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update Potion</button>
            </div>
        </form>

    </div>


</template>

<script>
    import db from '@/firebase/init'
    import slugify from 'slugify'

    export default {
        name: 'EditPotion',
        data() {
            return {
                potion: null,
                another: null,
                feedback: null

            }
        },
        methods: {
            editPotion(){
                
                if (this.potion.title) {
                    this.feedback = null
                    // create a slug
                    this.potion.slug = slugify(this.potion.title, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true
                    })

                    db.collection('potions').doc(this.potion.id).update({
                        title: this.potion.title,
                        ingredients: this.potion.ingredients,
                        slug: this.potion.slug
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
                    this.potion.ingredients.push(this.another)
                    this.another = null
                    this.feedback = null
                } else {
                    this.feedback = 'You must enter an ingredient add an ingredient. Its a potions thing!'
                }
            },
            deleteIng(ing) {
                this.potion.ingredients = this.potion.ingredients.filter(ingredient => {
                    return ingredient != ing

                })

            }
        },
        created() {
            let ref = db.collection('potions').where('slug', '==', this.$route.params.potion_slug)
            ref.get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.potion = doc.data()
                    this.potion.id = doc.id
                })
            })
        }
    }

</script>

<style>
    .edit-potion {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .edit-potion h2 {
        font-size: 2em;
        margin: 20px auto;
    }

    .edit-potion .field {
        margin: 20px auto;
        position: relative;
    }

    .edit-potion .delete {
        position: absolute;
        right: 0;
        bottom: 16px;
        font-size: 1.4em;
        color: #aaa;
        cursor: pointer;

    }

</style>
