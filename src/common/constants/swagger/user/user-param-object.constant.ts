export const USER_PARAM_OBJECT = {
  // ! [findById] 에 대한 Param
  findById: {
    name: 'id',
    description: '소유자 id',
    required: true,
    type: Number,
  },
} as const;
