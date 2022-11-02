<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
 
<template>
    <div>
        
        <h1>{{ t('message.home') }}</h1>
        <h1>{{ t('message.mine') }}</h1>

    </div>
    <button>1111222</button>
</template>
 
<style scoped lang='scss'>
div {
    h1 {
        color: aquamarine;
    }
}
</style>