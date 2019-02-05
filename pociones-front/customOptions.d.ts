declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        axios?: any;
        service?: any;
        notify?: any;
        cookie?: any;
    }
}
