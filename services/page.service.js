import BaseService from '../common/base.service';

class PageService extends BaseService {
  async getAll(ctx, params) {
    try {
      return await ctx.$axios.$get(`/page/`, params);
    } catch (e) {
      throw this.getErrors(e);
    }
  }

  async getBySlug(ctx, slug) {
    try {
      return await ctx.$axios.$get(`/page/${slug}`);
    } catch (e) {
      throw this.getErrors(e);
    }
  }

  async getAllHistoryBySlug(ctx, slug) {
    try {
      return await ctx.$axios.$get(`/page/${slug}/history`);
    } catch (e) {
      throw this.getErrors(e);
    }
  }

  async getHistoryById(ctx, slug, id) {
    try {
      return await ctx.$axios.$get(`/page/${slug}/history/${id}`);
    } catch (e) {
      throw this.getErrors(e);
    }
  }

  async create(ctx, model) {
    try {
      return await ctx.$axios.$post(`/page/`, model);
    } catch (e) {
      throw this.getErrors(e);
    }
  }

  async update(ctx, model) {
    try {
      return await ctx.$axios.$put(`/page/${model.id}`, model);
    } catch (e) {
      throw this.getErrors(e);
    }
  }
}
export default PageService
