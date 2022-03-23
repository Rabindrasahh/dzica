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
				<ul class="navbar-nav mt-4">
					<li class="nav-item">
						<router-link
							:to="{name:'index'}"
							class="nav-link"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-home text-dark"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1">Visit Site</span>
						</router-link>
					</li>
					<hr>
					<li class="nav-item">
						<a
							class="nav-link"
							:class="{'active':routeName==='adminPanelTalentsPending' || routeName === 'adminPanelAddTalent' || routeName==='adminPanelTalentsAccepted'}"
							href="#collapse1"
							data-bs-toggle="collapse"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-star text-dark"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1">Talents</span>
						</a>
						<ul
							class="collapse mt-3 ps-0"
							id="collapse1"
						>
							<li>
								<router-link :to="{name:'adminPanelAddTalent'}">
									<div class="nav-link">
										<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
											<i
												class="fas fa-plus text-dark"
												style="top:0px"
											></i>
										</div>
										Add Talent
									</div>
								</router-link>
							</li>
							<li>
								<router-link :to="{name:'adminPanelTalentsPending'}">
									<div class="nav-link">
										<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
											<i
												class="fas fa-clock text-dark"
												style="top:0px"
											></i>
										</div>
										Pending Talents' Requests
									</div>
								</router-link>
							</li>
							<li>
								<router-link :to="{name:'adminPanelTalentsAccepted'}">
									<div class="nav-link">
										<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
											<i
												class="fas fa-list text-dark"
												style="top:0px"
											></i>
										</div>
										Accepted Talents
									</div>
								</router-link>
							</li>
							<hr>
						</ul>

					</li>
					<li class="nav-item">
						<router-link
							:to="{name:'adminPanelRequests'}"
							:class="{'active':routeName==='adminPanelRequests'}"
							class="nav-link"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-video text-dark"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1">Orders</span>
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:to="{name:'adminPanelUsers'}"
							:class="{'active':routeName==='adminPanelUsers'}"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-users text-dark"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1">Customers</span>
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:to="{name:'adminPanelCategories'}"
							:class="{'active':routeName==='adminPanelCategories'}"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-list text-dark"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1">Categories</span>
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:to="{name:'adminPanelTransactions'}"
							:class="{'active':routeName==='adminPanelTransactions'}"
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
						<router-link
							class="nav-link"
							:to="{name:'adminPanelArticles'}"
							:class="{'active':routeName==='adminPanelArticles'}"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-newspaper text-dark"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1">Blog</span>
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:to="{name:'adminPanelSettings'}"
							:class="{'active':routeName==='adminPanelSettings'}"
						>
							<div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
								<i
									class="fas fa-cog text-dark"
									style="top:0px"
								></i>
							</div>
							<span class="nav-link-text ms-1">Settings</span>
						</router-link>
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
				<div class="container-fluid py-1 px-3">

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
							<li class="nav-item dropdown pe-2 d-flex align-items-center">
								<a
									href="javascript:;"
									class="nav-link text-body p-0"
									id="dropdownMenuButton"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<i class="fa fa-bell cursor-pointer"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div class="container-fluid pb-4">
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
		logout() {
			this.$store.dispatch("auth/logout");
			this.$router.replace("/");
		},
	},
	computed: {
		routeName() {
			return this.$route.name;
		},
	},
	created() {
		document.body.style.backgroundColor = "#f8f9fa";
	},
};
</script>

<style lang="scss" scoped>
.navbar-expand-xs {
	@media screen and (max-width: 1200px) {
		transform: translateX(-17.125rem);
	}
}

.nav-item .active i {
	color: white !important;
}

ul {
	list-style: none;
}
</style>