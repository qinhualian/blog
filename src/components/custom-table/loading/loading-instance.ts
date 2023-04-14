// 开启加载
export function showLoadingInstance(loadingInstance: any) {
  loadingInstance.show();
}

// 关闭加载
export function closeLoadingInstance(loadingInstance: any) {
  loadingInstance.close();
}

// 销毁
export function destroyedLoadingInstance(loadingInstance: any) {
  loadingInstance.destroyed();
}
