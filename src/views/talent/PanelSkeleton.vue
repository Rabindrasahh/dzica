<template>
	<div>
		<!-- SIDEBAR -->
		<aside
			class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
			id="sidenav-main"
			ref="sidenav"
		>
			<div
				class="collapse navbar-collapse  w-auto  max-height-vh-100 h-100"
				id="sidenav-collapse-main"
			>
				<ul class="navbar-nav mt-0">
					<li class="nav-item">
						<a class="nav-link">
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fa-regular fa-money-bill text-danger"
									style="top:0px"
								></i>
							</div>
							<span class="fw-bold text-danger"> Balance: {{ talent.balance }}$</span>
						</a>
					</li>
					<hr>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:to="{name:'talentPanelDashboard'}"
							:class="{'active':routeName==='talentPanelDashboard'}"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-home text-dark"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1">Dashboard</span>
						</router-link>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							:class="{'active':routeName=='talentPanelPendingRequests' || routeName=='talentPanelCompletedRequests' || route == 'talentPanelRejectedRequests'  }"
							href="#collapse1"
							data-bs-toggle="collapse"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-star text-dark"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1">Requests</span>
						</a>
						<ul
							class="collapse mt-3 ps-0"
							id="collapse1"
						>
							<li>
								<router-link :to="{name:'talentPanelPendingRequests'}">
									<div class="nav-link">
										<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
											<i
												class="fas fa-clock text-dark"
												style="top:0px"
											></i>
										</div>
										<span class="nav-link-text">Pending Requests</span>
									</div>
								</router-link>
							</li>
							<li>
								<router-link :to="{name:'talentPanelCompletedRequests'}">
									<div class="nav-link">
										<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
											<i
												class="fas fa-check text-dark"
												style="top:0px"
											></i>
										</div>
										<span class="nav-link-text">Completed Requests</span>
									</div>
								</router-link>
							</li>
							<li>
								<router-link :to="{name:'talentPanelRejectedRequests'}">
									<div class="nav-link">
										<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
											<i
												class="fas fa-times text-dark"
												style="top:0px"
											></i>
										</div>
										<span class="nav-link-text">Rejected Requests</span>
									</div>
								</router-link>
							</li>
							<hr>
						</ul>

					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:to="{name:'talentPanelTransactions'}"
							:class="{'active':routeName==='talentPanelTransactions'}"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-credit-card text-dark"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1">Transactions</span>
						</router-link>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							:class="{'active':routeName==='talentPanelProfile' || routeName === 'talentPanelMyVideos' || routeName === 'talentPanelMyReviews' }"
							href="#collapse2"
							data-bs-toggle="collapse"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-star text-dark"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1">My Profile</span>
						</a>
						<ul
							class="collapse mt-3 ps-0"
							id="collapse2"
						>
							<li>
								<router-link :to="{name:'talentPanelProfile'}">
									<div class="nav-link">
										<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
											<i
												class="fas fa-edit text-dark"
												style="top:0px"
											></i>
										</div>
										<span class="nav-link-text">Edit Profile</span>
									</div>
								</router-link>
							</li>
							<li>
								<router-link :to="{name:'talentPanelMyVideos'}">
									<div class="nav-link">
										<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
											<i
												class="fas fa-video text-dark"
												style="top:0px"
											></i>
										</div>
										<span class="nav-link-text">My Videos</span>
									</div>
								</router-link>
							</li>
							<li>
								<router-link :to="{name:'talentPanelMyReviews'}">
									<div class="nav-link">
										<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
											<i
												class="fas fa-comment text-dark"
												style="top:0px"
											></i>
										</div>
										<span class="nav-link-text">My Reviews</span>
									</div>
								</router-link>
							</li>
							<hr>
						</ul>

					</li>
					<li class="nav-item">
						<a
							@click="logout"
							class="nav-link cursor-pointer"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-arrow-right-from-bracket text-danger"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1 ">Logout</span>
						</a>
					</li>
				</ul>
			</div>
		</aside>
		<main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
			<!-- NAVBAR -->
			<nav
				class="navbar navbar-main navbar-expand px-0 mx-4 shadow-none border-radius-xl"
				id="navbarBlur"
				navbar-scroll="true"
			>
				<div class="container-fluid py-1 px-3 d-block d-sm-flex">
					<ul class="ps-0 ps-md-2 mb-0 d-flex flex-wrap align-items-center">
						<li class="me-2 fw-bold">
							<router-link :to="{name:'index'}">
								<img
									src="../../assets/img/logos/black.png"
									class="logo me-3"
								>
							</router-link>
						</li>
						<li class="me-2 fw-bold">
							<router-link :to="{name:'index'}">Categories</router-link>
						</li>
						<li class="me-3 fw-bold">
							<router-link :to="{name:'allTalents'}">Talents</router-link>
						</li>
						<li class="mt-2 mt-sm-0">
							<div class="input-group mb-0">
								<input
									type="text"
									class="form-control d-block"
									placeholder="Search..."
									v-model="query"
								>
								<router-link
									:to="{name:'allTalents',query:{search:query}}"
									class="btn btn-outline-dark mb-0"
									type="button"
								>
									<i class="fas fa-magnifying-glass"></i>
								</router-link>
							</div>
						</li>
					</ul>
					<div
						class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
						id="navbar"
					>
						<ul class="navbar-nav w-auto ms-auto">
							<li class="nav-item d-xl-none ps-3 d-flex align-items-center me-3">
								<a
									class="nav-link text-body p-0 cursor-pointer"
									id="iconNavbarSidenav"
									@click="toggleSidebar"
								>
									<div class="sidenav-toggler-inner">
										<i class="sidenav-toggler-line"></i>
										<i class="sidenav-toggler-line"></i>
										<i class="sidenav-toggler-line"></i>
									</div>
								</a>
							</li>
							<!-- <li class="nav-item dropdown pe-2 d-flex align-items-center">
								<a
									href="javascript:;"
									class="nav-link text-body p-0"
									id="dropdownMenuButton"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<i class="fa fa-bell cursor-pointer"></i>
								</a>
							</li> -->
							<img
								class="profile-image"
								:src="`https://dzicace.herokuapp.com/${talent.profileImage}`"
								v-if="talent.profileImage"
							>
							<img
								class="profile-image"
								src="../../assets/img/user-placeholder.png"
								v-else
							>
						</ul>
					</div>
				</div>
			</nav>
			<div class="container-fluid  pb-4">
				<router-view v-slot="{ Component }">
					<transition
						name="router"
						mode="out-in"
					>
						<component :is="Component" />
					</transition>
				</router-view>
			</div>
		</main>
	</div>

