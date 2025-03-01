import { getUserInfo } from "@/api/user"
import { defineStore } from "pinia"
import { ref, computed } from "vue"

defineStore

// 用户信息存储
export const useUserinfoStore = defineStore('userInfo', () => {
	const userinfo = ref({
		id: "",
		username: '未登录',
		email: '',
		avatar: '',
		isLogged: false,
	})

	// 判断用户是否登录
	const isLoggedIn = computed(() => {
		if(userinfo.value.username !== '未登录') {
			return true
		}
	});

	// 获取用户信息
	function getuserinfo() {
		getUserInfo().then((res :any) => {
			if (res.code === 200) {
				console.log(res);
				userinfo.value = res.data.data;
			}
		})
	}

	// async function getUserinfo() {
	// 	// 获取用户信息
	// 	const res = await getUserinfoApi();
	// 	if (res.code === 200) {
	// 		userinfo.value = res.data.data;
	// 	}
	// }
  
	return { userinfo, getuserinfo,isLoggedIn }
  })
