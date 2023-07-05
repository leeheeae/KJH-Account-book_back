export const USER_PARAM_OBJECT = {
  // ! [getFindById] 에 대한 Param
  getFindById: {
    name: 'id',
    description: '소유자 id',
    required: true,
    type: Number,
  },
} as const;
