import { ITEMS_PER_PAGE } from './../constants/data';
import * as MongoosePaginate from 'mongoose-paginate-v2';
const customLabels = {
  totalDocs: 'totals',
  docs: 'docs',
  limit: 'limit',
  page: 'page',
  totalPages: 'totalPages',
  pagingCounter: 'pagingCounter',
  nextPage: false,
  prevPage: false,
  hasPrevPage: false,
  hasNextPage: false,
  meta: 'pagination',
};
(MongoosePaginate as any).paginate.options = {
  lean: true,
  limit: ITEMS_PER_PAGE,
  page: 1,
  customLabels,
};
export default MongoosePaginate;
