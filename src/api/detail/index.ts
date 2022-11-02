import { http } from "../../utils/http";
import yuyu from '../../db'
import { IresultOr as Iresult } from '../../api/interface'
// 获取房屋列表数据接口
export function fetchRoomDetail(id: any): Promise<Iresult> {
    return http.httpGet('/release/api/room/room/getRoomDetail', id)
}
