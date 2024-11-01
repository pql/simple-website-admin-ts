export const permissionsProps = {
  pageDataList: {
    type: Array,
    required: true,
    default: () => [],
  },
  providerName: {
    type: String,
    required: true,
    default: () => '',
  },
  titleUserName: {
    type: String,
    required: true,
    default: () => '',
  },
};