</template>

<script>
export default {
	data() {
		return {
			isToggled: false,
			query: "",
		};
	},
	methods: {
		toggleSidebar() {
			if (!this.isToggled) {
				this.$refs.sidenav.classList.add("bg-white");
				this.$refs.sidenav.style.transform = "translateX(0rem)";
			} else {
				this.$refs.sidenav.style.transform = "translateX(-17.125rem)";
				setTimeout(() => {
					this.$refs.sidenav.classList.remove("bg-white");
				}, 100);
			}
			this.isToggled = !this.isToggled;
		},
		async init() {
			try {
				await this.$store.dispatch("talent/getMyProfile");
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
		},
		logout() {
			this.$store.dispatch("auth/logout");
			this.$router.replace("/");
		},
	},
	computed: {
		routeName() {
			return this.$route.name;
		},
		talent() {
			return this.$store.getters["talent/myProfile"];
		},
	},
	created() {
		document.body.style.backgroundColor = "#f8f9fa";
		this.init();
	},
};
</script>

<style lang="scss" scoped>
.navbar-expand-xs {
	@media screen and (max-width: 1200px) {
		transform: translateX(-17.125rem);
	}
}

.nav-link-text {
	font-weight: bold;
}

.nav-item .active i {
	color: white !important;
}

ul {
	list-style: none;
}

.profile-image {
	width: 35px;
	height: 35px;
	border-radius: 50%;
	object-fit: cover;
}

.logo {
	height: 30px;
}
</style>