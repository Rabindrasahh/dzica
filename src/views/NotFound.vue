<template>
	<div class="vh-100 vw-100">
		<section class="page_404">
			<div class="container">
				<div class="row">
					<div class="col-sm-12">
						<div class="mt-5">
							<div class="four_zero_four_bg">
								<h1 class="text-center">Not Found</h1>
							</div>

							<div class="contant_box_404">
								<h3 class="h2"> Look like you are lost</h3>
								<p>The page you entered is not available</p>
								<router-link
									to="/"
									class="link_404"
								>Main Page</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>


<style scoped>
.vh-100 {
	background-color: #fff;
}
.page_404 {
	padding: 40px 0;
	font-family: "Poppins", serif;
	text-align: center;
}

.page_404 img {
	width: 100%;
}

.four_zero_four_bg {
	background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
	height: 400px;
	background-repeat: no-repeat;
	background-position: center;
}

.four_zero_four_bg h1 {
	font-size: 80px;
}

.four_zero_four_bg h3 {
	font-size: 80px;
}

.link_404 {
	color: #fff !important;
	padding: 10px 20px;
	background: #035397;
	margin: 20px 0;
	display: inline-block;
}
.contant_box_404 {
	margin-top: -50px;
}
</style>