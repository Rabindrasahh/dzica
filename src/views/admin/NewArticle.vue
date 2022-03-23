<template>
	<div class="card">
		<div class="card-header bg-gradient-dark ">
			<h4 class="text-white">New Article</h4>
		</div>
		<div class="card-body">
			<form @submit.prevent="addArticle">
				<div class="form-group mb-3">
					<label for="">Image:</label>
					<input
						type="file"
						ref="image"
						class="form-control"
					>
				</div>
				<div class="form-group mb-3">
					<label for="">Name:</label>
					<input
						type="text"
						placeholder="Name"
						v-model="name"
						class="form-control"
						:class="{'is-invalid':v$.name.$error}"
					>
					<span
						v-if="v$.name.$error"
						class="text-sm text-danger"
					>
						{{ v$.name.$errors[0].$message }}
					</span>
				</div>
				<div class="form-group mb-3">
					<label for="">SEO title:</label>
					<input
						type="text"
						placeholder="SEO title"
						v-model="seoTitle"
						class="form-control"
					>
				</div>
				<div class="form-group mb-3">
					<label for="">SEO keywords:</label>
					<Multiselect
						mode="tags"
						placeholder="SEO keywords"
						:create-option="true"
						:searchable="true"
						v-model="seoKeywords"
						class="form-control"
					/>
				</div>
				<div class="form-group mb-3 ">
					<label for="">Content:</label>
					<quill-editor
						id="rules"
						v-model:content="content"
						:content="content"
						contentType="html"
						toolbar="full"
						theme="snow"
					> </quill-editor>
					<span
						v-if="v$.content.$error"
						class="text-sm text-danger"
					>
						{{ v$.content.$errors[0].$message }}
					</span>
				</div>
				<div class="text-center mt-4">
					<button
						class="btn bg-gradient-main text-white text-lg w-md-50"
						type="submit"
					>
						<i class="fa-regular fa-check-circle me-2"></i>
						<span> ADD </span>
					</button>
				</div>
			</form>
		</div>

		<loading
			v-model:active="isLoading"
			:can-cancel="false"
			:is-full-page="true"
		/>
	</div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
export default {
	components: { QuillEditor },
	setup: () => ({ v$: useVuelidate() }),
	validations() {
		return {
			name: {
				required: helpers.withMessage(
					"Please Enter The Article Name",
					required
				),
			},
			content: {
				required: helpers.withMessage(
					"Please Enter The Content",
					required
				),
			},
		};
	},
	data() {
		return {
			isLoading: false,
			name: "",
			content: "",
			seoKeywords: [],
			seoTitle: "",
		};
	},
	methods: {
		async addArticle() {
			const result = await this.v$.$validate();
			if (!result) return;
			if (!this.$refs.image?.files[0]) {
				this.$swal({
					icon: "error",
					text: "Please select an image",
				});
				return;
			}

			this.isLoading = true;
			try {
				const formData = new FormData();
				formData.append("title", this.name);
				formData.append("image", this.$refs.image?.files[0]);
				formData.append("content", this.content);
				formData.append("seoTitle", this.seoTitle);
				formData.append("seoKeywords", this.seoKeywords);
				await this.$store.dispatch("admin/newArticle", formData);

				this.$swal({
					icon: "success",
					text: "The article was created successfully!",
				});
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
	},
	computed: {
		categories() {
			return this.$store.getters["admin/categories"];
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	height: 300px !important;
}
</style>