import { getRoomList } from './../api/layout/index';
import { createStore } from 'vuex'
import { savaLanguageApi, getLanguageApi } from '../api/layout/index'
import { fetchRoomList } from '../api/index'
import { fetchRoomDetail } from '../api/detail/index'


export const store = createStore({
    state: {
        locale: null,//语言
        userStatus: 0,//登陆状态
        roomList: [],//房屋列表数组 
        pageNo: 1,//页
        pageSize: 6,//每页显示
        total: 0,
        cityCode: 'hz',//城市
        roomDetail: {},//房屋详情
        roomId: null,//房间id
        orderVisible: false,//订单中心显示和影藏 
    },
    mutations: {
        //存储语言包状态
        setLanguage(state, payload) {
            state.locale = payload
            return state.locale
        },

        // 存储登陆状态
        setUserStatus(state, payload) {
            state.userStatus = payload
            return state.userStatus
        }
        ,
        // 获取房屋列表数据
        getRoomList(state, payload) {
            state.roomList = payload
            return state.roomList
        },
        // 设置房屋详情数据
        setRoomDetail(state, payload) {
            state.roomDetail = payload
            return state.roomDetail
        },
        // 设置房屋id
        setRoomId(state, payload) {
            state.roomId = payload
            return state.roomId
        },
        // 设置订单中心异步组件的显示和影藏
        setOrderVisible(state, payload) {
            state.orderVisible = payload
            return state.orderVisible
        },
    },
    actions: {
        // 设置语言包
        saveLanguage({ commit, state }, language: any) {
            savaLanguageApi(language.name).then((res: any) => {
                console.log(res, '成功');
                commit('setLanguage', language)
            })
        },
        //获取房间列表
        getRoomList({ commit, state }, payload) {
            const { pageNo, cityCode = state.cityCode } = payload
            state.pageNo = pageNo
            const params = {
                pageNo,
                pageSize: state.pageSize,
                cityCode,
            }
            return new Promise(resolve => {
                fetchRoomList(params).then((res: any) => {
                    const { success, result } = res
                    const orders = result.orders
                    const total = result.total
                    if (success) {
                        commit('getRoomList', orders.data)
                        // console.log('保存房间数据到vuex中11', orders.data);
                        state.total = total
                        resolve(true)
                    }
                })
            })
        },
        //  根据id获取房间详情
        getRoomDetail({ commit, state }, payload) {
            return new Promise(resolve => {
                fetchRoomDetail(payload).then((res: any) => {
                    const { success, result } = res
                    if (success) {
                        console.log('详情页数据!!!!', result);
                        commit('setRoomDetail', result)
                        resolve(true)
                    }
                })
            })
        }
    }
})