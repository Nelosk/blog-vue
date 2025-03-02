
import { getUserInfo, tologin } from "@/api/user"
import { getToken } from "@/utils/token";
import { defineStore } from "pinia"
import { ref, computed } from "vue"

defineStore
// 定义用户信息接口
interface UserInfo {
	id: number;
	username: string;
	email: string;
	avatar: string;
	token : string;
}

// 用户信息存储
export const useUserStore = defineStore('userStore', () => {

	const userinfo = ref<UserInfo>({
		id: 0,
		username: '未登录',
		email: '',
		avatar: '',
		token: ''
	})

	// const token = computed(( )=> localStorage.getItem('token') || '')
	// 判断用户是否登录
	// const isLoggedIn = computed(() => !!token.value)
	// const isLoggedIn = computed(() => {
	// 	// if(userinfo.value.username !== '未登录') {
	// 	// 	return true
	// 	// }
	// 	return userinfo.value.username !== '未登录';
	// });

	// 获取用户信息
	function getuserinfo() {
		getUserInfo().then((res :any) => {
			if (res.code === 200) {
				console.log(res);
				userinfo.value = res.data;
			}
		})
	}

	 async function login(credentials: { username: string; password: string }) {
		try {
			const res:any = await tologin(credentials)
			if (res.code === 200) {
				console.log(res);
				userinfo.value = res.data;	
				userinfo.value.token = getToken()??'';
			}
		} catch (error) {
		    
		}

		
	  }

	   // 清除用户信息
	   function clearUserInfo() {
        userinfo.value.username = '未登录';
        userinfo.value.token = "";
        userinfo.value.avatar = '';
        userinfo.value.email = '';
        userinfo.value.id = 0;
        localStorage.removeItem('token'); // 如果需要移除 localStorage 中的 token
    }

  
	return { userinfo, getuserinfo,login,clearUserInfo }

}, {
	persist: {
		storage: sessionStorage,
        key: 'userStore', 
	}
  })
