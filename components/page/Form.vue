<template>
  <b-form @submit.prevent="onSubmit">

    <b-col cols="6">
      <b-form-group
        label="Title:"
        label-for="title"
      >
        <b-form-input
          id="title"
          v-model="model.title"
          type="text"
          placeholder="Enter title"
          :class="{ 'is-invalid': $v.model.title.$error }"
          @input="$v.model.title.$touch()"
        ></b-form-input>

        <pre class="mt-3 mb-0">
          Slug: {{ model.slug }}
        </pre>
      </b-form-group>
    </b-col>

    <b-col cols="6">
      <b-form-group
        label="Describe the change:"
        label-for="description"
      >
        <b-form-input
          id="description"
          v-model="model.description"
          type="text"
          placeholder="Enter description"
        ></b-form-input>
      </b-form-group>
    </b-col>

    <b-row>
      <b-col cols="6">
        <b-form-group
          label="Content:"
          label-for="content"
        >
        <b-form-textarea
            id="content"
            v-model="model.content"
            placeholder="Enter your markdown content"
            rows="8"
            max-rows="12"
            :class="{ 'is-invalid': $v.model.content.$error }"
            @input="$v.model.content.$touch()"
          ></b-form-textarea>
        </b-form-group>
      </b-col>

      <b-col cols="6">
        <pre class="mt-3 mb-0">
          <div v-html="$md.render(model.content)"></div>
        </pre>
      </b-col>
    </b-row>

    <b-col>
      <b-button type="submit" variant="primary">Save</b-button>
      <b-button v-if="!model.published"
        @click="model.published = true"
        type="submit"
        variant="primary">
        Save & Publish
      </b-button>
    </b-col>
  </b-form>
</template>
<script>
  import {
    required,
    minLength,
    maxLength,
    withParams
  } from "vuelidate/lib/validators";
  import {
    isUndefinedOrNullOrEmpty
  } from "@/common/string";
  import PageService from "@/services/page.service";

  const contains = fieldName => {
    if (this.errors && this.errors.length > 0) {
      let exist = _.find(this.errors, { field: fieldName });

      return exist != undefined;
    }
  };

  const slugify = text =>
    text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')

  export default {
    props: ['slug'],
    data() {
      return {
        model: {
          title: '',
          slug: '',
          description: '',
          content: ''
        },
        isLoading: false,
        errors: []
      }
    },
    validations() {
      return {
        model: {
          title: {
            required,
            minLength: minLength(2),
            serverFailed: () => {
                return this.hasServerError("title");
            }
          },
          content: {
            required,
            minLength: minLength(5),
            serverFailed: () => {
                return this.hasServerError("content");
            }
          },
        }
      }
    },
    watch: {
      'model.title': function () {
        this.model.slug = slugify(this.model.title);
      }
    },
    methods: {
      hasServerError(field) {
        if (this.errors && this.errors.length > 0) {
          let error = this.errors.find((item) => item.field === field);
          return error == undefined;
        }

        return true;
      },
      async onSubmit() {
        this.errors = [];

        this.$v.$touch();
        if (!this.$v.model.$invalid) {
          this.isLoading = true;

          try {
            const pageService = new PageService();
            if (this.model.id) {
              await pageService.update(
                  this,
                  this.model
              );

              this.$router.push(`/page/${this.model.slug}`);
            } else {
              await pageService.create(
                  this,
                  this.model
              );

              this.$router.push("/page");
            }

            this.isLoading = false;

            this.$toast.success(
                "Page saved successfully.",
                {
                    duration: 3000
                }
            );
          } catch (e) {
            this.errors = e.errors;

            this.isLoading = false;
            for (let error of this.errors) {
              this.$toast.error(error.message, {
                  duration: 3000
              });
            }
          }
        } else {
          this.$toast.error("Fill all data correctly", {
              duration: 3000
          });
        }
      }
    },
    async mounted() {
      if (!isUndefinedOrNullOrEmpty(this.slug)) {
        this.isLoading = true;
        try {
          const pageService = new PageService();
          const page = await pageService.getBySlug(this, this.slug);
          this.model = page.data;
        } catch (e) {
          console.log(e);
          this.isLoading = false;
          this.$toast.error(
              "An error occurred getting page.",
              {
                  duration: 3000
              }
          );
        }
      }
    }
  }
</script>
