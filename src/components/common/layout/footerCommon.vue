<script setup lang='ts'>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

//获取i18n实例，用t('')包裹需要切换语言的部件 使用插值语法即可生效
const { t } = useI18n()

const footerMenu = reactive(
    [{
        title: 'yu2Travel',
        menus: [{
            name: 'careers',
            link: 'javascript:;'
        },
        {
            name: 'news',
            link: 'javascript:;'
        },
        {
            name: 'topic',
            link: 'javascript:;'
        },
        {
            name: 'wheelchairAccessible',
            link: 'javascript:;'
        }]
    }, {
        title: 'discovery',
        menus: [{
            name: 'trustAndSafe',
            link: 'javascript:;'
        },
        {
            name: 'travelFund',
            link: 'javascript:;'
        },
        {
            name: 'magazine',
            link: 'javascript:;'
        },
        {
            name: 'culturalCuisine',
            link: 'javascript:;'
        }]
    }, {
        title: 'rent',
        menus: [{
            name: 'whyRent',
            link: 'javascript:;'
        },
        {
            name: 'hopitality',
            link: 'javascript:;'
        },
        {
            name: 'resources',
            link: 'javascript:;'
        },
        {
            name: 'experiences',
            link: 'javascript:;'
        },
        {
            name: 'responsibleHosting',
            link: 'javascript:;'
        }]
    }, {
        title: 'customerService',
        menus: [{
            name: 'help',
            link: 'javascript:;'
        },
        {
            name: 'neighborhoodSupport',
            link: 'javascript:;'
        }
        ]
    }])
</script>
 
<template>
    <div class="footer-common ">
        <div class="inner-footer">
            <ul>
                <li v-for="(item, i) in footerMenu" :key="i">
                    <h3>{{ t(`footer['${item.title}']`) }}</h3>
                    <a :href="itema.link" target="_blank" v-for="(itema, index) in item.menus" :key="index">
                        {{ t(`footer['${itema.name}']`) }}
                    </a>
                </li>
            </ul>
            <el-backtop :right="20" :bottom="50" />

            <div class="copyRight">©2022 - 2022 玉玉菠萝 × ZMXJ
                <p class="heaet"></p>
            </div>
        </div>

    </div>
</template>
 
<style  lang='scss'>
@import '../../../assets/scss/layout/footer.scss';

.el-backtop {
    color: #ff4757 !important;
    background-color: rgb(254, 255, 255) !important;

    &:hover {
        color: #ffffff !important;
        background-color: #ff4757 !important;
    }
}

.heaet {
    display: inline-block;
    // padding-left: ;
    margin-left: 10px;
    width: 10px;
    height: 10px;
    background: #fe2436;
    transform: rotate(-45deg);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    animation: heartbeat 1.5s linear infinite;

    &::before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background: #fe2436;
        top: -50%;
        right: 0;
        border-radius: 100%;
    }

    &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background: #fe2436;
        right: -50%;
        border-radius: 100%;
    }

    @keyframes heartbeat {
        0% {
            transform: rotate(-45deg) scale((1.0));
        }

        100% {
            transform: rotate(-45deg) scale((1.0));
        }

        100% {
            transform: rotate(-45deg) scale((0.82));
        }
    }
}
</style>