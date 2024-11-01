export const entityDetailProps = {
  pageType: {
    type: String,
    default: 'single', // single | all
    required: true,
  },
  pageDataList: {
    type: Array,
    required: true,
  },
};
