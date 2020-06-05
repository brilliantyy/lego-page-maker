<template>
	<div class="home">
		<el-container>
			<el-header><Header></Header></el-header>
			<el-container>
				<div class="home-container">
					<div class="home-header">
						<ul class="home-tabs">
							<li value="0" class="active">已发布</li>
							<li value="1" class="">草稿</li>
						</ul>
						<button class="create-btn" @click="$router.push('/project/create')" v-sClick><i class="el-icon-plus"></i>创建</button>
					</div>
					<div class="home-content">
						<card v-for="item in projectList" :key="item.id" :data="item"></card>
					</div>
				</div>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/components/Header.vue'
import Card from './components/Card.vue'

@Component({
	components: {
		Header,
		Card
	},
})
export default class Home extends Vue {
	private projectList: any[] = []

	created() {
		this.fetchList()
	}

	private fetchList() {
		this.$http.get('http://localhost:3000/project/list')
			.then((res: any) => {
				if (res.code === 0 && res.data) {
					this.projectList = res.data
				}
			}).catch((err: Error) => {
				this.$Message.error(err)
			})
	}
}
</script>

<style lang="scss" scoped>
$defaultBoxShadow: 0 0 8px rgba(154, 154, 154, 0.1);

.home {
	position: relative;
	height: 100%;
	& > .el-container {
		height: 100%;
		.el-header {
			z-index: 2;
		}
		.el-container {
			height: calc(100vh - 60px);
			.home-container {
				width: 1240px;
				margin: 20px auto 0;
				.home-header {
					height: 50px;
					padding: 10px 0 20px;
					position: relative;
					background: #f7f7f7;
					.home-tabs {
						margin: 0;
						height: 100%;
						padding: 0;
						list-style: none;
						line-height: 50px;
						li {
							margin-right: 30px;
							display: inline-block;
							color: #666;
							font-weight: 700;
							cursor: pointer;
							&.active {
								color: #333;
							}
						}
					}
					.create-btn {
						position: absolute;
						right: 0;
						top: 18px;
						width: 90px;
						height: 34px;
						padding: 0 20px;
						border: none;
						color: #FFFFFF;
						font-size: 14px;
						font-weight: 700;
						outline: none;
						cursor: pointer;
						border-radius: 20px;
						background: linear-gradient(135deg, #fbac48 0, #ff4848 100%);
						box-shadow: 0 4px 8px rgba(0, 0, 0, 0.13);
						.el-icon-plus {
							margin-right: 3px;
							font-weight: 700;
						}
					}
				}
				.home-content {
					margin-right: -40px;
				}
			}
		}
	}
}
</style>
