export const transformModelData = (data) => {
  return data.map((provider) => ({
    label: provider.label,
    title: provider.label,
    options: provider.models.map((model) => ({
      label: model.label,
      value: model.modelId, // 使用modelId作为value
      ...(model.status !== 'activate' ? { disabled: true } : {}), // 如果status不为activate，添加disabled: true
    })),
  }));
};
