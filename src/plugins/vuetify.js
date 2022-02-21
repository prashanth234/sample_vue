import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
                light: {
                    'app-primary': '#00203f',
                    'app-secondary': '#F4B41A',
                    'app-grey': colors.grey.darken3 ,
                    'cancel': colors.grey.lighten2
                },
        },
    },
});
